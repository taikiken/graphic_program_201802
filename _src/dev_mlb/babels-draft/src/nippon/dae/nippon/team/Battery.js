/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 16:27
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
 * バッテリー情報, 試合開始後に出現します
 * JSON.response.team[].battery
 */
export default class Battery {
  /**
   * バッテリー情報, 試合開始後に出現します
   * @param {Object} json JSON.response.team[].battery
   */
  constructor(json) {
    // let data = json;
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
     * バッテリー情報, JSON 生データ
     * @type {Object}
     */
    this.origin = origin;
    // pitcher
    /**
     * バッテリー情報・投手, JSON.response.team[].battery.pitcher
     * @type {Pitchers}
     */
    this.pitcher = new Pitchers(origin.pitcher);
    // catcher
    /**
     * バッテリー情報・捕手, JSON.response.team[].battery.catcher
     * @type {Fielders}
     */
    this.catcher = new Fielders('catcher', origin.catcher);
  }
}
