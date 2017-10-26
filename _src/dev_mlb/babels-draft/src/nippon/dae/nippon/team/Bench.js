/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 11:46
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
import Pitchers from './Pitchers';
import Fielders from './Fielders';

/**
 * 控えメンバー, スタメン発表後に出現します
 * JSON.response.team[].benchmember
 */
export default class Bench {
  /**
   * 控えメンバー, スタメン発表後に出現します
   * @param {Object} json JSON.response.team[].benchmember
   */
  constructor(json) {
    // let data = args;
    // let has = true;
    // if (Type.nil(data) || !Type.exist(data)) {
    //   data = {};
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
     * 先発バッター, JSON 生データ
     * @type {Object}
     */
    this.origin = origin;
    // pitcher
    const pitchers = new Pitchers(origin.pitcher);
    /**
     * 控えメンバー・投手, JSON.response.team[].benchmember.pitcher
     * @type {Pitchers}
     */
    this.pitcher = pitchers;
    /**
     * alias pitcher, 控えメンバー・投手, JSON.response.team[].benchmember.pitcher
     * @type {Pitchers}
     */
    this.pitchers = pitchers;
    // fielder
    /**
     * 控えメンバー・捕手, JSON.response.team[].benchmember.catcher
     * @type {Fielders}
     */
    this.catcher = new Fielders('catcher', origin.catcher);
    /**
     * 控えメンバー・内野手, JSON.response.team[].benchmember.infielder
     * @type {Fielders}
     */
    this.infielder = new Fielders('infielder', origin.infielder);
    /**
     * 控えメンバー・外野手, JSON.response.team[].benchmember.outfielder
     * @type {Fielders}
     */
    this.outfielder = new Fielders('outfielder', origin.outfielder);
  }
}
