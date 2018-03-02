/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/03 - 21:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Response from './players/Response';

/**
 * draft 候補選手 JSON parse します
 */
export default class PlayersDae {
  /**
   * 取得 JSON をパースします
   * @param {object} json draft 候補選手 JSON
   */
  constructor(json) {
    const origin = json || {};
    /**
     * draft 候補選手 JSON
     * @type {Object|{}}
     */
    this.origin = origin;
    /**
     * JSON.response
     * @type {Response}
     */
    this.response = new Response(origin.response);
  }
}