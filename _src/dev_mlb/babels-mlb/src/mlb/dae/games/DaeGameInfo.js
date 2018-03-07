/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/16 - 16:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
import Normalize from '../../util/Normalize';
import Day from '../../util/Day';
import Status from '../../define/Status';

/**
 * [native code] - parseInt
 * @type {Function}
 */
const parseInt = self.parseInt;

/**
 * チーム別成績 - 詳細
 */
class DaeRecord {
  /**
   * チーム別成績
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
     * 勝ち数
     * @type {number}
     */
    this.wins = Normalize.int(origin.wins);
    /**
     * 負け数
     * @type {number}
     */
    this.losses = Normalize.int(origin.losses);
    /**
     * 引分け数
     * @type {number}
     */
    this.ties = Normalize.int(origin.ties);
  }
}

/**
 * チーム別成績
 */
class DaeRecords {
  /**
   * チーム別成績
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
     * home team 成績
     * @type {DaeRecord}
     */
    this.home = new DaeRecord(origin.home);
    /**
     * visitor team 成績
     * @type {DaeRecord}
     */
    this.visitor = new DaeRecord(origin.visitor);
  }
}

/**
 * 予告登板投手情報 - 詳細
 */
class DaePitcher {
  /**
   * 予告登板投手情報 - 詳細
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
     * 防御率
     * 小数点が含まれる文字列（1.05など）
     * @type {string}
     */
    this.average = Normalize.str(origin.average);
    /**
     * 投球数
     * @type {string}
     */
    this.pitches = Normalize.str(origin.games_pitched);
    /**
     * 回当たりの被安打数 - 小数点
     * @type {string}
     */
    this.inningHits = Normalize.str(origin.innings_pitched);
    /**
     * 被安打数 - ゲームの
     * @type {number}
     */
    this.hits = Normalize.int(origin.hits);
    /**
     * シーズン被打数
     * @type {number}
     */
    this.seasonHits = Normalize.int(origin.season_hits);
    /**
     * 自責点
     * @type {number}
     */
    this.runs = Normalize.int(origin.runs);
    /**
     * シーズン自責点
     * @type {number}
     */
    this.seasonRuns = Normalize.int(origin.season_runs);
    /**
     * 登板順
     * @type {number}
     */
    this.sequence = Normalize.int(origin.sequence);
    /**
     * 勝利数
     * @type {number}
     */
    this.wins = Normalize.int(origin.wins);
    /**
     * 敗戦数
     * @type {number}
     */
    this.losses = Normalize.int(origin.losses);
    /**
     * セーブ数
     * @type {number}
     */
    this.saves = Normalize.int(origin.saves);
    /**
     * ホールド数
     * @type {number}
     */
    this.holds = Normalize.int(origin.holds);
    /**
     * 選手名称
     * @type {string}
     */
    this.player = Normalize.str(origin.name);
    /**
     * 背番号
     * @type {number}
     */
    this.number = Normalize.int(origin.number);
    /**
     * 登板試合数
     * @type {number}
     */
    this.games = Normalize.int(origin.games);
    /**
     * 投げる - 右・左・両
     * @type {string}
     */
    this.hand = Normalize.str(origin.hand);
    /**
     * 打つ - 右・左・両
     * @type {string}
     */
    this.batHand = Normalize.str(origin.bat_hand);
  }
}

/**
 * 予告登板投手情報
 */
class DaeStarting {
  /**
   * 予告当番投手情報
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
     * home team 予告登板投手情報
     * @type {DaePitcher}
     */
    this.home = new DaePitcher(origin.home);
    /**
     * visitor team 予告登板投手情報
     * @type {DaePitcher}
     */
    this.visitor = new DaePitcher(origin.visitor);
  }
}

/**
 * スコアボード・リスト
 */
export class DaeScores {
  /**
   * スコアボード・リスト
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const scores = {};
    let total = 0;
    const list = Object.keys(origin).map((inning) => {
      const score = Normalize.int(origin[inning], 0);
      total += score;
      scores[parseInt(inning, 10)] = {
        score,
        total,
      };
      return score;
    });
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * イニング 1 ~ {number} key に {{score: number, total: number}} object
     * @type {object}
     */
    this.score = scores;
    /**
     * 得点のみリスト
     * @type {Array.<number>}
     */
    this.list = list;
    /**
     * 総得点数
     * @type {number}
     */
    this.total = total;
    /**
     * 回数
     * @type {Number}
     */
    this.innings = list.length;
  }
}

/**
 * イニング情報 - 各回の詳細情報
 */
export class DaeInnings {
  /**
   * イニング情報 - 各回の詳細情報
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
     * エラー数
     * @type {number}
     */
    this.errors = Normalize.int(origin.errors);
    /**
     * 安打数
     * @type {number}
     */
    this.hits = Normalize.int(origin.hits);
    /**
     * team ID
     * @type {number}
     */
    this.id = Normalize.int(origin.team_id);
    /**
     * チーム名称
     * @type {string}
     */
    this.team = Normalize.str(origin.team_name);
    /**
     * スコアボード配列
     * 回毎の得点が格納されます。添字が１であれば1回２であれば2回
     * @type {DaeScores}
     */
    this.scores = new DaeScores(origin.scores);
    /**
     * team name - japanese
     * @type {string}
     */
    this.jp = Normalize.str(origin.team_name_jp);
    /**
     * team name 頭文字 - スコアボード表示に使用します
     * @type {string}
     */
    this.initials = Normalize.str(origin.team_name_shorten);
  }
}

/**
 * イニング情報
 */
