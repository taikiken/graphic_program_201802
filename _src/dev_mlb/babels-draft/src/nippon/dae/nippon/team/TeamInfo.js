/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:56
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
// import { default as Type } from '../../../util/Type';

/**
 * チーム情報・基本情報
 * JSON.response.team[].teaminfo
 */
export default class TeamInfo {
  /**
   * チーム情報・基本情報
   * @param {Object} json JSON.response.team[].teaminfo
   */
  constructor(json) {
    // let team = json;
    // let has = true;
    // if (Type.nil(team) || !Type.exist(team)) {
    //   team = {};
    //   has = false;
    // }
    const has = !!json;
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    /**
     * JSON.response.team[] 生データ
     * @type {object}
     */
    this.origin = has ? json : {};
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * チーム ID, 文字型になっているので数値に変換
   * @return {number} チーム ID
   */
  get id() {
    return parseInt(this.origin.id, 10);
  }
  /**
   * チーム名（フル）
   * @return {string} チーム名（フル）
   */
  get name() {
    return this.origin.name;
  }
  /**
   * チーム名（略）
   * @return {string} チーム名（略）
   */
  get nameS() {
    return this.origin.nameS;
  }
  /**
   * チーム名（アルファベット）
   * @return {string} チーム名（アルファベット）
   */
  get nameInitial() {
    return this.origin.nameInitial;
  }
  /**
   * チーム名（3文字以下）
   * @return {string} チーム名（3文字以下）
   */
  get nameES() {
    return this.origin.nameES;
  }
}
