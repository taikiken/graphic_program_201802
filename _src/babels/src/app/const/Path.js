/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 15:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// let _symbol = Symbol();

/**
 * API URL を正規化します
 * - 全て static です
 */
export class Path {
  // /**
  //  * <p>API Path 定数</p>
  //  * <p>API Path 内で使われる Const 名称を定義します</p>
  //  * <p>URLを正規化します</p>
  //  * <p>static class です, instance を作成しません</p>
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target:Symbol ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Path is static Class. not use new Path().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * 記事 id
   * @return {string} ARTICLE_ID を返します
   */
  static get ARTICLE_ID() {
    return 'ARTICLE_ID';
  }
  /**
   * alias Path.ARTICLE_ID
   * @return {string} ARTICLE_ID を返します
   */
  static get ARTICLE() {
    return Path.ARTICLE_ID;
  }
  /**
   * コメント id
   * @return {string} COMMENT_ID を返します
   */
  static get COMMENT_ID() {
    return 'COMMENT_ID';
  }
  /**
   * alias Path.COMMENT_ID
   * @return {string} COMMENT_ID を返します
   */
  static get COMMENT() {
    return Path.COMMENT_ID;
  }
  /**
   * コメント返信 id
   * @return {string} REPLY_ID を返します
   */
  static get REPLY_ID() {
    return 'REPLY_ID';
  }
  /**
   * alias Path.REPLY_ID
   * @return {string} REPLY_ID を返します
   */
  static get REPLY() {
    return Path.REPLY_ID;
  }
  /**
   * ユーザー id
   * @return {string} USER_ID を返します
   */
  static get USER_ID() {
    return 'USER_ID';
  }
  /**
   * alias Path.USER_ID
   * @return {string} USER_ID を返します
   */
  static get USER() {
    return Path.USER_ID;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * article id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {number} id article id
   * @return {string} 置き換え後のURLを返します
   */
  static article(url, id) {
    return url.replace(Path.ARTICLE, String(id));
  }
  /**
   * comment id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {number} id comment id
   * @return {string} 置き換え後のURLを返します
   */
  static comment(url, id) {
    return url.replace(Path.COMMENT, String(id));
  }
  /**
   * reply id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {number} id reply id
   * @return {string} 置き換え後のURLを返します
   */
  static reply(url, id) {
    return url.replace(Path.REPLY, String(id));
  }
  /**
   * user id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {number} id user id
   * @return {string} 置き換え後のURLを返します
   */
  static user(url, id) {
    return url.replace(Path.USER, String(id));
  }
}
