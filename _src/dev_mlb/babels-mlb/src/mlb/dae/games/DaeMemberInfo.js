/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 17:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
import Normalize from '../../util/Normalize';

// player
import DaeBatting from '../player/DaeBatting';
import DaePitching from '../player/DaePitching';

/**
 * [native code] parseInt
 * @type {Function}
 */
const parseInt = self.parseInt;

/**
 * 選手成績
 */
class DaePlayer {
  /**
   * 選手成績
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
     * player ID
     * @type {number}
     */
    this.id = Normalize.int(origin.player_id);
    /**
     * team id
     * @type {number}
     */
    this.teamId = Normalize.int(origin.team_id);
    /**
     * 投、一、二、三、遊など。
     * @type {number}
     */
    this.position = Normalize.str(origin.position);
    /**
     * ポジション分類 - レフトであれば「外野手」、一塁
     * @type {string}
     */
    this.category = Normalize.str(origin.position_category);
    /**
     * 国 ID
     * @type {number}
     */
    this.country = Normalize.int(origin.country);
    /**
     * 背番号
     * @type {number}
     */
    this.number = Normalize.int(origin.number);
    /**
     * 打順
     * @type {number}
     */
    this.bat = Normalize.int(origin.bat_no);
    /**
     * 打撃成績
     * @type {DaeBatting}
     */
    this.batting = new DaeBatting(origin.batting);
    /**
     * 投手成績
     * @type {DaePitching}
     */
    this.pitching = new DaePitching(origin.pitching);
  }
}

/**
 * 選手一覧
 */
class DaePlayers {
  constructor(info) {
    const origin = Normalize.obj(info);
    const players = {};
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 選手 ID リスト
     * @type {Array}.<number>
     */
    this.ids = Object.keys(origin).map((playerId) => {
      const id = parseInt(playerId, 10);
      players[id] = new DaePlayer(origin[playerId]);
      return id;
    });
    /**
     * palyer id を key, value を {@link DaePlayer} した object
     * @type {object}
     */
    this.players = players;
  }
}

// member_info.json - 選手情報
/**
 * メンバー情報json - member_info.json
 */
export default class DaeMemberInfo {
  /**
   * 選手成績
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const players = {};
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * team id list
     * @type {Array.<number>}
     */
    this.ids = Object.keys(origin).map((teamId) => {
      const id = parseInt(teamId, 10);
      const data = new DaePlayers(origin[teamId]);
      players[id] = data;
      return id;
    });
    /**
     * team id を key, value を {@link DaePlayers} した object
     * @type {object}
     */
    this.players = players;
  }
}
