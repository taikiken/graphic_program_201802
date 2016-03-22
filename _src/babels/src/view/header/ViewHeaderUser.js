/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 17:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {View} from '../View';
import {ViewHeaderMember} from './ViewHeaderMember';
import {Url} from '../../app/const/Url';
import {User} from '../../app/User';
import {UserStatus} from '../../event/UserStatus';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * header user 関連メニュー
 */
export class ViewHeaderUser extends View {
  /**
   * <p>header user 関連メニュー<br>
   * ログイン / 非ログイン でメニューを変更</p>
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._boundCallback = this.memberCallback.bind( this );

    // login user view instance
    this._member = null;

    // User.sign boolean
    this._sign = User.sign;

    let userStatus = UserStatus.factory();
    let boundSign = this.onSign.bind( this );
    userStatus.on( UserStatus.LOG_IN, boundSign );
    userStatus.on( UserStatus.LOG_OUT, boundSign );
  }
  /**
   * ViewHeaderMember instance
   * @return {null|*} ViewHeaderMember instance を返します
   */
  get member():ViewHeaderMember {
    return this._member;
  }
  /**
   * Ajax request を開始します
   */
  start():void {
    if ( User.sign ) {
      // login member
      let member = this._member;

      if ( member !== null ) {
        this.dispose();
      }

      let boundCallback = this._boundCallback;
      member = new ViewHeaderMember( this.element );
      this._member = member;
      member.on( View.BEFORE_RENDER, boundCallback );
      member.on( View.WILL_MOUNT, boundCallback );
      member.on( View.DID_MOUNT, boundCallback );
      member.on( View.ERROR_MOUNT, boundCallback );
      member.on( View.UNDEFINED_ERROR, boundCallback );
      member.on( View.EMPTY_ERROR, boundCallback );
      member.on( View.RESPONSE_ERROR, boundCallback );
      member.start();

    } else {
      // user menu
      this.render();
      this.dispose();
    }
  }
  /**
   * 非メンバー Dom を生成します
   */
  render():void {

    let _this = this;

    let UserDom = React.createClass( {
      render: function() {

        return (
          <div className="user">
            <a className="btn-signup" href={Url.signup()}>無料登録 / ログイン</a>
          </div>
        );
      },
      componentDidMount: function() {

        _this.executeSafely( View.DID_MOUNT );

      }
    } );

    ReactDOM.render(
      <UserDom />,
      this.element
    );

  }
  /**
   * ViewHeaderMember callback 中継
   * @param {Object} event event object
   */
  memberCallback( event:Object ):void {

    let member = this._member;
    let callback = this._boundCallback;
    if ( member !== null ) {
      member.off( event.type, callback );
    }
    this.dispatch( event );

    if ( event.type === View.RESPONSE_ERROR || event.type === View.UNDEFINED_ERROR || event.type === View.EMPTY_ERROR ) {
      // token はあるけどユーザー情報が取得できなかった
      // 処理を止めて一般ユーザー扱いにする
      this.dispose();
      this.render();
    }
  }
  /**
   * member event handler dispose
   */
  dispose():void {
    let member = this._member;

    if ( member !== null ) {

      let boundCallback = this._boundCallback;
      member.off( View.BEFORE_RENDER, boundCallback );
      member.off( View.WILL_MOUNT, boundCallback );
      member.off( View.DID_MOUNT, boundCallback );
      member.off( View.ERROR_MOUNT, boundCallback );
      member.off( View.UNDEFINED_ERROR, boundCallback );
      member.off( View.EMPTY_ERROR, boundCallback );
      member.off( View.RESPONSE_ERROR, boundCallback );
      this._member = null;

    }
  }
  /**
   * UserStatus event handler, LOG_IN / LOG_OUT
   * @param {Object} event UserStatus event object
   */
  onSign( event:Object ):void {
    let sign = event.sign;

    if ( sign !== this._sign ) {
      this._sign = sign;
      this.start();
    }
  }
}
