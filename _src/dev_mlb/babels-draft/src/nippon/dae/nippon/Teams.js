/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

// data
import Team from './Team';

/**
 * チーム情報
 * JSON.response.team[]
 */
export default class Teams {
  /**
   * チーム情報
   * @param {Array<Object>} json JSON.response.team[]
   */
  constructor(json) {
    const teams = Array.isArray(json) ? json : [];
    const has = teams.length > 0;
    // if (!Type.array(teams)) {
    //   teams = [];
    //   has = false;
    // }
    // if (teams.length === 0) {
    //   has = false;
    // }
    /**
     * original JSON - JSON.response.team[]
     * @type {*}
     */
    this.origin = teams;
    /**
     * JSON.response.team[] 生データ
     * @type {Array<Object>}
     */
    this.team = teams;
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    /**
     * チーム情報
     * @type {Array<Team>}
     */
    this.teams = teams.map(team => new Team(team));
  }
}
