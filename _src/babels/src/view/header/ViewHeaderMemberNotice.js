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

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * お知らせ(header)
 */
export class ViewHeaderMemberNotice extends View {
  /**
   * お知らせ(header)
   * @param element
   * @param option
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._action = new Notice( this.done.bind( this ), this.fail.bind( this ), 0, 5 );
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

  render( responseObj ) {

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
    // user notice dropMenu
    let NoticeMenu = React.createClass( {
      propTypes: {
        notifications: React.PropTypes.object.isRequired
      },
      render: function() {

        let notifications = this.props.notifications;
        let readAll = '';

        if ( notifications.length > 0 ) {

          readAll = <div className="info-btn-readAll"><a href="#" onClick={this.allRead}>すべて既読にする</a></div>;

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

                      let icon = notice.user.profilePicture;
                      if ( !icon ) {
                        icon = Empty.USER_PICTURE;
                      }

                      return (
                        <li key={'info-item-' + i} className={'info-item info-item-' + i}>
                          <a href={'info-link'}>
                            <figure className="info-user-thumb">
                              <img src={icon} alt=""/>
                            </figure>
                            <NoticeMessage notice={notice} />
                            <p className="info-date">{notice.displayDate}</p>
                          </a>
                        </li>
                      );
                    } )
                  }
                  <li class="btn-viewmore"><a class="btn-viewmore-link" href="/notifications/"><span>すべて見る</span></a></li>
                </ul>
              </div>
            </div>
          </nav>
        );

      },
      allRead: function( event ) {

      }
    } );

    // --------------------------------------------------
    // user notice
    let NoticeDom = React.createClass( {
      propTypes: {
        response: React.PropTypes.object.isRequired
      },
      render: function() {

        let response = this.props.response;
        let notifications = response.notifications;
        let noticeTotal = '';
        let noticeMenu;

        if ( typeof notifications !== 'undefined' && notifications !== null ) {
          if ( Array.isArray( notifications ) && notifications.length > 0 ) {
            noticeMenu = <NoticeDom notifications={notifications} />;
            noticeTotal = <span className="notice-num">{noticeTotal}</span>;
          }
        } else {
          // 空メニュー
          noticeMenu = <NoticeDom notifications={[]} />;
        }

        return (
          <div className="notice">
            <a href="#" className="notice-opener" onClick={this.clickHandler}>
              <i className="notice-icon">&nbsp;</i>
              {noticeTotal}
            </a>

            {noticeMenu}
          </div>
        );


      },
      componentDidMount: function() {

      },
      componentWillUnmount: function() {

      },
      clickHandler: function( event ) {

      },
      bodyClick: function() {

      },
      toggleState: function() {

      },
      destroy: function() {

      }
    } );

    console.log( '______________ notificationsDae', notificationsDae);
    // --------------------------------------------------
    // user root
    ReactDOM.render(
      <NoticeDom response={notificationsDae} />,
      this.element
    );

  }
}
