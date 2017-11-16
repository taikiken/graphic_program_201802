/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 11:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../../util/Type';

// data
import Pitcher from './Pitcher';

/**
 * 控えメンバー > 投手
 * JSON.response.team.benchmember.pitcher[]
 */
export default class Pitchers {
  /**
   * 控えメンバー > 投手
   * @param {Array} json JSON.response.team.benchmember.pitcher[]
   */
  constructor(json) {
    // let data = json;
    // let has = true;
    // if (!Type.array(data)) {
    //   data = [];
    //   has = false;
    // }
    let has = Array.isArray(json);
    const origin = has ? json : [];
    if (origin.length === 0) {
      has = false;
    }
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    /**
     * JSON.response.team.benchmember.pitcher[], 生データ
     * @type {Array<Object>}
     */
    this.origin = origin;
    /**
     * 控えメンバー > 投手, JSON.response.team.benchmember.pitcher[]
     * @type {Array<Pitcher>}
     */
    this.pitchers = origin.map(pitcher => new Pitcher(pitcher));
  }
}

