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
 * チーム情報 > 先発バッター
 * JSON.response.team[].batter[].{}
 * */
export default class Batter {
  /**
   * チーム情報 > 先発バッター
   * @param {Object} json JSON.response.team[].batter[].{}
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
     * 先発バッター, JSON 生データ
     * @type {Object}
     */
    this.origin = has ? json : {};
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * 打順, 1 ~
   * @return {string} 打順, 1 ~
   */
  get batNo() {
    return this.origin.batNo;
  }
  // ---
  // 子クラス Fielder でセットするので setter 作成する
  /**
   * 守備位置, 左, 1文字ぽい
   * @return {string} 打順, 左
   */
  get position() {
    return this.origin.position;
  }
  /**
   * 守備位置, 左, 1文字
   * @param {string} position 守備位置, 左, 1文字
   * @since 2016-10-18
   */
  set position(position) {
    this.origin.position = position;
  }
  // ---
  /**
   * 背番号, 7
   * @return {string} 背番号, 7
   */
  get backNumber() {
    return this.origin.backNumber;
  }
  /**
   * 選手名（フル）, "中村 晃"
   * @return {string} 選手名（フル）, "中村 晃"
   */
  get name() {
    return this.origin.name;
  }
  /**
   * 選手名（苗字）, 中村晃, 同姓同名は名前付き？
   * @return {string} 選手名（苗字）, 中村晃
   */
  get nameS() {
    return this.origin.nameS;
  }
  /**
   * 投, 右
   * @return {string} 投, 右
   */
  get pitchingArm() {
    return this.origin.pitchingArm;
  }
  /**
   * 打, 右
   * @return {string} 打, 右
   */
  get battingType() {
    return this.origin.battingType;
  }
  /**
   * 打率, .286
   * @return {string} 打率, .286
   */
  get avg() {
    return this.origin.avg;
  }
  /**
   * 本塁打数, 2
   * @return {string} 本塁打数, 2
   */
  get hr() {
    return this.origin.hr;
  }
  /**
   * 打点数, 2
   * @return {string} 打点数, 2
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
