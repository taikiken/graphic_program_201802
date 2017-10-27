/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 15:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

// moku/util
// import Type from '../../../moku/util/Type';

// data/flash
import Team from './Team';

// data/flash/convert
import TeamNames from './convert/TeamNames';
import Nominates from './convert/Nominates';

/**
 * JSON.response.team
 *
 * data 構造
 * ```
 * Teams
 *    Team
 *      Info
 *      Draft
 *        Roster:roaster
 *          Players
 *            Player
 *            Nominate
 *          Orders
 *         Roster:development
 *
 *   TeamNames
 *   Nominates
 * ```
 */
export default class Teams {
  /**
   * 12球団分。配列0-11。1巡目の指名順の指名順に並んでいます
   * @param {Array<Object>} json 12球団分。配列0-11。1巡目の指名順の指名順に並んでいます
   */
  constructor(json) {
    // let teams = teamData;
    // if (!Type.array(teams)) {
    //   teams = [];
    // }
    const origin = Array.isArray(json) ? json : [];
    const teamNames = new TeamNames();
    const rosterNominate = new Nominates();
    const developmentNominate = new Nominates();
    /**
     * JSON 生データ
     */
    this.origin = origin;
    /**
     * 12球団分。配列0-11。1巡目の指名順に並んでいます
     * @type {Array<Team>}
     */
    this.teams = origin.map((team) => {
      // console.log('team', team);
      // チーム Info
      const teamInstance = new Team(team);
      // チーム情報をオーダー順に追加します
      teamNames.add(teamInstance.info);

      const rosters = teamInstance.rosters;
      const teamId = teamInstance.info.teamId;
      // 支配下選手
      rosters.numbers.map((nominateOrder) => {
        rosterNominate.add(nominateOrder, teamId, rosters.data(nominateOrder));
        return nominateOrder;
      });

      // 育成枠選手
      const developments = teamInstance.developments;
      developments.numbers.map((developmentOrder) => {
        developmentNominate.add(developmentOrder, teamId, developments.data(developmentOrder));
        return developmentOrder;
      });

      return teamInstance;
    });
    /**
     * チーム情報を管理します
     * @type {TeamNames}
     */
    this.teamNames = teamNames;
    /**
     * 支配下選手をオーダー順に並べます
     * @type {Nominates}
     */
    this.rosterNominate = rosterNominate;
    /**
     * 育成枠選手をオーダー順に並べます
     * @type {Nominates}
     */
    this.developmentNominate = developmentNominate;
  }
}
