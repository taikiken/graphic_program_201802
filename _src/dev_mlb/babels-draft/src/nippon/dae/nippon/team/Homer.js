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
 * 本塁打
 * JSON.response.team[].{}.homerun[].{}
 */
export default class Homer {
  /**
   * 本塁打
   * @param {Object} json JSON.response.team[].{}.homerun[].{}
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
     * 本塁打
     * JSON.response.team[].{}.homerun[].{}, 生データ
     */
    this.origin = has ? json : {};
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
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
   * 通算本塁打数, 数字のみらしい
   * @return {string} 通算本塁打数, 数字のみらしい
   */
  get total() {
    return this.origin.total;
  }
  /**
   * ランナー数, (ソロ|1ラン|2ラン|3ラン|満塁), 数字のみらしい
   * @return {string} ランナー数, (ソロ|1ラン|2ラン|3ラン|満塁), 数字のみらしい
   */
  get shot() {
    return this.origin.shot;
  }
  // ---
  /**
   * ランナー数を文字どおり文字型にし(ソロ|2ラン|3ラン|満塁)を保証する
   * @return {string} ランナー数(ソロ|2ラン|3ラン|満塁)
   */
  get shotText() {
    const shot = parseInt(this.shot, 10);
    switch (shot) {
      case 1: {
        return 'ソロ';
      }
      case 2:
      case 3: {
        return `${shot}ラン`;
      }
      case 4: {
        return '満塁';
      }
      case 0: {
        return '';
      }
      default: {
        return this.shot;
      }
    }
  }
  // ---
  /**
   * イニング, 3回表, 現在数字のみ
   * @return {string} イニング, 3回表
   */
  get inning() {
    return this.origin.inning;
  }
  /**
   * 被投手名
   * @return {string} 被投手名
   */
  get pitcher() {
    return this.origin.pitcher;
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

