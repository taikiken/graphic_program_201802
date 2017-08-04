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
export class DaePlayer {
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
    this.no = Normalize.int(origin.bat_no, 0);
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
    /**
     * 選手名
     * @type {string}
     */
    this.player = Normalize.str(origin.name);
  }
}

// sort
// @see http://qiita.com/cocottejs/items/511f6be58efe00339498
// sort(function(x, y){
// return x.line - y.line || x.column - y.column;
// });
/**
 * 打席順にソートします
 * @param {DaePlayer} base ソート項目 A
 * @param {DaePlayer} target ソート項目 B
 * @returns {number} +-N or 0
 * @see https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 * @see http://qiita.com/cocottejs/items/511f6be58efe00339498
 */
const orderByNo = (base, target) => (base.no - target.no);

/**
 * 選手一覧
 * - DaePlayers
 *   - {@link DaePlayer}
 */
export class DaePlayers {
  /**
   * 初期化します
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const players = {};
    const members = {
      batters: [],
      pitchers: [],
      battersOrder: null,
      pitchersOrder: null,
    };
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 選手 ID リスト
     * @type {Array}.<DaePlayer>
     */
    this.list = Object.keys(origin).map((playerId) => {
      const id = parseInt(playerId, 10);
      const player = new DaePlayer(origin[playerId]);
      players[id] = player;
      // if (player.position === '投') {
      //   members.pitchers.push(player);
      // } else {
      //   members.batters.push(player);
      // }
      // どちらにもデータ存在可能
      // batting / pitching data が存在する時に members へ push
      if (player.batting.has) {
        members.batters.push(player);
      }
      if (player.pitching.has) {
        members.pitchers.push(player);
      }
      return player;
    });
    // 配列クローンを作成し打席順にソートします
    members.battersOrder = members.batters.slice(0).sort(orderByNo);
    members.pitchersOrder = members.pitchers.slice(0).sort(orderByNo);
    /**
     * player id を key, value を {@link DaePlayer} した object
     * @type {object}
     */
    this.players = players;
    /**
     * 打者・投手 それぞれで {@link DaePlayer} をリストします
     * - batters / pitchers - data 通り
     * - battersOrder / pitchersOrder - 打席順
     * @type {{
     *  batters: Array.<DaePlayer>,
     *  pitchers: Array.<DaePlayer>,
     *  battersOrder: Array.<DaePlayer>,
     *  pitchersOrder: Array.<DaePlayer>,
     * }}
     */
    this.members = members;
  }
}

// member_info.json - 選手情報
/**
 * メンバー情報json - member_info.json
 * - DaeMemberInfo
 *   - {@link DaePlayers}
 *     - {@link DaePlayer}
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
      // const data = new DaePlayers(origin[teamId]);
      players[id] = new DaePlayers(origin[teamId]);
      return id;
    });
    /**
     * team id を key, value を {@link DaePlayers} した object
     * @type {object}
     */
    this.players = players;
  }
  /**
   * team id で選手リスト {@link DaePlayers} を取得します
   * @param {number} id team id
   * @returns {DaePlayers} 選手リストを返します
   */
  team(id) {
    return this.players[id];
  }
}
