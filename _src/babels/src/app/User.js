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
'use strict';

import {Cookie} from '../net/Cookie';
import {Env} from './Env';

let _symbol = Symbol();
let _sign = false;

/**
 * <h3>ユーザー情報を管理します</h3>
 * 全てstaticです
 */
export class User {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `User is static Class. not use new User().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * sign in / out 状態を表します
   * @return {boolean} sign in / out 状態を返します
   */
  static get sign():boolean {

    return _sign;

  }
  /**
   * sign in / out 状態を表します
   * @param {boolean} bool sign in / out 状態の真偽値, true: sign in
   */
  static set sign( bool:boolean ) {

    _sign = bool;

  }
  /**
   *
   * @return {string} token を返します, 見つからない時はnullを返します
   */
  static get token():string {

    if ( _sign ) {
      switch ( Env.mode ) {

        case Env.PRODUCTION:
          return Cookie.item( Cookie.TARGET );

        case Env.TEST:
        case Env.DEVELOP:
        default:
          return [ 'fee1a989f120b99cec0f8206d68f6365', '608c8868d866a46fa3ae6566ce62e0be', '7c36cbc887ca4d0035440a3b05005f6f' ][ Math.floor( Math.random() * 3 ) ];

      }
    } else {
      // 非ログインは空文字を返す
      // debugger
      // Authorization:OAuth realm=undotsushin.com, oautn_token=
      return '';
    }

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * ログイン設定をします
   * @param {Number|string} id user id
   */
  static login():void {
    User.sign = true;
  }
  /**
   * ログアウト設定をします
   */
  static logout():void {
    User.sign = false;
  }
}
