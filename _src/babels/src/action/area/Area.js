/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/29 - 22:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { Offset } from '../Offset';
import { Length } from '../../app/const/Length';
import { Api } from '../../net/Api';

/**
 * 地域 - Ajax - 処理を行います
 * - ユーザー認証なし
 * - offset / length あり
 * ```
 * '北海道',
 * '東北',
 * '関東',
 * '北陸・甲信越',
 * '東海',
 * '関西',
 * '中国',
 * '四国',
 * '九州・沖縄',
 * ```
 * @since 2017-09-04
 */
export default class Area extends Offset {
  /**
   * 地域 - Ajax - 処理を行います
   * @param {string} [area=''] 地域名称
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor(area = '', resolve = null, reject = null, offset = 0, length = Length.archive) {
    super(Api.area(), resolve, reject, offset, length);
    /**
     * 地域名称
     * @type {string}
     */
    this.area = area;
  }
  /**
   * url を作成します
   * ```
   * /api/v1/articles/area/{:keywords}[?[offset=:n][&[length=:m]]
   *
   * ex.
   * /api/v1/articles/area/関東
   * - 「関東」に紐付けられた記事一覧
   * ```
   * @return {string} 作成した url を返します
   * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=40309135
   */
  get url() {
    return `${this._url}/${this.area}?offset=${this.offset}&length=${this.length}`;
  }
}
