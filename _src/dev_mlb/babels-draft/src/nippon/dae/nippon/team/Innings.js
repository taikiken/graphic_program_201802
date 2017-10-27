/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 14:05
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
import Inning from './Inning';

/**
 * イニング別スコア
 * JSON.response.team[].score.inningscore
 */
export default class Innings {
  /**
   * イニング別スコア
   * @param {Array} json JSON.response.team[].score.inningscore
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
     * 控えメンバー の 投手以外: 野手
     * @type {Array<Inning>}
     */
    this.innings = origin.map(inning => new Inning(inning));
  }
}
