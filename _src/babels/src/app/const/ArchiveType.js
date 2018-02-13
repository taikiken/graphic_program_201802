/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/29 - 15:28
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
//
// let _symbol = Symbol();

/**
 * カテゴリーごとの記事一覧
 * - 一覧種類を定義します
 * @since 2016-06-29
 */
export class ArchiveType {
  // /**
  //  * <p>記事一覧種類</p>
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'ArchiveType is static Class. not use new ArchiveType().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * カテゴリーごとの記事一覧, 新着順
   *
   * @since 2016-06-29
   * @return {string} カテゴリーごとの記事一覧, 新着順 '' を返します
   */
  static get DEFAULT() {
    return '';
  }
  /**
   * カテゴリーごとの記事一覧, 人気順
   *
   * @since 2016-06-29
   * @return {string} カテゴリーごとの記事一覧, 人気順 'ranking' を返します
   */
  static get RANKING() {
    return 'ranking';
  }
  /**
   * カテゴリーごとの記事一覧, 動画の人気順 = おすすめ動画
   *
   * @since 2016-06-29
   * @return {string} カテゴリーごとの記事一覧, 動画の人気順 = おすすめ動画 'video' を返します
   */
  static get VIDEO() {
    return 'video';
  }
  /**
   * カテゴリーごとの記事一覧, おすすめ記事
   *
   * @since 2016-06-29
   * @return {string} カテゴリーごとの記事一覧, おすすめ記事 'recommend' を返します
   */
  static get RECOMMEND() {
    return 'recommend';
  }
}
