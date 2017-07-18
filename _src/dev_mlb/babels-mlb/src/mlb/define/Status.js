/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/16 - 17:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Normalize from '../util/Normalize';

/**
 * game status 定数
 */
export default class Status {
  /**
   * game status key: value - 日本語名称 object
   * @type {{1: string, 2: string, 4: string, 5: string, 6: string, 9: string, 10: string, 23: string}}
   */
  static games = {
    1: '試合前 ',
    2: '試合中 ',
    4: '試合終了 ',
    5: '延期 ',
    6: 'サスペンド ',
    9: 'キャンセル  ',
    10: '没収  ',
    23: '遅延/中断',
  };
  /**
   * status 名称を取得します
   * @param {number} id status ID
   * @returns {string} status 日本語名称 を返します
   */
  static state(id) {
    return Normalize.str(Status.games[id]);
  }
}
