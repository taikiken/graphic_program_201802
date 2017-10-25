/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 16:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

// data/flash
import Roster from './Roster';

/**
 * ドラフト指名情報<br>
 * JSON.response.team.draft
 *
 * - {Roster} roster 支配下選手枠指名
 * - {Roster} development 育成選手枠指名
 */
export default class Draft {
  /**
   * ドラフト指名情報
   * @param {Object} json JSON.response.team.draft
   * @param {Info} info 選手に指名球団情報を付与します
   */
  constructor(json, info) {
    const origin = json || {};
    // if (Type.nil(origin) || !Type.exist(origin)) {
    //   origin = {};
    // }

    // const roster = new Roster(origin.roster, info);
    // const development = new Roster(origin.development, info);
    /**
     * ドラフト指名情報
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 支配下選手枠指名
     * @type {Roster}
     */
    this.roster = new Roster(origin.roster, info);
    /**
     * 育成選手枠指名, ※育成枠を指名しない球団は空配列, 指名した分、配列に格納されます
     * @type {Roster}
     */
    this.development = new Roster(origin.development, info);
  }
}
