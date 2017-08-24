/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 15:08
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
 * チーム名称
 */
class DaeTeam {
  /**
   * チーム名称
   * @param {{team_id: number, name: string}} info JSON
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
     * team ID
     * @type {number}
     */
    this.id = Normalize.int(origin.team_id);
    /**
     * team name
     */
    this.team = Normalize.str(origin.name);
    /**
     * team name 日本語 - いつの間にか追加されていた
     */
    this.jp = Normalize.str(origin.name_jp);
  }
}

/**
 * list.json - チーム種類
 */
export default class DaeTeamTypes {
  /**
   * チーム種類
   * @param {Array} info JSON
   */
  constructor(info) {
    const origin = Normalize.arr(info);
    const list = origin.map(team => (new DaeTeam(team)));
    const ids = {};
    const teams = {};
    list.map((team) => {
      // const name = team.team;
      const name = team.jp;
      const id = team.id;
      ids[name] = id;
      teams[id] = name;
      return name;
    });
    // ---
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * チームリスト
     * @type {Array.<string>}
     */
    this.list = list;
    /**
     * team name key: team id
     * @type {object}
     */
    this.ids = ids;
    /**
     * team id key: team name
     * @type {object}
     */
    this.teams = teams;
  }

  /**
   * チーム名称から ID を取得します
   * @param {string} name チーム名称
   * @returns {number} チーム ID
   */
  id(name) {
    // id を返す
    return Normalize.int(this.ids[name]);
  }
  /**
   * チーム ID からチーム名称を取得します
   * @param {number} id チーム ID
   * @returns {string} チーム名称を返します
   */
  team(id) {
    // team name を返す
    return Normalize.str(this.list[id]);
  }
}
