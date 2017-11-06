/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import Teams from './lives/Teams';

/**
 * 2017 draft 速報 JSON 変換データ
 */
export default class LivesDae {
  /**
   * 2017 draft 速報 JSON 変換します
   * @param {*} json 2017 draft 速報 JSON
   */
  constructor(json) {
    const origin = json || {};
    /**
     * draft 候補選手 JSON
     * @type {Object|{}}
     */
    this.origin = origin;
    const response = origin.response || {};
    /**
     * JSON.response
     * @type {*}
     */
    this.response = response;
    /**
     * JSON.response.team
     * @type {Teams}
     */
    this.team = new Teams(response.team);
  }
}
