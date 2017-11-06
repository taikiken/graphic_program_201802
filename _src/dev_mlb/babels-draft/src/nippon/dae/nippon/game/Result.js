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

// data
import Pitcher from './Pitcher';

/**
 * 試合結果: 試合終了後に出現します, 引き分け時、winPitcher、savePitcher、losePitcherは空になります。
 * JSON.response.gameinfo.result
 */
export default class Result {
  /**
   * 試合結果: 試合終了後に出現します
   * @param {Object} json JSON.response.gameinfo.result
   */
  constructor(json) {
    // let result = json;
    // let has = true;
    // if (Type.nil(result) || !Type.exist(result)) {
    //   result = {};
    //   has = false;
    // }
    let has = !!json;
    const origin = has ? json : {};
    /**
     * 生 JSON
     * @type {Object}
     */
    this.origin = origin;
    const win = new Pitcher(origin.winPitcher);
    const lose = new Pitcher(origin.LosePitcher);
    const save = new Pitcher(origin.SavePitcher);
    /**
     * 勝利投手
     * @type {Pitcher}
     */
    this.win = win;
    /**
     * 敗戦投手
     * @type {Pitcher}
     */
    this.lose = lose;
    /**
     * セーブ投手
     * @type {Pitcher}
     */
    this.save = save;
    // 各ピッチャーデータをもとに有無を判断
    if (!win.has && !lose.has && !save.has) {
      has = false;
    }
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
   * 勝利チーム, 0=ビジター、1=ホーム
   * @return {number} 勝利チーム, 0=ビジター、1=ホーム、2=引き分け
   */
  get winTeam() {
    return this.origin.winTeam;
  }
  // ---
  /**
   * 勝利チームはホームorビジター どっち, 引き分けはホーム
   * @return {boolean} true: ホーム
   */
  get home() {
    return this.winTeam !== 0;
  }
}
