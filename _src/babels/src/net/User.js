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

let _symbol = Symbol();
let _sign = false;
let _id = -1;

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
   * @returns {boolean} sign in / out 状態を返します
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
   * User id 情報
   * @returns {number} User id を返します
   */
  static get id():Number {

    return _id;

  }

  /**
   * User id を設定します
   * @param {number} id User id
   */
  static set id( id:Number ):void {

    _id = id;

  }

}
