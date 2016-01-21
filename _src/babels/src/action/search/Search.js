/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:56
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Offset} from '../Offset';
import {Api} from '../../net/Api';

/**
 * 記事検索を行います
 */
export class Search extends Offset {
  /**
   * 検索キーワードを元に記事を検索します<br>
   * <b>types: Api.search()</b> を使用します
   * @param {string} word 検索キーワード
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor( word:string, resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = 10 ) {
    super( Api.search(), resolve, reject, offset, length );
    this._word = word;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 検索キーワード
   * @returns {string|*} 検索キーワードを返します
   */
  get word():string {
    return this._word;
  }

  /**
   * 検索キーワードを設定します
   * @param {string} word 検索キーワード
   */
  set word( word:string ):void {
    this._word = word;
  }
  /**
   * url を作成します
   * @method url
   * @returns {string} 作成した url を返します
   */
  get url():string {
    return `${this._url}/${this.word}?offset=${this.offset}&length=${this.length}`;
  }
}
