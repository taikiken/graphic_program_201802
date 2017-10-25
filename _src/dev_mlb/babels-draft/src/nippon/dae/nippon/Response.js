/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

// data
import Status from './Status';
import GameInfo from './GameInfo';
import Teams from './Teams';

/**
 * 日本シリーズ JSON.response
 * ```
 * Response
 *    Status
 *    GameInfo
 *      ScoreTexts
 *        ScoreText
 *      Result
 *        game.Pitcher
 *    Teams
 *      Team
 *        TeamInfo
 *        Starter
 *          team.Pitcher
 *          Batters
 *        Score
 *          Innings
 *            Inning
 *        Homers
 *          Homer
 *        Battery
 *          Pitchers
 *            team.Pitcher
 *          Fielders
 *            Fielder
 * ```
 */
export default class Response {
  /**
   * 日本シリーズ JSON.response
   * @param {Object} json JSON.response
   */
  constructor(json) {
    // let response = json;
    // if (Type.nil(response) || !Type.exist(response)) {
    //   response = {};
    // }
    const origin = json || {};
    /**
     * JSON.response 生データ
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 試合状態: JSON.response.status
     * @type {Status}
     */
    this.status = new Status(origin.status);
    const gameInfo = new GameInfo(origin.gameinfo);
    /**
     * 試合情報: JSON.response.gameinfo
     * @type {GameInfo}
     */
    this.gameInfo = gameInfo;
    /**
     * alias gameInfo, 試合情報: JSON.response.gameinfo
     * @type {GameInfo}
     */
    this.game = gameInfo;
    const teams = new Teams(origin.team);
    /**
     * チーム情報
     * @type {Teams}
     */
    this.teams = teams;
    // -------------------------------
    // home / visitor チーム情報を取得しやすいように加工します
    let home = null;
    let visitor = null;
    teams.teams.map((team) => {
      if (!team.has) {
        return team;
      }
      if (team.home) {
        home = team;
      } else if (team.visitor) {
        visitor = team;
      }
      return team;
    });
    /**
     * チーム情報・ホームチーム
     * @type {?Team}
     */
    this.home = home;
    /**
     * チーム情報・ビジター
     * @type {?Team}
     */
    this.visitor = visitor;
    // -------------------------------
    // ホーム・ビジター どっちが勝った
    let winner = null;
    let loser = null;
    let even = false;
    if (
      gameInfo.has &&
      home && visitor &&
      home.has && visitor.has
    ) {
      if (gameInfo.result.home) {
        // ホームチームが勝った
        winner = home;
        loser = visitor;
      } else {
        winner = visitor;
        loser = home;
      }
      even = home.score.total === visitor.score.total;
    }
    /**
     * 勝利チーム情報
     * @type {?Team}
     */
    this.winner = winner;
    /**
     * 敗戦チーム情報
     * @type {?Team}
     */
    this.loser = loser;
    /**
     * 引き分けフラッグ
     * @type {boolean}
     */
    this.even = even;
  }
}
