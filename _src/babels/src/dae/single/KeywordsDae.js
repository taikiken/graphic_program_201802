/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * response.keywords
 */
export class KeywordsDae {
  /**
   * 記事キーワード
   * @param {Array} [keywords=[]]
   */
  constructor( keywords:Array<string> = [] ) {
    this._keywords = keywords;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Array.<string>|*} response.keywords を返します
   */
  get keywords():Array<string> {
    return this._keywords;
  }
  /**
   *
   * @return {boolean} keyword が存在するかの真偽値を返します
   */
  get hasKeyword():boolean {
    return this.keywords.length > 0;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 連結子でキーワードをつなぎます
   * @param {string} concat 連結子
   * @return {string} 連結子でつないだキーワードを返します
   */
  concat( concat:string = ', ' ):string {
    return this.keywords.join( concat );
  }
}
