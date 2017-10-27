/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 18:28
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
import Players from './Players';


/**
 * ドラフト指名情報・ 支配下選手枠指名 / 育成選手枠指名
 */
export default class Roster {
  /**
   * ドラフト指名情報
   * @param {Array} listData draftData JSON.response.team.draft.[roaster|development]
   * @param {Info} info 選手に指名球団情報を付与します
   */
  constructor(listData, info) {
    const data = Array.isArray(listData) ? listData : [];
    // if (!Type.array(data)) {
    //   data = [];
    // }
    /**
     * ドラフト指名情報
     * @type {Array<Players>}
     */
    this.list = data.map(one => new Players(one, info));
  }
}
