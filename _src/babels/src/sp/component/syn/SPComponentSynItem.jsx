/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/20 - 18:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { LogoutStatus } from '../../../event/LogoutStatus';
import VK from '../../../vk/VK';
import { Url } from '../../../app/const/Url';

// React
/* eslint-disable no-unused-vars */

/**
 * [library] - React
 */
const React = self.React;
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;
/* eslint-enable no-unused-vars */

/**
 * side menu login / logout 切り替えメニュー
 * @since 2018-04-20
 */
export default class SPComponentSynItem extends React.Component {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  static get propTypes() {
    return {
      // sign in ずみ真偽値 true sign in
      sign: React.PropTypes.bool.isRequired,
      // did mount を通知する callback method
      callback: React.PropTypes.func.isRequired,
      // vk flag
      vk: React.PropTypes.bool.isRequired,
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(props) {
    super(props);
    /**
     * logout 通知
     * @type {?LogoutStatus}
     */
    this.logoutStatus = !props.vk ? LogoutStatus.factory() : null;
    /**
     * bind onClickLogout
     * @type {*}
     */
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * logout click event handlert
   * @param {Event} event click Event
   */
  onClickLogout(event) {
    event.preventDefault();
    if (this.logoutStatus) {
      this.logoutStatus.open();
    }
  }
  /**
   * delegate - componentDidMount
   * - props.callback 実行します
   */
  componentDidMount() {
    const func = this.props.callback;
    if (func) {
      func();
    }
  }

  /**
   * 通常ログインユーザーメニュー
   * @returns {*} `ul` ログインユーザーメニュー
   */
  member() {
    // login
    const { vk } = this.props;
    const prefix = VK.prefix(vk);
    const sideNav = `${prefix}side-menu-ut-nav`;
    const navLink = `${prefix}side-menu-ut-nav-link`;
    return (
      <ul>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-home`}
            href={Url.index(vk)}
          >
            <i>&nbsp;</i>スポーツブルトップへ
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-mypage`}
            href={Url.mypage('', vk)}
          >
            <i>&nbsp;</i>マイページ
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-config`}
            href={Url.settings('', vk)}
          >
            <i>&nbsp;</i>設定
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-logout`}
            href="#"
            onClick={this.onClickLogout}
          >
            <i>&nbsp;</i>ログアウト
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-about`}
            href={Url.about('', vk)}
          >
            <i>&nbsp;</i>スポーツブルとは
          </a>
        </li>
      </ul>
    );
  }

  /**
   * VK ログインユーザーメニュー
   * @returns {*} `ul` VK ログインユーザーメニュー
   */
  vkMember() {
    // login - vk
    const { vk } = this.props;
    const prefix = VK.prefix(vk);
    const sideNav = `${prefix}side-menu-ut-nav`;
    const navLink = `${prefix}side-menu-ut-nav-link`;
    return (
      <ul>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-home`}
            href={Url.index(vk)}
          >
            <i>&nbsp;</i>スポーツブルトップへ
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-mypage`}
            href={Url.mypage('', vk)}
          >
            <i>&nbsp;</i>マイページ
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-config`}
            href={Url.settings('', vk)}
          >
            <i>&nbsp;</i>設定
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-about`}
            href={Url.about('', vk)}
          >
            <i>&nbsp;</i>スポーツブルとは
          </a>
        </li>
      </ul>
    );
  }
  /**
   * 通常ユーザーメニュー
   * @returns {*} `ul` 通常ユーザーメニュー
   */
  user() {
    // not login
    const { vk } = this.props;
    const prefix = VK.prefix(vk);
    const sideNav = `${prefix}side-menu-ut-nav`;
    const navLink = `${prefix}side-menu-ut-nav-link`;
    return (
      <ul>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-home`}
            href={Url.index(vk)}
          >
            <i>&nbsp;</i>スポーツブルトップへ
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-login`}
            href={Url.signupLogin(vk)}
          >
            <i>&nbsp;</i>無料登録・ログイン
          </a>
        </li>
        <li className={`${sideNav}`}>
          <a
            className={`${navLink} ${prefix}side-menu-ut-nav-about`}
            href={Url.about('', vk)}
          >
            <i>&nbsp;</i>スポーツブルとは
          </a>
        </li>
      </ul>
    );
  }
  /**
   * ユーザー種類毎にメニューを出力します
   * @returns {*} `ul`
   */
  render() {
    const { vk, sign } = this.props;
    if (!sign) {
      return this.user();
    } else if (vk) {
      return this.vkMember();
    }
    return this.member();
  }
}
