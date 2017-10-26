/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/17 - 20:56
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Response from './nippon/Response';

/**
 * 日本シリーズ JSON パースします
 * - {@link Response}
 * @since 2017-10-20
 */
export default class NipponDae {
  /**
   * 日本シリーズ JSON パース
   * @param {*} json result.json
   */
  constructor(json) {
    const origin = json || {};
    /**
     * result.jon - 日本シリーズ
     * @type {*}
     */
    this.origin = origin;
    /**
     * 日本シリーズ JSON パース
     * @type {Response}
     */
    this.response = new Response(origin.response);
  }
}
