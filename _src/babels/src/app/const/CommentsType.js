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


let _symbol = Symbol();

/**
 * <p>コメント種類（表示分類）<br>
 * SELF|NORMAL|OFFICIAL|ALL があります</p>
 * <p>全て static です</p>
 *
 */
export class CommentsType {
  /**
   * <p>コメント種類（表示分類）</p>
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( 'CommentsType is static Class. not use new CommentsType().' );

    }

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 見出しタイトル<br>
   * SELF|NORMAL|OFFICIAL|ALL
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
        // console.warn( `title illegal action: ${type}, instead use default` );
        return 'すべてのコメント';

    }
  }
  // ---------------------------------------------------
  //  const
  // ---------------------------------------------------
  /**
   * 自分のコメント
   * @return {string} comment type 'self' を返します
   */
  static get SELF():string {
    return 'self';
  }
  /**
   * みんなのコメント
   * @return {string} comment type 'normal' を返します
   */
  static get NORMAL():string {
    return 'normal';
  }
  /**
   * 公式コメンテーター
   * @return {string} comment type 'official' を返します
   */
  static get OFFICIAL():string {
    return 'official';
  }
  /**
   * すべてのコメント
   * @return {string} comment type '' を返します
   */
  static get ALL():string {
    return '';
  }
  /**
   * 記事へのコメント
   * @return {string} comment type independent 記事へのコメントを返します
   */
  static get INDEPENDENT():string {
    return 'independent';
  }
  /**
   * コメント詳細
   * @return {string} comment type single コメント詳細
   */
  static get SINGLE():string {
    return 'single';
  }
}
