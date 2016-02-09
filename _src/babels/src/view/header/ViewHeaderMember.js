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

import {Empty} from '../../app/const/Empty';
import {UserDae} from '../../dae/UserDae';
import {UsersSelf} from '../../action/users/UsersSelf';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 *
 */
export class ViewHeaderMember extends View {
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._action = new UsersSelf( this.done.bind( this ), this.fail.bind( this ) );
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

  render( response ) {

    let dae = new UserDae( response );
    let _this = this;

    // --------------------------------------------------
    // user setting
    let SettingDom = React.createClass( {
      propTypes: {
        userName: React.PropTypes.string.isRequired,
        icon: React.PropTypes.string.isRequired
      },
      getInitialState: function() {
        return {
          clicked: false,
          open: 'close',
          bodyTimer: 0
        };
      },
      render: function() {

        let icon = this.props.icon;
        let userName = this.props.userName;

        if ( !icon ) {
          icon = Empty.USER_PICTURE;
        }

        return (
          <div className="user">
            <div className="notice-container" ref="notice"></div>

            <div className={'preference ' + this.state.open}>
              <a className="preference-opener" href="#" onClick={this.clickHandler}>
                <span className="user-avatar"><img src={icon} alt={userName} /></span>
              </a>

              <nav className="preference-menu">
                <ul className="dropMenu">
                  <li className="dropMenu-item"><a className="dropMenu-link" href="/mypage/">ブックマーク<br />アクティビティ</a></li>
                  <li className="dropMenu-item"><a className="dropMenu-link" href="/settings/">設定</a></li>
                  <li className="dropMenu-item"><a className="dropMenu-link" href="/logout/">ログアウト</a></li>
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
        let notice = new ViewHeaderMemberNotice( this.refs.notice );
        notice.start();

      },
      componentWillUnmount: function() {
        this.destroy();
      },
      clickHandler: function( event ) {

        event.preventDefault();
        this.toggleState();

      },
      bodyClick: function() {

        if ( this.state.open === 'open' ) {

          // document.body が a より先に反応する
          // native event bind と React 経由の違いかも
          // body click 後の処理を遅延させる, 多分気づかない程度
          let timer = setTimeout( this.toggleState, 100 );
          this.setState( {bodyTimer: timer} );

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
      // timer cancel
      // body.click unbind
      // 後処理
      destroy: function() {

        // body click からの遅延処理を clear する
        // timer を 0 にし error にならないようにする
        clearTimeout( this.state.bodyTimer );
        this.setState( {bodyTimer: 0} );
        // document.body からclick event handler unbind
        document.body.removeEventListener( 'click', this.bodyClick );

      }
    } );


    // --------------------------------------------------
    // user root
    ReactDOM.render(
      <SettingDom icon={dae.profilePicture} userName={dae.userName} />,
      this.element
    );

  }

}
