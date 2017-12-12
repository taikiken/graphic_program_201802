/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08 - 19:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../View';
// import {ViewHeaderMemberNotice} from './ViewHeaderMemberNotice';

// app
// import {Empty} from '../../app/const/Empty';
// import {Url} from '../../app/const/Url';
import {User} from '../../app/User';
import {Message} from '../../app/const/Message';

// action
import {UsersSelf} from '../../action/users/UsersSelf';

// data
// import {Result} from '../../data/Result';
// import {Safety} from '../../data/Safety';

// dae
import {UserDae} from '../../dae/UserDae';

// util
// import {Loc} from '../../util/Loc';

// model
// import ViewLogoutModal from '../modal/ViewLogoutModal';

// event
// import {LogoutStatus} from '../../event/LogoutStatus';
// import {CommentStatus} from '../../event/CommentStatus';
import {SettingsStatus} from '../../event/SettingsStatus';
import { Env } from '../../app/Env';
import ComponentHeaderMemberSetting from '../../component/header/ComponentHeaderMemberSetting';

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
 * header ログイン・メンバー 関連メニュー
 */
export default class ViewHeaderMember extends View {
  /**
   * <p>header ログイン・メンバー 関連メニュー<br>
   * アイコン+drop down menu 表示</p>
   *
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, option = {} ) {
    super(element, option);
    /**
     * Action instance を設定します
     * @override
     * @type {UsersSelf}
     */
    this.action = new UsersSelf(this.done.bind(this), this.fail.bind(this));
    /**
     * SettingDom instance
     * @type {null|Object}
     * @protected
     */
    this._component = null;
    // SettingsStatus complete を listen しリロードする
    /**
     * SettingsStatus instance
     * @type {SettingsStatus}
     */
    this.settingStatus = SettingsStatus.factory();
    // this._settingStatus = SettingsStatus.factory();
    /**
     * bind 済み this.onComplete
     * @type {Function}
     * @protected
     */
    this._boundComplete = this.onComplete.bind(this);
    /**
     * リロードフラッグ
     * @type {boolean}
     * @protected
     */
    this._reloadFlag = false;
    /**
     * timeout ID
     * @type {number}
     * @protected
     */
    this._timer = 0;
    /**
     * bind 済み this.reload
     * @type {Function}
     * @protected
     */
    this._boundReload = this.reload.bind(this);
    // /**
    //  * ViewLogoutModal インスタンス
    //  * @type {null|Object|ViewLogoutModal}
    //  * @protected
    //  */
    // this._modal = null;
    /**
     * bind 済み executeSafely
     * @type {function}
     * @since 2016-09-28
     */
    this.boundSafely = this.executeSafely.bind(this);
    this.boundMount = this.didMount.bind(this);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * SettingDom instance
  //  * @return {?Object} SettingDom instance を返します
  //  */
  // get component() {
  //   return this._component;
  // }
  // /**
  //  * SettingDom instance を設定します
  //  * @param {?Object} component SettingDom instance
  //  */
  // set component(component) {
  //   this._component = component;
  // }
  // /**
  //  * ViewLogoutModal インスタンスを取得します
  //  * @return {ViewLogoutModal} ViewLogoutModal インスタンスを返します
  //  */
  // get model() {
  //   return this._modal;
  // }
  // /**
  //  * ViewLogoutModal インスタンスを設定します
  //  * @param {ViewLogoutModal} modal ViewLogoutModal instance
  //  */
  // set modal(modal) {
  //   this._modal = modal;
  // }
  /**
   * リロードフラッグ を取得します
   * @return {boolean} リロードフラッグを返します
   */
  get reloadFlag() {
    return this._reloadFlag;
  }
  /**
   * リロードフラッグを設定します
   * @param {boolean} flag リロードフラッグ
   */
  set reloadFlag(flag) {
    this._reloadFlag = flag;
  }
  /**
   * timeout ID を取得します
   * @return {number} timeout ID を返します
   */
  get timer() {
    return this._timer;
  }
  /**
   * timeout ID を設定します
   * @param {number} timer timeout ID
   */
  set timer(timer) {
    this._timer = timer;
  }
  /**
   * bind 済み this.reload 取得します
   * @return {Function} bind 済み this.reload を返します
   */
  get boundReload() {
    return this._boundReload;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewHeaderMember].start', path);
    }
    // console.log('ViewHeaderMember.start');
    this.action.start();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    // console.log('ViewHeaderMember.done', result);
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[MEMBER:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      // @since 2016-11-05
      // 一旦ローカル変数へ確保します
      const information = new UserDae(response);
      // User class へ保管し他で使えるようにします
      User.setInfo(information);
      // ---------[/since]
      this.render(information);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
  }
  /**
   * Dom を生成します
   * @param {UserDae} response JSON UserDae instance
   */
  render(response) {
    // console.log('ViewHeaderMember.render', response);
    //
    // const dae = response;
    // // let _this = this;
    //
    // // console.log( '******** ---------- ********** ViewHeaderMember ', dae );
    // this.executeSafely(View.BEFORE_RENDER, dae);
    //
    // // --------------------------------------------------
    // // user setting
    // /**
    //  * user setting
    //  * @private
    //  * @type {ReactClass}
    //  */
    // let SettingDom = React.createClass( {
    //   propTypes: {
    //     userName: React.PropTypes.string.isRequired,
    //     icon: React.PropTypes.string.isRequired
    //   },
    //   getInitialState: function() {
    //     /**
    //      * time out id
    //      * @private
    //      * @type {number}
    //      */
    //     this.timer = 0;
    //     /**
    //      * ViewLogoutModal instance
    //      * @private
    //      * @type {null|ViewLogoutModal}
    //      */
    //     this.modal = null;
    //     /**
    //      * LogoutStatus instance
    //      * @private
    //      * @type {LogoutStatus}
    //      */
    //     this.status = LogoutStatus.factory();
    //     /**
    //      * CommentStatus instance
    //      * @private
    //      * @type {CommentStatus}
    //      */
    //     this.commentStatus = CommentStatus.factory();
    //     /**
    //      * time out id by refresh
    //      * @private
    //      * @type {number}
    //      */
    //     this.refreshTimer = 0;
    //
    //     return {
    //       open: 'close',
    //       userName: this.props.userName,
    //       icon: this.props.icon
    //     };
    //   },
    //   render: function() {
    //
    //     let userName = this.state.userName;
    //     let icon = Safety.image( this.state.icon, Empty.USER_EMPTY );
    //     let loggedIn = Safety.same( icon, Empty.USER_EMPTY );
    //
    //     return (
    //       <div className="user">
    //         <div className="notice-container" ref="notice" />
    //
    //         <div className={'preference ' + this.state.open}>
    //           <a className="preference-opener" href="#" onClick={this.clickHandler}>
    //             {/*
    //               画像を変えてもファイル名が変わらない
    //               キャッシュ問題を回避するためにDate.nowを加える
    //               通常もキャッシュが効かない〜
    //             */}
    //             <span className={'preference-avatar ' + loggedIn}><img src={Empty.refresh(icon)} alt={userName} /></span>
    //           </a>
    //
    //           <nav className="preference-menu">
    //             <ul className="dropMenu">
    //               <li className="dropMenu-item"><a className="dropMenu-link" href={Url.mypage()}>ブックマーク<br />アクティビティ</a></li>
    //               <li className="dropMenu-item"><a className="dropMenu-link" href={Url.settings()}>設定</a></li>
    //               <li className="dropMenu-item"><a className="dropMenu-link" href="#" onClick={this.logoutHandler}>ログアウト</a></li>
    //             </ul>
    //           </nav>
    //         </div>
    //       </div>
    //     );
    //   },
    //   componentDidMount: function() {
    //
    //     // callback
    //     _this.executeSafely( View.DID_MOUNT );
    //     _this.didMount();
    //
    //     // notice make
    //     let noticeNode = ReactDOM.findDOMNode(this.refs.notice);
    //     let notice = new ViewHeaderMemberNotice( noticeNode );
    //     notice.start();
    //
    //     this.commentStatus.on( CommentStatus.COMMENT_DELETE_MODAL_OPEN, this.otherModalOpen );
    //   },
    //   componentWillUnmount: function() {
    //     this.destroy();
    //   },
    //   // -------------------------------------------------------
    //   // 以降 custom method
    //
    //   // icon click で drop menu open / close
    //   clickHandler: function( event ) {
    //
    //     event.preventDefault();
    //     this.toggleState();
    //
    //   },
    //   // document.body.onClick event handler
    //   // drop menu open 後に 領域外 click で閉じるため
    //   bodyClick: function() {
    //
    //     if ( this.state.open === 'open' ) {
    //
    //       // document.body が a より先に反応する
    //       // native event bind と React 経由の違いかも
    //       // body click 後の処理を遅延させる, 多分気づかない程度
    //       this.timer = setTimeout( this.toggleState, 100 );
    //
    //     }
    //
    //   },
    //   // open / close toggle
    //   toggleState: function() {
    //
    //     this.destroy();
    //
    //     if ( this.state.open === 'close' ) {
    //       // close -> open
    //       // document.body へ click event handler bind
    //       this.setState( { open: 'open' } );
    //       document.body.addEventListener( 'click', this.bodyClick, false );
    //     } else {
    //       // open -> close
    //       this.setState( { open: 'close' } );
    //     }
    //
    //   },
    //   // timer cancel
    //   // body.click unbind
    //   // 後処理
    //   destroy: function() {
    //
    //     // body click からの遅延処理を clear する
    //     // timer を 0 にし error にならないようにする
    //     clearTimeout( this.timer );
    //     this.timer = 0;
    //     // document.body からclick event handler unbind
    //     document.body.removeEventListener( 'click', this.bodyClick );
    //
    //   },
    //   // body click 再セット <- modal close の後
    //   activate: function() {
    //     document.body.addEventListener( 'click', this.bodyClick, false );
    //   },
    //   // -----------------------------
    //   // logout click -> open modal
    //   logoutHandler: function( event:Event ):void {
    //     event.preventDefault();
    //     event.stopPropagation();
    //
    //     this.destroy();
    //     this.status.open( this.callbackOk, this.callbackCancel );
    //
    //   },
    //   // yes ->logout
    //   callbackOk: function() {
    //     User.logout();
    //     Loc.index();
    //   },
    //   // no -> body click を bind する
    //   // 何もないところを click した時のため
    //   callbackCancel: function() {
    //     this.activate();
    //   },
    //   // 他のmodalが開いたので閉じる
    //   otherModalOpen: function() {
    //     if ( this.state.open === 'open' ) {
    //       // open -> close
    //       this.destroy();
    //       this.setState( { open: 'close' } );
    //     }
    //   },
    //   updateUser: function( icon, userName ) {
    //     // console.log( 'user update state ', userName );
    //     // clearTimeout( this.refreshTimer );
    //     // this.setState( { icon: Empty.USER_EMPTY, userName: userName } );
    //     //
    //     // let me = this;
    //     //
    //     // this.refreshTimer = setTimeout(
    //     //   function() {
    //     //     console.log( 'user update state refresh -----', userName );
    //     //     me.setState( { icon: icon, userName: userName } );
    //     //   },
    //     //   50
    //     // );
    //     // console.log( 'icon ', icon );
    //     this.setState( { icon: icon, userName: userName } );
    //   }
    // } );
    //
    // // --------------------------------------------------
    // // when reload
    // if ( this.reloadFlag ) {
    //   this.reloadFlag = false;
    //   clearTimeout( this._timer );
    //   this._timer = setTimeout( this._boundReload, 1000 );
    // }
    // // --------------------------------------------------
    // // user root
    // if ( this.component === null ) {
    //   this.component = ReactDOM.render(
    //     <SettingDom icon={dae.profilePicture} userName={dae.userName} />,
    //     this.element
    //   );
    // } else {
    //   this.component.updateUser( dae.profilePicture, dae.userName );
    // }

    // --------------------------------------------------
    this.executeSafely(View.BEFORE_RENDER, response);
    // --------------------------------------------------
    // when reload
    if ( this.reloadFlag ) {
      this.reloadFlag = false;
      clearTimeout( this._timer );
      this._timer = setTimeout( this._boundReload, 1000 );
    }
    // component
    ReactDOM.render(
      <ComponentHeaderMemberSetting
        icon={response.profilePicture}
        userName={response.userName}
        safely={this.boundSafely}
        did={this.boundMount}
      />,
      this.element,
    );
  }
  /**
   * componentDidMount で SettingsStatus event を監視する
   */
  didMount() {
    // let settingStatus = this._settingStatus;
    //
    // if ( settingStatus === null ) {
    //   settingStatus = SettingsStatus.factory();
    //   this._settingStatus = settingStatus;
    //   settingStatus.on( SettingsStatus.ACCOUNT_COMPLETE, this._boundComplete );
    // }
    const settingStatus = this.settingStatus;
    settingStatus.off(SettingsStatus.ACCOUNT_COMPLETE, this._boundComplete);
    settingStatus.on(SettingsStatus.ACCOUNT_COMPLETE, this._boundComplete);
  }

  /**
   * 画像生成がサーバーで遅延するので 1sec 後にリロードする
   */
  reload() {
    clearTimeout(this._timer);
    this.start();
  }
  /**
   * 設定変更で読み込み直す
   */
  onComplete() {
    // 再読み込み
    // console.log( 'SettingsStatus.ACCOUNT_COMPLETE reload' );
    clearTimeout(this._timer);
    this.reloadFlag = true;
    this.start();
  }
}
