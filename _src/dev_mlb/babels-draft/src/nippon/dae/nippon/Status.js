/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 21:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

/**
 * 試合状態, JSON.response.status
 */
export default class Status {
  /**
   * 試合状態
   * @param {Object} json 試合状態 JSON.response.status
   */
  constructor(json) {
    // let status = json;
    // let has = true;
    // if (Type.nil(status) || !Type.exist(status)) {
    //   status = {};
    //   has = false;
    // }
    const has = !!json;
    // const oigin = has ? json : {};
    /**
     * 試合状態: JSON.response.status
     * @type {Object}
     */
    this.oigin = has ? json : {};
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
   * 試合状態, 0 ~ 9
   * <pre>
   * 0=試合前、1=試合中、2=試合開始遅延、3=試合中断、4=試合終了、8=試合中中止、9=試合前中止
   * </pre>
   * @return {number} 試合状態, 0 ~ 9
   */
  get id() {
    return this.oigin.id;
  }
  /**
   * 試合状態, 日本語
   * @return {string} 試合状態, 日本語
   */
  get name() {
    return this.oigin.name;
  }
  /**
   * 現在のイニング
   * @return {string} 現在のイニング（何故か `string`）
   */
  get inning() {
    return this.oigin.inning;
  }
  /**
   * 回の表裏
   * <pre>
   * 0=表、1=裏
   * </pre>
   *
   * 資料では 0 / 1 だが、表・裏 になってる
   * @return {string} 表・裏
   */
  get topbot() {
    return this.oigin.topbot;
  }
}
