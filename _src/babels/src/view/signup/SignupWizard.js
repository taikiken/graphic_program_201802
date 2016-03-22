/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/19 - 19:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent class
import {View} from '../View';

// app
import {Message} from '../../app/const/Message';
import {Url} from '../../app/const/Url';
// import {User} from '../../app/User';

// util
import {Loc} from '../../util/Loc';

// model
import {Model} from '../../model/Model';
import {ModelCategories} from '../../model/categoires/ModelCategories';
import {ModelSocial} from '../../model/sns/ModelSocial';

// dae
import {CategoriesDae} from '../../dae/caegories/CategoriesDae';
import {UserDae} from '../../dae/UserDae';
import {StatusDae} from '../../dae/StatusDae';

// data
import {Result} from '../../data/Result';

// node
import {HeadingNode} from '../../node/signup/HeadingNode';
import {RootNode} from '../../node/signup/RootNode';

// event
import {SignupStatus} from '../../event/SignupStatus';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * ユーザー新規登録ウィザード
 * step 1 ~ step 3 画面遷移をコントロールします
 */
export class SignupWizard extends View {
  /**
   * ユーザー新規登録ウィザード
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    //
    // this._action = new Categories( this.done.bind( this ), this.fail.bind( this ) );

    // get categories by model
    // 処理一貫性のため ModelCategories を使い取得
    let boundError = this.error.bind( this );
    let callbacks = {};
    this._callbacks = callbacks;
    callbacks[ Model.COMPLETE ] = this.complete.bind( this );
    callbacks[ Model.UNDEFINED_ERROR ] = boundError;
    callbacks[ Model.RESPONSE_ERROR ] = boundError;
    this._action = new ModelCategories( callbacks );

    // SignupStatus instance
    this._status = SignupStatus.factory();

    // step No., default 1
    this._step = 1;

    // hash change handler
    this._boundHash = null;

    // location hash なしにする
    Loc.hash = '';

    // activate unload
    this._unload = false;

    // this._boundUnload = this.onUnload.bind( this );
  }
  /**
   * Ajax request を開始します
   */
  start():void {
    this.action.start();
  }
  /**
   * Ajax response success
   * @param {CategoriesDae} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  complete( result:CategoriesDae ):void {

    this.render( result, this._step );
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  error( error ):void {

    console.log( 'Signup complete', error );

  }
  /**
   * Dom 作成(rendering)を開始します
   * @param {CategoriesDae} categoriesDae カテゴリー一覧, 興味のある競技表示に使用します
   * @param {Number} [stepNumber=1] wizard step No. default 1, どの段階かを表します
   */
  render( categoriesDae:CategoriesDae, stepNumber:Number = 1 ):void {

    // variable
    let _this = this;

    // main dom
    let SignupDom = React.createClass( {
      propTypes: {
        step: React.PropTypes.number.isRequired,
        // 興味のあるカテゴリーに使用するカテゴリー一覧
        categoriesDae: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        /**
         * SignupStatus instance
         * @private
         * @type {SignupStatus}
         */
        this.status = SignupStatus.factory();

        return {
          step: this.props.step
        };
      },
      render: function() {
        return (
          <div className={'signup-' + this.state.step }>
            <HeadingNode step={this.props.step} />
            <RootNode
              step={this.props.step}
              categories={this.props.categoriesDae.categories}
              beforeRedirect={this.beforeRedirect}
            />
          </div>
        );
      },
      componentDidMount: function() {
        // status event bind
        _this.didMount();
        this.status.on( SignupStatus.SIGNUP_STEP, this.stepChange );
      },
      componentWillUnMount: function() {
        // status event unbind
        this.status.off( SignupStatus.SIGNUP_STEP, this.stepChange );
      },
      // ------------
      // SignupStatus.SIGNUP_STEP event handler
      // step 値を update します
      stepChange: function( event:Object ):void {
        // SignupStatus.SIGNUP_STEP 発生後 step 値を update する
        this.updateStep( event.step );
      },
      // step値を update -> CSS クラス signup-n のナンバリングに使用
      updateStep: function( step:Number ) {
        this.setState( { step: step } );
      },
      // 登録が終わり home に遷移する前に呼び出されます
      beforeRedirect: function() {
        // onbeforeunload を unbind し
        // home へ遷移するのに警告が出ないようにします
        SignupWizard.deactivateUnload();
      }
    } );

    ReactDOM.render(
      <SignupDom
        step={stepNumber}
        categoriesDae={categoriesDae}
      />,
      this.element
    );

    // ---------------------------------------------
    // /api/v1/sessions/social を叩く
    // https://undo-tsushin.slack.com/archives/api/p1458118693000008
    /*
     ちなみにログインなんですが、サーバ側でOauthチェックされるなら成功時は
     ```cookie名 : auth_token
     保存期間 : 90日
     ```
     にtokenセットしてホームに戻してもらえればよいかもとおもったのですがどうでしょうか。
     */
    // なのでいらないかも
    // code は残す
    this.social();

  }

