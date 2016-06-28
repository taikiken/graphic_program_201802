/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 19:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
import {View} from '../../../view/View';

import {SPViewHeaderMember} from './SPViewHeaderMember';

// app
import {User} from '../../../app/User';
import {Url} from '../../../app/const/Url';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP header user 関連メニュー
 */
export class SPViewHeaderUser extends View {
  /**
   * <p>SP header user 関連メニュー<br>
   * ログイン / 非ログイン でメニューを変更</p>
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    /**
     * bind 済み this.memberCallback
     * @type {Function}
     * @private
     */
    this._boundCallback = this.memberCallback.bind( this );
    /**
     * login user view instance(SPViewHeaderMember)
     * @type {null|Object|SPViewHeaderMember}
     * @private
     */
    this._member = null;
  }
  /**
   * rendering 開始
   */
  start():void {
    this.render();
  }
  /**
   * rendering
   */
  render():void {
    if ( User.sign ) {
      this.member();
    } else {
      this.user();
    }
  }
  /**
   * ログインユーザー
   */
  member():void {

    let headerMember = new SPViewHeaderMember(this.element);
    this._member = headerMember;

    let boundCallback = this._boundCallback;
    headerMember.on( View.BEFORE_RENDER, boundCallback );
    headerMember.on( View.WILL_MOUNT, boundCallback );
    headerMember.on( View.DID_MOUNT, boundCallback );
    headerMember.on( View.ERROR_MOUNT, boundCallback );
    headerMember.on( View.UNDEFINED_ERROR, boundCallback );
    headerMember.on( View.EMPTY_ERROR, boundCallback );
    headerMember.on( View.RESPONSE_ERROR, boundCallback );
    headerMember.start();
  }
  /**
   * 非ログインユーザー
   */
  user():void {
    // 非ログインユーザー
    let UserDom = React.createClass( {
      render: function() {
        return (
          <div className="user">
            <div className="preference">
              <a href={Url.signupLogin()} className="preference-opener"><span className="preference-avatar">&nbsp;</span></a>
            </div>
          </div>
        );
      }
    } );

    ReactDOM.render(
      <UserDom/>,
      this.element
    );
  }
  /**
   * ViewHeaderMember callback 中継
   * @param {Object} event event object
   */
  memberCallback( event ):void {

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
}
