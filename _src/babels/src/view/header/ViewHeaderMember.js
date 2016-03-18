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
'use strict';

import {View} from '../View';
import {ViewHeaderMemberNotice} from './ViewHeaderMemberNotice';

// app
import {Empty} from '../../app/const/Empty';
import {Url} from '../../app/const/Url';
import {User} from '../../app/User';

// action
import {UsersSelf} from '../../action/users/UsersSelf';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {UserDae} from '../../dae/UserDae';

// util
import {Loc} from '../../util/Loc';

// model
import {ViewLogoutModal} from '../modal/ViewLogoutModal';

// event
import {LogoutStatus} from '../../event/LogoutStatus';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * header ログイン・メンバー 関連メニュー
 */
export class ViewHeaderMember extends View {
  /**
   * <p>header ログイン・メンバー 関連メニュー<br>
   * アイコン+drop down menu 表示</p>
   *
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._action = new UsersSelf( this.done.bind( this ), this.fail.bind( this ) );
    this._component = null;
  }
  /**
   * SettingDom instance
   * @return {null|*} SettingDom instance を返します
   */
  get component() {
    return this._component;
  }
  /**
   * ViewLogoutModal インスタンスを設定します
   * @param {ViewLogoutModal} modal ViewLogoutModal instance
   */
  set modal( modal:ViewLogoutModal ):void {
    this._modal = modal;
  }
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.start();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let response = result.response;

    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[MEMBER:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else {

      this.render( new UserDae( response ) );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );

  }
  /**
   * Dom を生成します
   * @param {UserDae} response JSON UserDae instance
   */
  render( response:UserDae ):void {

    let dae = response;
    let _this = this;

    // console.log( '******** ---------- ********** ViewHeaderMember ', dae );
    this.executeSafely( View.BEFORE_RENDER, dae );

    // --------------------------------------------------
    // user setting
    /**
     * user setting
     * @private
     * @type {ReactClass}
     */
    let SettingDom = React.createClass( {
      propTypes: {
        userName: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string.isRequired
      },
      getInitialState: function() {
        /**
         * time out id
         * @private
         * @type {number}
         */
        this.timer = 0;
        /**
         * ViewLogoutModal instance
         * @private
         * @type {null|ViewLogoutModal}
         */
        this.modal = null;
        /**
         * LogoutStatus instance
         * @private
         * @type {LogoutStatus}
         */
        this.status = LogoutStatus.factory();

        return {
          open: 'close'
        };
      },
      render: function() {

        let icon = this.props.icon;
        let userName = this.props.userName;
        if ( !icon ) {
          icon = Empty.USER_EMPTY;
        } else if ( !Safety.isImg( icon ) ) {
          // 画像ファイル名に拡張子がないのがあったので
          // 拡張子チェックを追加
          icon = Empty.USER_EMPTY;
        }

        let loggedIn = icon === Empty.USER_EMPTY ? '' : 'user-logged-in';

        return (
          <div className="user">
            <div className="notice-container" ref="notice"></div>

            <div className={'preference ' + this.state.open}>
              <a className="preference-opener" href="#" onClick={this.clickHandler}>
                <span className={'preference-avatar ' + loggedIn}><img src={icon} alt={userName} /></span>
              </a>

              <nav className="preference-menu">
                <ul className="dropMenu">
                  <li className="dropMenu-item"><a className="dropMenu-link" href={Url.mypage()}>ブックマーク<br />アクティビティ</a></li>
                  <li className="dropMenu-item"><a className="dropMenu-link" href={Url.settings()}>設定</a></li>
                  <li className="dropMenu-item"><a className="dropMenu-link" href="#" onClick={this.logoutHandler}>ログアウト</a></li>
                </ul>
              </nav>
            </div>
          </div>
        );
      },
      componentDidMount: function() {

        // callback
        _this.executeSafely( View.DID_MOUNT );

        // notice make
        let noticeNode = ReactDOM.findDOMNode(this.refs.notice);
        let notice = new ViewHeaderMemberNotice( noticeNode );
        notice.start();

        // console.log( '*** header member componentDidMount ', this.modal );

        if ( this.modal === null && _this._modal !== null ) {
          let modal = _this._modal;
          this.modal = modal;
          modal.yes = this.callbackOk;
          modal.no = this.callbackCancel;
          modal.start();
        }

      },
      componentWillUnmount: function() {
        this.destroy();
      },
      // -------------------------------------------------------
      // 以降 custom method

      // icon click で drop menu open / close
      clickHandler: function( event ) {

        event.preventDefault();
        this.toggleState();

      },
      // document.body.onClick event handler
      // drop menu open 後に 領域外 click で閉じるため
      bodyClick: function() {

        if ( this.state.open === 'open' ) {

          // document.body が a より先に反応する
          // native event bind と React 経由の違いかも
          // body click 後の処理を遅延させる, 多分気づかない程度
          this.timer = setTimeout( this.toggleState, 100 );

        }

      },
      // open / close toggle
      toggleState: function() {

        this.destroy();

        if ( this.state.open === 'close' ) {
          // close -> open
          // document.body へ click event handler bind
          this.setState( { open: 'open' } );
          document.body.addEventListener( 'click', this.bodyClick, false );
        } else {
          // open -> close
          this.setState( { open: 'close' } );
        }

      },
      // timer cancel
      // body.click unbind
      // 後処理
      destroy: function() {

        // body click からの遅延処理を clear する
        // timer を 0 にし error にならないようにする
        clearTimeout( this.timer );
        this.timer = 0;
        // document.body からclick event handler unbind
        document.body.removeEventListener( 'click', this.bodyClick );

      },
      // body click 再セット <- modal close の後
      activate: function() {
        document.body.addEventListener( 'click', this.bodyClick, false );
      },
      // -----------------------------
      // logout click -> open modal
      logoutHandler: function( event:Event ):void {
        event.preventDefault();
        event.stopPropagation();

        this.destroy();
        this.status.open( this.callbackOk, this.callbackCancel );

      },
      // yes ->logout
      callbackOk: function() {
        User.logout();
        Loc.index();
      },
      // no -> body click を bind する
      // 何もないところを click した時のため
      callbackCancel: function() {
        this.activate();
      }
    } );

    // --------------------------------------------------
    // user root
    this._component = ReactDOM.render(
      <SettingDom icon={dae.profilePicture} userName={dae.userName} />,
      this.element
    );

  }

}
