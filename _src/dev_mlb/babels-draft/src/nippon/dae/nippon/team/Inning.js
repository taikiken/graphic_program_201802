/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 21:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../../util/Type';

/**
 * イニング別スコア, 各イニング
 * JSON.response.team[].score.inningscore[].{}
 */
export default class Inning {
  /**
   * イニング別スコア, 各イニング
   * @param {Object} json JSON.response.team[].score.inningscore[].{}
   */
  constructor(json) {
    // let data = json;
    // let has = true;
    // if (Type.nil(data) || !Type.exist(data)) {
    //   data = {};
    //   has = false;
    // }
    const has = !!json;
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    /**
     * JSON.response.gemeinfo.scoretext[{}], 生データ
     * @type {Object}
     */
    this.origin = has ? json : {};
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * イニング数値（文字型）だけ
   * @return {string} イニング数値（文字型）だけ
   */
  get inning() {
    return this.origin.inning;
  }
  /**
   * 得点, 攻撃中イニング無得点のケースのみ"-" らしいけど `0` がセットされている
   * @return {string} 得点
   */
  get score() {
    return this.origin.score;
  }
}
