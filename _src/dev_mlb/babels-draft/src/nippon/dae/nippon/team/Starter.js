/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 23:02
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
import Batters from './Batters';

/**
 * スターティングメンバー, 先発投手以外はスタメン発表後に出現します
 * JSON.response.team[].{}.startingmember
 */
export default class Starter {
  /**
   * スターティングメンバー, 先発投手以外はスタメン発表後に出現します
   * @param {Object} json JSON.response.team[].{}.startingmember
   */
  constructor(json) {
    // let member = json;
    // let has = true;
    // if (Type.nil(member) || !Type.exist(member)) {
    //   member = {};
    //   has = false;
    // }
    const has = !!json;
    const origin = has ? json : {};
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    /**
     * スターティングメンバー, JSON 生データ
     * @type {Object}
     */
    this.origin = origin;
    /**
     * スターティングメンバー, 先発投手
     * JSON.response.team[].{}.startingmember.pitcher
     * @type {Pitcher}
     */
    this.pitcher = new Pitcher(origin.pitcher);
    /**
     * スターティングメンバー, 野手
     * JSON.response.team[].{}.startingmember.batter
     * @type {Batters}
     */
    this.batters = new Batters(origin.batter);
  }
}
