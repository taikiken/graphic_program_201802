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
  //  METHOD
  // ---------------------------------------------------
  /**
   * 見出しタイトル
   * @param {string} type comment type
   * @return {string} 見出しタイトルを返します
   */
  static title( type:string ):string {
    switch ( type ) {

      case CommentsType.SELF:
        return '自分のコメント';

      case CommentsType.NORMAL:
        return 'みんなのコメント';

      case CommentsType.OFFICIAL:
        return '公式コメンテーター';

      case CommentsType.ALL:
        return 'すべてのコメント';

      default:
        console.warn( `title illegal action: ${type}, instead use default` );
        return 'すべてのコメント';

    }
  }
  // ---------------------------------------------------
  //  const
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
  /**
   * @return {string} comment type independent 記事へのコメントを返します
   */
  static get INDEPENDENT():string {
    return 'independent';
  }
}
