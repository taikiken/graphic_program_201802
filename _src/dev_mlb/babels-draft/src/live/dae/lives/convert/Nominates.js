/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/15 - 19:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../../util/Type';

import Type from '../../../../moku/util/Type';

/**
 * チーム別に sequence になっているデータをオーダー順に並べ替えます
 */
export default class Nominates {
  /**
   * nominates プロパティを初期化します
   */
  constructor() {
    /**
     * オーダー順に並べる Object data
     * @type {{}}
     */
    this.nominates = {};
  }
  /**
   * Players data を追加し並べていきます
   * @param {string} orderNo オーダー順, API資料だと {{number}} だが実際は文字列になっている
   * @param {number} teamId チームID
   * @param {Array<Players>} players Players instance 配列
   */
  add(orderNo, teamId, players) {
    const nominates = this.nominates;
    // オーダー順をキーにしたデータが存在するかチェックし、無ければ Object 初期化を行います
    if (!Type.exist(nominates[orderNo])) {
      nominates[orderNo] = {};
    }
    // // [オーダー順][チームID] が配列かをチェックし無ければ array 初期化を行います
    // // 支配下選手1位が複数存在するためです
    // if (!Type.array(nominates[orderNo][teamId])) {
    //   nominates[orderNo][teamId] = [];
    // }
    // // 配列に Players を追加します
    // nominates[orderNo][teamId].push(players);
    nominates[orderNo][teamId] = players;
  }
}
