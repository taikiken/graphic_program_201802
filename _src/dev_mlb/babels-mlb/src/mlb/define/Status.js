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

export default class Status {
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
  static id(num) {
    return Status.games[num] || '';
  }
}
