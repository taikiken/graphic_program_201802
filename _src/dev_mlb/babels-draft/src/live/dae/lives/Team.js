/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 15:24
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
import Info from './Info';
import Draft from './Draft';

// dara/flash/convert
import Orders from './convert/Orders';

/**
 * 球団データ
 *
 * - info
 * - draft
 *   - roster
 *   - development
 */
export default class Team {
  /**
   * 球団データ
   * @param {Object} json JSON.response.team[]
   */
  constructor(json) {
    const origin = json || {};
    // if (Type.nil(team) || !Type.exist(team)) {
    //   team = {};
    // }
    /**
     * 球団データ
     * @type {Object}
     */
    this.origin = origin;
    const info = new Info(origin.info);
    /**
     * チーム情報
     * @type {Info}
     */
    this.info = info;
    // ドラフト指名情報
    const draft = new Draft(origin.draft, info);
    /**
     * ドラフト指名情報
     * @type {Draft}
     */
    this.draft = draft;
    /**
     * 支配下選手枠指名
     * @type {Roster}
     */
    this.roster = draft.roster;
    /**
     * 育成選手枠指名
     * @type {Roster}
     */
    this.development = draft.development;
    /**
     * roaster: 指名情報を指名順にリスト化
     * @type {Orders}
     */
    this.rosters = new Orders(draft.roster.list);
    /**
     * roaster: 指名情報を指名順にリスト化
     * @type {Orders}
     */
    this.developments = new Orders(draft.development.list);
  }
}
