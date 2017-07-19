/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/16 - 17:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// dae
import Normalize from '../../util/Normalize';

/**
 * 試合出場選手情報
 */
class DaePlayer {
  /**
   * 試合出場選手情報
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    // ---
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 選手 ID
     * @type {number}
     */
    this.id = Normalize.int(origin.player_id);
    /**
     * 打順
     * @type {number}
     */
    this.no = Normalize.int(origin.bat_no);
    /**
     * 背番号
     * @type {number}
     */
    this.number = Normalize.int(origin.number);
    /**
     * 出身国 - TODO: string になるらしい
     * @type {number}
     */
    this.country = Normalize.int(origin.country);
    /**
     * 打ち方 - 右、左、両のいずれか
     * @type {string}
     */
    this.batHand = Normalize.str(origin.bat_hand);
    /**
     * 投げ方 - 右、左、両のいずれか
     * @type {string}
     */
    this.hand = Normalize.str(origin.hand);
    /**
     * 選手名
     * @type {string}
     */
    this.player = Normalize.str(origin.name);
    /**
     * ポジション - 投、一、二、三、遊など
     * @type {string}
     */
    this.position = Normalize.str(origin.position);
    /**
     * ポジション分類 - レフトであれば「外野手」、一塁手であれば「内野手」など
     * @type {string}
     */
    this.category = Normalize.str(origin.position_category);
  }
}

/**
 * 試合出場選手情報リスト
 */
class DaePlayers {
  /**
   * 試合出場選手情報リスト
   * @param {Array} info JSON
   */
  constructor(info) {
    const origin = Normalize.arr(info);
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * 試合出場選手
     * @type {Array.<DaePlayer>}
     */
    this.list = origin.map(player => (new DaePlayer(player)));
  }
}

/**
 * 対戦試合のチーム1情報
 */
class DaeTeam {
  /**
   * 対戦試合のチーム1情報
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 控え選手
     * @type {DaePlayers}
     */
    this.reserve = new DaePlayers(origin.reserve);
    /**
     * 先発選手
     * @type {DaePlayers}
     */
    this.starting = new DaePlayers(origin.starting);
  }
}

/**
 * 対戦試合のチーム情報json - team_info.json
 */
export default class DaeTeamInfo {
  /**
   * チーム情報
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const ids = Object.keys(origin);
    const teams = {};
    // ---
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 対戦試合のチーム情報
     * @type {Array.<DaeTeam>}
     */
    this.list = ids.map((id) => {
      const team = new DaeTeam(origin[id]);
      // id: string なので int 型変換します
      const num = parseInt(id, 10);
      teams[num] = team;
      return team;
    });
    /**
     * team id list
     * @type {Array.<number>}
     */
    this.ids = ids;
    /**
     * team id を key にした Object - {{TEAM_ID: DaeGameTeam}}
     * @type {object}
     */
    this.teams = teams;
  }
  /**
   * team id からチーム情報を取得します
   * @param {number} id team id
   * @returns {DaeTeam} チーム情報
   */
  team(id) {
    return this.teams[id];
  }
}
