/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 19:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


let _symbol = Symbol();

/**
 * <h3>コメント種類(action)</h3>
 * 全て static です
 * ADD|DELETE|GOOD|BAD があります
 */
export class ActionType {
  /**
   * コメント種類(action)
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( 'CommentsType is static Class. not use new CommentsType().' );

    }

  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  // ---------------
  // add / delete
  /**
   * ADD, コメント投稿
   * @return {string} add を返します
   */
  static get ADD():string {
    return 'add';
  }
  /**
   * DELETE, コメント削除
   * @return {string} delete を返します
   */
  static get DELETE():string {
    return 'delete';
  }
  // ---------------
  // good / bad
  /**
   * GOOD, コメント Like
   * @return {string} good を返します
   */
  static get GOOD():string {
    return 'good';
  }
  /**
   * BAD, コメント Bad
   * @return {string} bad を返します
   */
  static get BAD():string {
    return 'bad';
  }

}
