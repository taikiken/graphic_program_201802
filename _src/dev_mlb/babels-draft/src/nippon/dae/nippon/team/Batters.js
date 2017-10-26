/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 23:20
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
import Batter from './Batter';

/**
 * チーム情報 > 先発バッター
 * JSON.response.team[].batter[]
 */
export default class Batters {
  /**
   * チーム情報 > 先発バッター
   * @param {Array} json JSON.response.team[].batter[]
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
     * スターティングメンバー, バッター JSON 生データ
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 先発バッター
     * @type {Array<Batter>}
     */
    this.batters = origin.map(batter => new Batter(batter));
  }
}
