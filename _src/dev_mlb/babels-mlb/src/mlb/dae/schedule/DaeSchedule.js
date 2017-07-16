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

import Type from '../../../moku/util/Type';

// game 毎の選手情報
class DaePlayer {
  constructor(player) {
    const origin = player || {};
    this.origin = origin;
    this.player = origin.name || '';
    this.team = origin.team_name || '';
    this.number = Type.int(origin.number) ? origin.number : -1;
    this.average = origin.average || '';
    this.bats = Type.int(origin.bats) ? origin.bats : -1;
    this.hits = Type.int(origin.hits) ? origin.hits : -1;
    this.runs = Type.int(origin.runs) ? origin.runs : -1;
  }
}

// game 毎の選手情報 -> DaePlayer
class DaePlayers {
  constructor(players) {
    const origin = players || [];
    this.origin = origin;
    this.games = origin.map(player => (new DaePlayer(player)));
  }
}

// game 毎の対戦チーム情報
class DaeTeam {
  constructor(team) {
    const origin = team || {};
    this.origin = origin;
    this.score = Type.int(origin.score) ? origin.score : 0;
    this.id = Type.int(origin.score) ? origin.score : 0;
    this.team = origin.team_name || '';
  }
}

// game 毎の対戦情報
class DaeGame {
  constructor(game) {
    const origin = game || {};
    this.origin = origin;
    const home = origin.home || {};
    const visitor = origin.visitor || {};
    this.id = Type.int(origin.game_id) ? origin.game_id : -1;
    this.studium = origin.studium || '';
    this.status = Type.int(origin.status_id) ? origin.status_id : -1;
    this.home = new DaeTeam(home);
    this.visitor = new DaeTeam(visitor);
    this.players = new DaePlayers(origin.player);
  }
}

// game 毎の対戦情報 -> DaeGame
class DaeGames {
  constructor(games) {
    const origin = games || [];
    this.origin = origin;
    this.games = origin.map(game => (new DaeGame(game)));
  }
}

// japanese
class DaeJapanese {
  constructor(japanese) {
    const origin = japanese || [];
    this.origin = origin;
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
    const origin = schedules || {};
    const schedule = origin.schedule || {};
    const inter = schedule.inter_league;
    const regular = schedule.regular_season || {};
    const american = regular.american;
    const national = regular.national;
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
    this.date = origin.play_date || '';
    // 試合種別毎
    /**
     * ゲーム情報 -  inter league
     * @type {DaeGames}
     */
    this.inter = new DaeGames(inter);
    /**
     * ゲーム情報 -  american league
     * @type {DaeGames}
     */
    this.american = new DaeGames(american);
    /**
     * ゲーム情報 -  national league
     * @type {DaeGames}
     */
    this.national = new DaeGames(national);
    // 日本人選手
    /**
     * 試合に出場した日本人選手
     * @type {DaeJapanese}
     */
    this.japanese = new DaeJapanese(origin.japanese_players);
  }
}
