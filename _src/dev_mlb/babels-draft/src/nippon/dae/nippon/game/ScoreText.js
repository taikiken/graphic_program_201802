/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:52
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
 * 各回ごとのテキストデータの1データ
 * JSON.response.gemeinfo.scoretext[{}]
 */
export default class ScoreText {
  /**
   * 各回ごとのテキストデータの1データ
   * JSON.response.gemeinfo.scoretext[{}]
   * @param {Object} json JSON.response.gemeinfo.scoretext[{}]
   */
  constructor(json) {
    // let scoretext = json;
    // let has = true;
    // if (Type.nil(scoretext) || !Type.exist(scoretext)) {
    //   scoretext = {};
    //   has = false;
    // }
    const has = !!json;
    /**
     * JSON.response.gemeinfo.scoretext[{}], 生データ
     * @type {Object}
     */
    this.origin = has ? json : {};
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
   * イニング, イニング＋表裏, 1回表
   * @return {string} イニング
   */
  get inning() {
    return this.origin.inning;
  }
  /**
   * 0 or 1, 0=ビジター、1=ホーム
   * @return {number} 0=ビジター、1=ホーム
   */
  get homevisitor() {
    return this.origin.homevisitor;
  }
  /**
   * 選手名苗字
   * @return {string} 選手名苗字
   */
  get player() {
    return this.origin.player;
  }
  /**
   * 得点フラグ, 0=得点にからまない、1=得点にからむ
   * @return {number} 得点フラグ
   * @since 2016-10-23
   */
  get scoreflag() {
    return this.origin.scoreflag;
  }
  /**
   * 速報
   * @return {string} 速報
   */
  get text() {
    return this.origin.text;
  }
  // ---
  /**
   * ホームorビジター
   * @return {boolean} true: ホーム
   */
  get home() {
    return this.homevisitor === 1;
  }
  /**
   * ホームorビジター
   * @return {boolean} true: ビジター
   */
  get visitor() {
    return this.homevisitor === 0;
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
