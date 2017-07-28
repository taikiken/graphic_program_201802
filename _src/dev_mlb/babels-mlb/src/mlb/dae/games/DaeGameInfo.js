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
    this.lose = Normalize.int(origin.lose);
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
class DaeScores {
  /**
   * スコアボード・リスト
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const scores = {};
    let total = 0;
    const innings = Object.keys(origin).map((inning) => {
      const score = Normalize.int(origin[inning], 0);
      scores[parseInt(inning, 10)] = score;
      total += score;
      return score;
    });
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * イニング {number} key に 得点 {number} object
     * @type {object}
     */
    this.score = scores;
    /**
     * 得点のみリスト
     * @type {Array.<number>}
     */
    this.innings = innings;
    /**
     * 総得点数
     * @type {number}
     */
    this.total = total;
  }
}

/**
 * イニング情報 - 各回の詳細情報
 */
class DaeInnings {
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
    this.hits = Normalize.int(origin.errors);
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
    this.sccores = new DaeScores(origin.scores);
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
    this.date = date;
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
    this.label = Status.label(status);
    // 試合前 -> .mlb_live__overview__info__status--end
    // 試合中 -> mlb_live__overview__info__status--live
    // 試合終了 -> mlb_live__overview__info__status--end
    // 試合中止 -> mlb_live__overview__info__status--cancel
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
     *   win: boolean
     * }}
     */
    this.home = {
      id: board.home.id,
      team: board.home.team,
      board: board.home,
      starting: starting.home,
      record: record.home,
      total: board.home.sccores.total,
      win: board.home.sccores.total > board.visitor.sccores.total,
    };
    /**
     * visitor team information
     * @type {{
     *   id: number,
     *   board: DaeInnings,
     *   starting: DaePitcher,
     *   record: DaeRecord
     * }}
     */
    this.visitor = {
      id: board.visitor.id,
      team: board.visitor.team,
      board: board.visitor,
      starting: starting.visitor,
      record: record.visitor,
      total: board.visitor.sccores.total,
      win: board.visitor.sccores.total > board.home.sccores.total,
    };
    this.stadium = Normalize.str(origin.stadium);
  }
}
