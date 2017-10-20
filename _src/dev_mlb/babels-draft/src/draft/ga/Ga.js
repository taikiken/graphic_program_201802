/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/12 - 14:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

let globalGa = null;
/**
 * {@link Ga}
 * timeoutId
 * @type {number}
 */
let timer = 0;
/**
 * {@link Ga}
 * ga 送信タグリスト
 * @type {Array}
 */
const list = [];
/**
 * local flag
 * @type {boolean}
 */
const local = location.hostname.indexOf('192.168.1.1') !== -1 ||
  location.hostname.indexOf('localhost') !== -1 ||
  location.hostname.indexOf('127.0.0') !== -1;

/**
 * ga tag 送信します
 *
 * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=ja#implementation
 * @see https://docs.google.com/spreadsheets/d/1vFu7BG3fOMiwD1uEmsaxFr_XHnqVUkwYnRNs-2fmPUw/edit#gid=0
 */
export default class Ga {
  /**
   * タグ送信リストから送信します
   */
  static send() {
    clearTimeout(timer);
    // global `ga` を取得します
    let ga = globalGa;
    if (globalGa === null) {
      globalGa = self.ga;
      ga = globalGa;
    }
    if (!ga) {
      timer = setTimeout(Ga.send, 25);
      return;
    }

    while (list.length) {
      const option = list.shift();
      if (local) {
        console.warn('ga', option);
      }
      ga('send', option);
    }
  }
  /**
   * タグ送信リストに追加します
   * @param {Object} option 送信オプション
   */
  static add(option) {
    list.push(option);
    Ga.send();
  }
}
