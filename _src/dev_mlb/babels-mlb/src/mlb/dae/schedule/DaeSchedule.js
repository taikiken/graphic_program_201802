/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/15 - 18:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
import Normalize from '../../util/Normalize';

// dae/player
import DaePitching from '../player/DaePitching';
import DaeBatting from '../player/DaeBatting';

/**
 * game 毎の日本人選手情報
 */
class DaeJapanesePlayer {
  /**
   * 日本人選手情報
   * @param {object} player JSON
   */
  constructor(player) {
    const origin = Normalize.obj(player);
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
    this.id = Normalize.int(origin.id);
    /**
     * 選手名称
     * @type {string}
     */
    this.player = Normalize.str(origin.name);
    /**
     * 所属チーム
     * @type {string}
     */
    this.team = Normalize.str(origin.team_name);
    /**
     * 背番号
     * @type {number}
     */
    this.number = Normalize.int(origin.number);
    /**
     * 打撃成績
     * @type {DaeBatting}
     */
    this.batting = new DaeBatting(origin.batting);
    this.pitching = new DaePitching(origin.pitching);
  }
}

/**
 * 日本人選手リスト
 * game 毎の選手情報 -> DaeJapanesePlayer - 日本人選手
 */
class DaeJapanesePlayers {
  /**
   * 日本人選手リスト
   * @param {Array} players JSON
   */
  constructor(players) {
    const origin = Normalize.arr(players);
    // ---
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * 日本人選手リスト
     * @type {Array.<DaeJapanesePlayer>}
     */
    this.list = origin.map(player => (new DaeJapanesePlayer(player)));
  }
}

/**
 * game 毎の対戦チーム情報
 */
class DaeGameTeam {
  /**
   * game 毎の対戦チーム情報
   * @param {object} team JSON
   */
  constructor(team) {
    const origin = Normalize.obj(team);
    // ---
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 得点
     * @type {number}
     */
    this.score = Normalize.int(origin.score);
    /**
     * チーム ID
     * @type {number}
     */
    this.id = Normalize.int(origin.team_id);
    /**
     * チーム名称
     * @type {string}
     */
    this.team = Normalize.str(origin.team_name);
  }
}

/**
 * game 毎の対戦情報
 */
class DaeGame {
  /**
   * game 毎の対戦情報
   * @param {object} game JSON
   */
  constructor(game) {
    const origin = Normalize.obj(game);
    const home = Normalize.obj(origin.home);
    const visitor = Normalize.obj(origin.visitor);
    // ----
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * game ID
     * @type {number}
     */
    this.id = Normalize.int(origin.game_id);
    /**
     * 球場名
     * @type {string}
     */
    this.studium = Normalize.str(origin.studium);
    /**
     * ゲーム status {@link Status}
     * @type {number}
     */
    this.status = Normalize.int(origin.status_id);
    /**
     * ホームチーム
     * @type {DaeGameTeam}
     */
    this.home = new DaeGameTeam(home);
    /**
     * ビジターチーム
     * @type {DaeGameTeam}
     */
    this.visitor = new DaeGameTeam(visitor);
    /**
     * ゲーム毎の選手情報
     * @type {DaeJapanesePlayers}
     */
    this.players = new DaeJapanesePlayers(origin.player);
  }
}

/**
 * game 毎の対戦情報 -> DaeGame
 * - DaeGames
 *   - {@link DaeGame}
 *     - {@link DaeGameTeam}
 *     - {@link DaeJapanesePlayers}
 *       - {@link DaeJapanesePlayer}
 */
class DaeGames {
  /**
   * game 毎の対戦情報
   * @param {Array} games JSON
   */
  constructor(games) {
    const origin = Normalize.arr(games);
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * 対戦情報リスト
     * @type {Array.<DaeGame>}
     */
    this.games = origin.map(game => (new DaeGame(game)));
  }
}

/**
 * 日本人選手成績リストを作成します
 */
class DaeJapanese {
  /**
   * 日本人選手成績リスト
   * @param {Array} japanese JSON
   */
  constructor(japanese) {
    const origin = Normalize.arr(japanese);
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * 日本人選手成績リスト
     * @type {Array.<DaeGame>}
     */
    this.games = origin.map(game => (new DaeGame(game)));
  }
}

// スケジュール JSON
/**
 * `master/schedule/YYYYMMDD.json` - スケジュール JSON
 * 指定した日付の試合スケジュールを返却します。
 * ア・リーグ、ナ・リーグ両方の情報を含んでいます。
 * 日程結果ページで使用される想定です。
 *
 * スタッツジャパンからスケジュール情報が更新された際にjsonも更新されます。
 * 日に一回更新ということですが、現状詳細な時間までわかっていません。
 *
 * スケジュール JSON -> 試合情報json - game_info.json
 * スケジュール JSON -> チーム情報json - team_info.json
 * スケジュール JSON -> メンバー情報json - member_info.json - 出場成績画面
 * 【試合終了以外】
 * スケジュール JSON -> イニング情報json - innings.json - イニング速報画面
 * @see https://aws-plus.backlog.jp/wiki/UNDO_MLBSTATS/%E3%83%90%E3%83%83%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%89%2Fjson%2F%E8%A9%A6%E5%90%88%E6%97%A5%E7%A8%8Bjson
 */
export default class DaeSchedule {
  /**
   * スケジュール JSON をパースし使用し易いように加工します
   * @param {object} schedules `master/schedule/YYYYMMDD.json` - スケジュール JSON
   */
  constructor(schedules) {
    const origin = Normalize.obj(schedules);
    const schedule = Normalize.obj(origin.schedule);
    const regular = Normalize.obj(schedule.regular_season);
    // schedule
    /**
     * スケジュール JSON original
     * @type {*}
     */
    this.origin = origin;
    /**
     * 試合日 YYYYMMDD
     * @type {*}
     */
    this.date = Normalize.str(origin.play_date);
    // 試合種別毎
    /**
     * ゲーム情報 -  inter league
     * @type {DaeGames}
     */
    this.inter = new DaeGames(schedule.inter_league);
    /**
     * ゲーム情報 -  american league
     * @type {DaeGames}
     */
    this.american = new DaeGames(regular.american);
    /**
     * ゲーム情報 -  national league
     * @type {DaeGames}
     */
    this.national = new DaeGames(regular.national);
    // 日本人選手
    // TODO: batter pitcher に別れるらしい
    /**
     * 試合に出場した日本人選手
     * @type {DaeJapanese}
     */
    this.japanese = new DaeJapanese(origin.japanese_players);
  }
}
