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
'use strict';

// parent class
import {View} from '../View';

// app
import {Message} from '../../app/const/Message';
import {Url} from '../../app/const/Url';

// util
import {Loc} from '../../util/Loc';

// model
import {Model} from '../../model/Model';
import {ModelCategories} from '../../model/categoires/ModelCategories';

// dae
import {CategoriesDae} from '../../dae/caegories/CategoriesDae';

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
 */
export class SignupWizard extends View {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
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

    this._step = 1;

    this._boundHash = null;

    // location hash なしにする
    Loc.hash = '';
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
        this.status = SignupStatus.factory();

        return {
          step: this.props.step
        };
      },
      render: function() {
        return (
          <div className={'signup signup-' + this.state.step }>
            <HeadingNode step={this.props.step} />
            <RootNode
              step={this.props.step}
              categories={this.props.categoriesDae.categories}
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
      stepChange: function( event:Object ):void {
        // SignupStatus.SIGNUP_STEP 発生後 step 値を update する
        this.updateStep( event.step );
      },
      updateStep: function( step:Number ) {
        // step値を update -> CSS クラス signup-n のナンバリングに使用
        this.setState( { step: step } );
      }
    } );

    ReactDOM.render(
      <SignupDom
        step={stepNumber}
        categoriesDae={categoriesDae}
      />,
      this.element
    );

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

  }
  /**
   * hash change event を監視開始
   */
  activateHashChange():void {

    let boundHash = this.onHash.bind( this );
    this._boundHash = boundHash;
    // ToDo: 開発中はコメントにする, 本番でコメントアウト
    /*
    window.onbeforeunload = function() {
      return Message.UNLOAD;
    };
    */
    window.addEventListener( 'hashchange', boundHash, false );

  }

  /**
   * HashChangeEvent event handler, hash が変更された後に呼び出されます
   * @param {HashChangeEvent} event HashChangeEvent インsたんcえinstance
   */
  onHash( event:HashChangeEvent ):void {
    let hash = event.newURL.split( '/' ).pop();
    let step = Url.signupStepByHash( hash );
    this._status.step( step );
  }


}
