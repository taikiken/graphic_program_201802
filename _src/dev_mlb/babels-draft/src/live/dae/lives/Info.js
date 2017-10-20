/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 16:12
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
 * チーム情報<br>
 * JSON.response.team.info
 */
export default class Info {
  /**
   * チーム情報
   * @param {Object} json JSON.response.team.info
   */
  constructor(json) {
    // let info = json;
    // if (Type.nil(info) || !Type.exist(info)) {
    //   info = {};
    // }
    /**
     * JSON.response.team.info
     * @type {Object}
     */
    this.origin = json || {};
  }
  /**
   * 1巡目の指名順<br>
   * 1巡目の指名順（2巡目以降、偶数巡目は指名順は逆になります）
   * @return {number} 1巡目の指名順
   */
  get order() {
    return this.origin.order;
  }
  /**
   * チームID
   * @return {number} チームID
   */
  get teamId() {
    return this.origin.teamId;
  }
  /**
   * チーム名
   * @return {string} チーム名
   */
  get teamName() {
    return this.origin.teamName;
  }
  /**
   * 指名状態, (1|2)
   * <pre>
   * 1:指名中、2:指名終了
   * 支配下選手選択終了時に2になりますが、育成選手選択開始時に1に変更になります。
   * 育成選手選択完了時に再度2に変更されます。
   * </pre>
   * @return {number} 1:指名中 or 2:指名終了 を返します
   */
  get status() {
    return this.origin.status;
  }
}
