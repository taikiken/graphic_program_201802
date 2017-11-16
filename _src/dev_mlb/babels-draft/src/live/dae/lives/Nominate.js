/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 16:31
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
 * 指名情報<br>
 * JSON.response.team.draft.[roaster|development].nominate
 */
export default class Nominate {
  /**
   * 指名情報
   * @param {Object} json JSON.response.team.draft.[roaster|development].nominate
   */
  constructor(json) {
    // const origin = json || {};
    // if (Type.nil(nominate) || !Type.exist(nominate)) {
    //   nominate = {};
    // }
    /**
     * 指名情報 生データ
     * @type {Object}
     */
    this.origin = json || {};
  }
  /**
   * 指名順, 1 ~ 10, 支配下の順位。スタート：1
   * @return {number} 指名順, 1 ~ 10
   */
  get orderNo() {
    return this.origin.orderNo;
  }
  /**
   * 指名順, N巡目, 1巡目のみ抽選、2巡目以降はウェーバー方式
   * @return {string} 指名順, N巡目
   */
  get order() {
    return this.origin.order;
  }
  /**
   * 指名状況, １:指名確定、2:指名中、3:抽選外れ、4:抽選確定<br>
   * 抽選外れの場合さらに1巡目指名が指名確定まで続きます
   * @return {number} １:指名確定、2:指名中、3:抽選外れ、4:抽選確定
   */
  get situation() {
    return this.origin.situation;
  }
  /**
   * 指名状況状態テキスト
   * @return {string} 指名確定 | 指名中 | 抽選外れ | 抽選確定
   */
  get situationText() {
    return Nominate.situation(this.situation);
  }
  /**
   * 指名状況状態テキスト取得します
   * @param {number} situation 1 ~ 4: 指名状況
   * @return {string} 指名確定 | 指名中 | 抽選外れ | 抽選確定
   */
  static situation(situation) {
    switch (situation) {
      case 1: {
        return '指名確定';
      }
      case 2: {
        return '指名中';
      }
      case 3: {
        return '抽選外れ';
      }
      case 4: {
        return '抽選確定';
      }
      default: {
        return '';
      }
    }
  }
}
