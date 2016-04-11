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


import {Safety} from '../../data/Safety';

/**
 * 記事キーワード
 * response.keywords
 */
export class KeywordsDae {
  /**
   * 記事キーワード
   * @param {Array} [keywords=[]] keywords 配列
   */
  constructor( keywords:Array<string> = [] ) {
    this._keywords = Safety.array( keywords );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * response.keywords
   * @return {Array.<string>|*} response.keywords を返します
   */
  get keywords():Array<string> {
    return this._keywords;
  }
  /**
   * keywords が存在するかの真偽値
   * @return {Boolean} keyword が存在するかの真偽値を返します
   */
  get hasKeyword():Boolean {
    return this.keywords.length > 0;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 連結子でキーワードをつなぎます
   * @param {string} [concatenation=', '] 連結子
   * @return {string} 連結子でつないだキーワードを返します
   */
  concat( concatenation:string = ', ' ):string {

    concatenation = Safety.string( concatenation, ', ' );
    return this.keywords.join( concatenation );

  }
}
