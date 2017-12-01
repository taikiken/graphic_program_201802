/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/02 - 20:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

'use strict';

import View from '../View';
import {User} from '../../app/User';
import {UserStatus} from '../../event/UserStatus';

let _symbol = Symbol();
let _instance = null;

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * <h3>header user 用メニュー</h3>
 * <p>Factory pattern です<br>
 * <code>new ViewHeaderUser()</code> はできません。<br>
 * <code>ViewHeaderUser.factory()</code> してください。<br>
 * </P>
 *
 * @ToDo user profile icon, notifications count 取得
 */
export class ViewHeaderUser extends View {
  /**
   * header user 用メニューを作成します
   *
   * @example
   * var headerUser = ViewHeaderUser.factory();
   * headerUser.element = document.getElementById('user-profile-nav');
   * headerUser.render();
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( target:Symbol, element:Element, option:Object = {} ) {
    if ( _symbol !== target ) {

      throw new Error( `UserStatus is static Class. not use new UserStatus().` );

    }

    if ( _instance === null ) {
      super( element, option );
      _instance = this;
    }
    return _instance;
  }
  /**
   * ユーザーメニューを作成します<br>
   * Userのstatusでメニューをだし分けします
   */
  render():void {

    if ( !this._element ) {
      throw new Error( 'ViewHeaderUser: set root element first' );
    }

    if ( User.sign ) {

      // ログイン済み
      this.renderLogin();

    } else {

      // 非ログイン
      this.renderLogout();

    }

  }
  /**
   * ログインユーザー用メニューを作成します
   */
  renderLogin():void {

    let element = this.element;

    // --------------------------------------------------
    // user notice
    let UserNotice = React.createClass( {
      propTypes: {
        list: React.PropTypes.array.isRequired
      },
      getInitialState: function() {
        return {
          clicked: false,
          open: 'close',
          bodyTimer: 0
        };
      },
      render: function() {

      },
      componentDidMount: function() {

      },
      componentWillUnmount: function() {

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
    // user setting
    let SettingDom = React.createClass( {
      getInitialState: function() {
        return {
          clicked: false,
          open: 'close',
          bodyTimer: 0
        };
      },
      render: function() {
        // ToDo: avatar image, get from JSON
        return (
          <div className={'preference ' + this.state.open}>
            <a className="preference-opener" href="#" onClick={this.clickHandler}>
              {
                /*
                * ToDo: avatar image 取得方法確認
                * */
              }
              <span className="user-avatar"><img src="/assets/images/dummy/avatar-40x40.jpg" alt="" /></span>
            </a>

            <nav className="user-menu">
              <ul className="dropMenu">
                <li className="dropMenu-item"><a className="dropMenu-link" href="/mypage/">ブックマーク<br />アクティビティ</a></li>
                <li className="dropMenu-item"><a className="dropMenu-link" href="/settings/">設定</a></li>
                <li className="dropMenu-item"><a className="dropMenu-link" href="/logout/">ログアウト</a></li>
              </ul>
            </nav>
          </div>
        );
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
    let UserDom = React.createClass( {

      render: function() {
        return (
          <div className="user">
            <SettingDom />
          </div>
        );
      }

    } );


    ReactDOM.render(
      <UserDom />,
      element
    );

  }
  /**
   * 非ログインユーザー用メニューを作成します
   */
  renderLogout():void {

    let element = this.element;

    let UserDom = React.createClass( {
      render: function() {

        return (
          <div className="user">
            <a className="user-signup" href="/signup/">無料登録 / ログイン</a>
          </div>
        );
      }
    } );

    ReactDOM.render(
      <UserDom />,
      element
    );

  }

  /**
   * UserStatus.LOGE_IN event handler
   */
  didLogin():void {
    this.renderLogin();
  }
  /**
   * UserStatus.LOGE_OUT event handler
   */
  didLogout():void {
    this.renderLogout();
  }

  /**
   * instance を生成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   * @return {UserStatus} UserStatus instance を返します
   */
  static factory( element:Element, option:Object = {} ):UserStatus {

    if ( _instance === null ) {

      _instance = new ViewHeaderUser( _symbol, element, option );
      let status = UserStatus.factory();
      status.on( UserStatus.LOGE_IN, _instance.didLogin.bind( _instance ) );
      status.on( UserStatus.LOGE_OUT, _instance.didLogout.bind( _instance ) );

    }

    return _instance;
  }
}
