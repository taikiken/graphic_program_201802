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
    console.log( '*** notificationsDae ***', notificationsDae );
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
            {`${user.userName}さんがあなたの「${article.title}」へのコメントに`}
            <strong>{message}</strong>しました。
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

        return (
          <li className={'info-item info-item-' + notice.id}>
            <a href='#' className={'info-link info-link-' + notice.id} onClick={this.readedClick}>
              <figure className={'info-user-thumb ' + loggedIn}>
                <img src={icon} alt=""/>
              </figure>
              <NoticeMessageDom notice={notice} />
              <p className="info-date">{notice.displayDate}</p>
            </a>
          </li>
        );

      },
      readedClick: function( event ) {
        event.preventDefault();
      }
    } );

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
      done: function( result ) {
        this.setState( { loading: '' } );
      },
      fail: function( error ) {
        this.setState( { loading: '' } );
      }
    } );
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

        return (
          <nav className="notice-menu">
            <div className="dropMenu">
              <div className="info">
                <h2 className="info-heading">お知らせ</h2>
                <ReadAllDom
                  length={notifications.length}
                  callback={this.allRead}
                />
                <ul className="info-list">
                  {
                    notifications.map( function( notice, i ) {

                      return <NoticeItemDom key={'notice-' + notice.id} notice={notice} index={i}/>;

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

    let NoticeTotal = React.createClass( {
      propTypes: {
        total: React.PropTypes.number.isRequired
      },
      getInitialState: function() {
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
      updateTotal: function( total ) {
        this.setState( { total: total } );
      }
    } );

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
              <NoticeTotal total={response.total} />
            </a>
            <NoticeMenu notifications={notifications} />
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
