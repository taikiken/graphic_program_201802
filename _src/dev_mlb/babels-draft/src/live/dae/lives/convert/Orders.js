/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 18:42
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
 * 各球団のドラフト指名情報を指名順にリスト化します
 */
export default class Orders {
  /**
   * ドラフト指名情報
   * @param {Array<Players>} list listData draftData JSON.response.team.draft.[roaster|development]
   */
  constructor(list) {
    const orders = {};
    // @type {Array<number>}
    const numbers = list.map((players) => {
      const nominate = players.nominate;
      const orderNo = nominate.orderNo;
      // 指名順がキーのデータ存在チェック
      if (!Type.exist(orders[orderNo])) {
        orders[orderNo] = [];
      }
      // 指名順の各配列に `players` を追加します, 1位が複数存在するので
      orders[orderNo].push(players);
      return orderNo;
    });
    /**
     * ドラフト指名順 `Nominate.orderNo` 毎に配列を作成し Players instance を保存します
     * @type {{}}
     */
    this.orders = orders;
    // console.log('orders', orders);
    /**
     * 配列の値を unique にします, [1, 1, 1, 2, 3...] が [1, 2, 3...]と並びます
     * @type {[]}
     * @see http://stackoverflow.com/questions/9229645/remove-duplicates-from-javascript-array
     */
    this.numbers = [...new Set(numbers)];
  }
  /**
   * 引数 orderNo の配列を返します
   * @param {number} orderNo 取得したい指名順
   * @return {Array<Players>} 引数 orderNo の配列
   */
  data(orderNo) {
    // console.log('Orders.data', orderNo, this.orders[orderNo], this.orders);
    return this.orders[orderNo];
  }
  /**
   * 引数 orderNo のデータ数を取得します
   * @param {number} orderNo 取得したい指名順
   * @return {number} 存在しない時は -1 を返します
   */
  count(orderNo) {
    const order = this.orders[orderNo];
    if (!Type.array(order)) {
      return -1;
    }
    return order.length;
  }
  /**
   * 引数 orderNo が存在するかを返します
   * @param {number} orderNo 調べたい指名順
   * @return {boolean} true: 存在する
   */
  has(orderNo) {
    return this.numbers.indexOf(orderNo) !== -1;
  }
}

