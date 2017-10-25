/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:51
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
 * 試合結果・投手成績
 * JSON.response.gameinfo.result.[winPitcher|LosePitcher|SavePitcher]
 */
export default class Pitcher {
  /**
   * 試合結果・投手成績
   * @param {Object} json 試合結果・投手成績
   * JSON.response.gameinfo.result.[winPitcher|LosePitcher|SavePitcher]
   */
  constructor(json) {
    // let pitcher = json;
    // let has = true;
    // if (Type.nil(pitcher) || !Type.exist(pitcher)) {
    //   pitcher = {};
    //   has = false;
    // }
    let has = !!json;
    const origin = has ? json : {};
    /**
     * 試合結果・投手成績, JSON 生データ
     * @type {Object}
     */
    this.origin = origin;
    // key がないことがあるようです
    const notKeys = Object.keys(origin).map(key => key);
    if (notKeys.length === 0) {
      has = false;
    } else if (origin.name && origin.name.nameS) {
      // 名前と名前ショートがあれば OK
      has = true;
    }
    // // 値が null 設定の時があるようで null check 追加します
    // const foundNull = Object.values(pitcher).some(data => data === null);
    // // null が一つでもあれば false
    // if (foundNull) {
    //   has = false;
    // }
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    // console.log('pitcher', notKeys, has, pitcher);
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
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
   * 通算勝利数
   * @return {string} 0 ~ , 通算勝利数 だけどなぜか文字型
   */
  get win() {
    return this.origin.win;
  }
  /**
   * 通算敗戦数
   * @return {string} 0 ~ , 通算敗戦数 だけどなぜか文字型
   */
  get lose() {
    return this.origin.lose;
  }
  /**
   * 通算セーブ数
   * @return {string} 0 ~ , 通算セーブ数 だけどなぜか文字型
   */
  get save() {
    return this.origin.save;
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
