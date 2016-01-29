/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 18:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

/**
 * <h3>コメント種類</h3>
 * 全て static です
 */
export class CommentsType {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `CommentsType is static Class. not use new CommentsType().` );

    }

  }
  // ---------------------------------------------------
  //  static METHOD
  // ---------------------------------------------------
  /**
   * @return {string} comment type 'self' を返します
   */
  static get SELF():string {
    return 'self';
  }
  /**
   * @return {string} comment type 'normal' を返します
   */
  static get NORMAL():string {
    return 'normal';
  }
  /**
   * @return {string} comment type 'official' を返します
   */
  static get OFFICIAL():string {
    return 'official';
  }
  /**
   * @return {string} comment type '' を返します
   */
  static get ALL():string {
    return '';
  }
}
