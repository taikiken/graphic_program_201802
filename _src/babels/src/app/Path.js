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
'use strict';

let _symbol = Symbol();

/**
 * <h3>代替画像パス</h3>
 * 全て static です
 */
export class Path {
  /**
   * <h4>API Path 定数</h4>
   * <p>API Path 内で使われる Const 名称を定義します</p>
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `Path is static Class. not use new Path().` );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * @return {string} ARTICLE_ID を返します
   */
  static get ARTICLE_ID():string {
    return 'ARTICLE_ID';
  }
  /**
   * alias Path.ARTICLE_ID
   * @return {string} ARTICLE_ID を返します
   */
  static get ARTICLE():string {
    return Path.ARTICLE_ID;
  }
  /**
   * @return {string} COMMENT_ID を返します
   */
  static get COMMENT_ID():string {
    return 'COMMENT_ID';
  }
  /**
   * alias Path.COMMENT_ID
   * @return {string} COMMENT_ID を返します
   */
  static get COMMENT():string {
    return Path.COMMENT_ID;
  }
  /**
   * @return {string} REPLY_ID を返します
   */
  static get REPLY_ID():string {
    return 'REPLY_ID';
  }
  /**
   * alias Path.REPLY_ID
   * @return {string} REPLY_ID を返します
   */
  static get REPLY():string {
    return Path.REPLY_ID;
  }
  /**
   * @return {string} USER_ID を返します
   */
  static get USER_ID():string {
    return 'USER_ID';
  }
  /**
   * alias Path.USER_ID
   * @return {string} USER_ID を返します
   */
  static get USER():string {
    return Path.USER_ID;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * article id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {Number} id article id
   * @return {string} 置き換え後のURLを返します
   */
  static article( url:string, id:Number ):string {
    return url.replace( Path.ARTICLE, String(id) );
  }
  /**
   * comment id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {Number} id comment id
   * @return {string} 置き換え後のURLを返します
   */
  static comment( url:string, id:Number ):string {
    return url.replace( Path.COMMENT, String(id) );
  }
  /**
   * reply id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {Number} id reply id
   * @return {string} 置き換え後のURLを返します
   */
  static reply( url:string, id:Number ):string {
    return url.replace( Path.REPLY, String(id) );
  }
  /**
   * user id 挿入し url を完成させます
   * @param {string} url 置き換え元 URL
   * @param {Number} id user id
   * @return {string} 置き換え後のURLを返します
   */
  static user( url:string, id:Number ):string {
    return url.replace( Path.USER, String(id) );
  }
}
