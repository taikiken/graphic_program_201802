/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:57
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
 * チーム情報 > 先発ピッチャー
 * JSON.response.team[].pitcher
 */
export default class Pitcher {
  /**
   * チーム情報 > 先発ピッチャー
   * @param {Object} json JSON.response.team[].pitcher
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
     * 先発ピッチャー, JSON 生データ
     * @type {Object}
     */
    this.origin = has ? json : {};
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * 守備位置, 投
   * @return {string} 守備位置, 投
   */
  get position() {
    return this.origin.position;
  }
  /**
   * 背番号, 50
   * @return {string} 背番号, 50
   */
  get backNumber() {
    return this.origin.backNumber;
  }
  /**
   * 選手名（フル）
   * @return {string} 選手名（フル）
   */
  get name() {
    return this.origin.name;
  }
  /**
   * 選手名（苗字のみ）
   * @return {string} 選手名（苗字のみ）
   */
  get nameS() {
    return this.origin.nameS;
  }
  /**
   * 投・左右
   * @return {string} 投・左右
   */
  get pitchingArm() {
    return this.origin.pitchingArm;
  }
  /**
   * 防御率
   * @return {string} 防御率
   */
  get era() {
    return this.origin.era;
  }
  /**
   * 打順, 10
   * @return {string} 打順, 10
   */
  get batNo() {
    return this.origin.batNo;
  }
  /**
   * 打・左右
   * @return {string} 打・左右
   */
  get battingType() {
    return this.origin.battingType;
  }
  /**
   * 打率
   * @return {string} 打率
   */
  get avg() {
    return this.origin.avg;
  }
  /**
   * 本塁打数
   * @return {string} 本塁打数
   */
  get hr() {
    return this.origin.hr;
  }
  /**
   * 打点数
   * @return {string} 打点数
   */
  get rbi() {
    return this.origin.rbi;
  }
  // no
  /**
   * 出場順番, battery.[pitcher|catcher] のみ存在
   * @return {string} 出場順番
   */
  get no() {
    return this.origin.no;
  }
  /**
   * player ID - 空になる時もあります
   * @returns {string} 選手 ID `playerid`
   * @since 2017-10-20
   */
  get playerid() {
    return this.origin.playerid;
  }
}
