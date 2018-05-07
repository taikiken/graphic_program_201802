/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/12 - 15:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// net
import { Cookie } from '../net/Cookie';

// event
// import {Env} from './Env';
import { UserStatus } from '../event/UserStatus';

// data
import { Safety } from '../data/Safety';

/**
 * ログインユーザー情報 - {@link User}
 * @type {?UserDae}
 * @private
 * @since 2016-11-05
 * @since 2018-04-19 val header - sub domain 取得可能な cookie set
 */
let information = null;

/**
 * ユーザー情報を管理します
 * - 全てstaticです
 */
export class User {
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * sign in / out 状態を表します
   * @return {boolean} sign in / out 状態を返します
   */
  static get sign() {
    // return _sign;
    // 開発フェーズは簡易的に変数管理していたが
    // cookie token 管理へ移行する
    return User.token !== null;
  }
  /**
   * sign in / out 状態を表します
   * - true: sign in です
   * @param {boolean} bool sign in / out 状態の真偽値, true: sign in
   */
  static set sign(bool) {
    // bool = !!bool;
    //
    if (bool) {
      UserStatus.factory().login();
    } else {
      UserStatus.factory().logout();
    }
  }
  /**
   * cookie より user token を取り出します<br>
   * 見つからない時は null になります
   * @return {string|null} token を返します, 見つからない時はnullを返します
   */
  static get token() {
    return Cookie.get(Cookie.TARGET);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * ログイン設定をします
   * - since 2018-04-19 subdomain 取得可能なように domain 指定する
   * @param {string} token 開発中の引数はオプション扱いです
   * @return {boolean} login が成功したかを返します
   * @since 2018-04-19 vk header - domain 指定 `.sportsbull.jp`
   */
  static login(token) {
    // token = Safety.string(token, '');
    // token が正常値なのかを調べる
    // 少なくとも, 文字型で空でない
    const altToken = Safety.string(token, '');
    if (altToken === '') {
      // token が不正値
      console.warn(`illegal token. [${token}]`);
      return false;
    }
    // save
    // @since 2018-04-19 subdomain 取得可能なように domain 指定する
    const result = Cookie.save(token, Cookie.TARGET, new Date(Date.now() + (1000 * 60 * 60 * 24 * 90)), '/', Cookie.COOKIE_DOMAIN);
    // console.log('User.login ', result, token);
    User.sign = result;
    return result;
  }
  /**
   * ログアウト処理を行います
   * - token を cookie から削除します
   */
  static logout() {
    // ドメイン指定なしcookieを削除
    Cookie.remove(Cookie.TARGET);
    // ドメイン指定ありcookieを削除
    Cookie.remove(Cookie.TARGET, '/', Cookie.COOKIE_DOMAIN);
    User.sign = false;
  }
  /**
   * ログイン・非ログインを確認します
   * - ログイン（token発見）時は login 処理を行います
   */
  static init() {
    const token = User.token;
    // console.log(`user init token [${token !== ''}]`);
    if (token === null || typeof token === 'undefined' || token === '') {
      User.sign = false;
    } else {
      User.login(token);
    }
  }
  /**
   * ログインユーザー情報
   * @return {UserDae} ログインユーザー情報を返します
   * @since 2016-11-05
   */
  static info() {
    return information;
  }
  /**
   * ログインユーザー情報を設定します
   * @param {UserDae} info ログインユーザー情報
   * @since 2016-11-05
   */
  static setInfo(info) {
    information = info;
  }
}
