/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 14:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../View';

// app
import {User} from '../../app/User';
// import {ErrorTxt} from '../../app/const/ErrorTxt';
import {Message} from '../../app/const/Message';

// // data
// import {Result} from '../../data/Result';
// import {Form} from '../../data/Form';
// import {ErrorMessage} from '../../data/ErrorMessage';

// node
// import {ErrorNode} from '../../node/error/ErrorNode';

// dae
// import {ErrorDae} from '../../dae/error/ErrorDae';
import {UserDae} from '../../dae/UserDae';
import {StatusDae} from '../../dae/StatusDae';

// model
import {Model} from '../../model/Model';
// import ModelLogin from '../../model/login/ModelLogin';
import ModelSocial from '../../model/sns/ModelSocial';

// util
import { Loc } from '../../util/Loc';

// event
import {MessageStatus} from '../../event/MessageStatus';
// import ComponentError from '../../component/error/ComponentError';
import ComponentLogin from '../../component/login/ComponentLogin';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * Login from を表示します
 * - login 済みユーザーは `top` へリダイレクトさせます - 2018-01-15
 * - facebook ログイン後処理を行います
 */
export default class ViewLogin extends View {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * login 済みユーザーを `top` へ転送します
   * > クライアントサイドで cookie 有無みてトップに転送、という処理を行えば解消かもしれません
   * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-361#comment-1186530819
   * @since 2018-01-15
   */
  static checkLogin() {
    if (User.sign) {
      setTimeout(Loc.index, 500);
    }
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * login form を表示し action/login/Login を行います
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, option = {}) {
    super(element, option);
    /**
     * SNS 経由ログイン success
     * @type {function}
     */
    this.socialDone = this.socialDone.bind(this);
    const callback = {};
    callback[Model.COMPLETE] = this.socialDone;
    // callback[ Model.UNDEFINED_ERROR ] = boundFail;
    // callback[ Model.RESPONSE_ERROR ] = boundFail;
    /**
     * SNS ログイン処理します
     * @type {ModelSocial}
     */
    this.model = new ModelSocial(callback);
    /**
     * ログイン成功 `flush` message を表示します
     * @type {MessageStatus}
     */
    this.message = MessageStatus.factory();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * render start
   */
  start() {
    // 2018-01-15 - facebook login 後にトップへ遷移しない問題へ対応するため追加
    ViewLogin.checkLogin();
    // ----
    this.render();
  }
  /**
   * フォーム生成を開始します
   */
  render() {
    //
    // let LoginDom = React.createClass( {
    //   getInitialState: function() {
    //     /**
    //      * ModelLogin instance
    //      * @private
    //      * @type {null|ModelLogin}
    //      * */
    //     this.model = null;
    //     /**
    //      * ModelLogin callback
    //      * @private
    //      * @type {null|Object}
    //      * */
    //     this.callback = null;
    //
    //     /**
    //      * form error message 表示用 Object
    //      * @private
    //      * @type {*}
    //      * */
    //     this.errors = {
    //       password: new ErrorMessage(),
    //       email: new ErrorMessage(),
    //       user: new ErrorMessage()
    //     };
    //     /**
    //      * MessageStatus instance
    //      * @private
    //      * @type {MessageStatus}
    //      * */
    //     this.messageStatus = MessageStatus.factory();
    //
    //     return {
    //       error: false,
    //       email: '',
    //       password: '',
    //       user: ''
    //     };
    //   },
    //   render: function() {
    //
    //     let errorClass = ( keyName:string ) => {
    //       return this.errors[ keyName ].error ? 'error' : '';
    //     };
    //     let message = ( keyName:string ) => {
    //       return this.errors[ keyName ].message;
    //     };
    //
    //     return (
    //       <form onSubmit={this.submitHandler} ref="signup" encType="application/x-www-form-urlencoded">
    //         <span className={'form-parts ' + errorClass('email')}>
    //           <span className="setting-form-mail form-input">
    //             <input
    //               type="email"
    //               name="email"
    //               value={this.state.email}
    //               onChange={this.emailChange}
    //               placeholder={Message.PLACEHOLDER_EMAIL}
    //             />
    //           </span>
    //           <ComponentError message={message('email')} />
    //         </span>
    //         <span className={'form-parts ' + errorClass('password')}>
    //           <span className="setting-form-pw form-input">
    //             <input
    //               type="password"
    //               placeholder={Message.PLACEHOLDER_PWD}
    //               name="password"
    //               value={this.state.password}
    //               onChange={this.passwordChange}
    //             />
    //           </span>
    //           <ComponentError message={message('password')} />
    //         </span>
    //         {/* button */}
    //         <div className={'form-parts form-submit-parts ' + errorClass('user')}>
    //           <span className="setting-form-submit mod-btnA01">
    //             <input type="submit" value={Message.SUBMIT_LOGIN} />
    //           </span>
    //           <ComponentError message={message('user')} />
    //         </div>
    //       </form>
    //     );
    //
    //   },
    //   // -------------------------------------------------------
    //   // delegate
    //   componentDidMount: function() {
    //     if ( this.callback === null ) {
    //       let callback = {};
    //       this.callback = callback;
    //       callback[ Model.COMPLETE ] = this.done;
    //       callback[ Model.UNDEFINED_ERROR ] = this.fail;
    //       callback[ Model.RESPONSE_ERROR ] = this.fail;
    //     }
    //   },
    //   /*
    //   componentWillUnMount: function() {
    //
    //   },
    //   */
    //   // -------------------------------------------------------
    //   // custom
    //
    //   // input change
    //   emailChange: function( event ) {
    //     this.setState( {email: event.target.value} );
    //   },
    //   passwordChange: function( event ) {
    //     this.setState( {password: event.target.value} );
    //   },
    //   // -------------------------------------------------------
    //   // submit
    //   submitHandler: function( event:Event ) {
    //     event.preventDefault();
    //
    //     // error 消去
    //     this.reset();
    //
    //     // validate
    //     this.validate();
    //
    //   },
    //   validate: function() {
    //
    //     // empty check
    //     let email = this.state.email;
    //     let pwd = this.state.password;
    //
    //     if ( email === '' || pwd === '' ) {
    //       this.errors.user.message = ErrorTxt.EMAIL_OR_PWD_EMPTY;
    //     } else {
    //       this.request();
    //     }
    //
    //   },
    //   request: function() {
    //     let form = ReactDOM.findDOMNode( this.refs.signup );
    //     let formData = Form.element( form );
    //
    //     let model = this.model;
    //     if ( model === null ) {
    //       model = new ModelLogin( formData, this.callback );
    //       this.model = model;
    //     } else {
    //       model.data = formData;
    //     }
    //
    //     // ajax start
    //     model.start();
    //   },
    //   // -------------------------------------------------------
    //   // after request
    //   next: function( token:string ) {
    //     // login
    //     // token setup
    //     if ( User.login( token ) ) {
    //       // home
    //       // flush message
    //       this.messageStatus.flush( MessageStatus.message( Message.LOGIN_COMPLETE ), MessageStatus.SUCCESS );
    //
    //       setTimeout( Loc.index, 500 );
    //
    //       // Loc.index();
    //     }/* else {
    //       console.log( 'fail login ...', token );
    //     }*/
    //
    //   },
    //   done: function( result:Result ) {
    //     if ( result.status.code === 200 ) {
    //       // OK
    //       // token 取り出し
    //       let userDae = new UserDae( result.response );
    //       // -> next step
    //       this.next( userDae.accessToken );
    //     }
    //   },
    //   fail: function( error:Error ) {
    //     let errorDae = new ErrorDae( error.result );
    //     if ( errorDae.errors.hasErrors() ) {
    //       // errors あり
    //       let errors = errorDae.errors;
    //       let list = errors.list;
    //
    //       for ( var key of list ) {
    //         this.errors[ key ].message = errors.message( key );
    //       }
    //
    //     } else {
    //       // errors なし
    //       // status error を表示
    //       this.errors.user.message = errorDae.status.userMessage;
    //     }
    //
    //     this.setState( { error: true } );
    //   },
    //   reset: function() {
    //     this.errors.email.reset();
    //     this.errors.password.reset();
    //     this.errors.user.reset();
    //     this.setState( { error: false } );
    //   }
    // } );
    //
    // // create component
    // ReactDOM.render(
    //   <LoginDom />,
    //   this.element
    // );
    // since 2017-12-15
    ReactDOM.render(
      <ComponentLogin />,
      this.element,
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
  // ---------------------------------------------
  // /api/v1/sessions/social を叩く
  // 2016-03-16 追加
  /**
   * API request を行うかを query が URL に存在するかで判断します
   */
  social() {
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
    const queries = Loc.parse();
    if (queries !== null && queries.hasOwnProperty('oauth')) {
      const value = queries.oauth;
      // console.log( 'social request ', queries );
      if (value.indexOf('facebook') !== -1 || value === 'facebook' || value === 'facebook#' || value === 'twitter') {
        this.socialRequest();
      }
    }
  }
  /**
   * API `/api/v1/sessions/social` を行います
   */
  socialRequest() {
    // // let boundFail = this.socialFail.bind( this );
    // const callback = {};
    // callback[Model.COMPLETE] = this.socialDone;
    // // callback[ Model.UNDEFINED_ERROR ] = boundFail;
    // // callback[ Model.RESPONSE_ERROR ] = boundFail;
    //
    // const model = new ModelSocial( callback );
    // model.start();
    // console.log('ViewLogin.socialRequest', this.model);
    this.model.start();
  }

  /**
   * API `/api/v1/sessions/social` 成功
   * @param {Result} result 結果セット
   */
  socialDone(result) {
    // console.log('ViewLogin.socialDone', result);
    const response = result.response;
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error('[SOCIAL:USER_PROFILE:UNDEFINED]サーバーレスポンスに問題が発生しました。');
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      const status = new StatusDae(result.status);
      if (status.code === 200) {
        this.success(new UserDae(response));
      }
    }
  }
  // /**
  //  * API `/api/v1/sessions/social` error
  //  * @param {Object} error error instance
  //  */
  // socialFail( error ):void {
  //   // console.log( 'Social error ', error );
  // }
  /**
   * API `/api/v1/sessions/social` 成功後に token をセットし home へリダイレクトします
   * @param {UserDae} userDae ユーザー情報, token 含んでいます
   */
  success(userDae) {
    const token = userDae.accessToken;
    // console.log('ViewLogin.success', token, User.login(token));
    // console.log( 'social success ', token, userDae );
    // token setup
    if (User.login(token)) {
      this.message.flush(MessageStatus.message(Message.LOGIN_COMPLETE), MessageStatus.SUCCESS);
      // console.log('ViewLogin.success after login');
      setTimeout(Loc.index, 500);
      // throw new Error('ViewLogin.success after login');
    }
  }
}
