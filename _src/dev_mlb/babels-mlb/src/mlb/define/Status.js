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

/**
 * game status 定数
 */
export default class Status {
  /**
   * game status key: value - 日本語名称 object
   * @type {{1: string, 2: string, 4: string, 5: string, 6: string, 9: string, 10: string, 23: string}}
   */
  static games = {
    1: '試合前',
    2: '試合中',
    4: '試合終了',
    5: '延期',
    6: 'サスペンド',
    9: 'キャンセル',
    10: '没収',
    23: '遅延/中断',
  };
  /**
   * `mlb__game__overview`: status で付与する css class name
   * @type {{1: string, 2: string, 4: string, 9: string}}
   */
  static classes = {
    1: 'mlb__game__overview__info__status--before',
    2: 'mlb__game__overview__info__status--live',
    4: 'mlb__game__overview__info__status--end',
    9: 'mlb__game__overview__info__status--cancel',
  };
  /**
   * `mlb__live__overview`: status で付与する css class name
   * @type {{1: string, 2: string, 4: string, 9: string}}
   */
  static liveClasses = {
    1: 'mlb__live__overview__info__status--before',
    2: 'mlb__live__overview__info__status--live',
    4: 'mlb__live__overview__info__status--end',
    9: 'mlb__live__overview__info__status--cancel',
  };
  /**
   * status 名称を取得します
   * 1: '試合前',
   * 2: '試合中',
   * 4: '試合終了',
   * 5: '延期',
   * 6: 'サスペンド',
   * 9: 'キャンセル',
   * 10: '没収',
   * 23: '遅延/中断',
   * @param {number} id status ID
   * @returns {string} status 日本語名称 を返します
   */
  static label(id) {
    return Status.games[id];
  }
  /**
   * status で付与する css class name を取得します
   * 1: 'mlb__game__overview__info__status--before',
   * 2: 'mlb__game__overview__info__status--live',
   * 4: 'mlb__game__overview__info__status--end',
   * 9: 'mlb__game__overview__info__status--cancel',
   * @param {number} id game status
   * @returns {string} status で付与する css class name を返します
   */
  static className(id) {
    return Status.classes[id];
  }
  /**
   * `/stats/mlb/game/YYYY/GAME_ID` の win / lose class name
   * @param {number} id status ID
   * @returns {string} status で付与する css class name を返します
   */
  static liveClassName(id) {
    return Status.liveClasses[id];
  }
  // /**
  //  * team が勝った時に付与する class name - mlb__game__result--win を取得します
  //  * @returns {string} team が勝った時に付与する class name - mlb__game__result--win を返します
  //  */
  // static win() {
  //   return 'mlb__game__result--win';
  // }
}