class DaeBoard {
  /**
   * イニング情報
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
     * home team イニング情報
     * @type {DaeInnings}
     */
    this.home = new DaeInnings(origin.home);
    /**
     * visitor team イニング情報
     * @type {DaeInnings}
     */
    this.visitor = new DaeInnings(origin.visitor);
  }
}

/**
 * 試合情報json - game_info.json
 *
 * 指定した試合IDの基本的な試合情報を返却します。
 * 試合情報、成績、イニング速報各ページでスコアボードなどの表示に使用されることを想定しています。
 * @see https://aws-plus.backlog.jp/wiki/UNDO_MLBSTATS/%E3%83%90%E3%83%83%E3%82%AF%E3%82%A8%E3%83%B3%E3%83%89%2Fjson%2F%E8%A9%A6%E5%90%88%E6%83%85%E5%A0%B1json
 */
export default class DaeGameInfo {
  /**
   * 各試合除法
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const board = new DaeBoard(origin.score_board);
    const starting = new DaeStarting(origin.starting_pitcher);
    const record = new DaeRecords(origin.team_record);
    const playDate = Normalize.str(origin.play_date);
    // @type {Date}
    const date = playDate && playDate.length && playDate.length === 8 ?
      Day.convert(playDate) : Day.current();
    const status = Normalize.int(origin.status_id);
    // property
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 試合日 - YYYYMMDD
     * @type {string}
     */
    this.playDate = playDate;
    /**
     * playDate - Date 変換
     * @type {Date}
     */
    this.date = date;
    /**
     * ○月○日（曜日）
     * @type {string}
     */
    this.title = Day.title(Day.date(date));
    /**
     * 試合日を数値変換し年・月・日に分解します
     * @type {{year: number, month: number, day: number}}
     */
    this.calendar = Day.date(date);
    /**
     * 試合ステータス
     * 1: 試合前 2: 試合中 4: 試合終了 5: 延期 6: サスペンド 9: キャンセル 10: 没収 23: 遅延/中断
     * @type {number}
     */
    this.status = status;
    /**
     * status - 日本語ラベル
     * {@link Status.label}
     * @type {string}
     */
    this.label = Status.label(status);
    //
    /**
     * status - class name
     * - 試合前 -> .mlb_live__overview__info__status--before
     * - 試合中 -> mlb_live__overview__info__status--live
     * - 試合終了 -> mlb_live__overview__info__status--end
     * - 試合中止 -> mlb_live__overview__info__status--cancel
     * {@link Status.liveClassName}
     * @type {string}
     */
    this.className = Status.liveClassName(status);
    /**
     * 勝投手
     * @type {string}
     */
    this.win = Normalize.str(origin.win);
    /**
     * 負投手
     * @type {string}
     */
    this.lose = Normalize.str(origin.lose);
    /**
     * セーブ投手
     * @type {string}
     */
    this.save = Normalize.str(origin.save);
    /**
     * バッテリー配列
     * @type {Array}
     */
    this.batteries = Normalize.arr(origin.batteries);
    /**
     * ホームラン情報
     * @type {Array}
     */
    this.hr = Normalize.arr(origin.hr);
    /**
     * イニング情報
     * @type {DaeBoard}
     */
    this.board = board;
    /**
     * 先発投手 - 予告登板
     * @type {DaeStarting}
     */
    this.starting = starting;
    /**
     * チーム別成績
     * @type {DaeRecord}
     */
    this.record = record;
    // ---
    // custom
    /**
     * home team information
     * @type {{
     *   id: number,
     *   board: DaeInnings,
     *   starting: DaePitcher,
     *   record: DaeRecord,
     *   total: number,
     *   win: boolean,
     *   hits: number,
     *   errors: number,
     *   innings: number,
     *   scores: DaeScores,
     *   jP: string,
     *   initials: string,
     *   pitcher: DaePitcher
     * }}
     */
    this.home = {
      id: board.home.id,
      team: board.home.team,
      board: board.home,
      starting: starting.home,
      record: record.home,
      total: board.home.scores.total,
      win: board.home.scores.total > board.visitor.scores.total,
      hits: board.home.hits,
      errors: board.home.errors,
      innings: board.home.scores.innings,
      scores: board.home.scores,
      jp: board.home.jp,
      initials: board.home.initials,
      pitcher: starting.home,
    };
    /**
     * visitor team information
     * @type {{
     *   id: number,
     *   board: DaeInnings,
     *   starting: DaePitcher,
     *   record: DaeRecord,
     *   total: number,
     *   win: boolean,
     *   hits: number,
     *   errors: number,
     *   innings: number,
     *   scores: DaeScores,
     *   jP: string,
     *   initials: string,
     *   pitcher: DaePitcher
     * }}
     */
    this.visitor = {
      id: board.visitor.id,
      team: board.visitor.team,
      board: board.visitor,
      starting: starting.visitor,
      record: record.visitor,
      total: board.visitor.scores.total,
      win: board.visitor.scores.total > board.home.scores.total,
      hits: board.visitor.hits,
      errors: board.visitor.errors,
      innings: board.visitor.scores.innings,
      scores: board.visitor.scores,
      jp: board.visitor.jp,
      initials: board.visitor.initials,
      pitcher: starting.visitor,
    };
    /**
     * 試合会場（stadium）
     * @type {string}
     */
    this.stadium = Normalize.str(origin.stadium);
    /**
     * 試合経過回数 - visitor.innings
     * @type {number}
     */
    this.innings = board.visitor.scores.innings;
    /**
     * オープン戦 flag
     * @type {boolean}
     * @since 2019-03-02
     * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-470
     */
    this.spring = origin.is_spring;
  }
}
