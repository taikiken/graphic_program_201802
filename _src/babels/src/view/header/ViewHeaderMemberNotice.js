/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08 - 19:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';
import {Notice} from '../../action/users/Notice';

import {Empty} from '../../app/const/Empty';
import {NotificationsDae} from '../../dae/user/NotificationsDae';
import {NoticeAction} from '../../app/const/NoticeAction';

import {Url} from '../../app/const/Url';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * お知らせ(header)
 */
export class ViewHeaderMemberNotice extends View {
  /**
   * お知らせ(header) for login member
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._action = new Notice( this.done.bind( this ), this.fail.bind( this ), 0, 5 );

    this._menu = null;
  }
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.next();

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

      this.render( response );

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
   * お知らせ  ログインメンバー Dom を生成します
   * @param {Object} responseObj JSON response
   */
  render( responseObj:Object ):void {

    let notificationsDae = new NotificationsDae( responseObj );
    let _this = this;

    // --------------------------------------------------
    // user notice dropMenu action message
    let NoticeMessage = React.createClass( {
      propTypes: {
        notice: React.PropTypes.object.isRequired
      },
      render: function() {

        let notice = this.props.notice;
        let action = notice.action;
        let message = NoticeAction.message( action );

        if ( !action ) {
          return null;
        }

        let user = notice.user;
        let article = notice.article;

        let txt = `${user.userName}さんがあなたの「${article.title}」へのコメントに`;

        return (

          <p className="info-content">
            {txt}
            <strong>{message}</strong>しました。
          </p>

        );
      }
    } );

    // --------------------------------------------------
    // notice one block
    let OneDom = React.createClass( {
      propTypes: {
        notice: React.PropTypes.object.isRequired,
        index: React.PropTypes.number.isRequired
      },
      getInitialState: function() {
        return {
          notice: this.props.notice,
          index: this.props.index
        };
      },
      render: function() {

        let notice = this.state.notice;
        let i = this.state.i;

        let icon = notice.user.profilePicture;
        if ( !icon ) {
          icon = Empty.USER_EMPTY;
        }

        return (
          <li key={'info-item-' + i} className={'info-item info-item-' + i}>
            <a href='#' className={'info-link'} onClick={this.oneClick}>
              <figure className="info-user-thumb">
                <img src={icon} alt=""/>
              </figure>
              <NoticeMessage notice={notice} />
              <p className="info-date">{notice.displayDate}</p>
            </a>
          </li>
        );

      },
      oneClick: function( event ) {
        event.preventDefault();
      }
    } );

    // --------------------------------------------------
    // user notice dropMenu
    let NoticeMenu = React.createClass( {
      propTypes: {
        notifications: React.PropTypes.array.isRequired
      },
      getInitialState: function() {
        return {
          notifications: this.props.notifications
        };
      },
      render: function() {

        let notifications = this.state.notifications;
        let readAll;

        if ( notifications.length > 0 ) {

          readAll = <div className="info-btn-readAll"><a href="#" onClick={this.allRead}>すべて既読にする</a></div>;

        } else {

          readAll = <div className="info-btn-readAll">&nbsp;</div>;

        }

        return (
          <nav className="notice-menu">
            <div className="dropMenu">
              <div className="info">
                <h2 className="info-heading">お知らせ</h2>
                {readAll}
                <ul className="info-list">
                  {
                    notifications.map( function( notice, i ) {

                      return <OneDom notice={notice} index={i}/>;

                    } )
                  }
                  {/* default link menu */}
                  <li className="btn-viewmore"><a className="btn-viewmore-link" href={Url.notifications()}><span>すべて見る</span></a></li>
                </ul>
              </div>
            </div>
          </nav>
        );

      },
      allRead: function( event ) {
        event.preventDefault();
      }
    } );

    // --------------------------------------------------
    // user notice
    let NoticeDom = React.createClass( {
      propTypes: {
        response: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        this.timer = 0;

        return {
          response: this.props.response,
          open: 'close'
        };
      },
      render: function() {

        let response = this.state.response;
        let notifications = response.notifications;
        let noticeTotal = '';
        let noticeMenu;

        if ( Array.isArray( notifications ) ) {

          // 配列（正常）な時はそのデータを使用しメニューを作成する
          noticeMenu = <NoticeMenu notifications={notifications} />;

          if ( notifications.length > 0 ) {
            // total が 1 以上
            noticeTotal = <span className="notice-num">{response.total}</span>;
          }

        } else {

          // 異常な時は
          // 空メニューを作成する、引数に 空配列 を送る
          noticeMenu = <NoticeDom notifications={[]} />;

        }

        return (
          <div className={'notice ' + this.state.open}>
            <a href="#" className="notice-opener" onClick={this.clickHandler}>
              <i className="notice-icon">&nbsp;</i>
              {noticeTotal}
            </a>

            {noticeMenu}
          </div>
        );


      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );

      },
      componentWillUnmount: function() {
        this.destroy();
      },
      // -------------------------------------------------------
      // 以降 custom method
      clickHandler: function( event ) {
        event.preventDefault();
        this.toggleState();
      },
      bodyClick: function() {
        if ( this.state.open === 'open' ) {

          // document.body が a より先に反応する
          // native event bind と React 経由の違いかも
          // body click 後の処理を遅延させる, 多分気づかない程度
          this.timer = setTimeout( this.toggleState, 100 );

        }
      },
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
      destroy: function() {

        // body click からの遅延処理を clear する
        // timer を 0 にし error にならないようにする
        clearTimeout( this.timer );
        this.timer = 0;
        // document.body からclick event handler unbind
        document.body.removeEventListener( 'click', this.bodyClick );

      },
      updateResponse: function( response ) {
        this.setState( { response: response } );
      }
    } );

    // --------------------------------------------------
    // user root
    if ( this._menu === null ) {

      this._menu = ReactDOM.render(
        <NoticeDom response={notificationsDae} />,
        this.element
      );

    } else {

      this._menu.updateResponse( notificationsDae );

    }


  }
}
