/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/01/09 - 22:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Offset } from '../Offset';
// import { Length } from '../../app/const/Length';
import { Api } from '../../net/Api';

/**
 * tag で取得する Ajax 処理を行います
 * - 日付指定が必要な場合は `date` option を追加します
 * @since 2018-01-09
 */
export default class Tags extends Offset {
  /**
   * tag 取得して API request 準備します
   * @param {string} tag 検索対象タグ
   * @param {string} [date=''] 指定日付
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {number} [offset=0] query offset 値
   * @param {number} [length=4] query length 値
   */
  constructor(tag, date = '', resolve = null, reject = null, offset = 0, length = 4) {
    super(Api.tag(), resolve, reject, offset, length);
    /**
     * 検索対象タグ
     * @type {string}
     */
    this.tag = tag;
    /**
     * 指定日付
     * @type {string}
     */
    this.date = date;
  }
  /**
   * url を作成します
   * - offset, length クエリが追加になるので override します
   * @override
   * @return {string} 作成した url を返します
   */
  get url() {
    const query = this.date ? `${this.tag}&date=${this.date}` : this.tag;
    return `${this.path}${query}&offset=${this.offset}&length=${this.length}`;
  }
  // /**
  //  * has next - 常に `false`
  //  * @returns {boolean} 次があるかの真偽値を返します
  //  */
  // hasNext() {
  //   return true;
  // }
}
