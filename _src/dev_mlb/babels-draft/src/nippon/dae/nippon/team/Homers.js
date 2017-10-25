/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 14:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
// import { default as Type } from '../../../util/Type';

// data
import Homer from './Homer';

/**
 * 本塁打
 * JSON.response.team[].{}.homerun[]
 */
export default class Homers {
  /**
   * 本塁打
   * @param {Array<Object>} json JSON.response.team[].{}.homerun[]
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
     * 本塁打
     * JSON.response.team[].{}.homerun[], 生データ
     * @type {Array<Object>}
     */
    this.origin = origin;
    /**
     * 本塁打 リスト
     * @type {Array<Homer>}
     */
    this.homers = origin.map(homer => new Homer(homer));
  }
}
