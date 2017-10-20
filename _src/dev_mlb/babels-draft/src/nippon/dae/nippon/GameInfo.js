/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

// data
import ScoreTexts from './game/ScoreTexts';
import Result from './game/Result';

/**
 * 試合情報: JSON.response.gameinfo
 */
export default class GameInfo {
  /**
   * JSON.response.gameinfo
   * @param {Object} json JSON.response.gameinfo
   */
  constructor(json) {
    // let gameInfo = json;
    // let has = true;
    // if (Type.nil(gameInfo) || !Type.exist(gameInfo)) {
    //   gameInfo = {};
    //   has = false;
    // }
    const has = !!json;
    const origin = has ? json : {};
    /**
     * 試合情報: JSON.response.gameinfo
     * @type {Object}
     */
    this.origin = origin;
    /**
     * alias this.gameInfo, 試合情報: JSON.response.gameinfo
     * @type {Object}
     */
    this.gameinfo = origin;
    // scoretext: どちらかのチームが得点したら出現します
    const scores = new ScoreTexts(origin.scoretext);
    /**
     * どちらかのチームが得点したら出現します
     * @type {ScoreTexts}
     */
    this.scoretext = scores;
    /**
     * alias scoretext, どちらかのチームが得点したら出現します
     * @type {ScoreTexts}
     */
    this.scores = scores;
    /**
     * alias scoretext, どちらかのチームが得点したら出現します
     * @type {ScoreTexts}
     */
    this.scoreTexts = scores;
    /**
     * 試合結果: 試合終了後に出現します
     * @type {Result}
     */
    this.result = new Result(origin.result);
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * 試合種別: JSON.response.gameinfo.type, 日本シリーズ
   * @return {string} JSON.response.gameinfo.type
   */
  get type() {
    return this.origin.type;
  }
  /**
   * 回、戦数: JSON.response.gameinfo.round, 第1戦
   * @return {string} JSON.response.gameinfo.round
   */
  get round() {
    return this.origin.round;
  }
  /**
   * 試合日時（年）: JSON.response.gameinfo.dateY, 2016
   * @return {number} JSON.response.gameinfo.dateY
   */
  get dateY() {
    return this.origin.dateY;
  }
  /**
   * 試合日時（月）: JSON.response.gameinfo.dateM, 1~12
   * @return {number} JSON.response.gameinfo.dateM
   */
  get dateM() {
    return this.origin.dateM;
  }
  /**
   * 試合日時（日）: JSON.response.gameinfo.dateD, 1~31
   * @return {number} JSON.response.gameinfo.dateD
   */
  get dateD() {
    return this.origin.dateD;
  }
  /**
   * 試合日時（曜日）: JSON.response.gameinfo.weekday, 月～日
   * @return {string} JSON.response.gameinfo.weekday
   */
  get weekday() {
    return this.origin.weekday;
  }
  /**
   * 試合日時（時間）: JSON.response.gameinfo.time, 00:00
   * @return {string} JSON.response.gameinfo.time
   */
  get time() {
    return this.origin.time;
  }
  /**
   * 開催球場: JSON.response.gameinfo.stadium, 北海道ドーム
   * @return {string} JSON.response.gameinfo.stadium
   */
  get stadium() {
    return this.origin.stadium;
  }
}
