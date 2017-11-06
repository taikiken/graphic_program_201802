/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
// import { default as Type } from '../../../util/Type';


import Innings from './Innings';


/**
 * スコア情報
 * teamData JSON.response.team[].score
 */
export default class Score {
  /**
   * スコア情報
   * @param {Object} json JSON.response.team[].{}.score
   */
  constructor(json) {
    // let data = json;
    // let has = true;
    // if (Type.nil(data) || !Type.exist(data)) {
    //   data = {};
    //   has = false;
    // }
    const has = !!json;
    const origin = has ? json : {};
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    /**
     * JSON.response.team[].score, 生データ
     * @type {Object}
     */
    this.origin = origin;

    const innings = new Innings(origin.inningscore);
    /**
     * イニング別スコア, alias inningscore
     * @type {Innings}
     */
    this.innings = innings;
    /**
     * イニング別スコア
     * @type {Innings}
     */
    this.inningscore = innings;

    // inning をキーにした score 値 Object
    const inningData = {};
    // @type {Array<string>}
    const passedInnings = innings.innings.map((inning) => {
      const no = inning.inning;
      inningData[no] = inning.score;
      return no;
    });
    /**
     * inning をキーにした score 値
     * @type {{}}
     */
    this.inningData = inningData;
    /**
     * 最終イニング No.
     * @type {number}
     */
    this.inningCount = passedInnings.length;
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * 総得点数, alias totalscore
   * @return {string} 総得点数
   */
  get total() {
    return this.origin.totalscore;
  }
  /**
   * 総得点数
   * @return {string} 総得点数
   */
  get totalscore() {
    return this.total;
  }
  /**
   * 安打数
   * @return {string} 安打数
   */
  get hit() {
    return this.origin.hit;
  }
  /**
   * 失策数
   * @return {string} 失策数
   */
  get error() {
    return this.origin.error;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * イニングの点を取得します
   * @param {number} inning 1 ~ なイニング文字
   * @return {string} 該当イニングの点数を返します
   */
  getScore(inning) {
    const score = this.inningData[String(inning)];
    return typeof score !== 'undefined' ? score : '';
  }
}
