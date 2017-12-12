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

// view
import View from '../View';

// view/header
import ViewHeaderMember from './ViewHeaderMember';

// app
import {Url} from '../../app/const/Url';
import {User} from '../../app/User';

// event
import {UserStatus} from '../../event/UserStatus';
import { Env } from '../../app/Env';

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
 * {@link ViewHeaderUser} - header user 関連メニュー - ログイン / 非ログイン でメニューを変更
 * @param {string} signup signup url
 * @param {string} login login url
 * @returns {?XML} `div.user`
 * @constructor
 * @since 2017-12-08
 */
const HeaderUserComponent = ({ signup, login }) => (
  <div className="user">
    <div className="btn-signup">
      <a href={signup}>無料登録</a>&nbsp;/&nbsp;<a href={login}>ログイン</a>
    </div>
  </div>
);

/**
 * React.propTypes
 * @type {{signup: string, login: string}}
 */
HeaderUserComponent.propTypes = {
  signup: React.PropTypes.string.isRequired,
  login: React.PropTypes.string.isRequired,
};

/**
 * header user 関連メニュー
 */
export default class ViewHeaderUser extends View {
  /**
   * header user 関連メニュー,
   * ログイン / 非ログイン でメニューを変更
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, option = {}) {
    super(element, option);
    /**
     * bind 済み this.memberCallback
     * @type {Function}
     * @private
     */
    this._boundCallback = this.memberCallback.bind(this);
    /**
     * login user view instance
     * @type {?ViewHeaderMember}
     * @private
     */
    this._member = null;
    // User.sign boolean
    /**
     * User.sign boolean, ログイン済みかの真偽値
     * @type {boolean}
     * @private
     */
    this._sign = User.sign;
    const userStatus = UserStatus.factory();
    const boundSign = this.onSign.bind(this);
    userStatus.on(UserStatus.LOG_IN, boundSign);
    userStatus.on(UserStatus.LOG_OUT, boundSign);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * ViewHeaderMember instance
   * @return {?ViewHeaderMember} ViewHeaderMember instance を返します
   */
  get member() {
    return this._member;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewHeaderUser].start', path);
    }
    if (User.sign) {
      // login member
      let member = this._member;
      if (member !== null) {
        this.dispose();
      }
      const boundCallback = this._boundCallback;
      member = new ViewHeaderMember(this.element);
      this._member = member;
      member.on(View.BEFORE_RENDER, boundCallback);
      member.on(View.WILL_MOUNT, boundCallback);
      member.on(View.DID_MOUNT, boundCallback);
      member.on(View.ERROR_MOUNT, boundCallback);
      member.on(View.UNDEFINED_ERROR, boundCallback);
      member.on(View.EMPTY_ERROR, boundCallback);
      member.on(View.RESPONSE_ERROR, boundCallback);
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
  render() {
    //
    // let _this = this;
    //
    // let UserDom = React.createClass( {
    //   render: function() {
    //
    //     return (
    //       <div className="user">
    //         <div className="btn-signup">
    //           <a href={Url.signup()}>無料登録</a>&nbsp;/&nbsp;<a href={Url.login()}>ログイン</a>
    //         </div>
    //       </div>
    //     );
    //   },
    //   componentDidMount: function() {
    //
    //     _this.executeSafely( View.DID_MOUNT );
    //
    //   }
    // } );
    //
    // ReactDOM.render(
    //   <UserDom />,
    //   this.element
    // );
    // console.log('ViewHeaderUser.render -------------------');
    ReactDOM.render(
      <HeaderUserComponent
        signup={Url.signup()}
        login={Url.login()}
      />,
      this.element,
    );
    // execute
    this.executeSafely(View.DID_MOUNT);
  }
  /**
   * ViewHeaderMember callback 中継
   * @param {Object} event event object
   */
  memberCallback(event) {
    const member = this._member;
    const callback = this._boundCallback;
    if (member !== null) {
      member.off(event.type, callback);
    }
    // console.log('ViewHeaderUser.memberCallback', event);
    this.dispatch(event);

    if (event.type === View.RESPONSE_ERROR || event.type === View.UNDEFINED_ERROR || event.type === View.EMPTY_ERROR) {
      // token はあるけどユーザー情報が取得できなかった
      // 処理を止めて一般ユーザー扱いにする
      // console.log('ViewHeaderUser.memberCallback', event);
      this.dispose();
      this.render();
    }
  }
  /**
   * member event handler dispose
   */
  dispose() {
    const member = this._member;
    if (member !== null) {
      const boundCallback = this._boundCallback;
      member.off(View.BEFORE_RENDER, boundCallback);
      member.off(View.WILL_MOUNT, boundCallback);
      member.off(View.DID_MOUNT, boundCallback);
      member.off(View.ERROR_MOUNT, boundCallback);
      member.off(View.UNDEFINED_ERROR, boundCallback);
      member.off(View.EMPTY_ERROR, boundCallback);
      member.off(View.RESPONSE_ERROR, boundCallback);
      this._member = null;
    }
  }
  /**
   * UserStatus event handler, LOG_IN / LOG_OUT
   * @param {Object} event UserStatus event object
   */
  onSign(event) {
    const sign = event.sign;
    if (sign !== this._sign) {
      this._sign = sign;
      this.start();
    }
  }
}
