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
import View from '../../../view/View';

import SPViewHeaderMember from './SPViewHeaderMember';

// app
import { User } from '../../../app/User';
import { Url } from '../../../app/const/Url';
import VK from '../../../vk/VK';

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
 * SP - 非ログインユーザー header area Element
 * - login / ユーザー登録リンクを出力します
 * @param {string} prefix - selector prefix - vk 必要
 * @param {boolean} vk vk flag
 * @returns {XML} `div.user`
 * @constructor
 */
export const SPHeaderNormalUserComponent = ({ prefix, vk }) => (
  <div className={`${prefix}user`}>
    <div className={`${prefix}preference`}>
      <a
        href={Url.signupLogin(vk)}
        className={`${prefix}preference-opener`}
      >
        <span className={`${prefix}preference-avatar`}>&nbsp;</span>
      </a>
    </div>
  </div>
);

/**
 * React.propTypes
 * @type {{prefix: string, vk: boolean}}
 */
SPHeaderNormalUserComponent.propTypes = {
  prefix: React.PropTypes.string.isRequired,
  vk: React.PropTypes.bool.isRequired,
};

/**
 * SP header user 関連メニュー
 */
export default class SPViewHeaderUser extends View {
  /**
   * SP header user 関連メニュー
   * - ログイン / 非ログイン でメニューを変更
   * @param {Element} element insert root element
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2-18-04-19 vk header - flag 追加
   */
  constructor(element, option = {}, vk = false) {
    super(element, option, vk);
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
  start() {
    this.render();
  }
  /**
   * rendering
   */
  render() {
    if ( User.sign ) {
      this.member();
    } else {
      this.user();
    }
  }
  /**
   * ログインユーザー
   */
  member() {
    // VK 表示しない
    if (!this.vk) {
      const headerMember = new SPViewHeaderMember(this.element, {}, this.vk);
      this._member = headerMember;

      const boundCallback = this._boundCallback;
      headerMember.on(View.BEFORE_RENDER, boundCallback);
      headerMember.on(View.WILL_MOUNT, boundCallback);
      headerMember.on(View.DID_MOUNT, boundCallback);
      headerMember.on(View.ERROR_MOUNT, boundCallback);
      headerMember.on(View.UNDEFINED_ERROR, boundCallback);
      headerMember.on(View.EMPTY_ERROR, boundCallback);
      headerMember.on(View.RESPONSE_ERROR, boundCallback);
      headerMember.start();
    }
  }
  /**
   * 非ログインユーザー
   */
  user() {
    // 非ログインユーザー
    ReactDOM.render(
      <SPHeaderNormalUserComponent
        prefix={VK.prefix(this.vk)}
        vk={this.vk}
      />,
      this.element
    );
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
    this.dispatch(event);

    if (event.type === View.RESPONSE_ERROR || event.type === View.UNDEFINED_ERROR || event.type === View.EMPTY_ERROR) {
      // token はあるけどユーザー情報が取得できなかった
      // 処理を止めて一般ユーザー扱いにする
      this.dispose();
      // this.render();
      this.user();
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
}