  /**
   * component が mount された
   */
  didMount():void {
    // dom mound after

    // SignupStatus event bind
    this._status.on( SignupStatus.SIGNUP_STEP, this.stepChange.bind( this ) );

    // 多分 email のチェックが終わり次のステップに遷移
    // window blur と hash change 監視を開始
    if ( this._boundHash === null ) {
      this.activateHashChange();
    }

  }

  /**
   * SignupStatus.SIGNUP_STEP event handler
   * @param {Object} event SignupStatus event object
   */
  stepChange( event:Object ):void {

    let step = event.step;
    this._step = step;
    if ( !this._unload ) {
      this._unload = true;
      SignupWizard.activateUnload();
    }

  }
  /**
   * hash change event を監視開始
   */
  activateHashChange():void {

    let boundHash = this.onHash.bind( this );
    this._boundHash = boundHash;

    window.addEventListener( 'hashchange', boundHash, false );

  }
  /**
   * onbeforeunload を bind する
   */
  static activateUnload():void {
    window.addEventListener( 'beforeunload', SignupWizard.onUnload, false );
  }

  /**
   * onbeforeunload を unbind する
   */
  static deactivateUnload():void {
    window.removeEventListener( 'beforeunload', SignupWizard.onUnload );
  }

  /**
   * onbeforeunload returnValue へ メッセージを設定する
   * @param {Event} event onbeforeunload Event instance
   */
  static onUnload( event ):void {
    event.returnValue = Message.UNLOAD;
  }

  /**
   * HashChangeEvent event handler, hash が変更された後に呼び出されます
   * @param {HashChangeEvent} event HashChangeEvent インsたんcえinstance
   */
  onHash( event:HashChangeEvent ):void {
    // let hash = event.newURL.split( '/' ).pop();
    let hash = Loc.hash;
    console.log( 'wizard onHash, ', hash, event );
    let step = Url.signupStepByHash( hash );
    this._status.step( step );
  }

  // ---------------------------------------------
  // /api/v1/sessions/social を叩く
  // 2016-03-16 追加

  /**
   * API request を行うかを query が URL に存在するかで判断します
   * <pre>
   *   https://github.com/undotsushin/undotsushin/issues/334#issuecomment-197217112
   *
   *   リンク先
   *   http://dev.undotsushin.com/api/v1/auth/facebook
   *   http://dev.undotsushin.com/api/v1/auth/twitter
   *
   *   リダイレクトURL
   *   http://dev.undotsushin.com/signup/?oauth=facebook
   *   http://dev.undotsushin.com/signup/?oauth=twitter
   *
   * </pre>
   */
  social():void {
    // query check
    /*
     https://github.com/undotsushin/undotsushin/issues/334#issuecomment-197217112

     リンク先
     http://dev.undotsushin.com/api/v1/auth/facebook
     http://dev.undotsushin.com/api/v1/auth/twitter

     リダイレクトURL
     http://dev.undotsushin.com/signup/?oauth=facebook
     http://dev.undotsushin.com/signup/?oauth=twitter
     */
    let queries = Loc.parse();
    if ( queries !== null && queries.hasOwnProperty( 'oauth' ) ) {

      let value = queries.oauth;
      console.log( 'social request ', queries );
      // query value
      // facebook が #(hash) ついていたりして言ってることと違うので チェック項目増やす
      if ( value.indexOf( 'facebook' ) !== -1 || value === 'facebook' || value === 'facebook#' || value === 'twitter' ) {
        this.socialRequest();
      }

    }
  }
  /**
   * API `/api/v1/sessions/social` を行います
   */
  socialRequest():void {
    let boundFail = this.socialFail.bind( this );
    let callback = {};
    callback[ Model.COMPLETE ] = this.socialDone.bind( this );
    callback[ Model.UNDEFINED_ERROR ] = boundFail;
    callback[ Model.RESPONSE_ERROR ] = boundFail;

    let model = new ModelSocial( callback );
    model.start();
  }

  /**
   * API `/api/v1/sessions/social` 成功
   * @param {Result} result 結果セット
   */
  socialDone( result:Result ):void {

    let response = result.response;

    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[SOCIAL:USER_PROFILE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );

    } else {

      let status = new StatusDae( result.status );
      console.log( 'socialDone ', status );
      if ( status.code === 200 ) {
        // status.code 200 の時に success method を呼び出します
        this.success( new UserDae( response ) );
      }

    }

  }

  /**
   * API `/api/v1/sessions/social` error
   * @param {Object} error エラーメッセージ
   */
  socialFail( error ):void {
    console.log( 'Social error ', error );
  }

  /**
   * API `/api/v1/sessions/social` 成功後 step 2 へ移動します
   * @param {UserDae} userDae ユーザー情報
   */
  success( userDae:UserDae ):void {
    this._status.sns( userDae.userName, userDae.profilePicture, userDae.email, userDae.bio );
  }

}
