/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/16 - 11:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import List from '../../../../moku/util/List';

// util
// import { default as List } from '../../../util/List';

/**
 * 支配化選手 1位のデータ分解
 * ```
 * {
 *  teamId: [Players,...],
 *  teamId: [Players,...],
 *  teamId: [Players,...],
 *  teamId: [Players,...],
 * }
 * ```
 * */
export default class FirstData {
  /**
   * 1位のデータをさらに横出力可能なように分解します
   * @param {Object} list 支配化選手 1位のデータ
   */
  constructor(list) {
    /**
     * 支配化選手 1位のデータ
     * @type {Object}
     */
    this.list = list;
    // 各チームキー value 配列の最大 length を取得します
    // 1. array.length を lengthList へ
    // @type {Array<number>}
    const lengthList = Object.values(list).map(data => data.length);
    lengthList.sort();
    // @type {number} - 各チーム配列の最大 length 値
    const length = lengthList.pop();
    // @type {Array<number>} - length 分 0 の配列を作成します [0, 0, 0,...]
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
    // const numbers = new Array(length).fill(0);
    // Android 標準ブラウザがエラーになるので代替手段を考えた
    const numbers = List.fill(length, 0);

    // @type {Array<number>} - [teamId,...] teamId がオーダー順に並びます
    const keys = Object.keys(list);
    /**
     * 支配化選手 1位のデータを横展開できるように並べ直します
     * object には teamId をキーに Players がセットされます
     * ```
     * [
     *  {teamId: Players, ...},
     *  {teamId: Players, ...},
     * ]
     * ```
     * @type {Array<Object>}
     */
    this.lines = numbers.map((data, index) => {
      // const orderNo = index + 1;
      const object = {};
      keys.map((teamId) => {
        const players = list[teamId];
        object[teamId] = players[index];
        return object;
      });
      return object;
    });
  }
}
