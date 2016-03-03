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
import {NoticeAction} from '../../app/const/NoticeAction';
import {Url} from '../../app/const/Url';

import {NotificationsDae} from '../../dae/user/NotificationsDae';

import {Safety} from '../../data/Safety';
import {Result} from '../../data/Result';

// model
import {Model} from '../../model/Model';
import {ModelNoticeCount} from '../../model/notice/ModelNoticeCount';

import {NoticeCountDae} from '../../dae/notice/NoticeCountDae';
import {NoticeStatus} from '../../event/NoticeStatus';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// Sagen
let Gasane = self.Gasane;

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

    // React instance, NoticeDom
    this._menu = null;
    // NoticeStatus instance
    this._status = null;
    // event handler
    this._boundNotice = this.onNoticeUpdate.bind( this );
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
    let NoticeMessageDom = React.createClass( {
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

        return (

          <p className="info-content">
            {`${user.userName}さんがあなたの「${article.title}」へのコメントに`}<strong>{message}</strong>しました。
          </p>

        );
      }
    } );

    // --------------------------------------------------
    // notice one block
    let NoticeItemDom = React.createClass( {
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
        // let index = this.state.index;

        let icon = notice.user.profilePicture;
        if ( !icon ) {
          icon = Empty.USER_EMPTY;
        } else if ( !Safety.isImg( icon ) ) {
          // 画像ファイル名に拡張子がないのがあったので
          // 拡張子チェックを追加
          icon = Empty.USER_EMPTY;
        }

        let loggedIn = icon === Empty.USER_EMPTY ? '' : 'user-logged-in';

        switch ( notice.action ) {
          case 'comment':
          case 'reply':
            return (
              <li className={'info-item info-item-' + notice.id}>
                <a href={notice.article.reply.url} className={'info-link info-link-' + notice.id} onClick={this.readedClick}>
                  <figure className={'info-user-thumb ' + loggedIn}>
                    <img src={icon} alt=""/>
                  </figure>
                  <NoticeMessageDom notice={notice} />
                  <p className="info-date">{notice.displayDate}</p>
                </a>
              </li>
            );

          case 'bad':
          case 'good':
            return (
              <li className={'info-item info-item-' + notice.id}>
                <a href={notice.article.comments.url} className={'info-link info-link-' + notice.id} onClick={this.readedClick}>
                  <figure className={'info-user-thumb ' + loggedIn}>
                    <img src={icon} alt=""/>
                  </figure>
                  <NoticeMessageDom notice={notice} />
                  <p className="info-date">{notice.displayDate}</p>
                </a>
              </li>
            );

          case 'notice':
            return (
              <a href={notice.url} className="info-link">
                <div className="activity-content">
                  {notice.body}
                </div>
                <p className="act-date">{notice.displayDate}</p>
              </a>
            );

          default:
            console.warn(`illegal action.${notice.action}`);
            return null;

        }


      },
      readedClick: function( event ) {
        event.preventDefault();
      }
    } );

    /*
    // --------------------------------------------------
    // read all On / Off
    let ReadAllDom = React.createClass( {
      propTypes: {
        length: React.PropTypes.number.isRequired,
        callback: React.PropTypes.func
      },
      getDefaultProps: function() {
        return {
          callback: function() {}
        };
      },
      getInitialState: function() {
        return {
          length: this.props.length,
          loading: ''
        };
      },
      render: function() {
        if ( this.state.length > 0 ) {
          return (
            <div className={'info-btn-readAll loading-root ' + this.state.loading}>
              <a href="#" onClick={this.readClick}>すべて既読にする</a>
              <div className="loading-spinner"></div>
            </div>
          );
        } else {
          return <div className="info-btn-readAll">&nbsp;</div>;
        }
      },
      readClick: function( event ) {
        event.preventDefault();
        this.setState( { loading: 'loading' } );
        this.props.callback();
        // ToDo: ajax request
      },
      done: function() {
        this.setState( { loading: '' } );
      },
      fail: function() {
        this.setState( { loading: '' } );
      }
    } );
    */

    // --------------------------------------------------
    // user notice dropMenu
    let NoticeMenuDom = React.createClass( {
      propTypes: {
        notifications: React.PropTypes.array.isRequired
      },
      getInitialState: function() {
        return {
          notifications: this.props.notifications
        };
      },
      render: function() {

        let notifications = this.props.notifications;

        return (
          <nav className="notice-menu">
            <div className="dropMenu">
              <div className="info">
                <h2 className="info-heading">お知らせ</h2>
                {/*
                // 機能 既読にする を drop
                <ReadAllDom
                  length={notifications.length}
                  callback={this.allRead}
                />
                 */}
                <div className="info-btn-readAll">&nbsp;</div>
                <ul className="info-list">
                  {
                    notifications.map( function( notice, i ) {

                      return (
                        <NoticeItemDom
                          key={'notice-' + notice.id}
                          notice={notice}
                          index={i}
                        />
                      );

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
    // total 件数

    // お知らせ件数を表示
    // 定期的に更新, 1000ms
    // 件数が変更されたら NoticeStatus.UPDATE_COUNT event fire
    let NoticeTotalDom = React.createClass( {
      propTypes: {
        total: React.PropTypes.number.isRequired
      },
      getInitialState: function() {
        this.polling = null;
        this.callback = null;
        this.model = null;
        this.status = null;

        return {
          total: this.props.total
        };
      },
      render: function() {
        let total = this.state.total;
        if ( total === 0 ) {
          return null;
        } else {
          // 件数が1以上の時に描画
          return <span className="notice-num">{total}</span>;
        }
      },
      componentDidMount: function() {
        // after mount, start polling

        // callback
        let callback = this.callback;
        if ( callback === null ) {
          callback = {};
          this.callback = callback;
          callback[ Model.COMPLETE ] = this.done;
          callback[ Model.UNDEFINED_ERROR ] = this.fail;
          callback[ Model.RESPONSE_ERROR ] = this.fail;
        }

        // model
        if ( this.model === null ) {
          this.model = new ModelNoticeCount( callback );
        }

        // status
        if ( this.status === null ) {
          this.status = NoticeStatus.factory();
        }

        // polling
        let polling = this.polling;

        if ( polling === null ) {

          polling = new Gasane.Polling( 1000 );
          this.polling = polling;
          polling.on( Gasane.Polling.PAST, this.update );
          polling.start();

        } else {

          this.restart();

        }

      },
      componentWillUnmount: function() {
        this.dispose();
      },
      dispose: function() {
        // unbind event
        this.polling.off( Gasane.Polling.PAST, this.update );
      },
      restart: function() {
        let polling = this.polling;
        if ( polling !== null ) {
          // 念のため一旦 unbind し bind する
          polling.off( Gasane.Polling.PAST, this.update );
          polling.on( Gasane.Polling.PAST, this.update );

          polling.setPolling( 1000 );
        }
      },
      update: function() {
        this.polling.off( Gasane.Polling.PAST, this.update );
        this.model.start();
      },
      done: function( result:NoticeCountDae ) {
        let count = result.count;
        if ( Number.isInteger( count ) ) {
          if ( this.state.total !== count ) {
            this.updateTotal( count );
          }
        }

        this.restart();
      },
      fail: function() {
        this.restart();
      },
      updateTotal: function( total ) {
        this.setState( { total: total } );
        this.status.update( total );
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
        let notifications = Safety.array( response.notifications );

        return (
          <div className={'notice ' + this.state.open}>
            <a href="#" className="notice-opener" onClick={this.clickHandler}>
              <i className="notice-icon">&nbsp;</i>
              <NoticeTotalDom total={response.total} />
            </a>
            <NoticeMenuDom notifications={notifications} />
          </div>
        );


      },
      componentDidMount: function() {

        // after mount
        _this.executeSafely( View.DID_MOUNT );
        _this.onMount();

      },
      componentWillUnmount: function() {
        this.destroy();
        _this.dispose();
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
        console.log( '-------------------------------- updateResponse ', response );
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
  /**
   * NoticeStatus.UPDATE_COUNT unbind
   */
  dispose():void {
    this.status.off( NoticeStatus.UPDATE_COUNT, this._boundNotice );
  }
  /**
   * main dom が mount されたら呼び出されます
   * componentDidMount callback
   */
  onMount():void {
    let status = NoticeStatus.factory();
    this._status = status;
    status.on( NoticeStatus.UPDATE_COUNT, this._boundNotice );
  }
  /**
   * NoticeStatus.UPDATE_COUNT event handler
   * @param {Object} event NoticeStatus.UPDATE_COUNT event object, event.count が 0 以外の時に reload します
   */
  onNoticeUpdate( event:Object ):void {
    // お知らせ件数が0の時はreloadしない
    if ( event.count !== 0 ) {
      this.reload();
    }
  }
  /**
   * 再読み込み
   */
  reload():void {
    // ajax start
    this._action.reload();
  }

}
