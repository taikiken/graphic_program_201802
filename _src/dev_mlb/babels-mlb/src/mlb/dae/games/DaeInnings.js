/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 15:55
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
 * 発生したイベント（事象） - 詳細
 */
class DaeEvent {
  /**
   * 発生したイベント（事象） - 詳細
   * @param {number} inning 回 1 ~
   * @param {object} info JSON
   */
  constructor(inning, info) {
    const origin = Normalize.obj(info);
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 投手名
     * @type {string}
     */
    this.pitcher = Normalize.str(origin.pitcher);
    /**
     * 打者名
     * @type {string}
     */
    this.batter = Normalize.str(origin.batter);
    /**
     * 結果 - 三振, 単打
     * @type {string}
     */
    this.result = Normalize.str(origin.result);
    /**
     * イベント後アウト数
     * @type {number}
     */
    this.out = Normalize.int(origin.out);
    /**
     * イベント後スコア
     * @type {number}
     */
    this.score = Normalize.int(origin.score);
    /**
     * イニング
     * @type {number}
     */
    this.inning = inning;
  }
}

/**
 * 発生したイベント（事象）
 */
class DaeEvents {
  /**
   * 発生したイベント（事象）
   * @param {number} inning 回 1 ~
   * @param {object} info JSON
   */
  constructor(inning, info) {
    const origin = Normalize.arr(info);
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * イベント個別情報
     * @type {Array.<DaeEvent>}
     */
    this.list = origin.map(event => new DaeEvent(inning, event));
    /**
     * イニング
     * @type {number}
     */
    this.inning = inning;
  }
}

/**
 * イニングの情報 - チーム別
 */
class DaeInningTeam {
  /**
   * イニングの情報 - チーム別
   * @param {number} inning 回 1 ~
   * @param {object} info JSON
   */
  constructor(inning, info) {
    const origin = Normalize.obj(info);
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 表示するタイトル文字列
     * @type {string}
     */
    this.title = Normalize.str(origin.title);
    /**
     * 発生したイベント（事象）
     * @type {DaeEvents}
     */
    this.events = new DaeEvents(inning, origin.events);
    /**
     * イニング
     * @type {number}
     */
    this.inning = inning;
  }
}

/**
 * イニングの情報
 */
class DaeInning {
  /**
   * インイングの情報
   * @param {number} inning 回 1 ~
   * @param {object} info JSON
   */
  constructor(inning, info) {
    const origin = Normalize.obj(info);
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * イニング
     * @type {number}
     */
    this.inning = inning;
    /**
     * visitor team インイングの情報
     * @type {DaeInningTeam}
     */
    this.visitor = new DaeInningTeam(inning, origin.visitor);
    /**
     * home team インイングの情報
     * @type {DaeInningTeam}
     */
    this.home = new DaeInningTeam(inning, origin.home);
  }
}

// innings.json - inning 情報
/**
 * イニング情報json
 * `{S3}/games/{yyyy}/{game_id}/innings.json`
 *
 * 指定した試合のイニング情報を返却します。
 * 回毎のイベントがホーム、ビジターとそれぞれ格納されます。
 * イニング速報画面で使用します。
 *
 * - DaeInnings
 *   - DaeInning
 *     - DaeInningTeam
 *       - DaeEvents
 *         - DaeEvent
 */
export default class DaeInnings {
  /**
   * イニング情報json
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const innings = Normalize.obj(origin.innings);
    const home = {};
    const visitor = {};
    const information = {};
    const board = {};
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 回毎の情報配列
     * @type {Array.<DaeInning>}
     */
    this.list = Object.keys(innings).map((inning) => {
      // inning: string なので int 型変換します
      const num = parseInt(inning, 10);
      // @type {DaeInning}
      const data = new DaeInning(num, innings[inning]);
      // home / visitor 毎にセットします
      home[num] = data.home;
      visitor[num] = data.visitor;
      information[num] = data;
      board[num] = {
        home: data.home,
        visitor: data.visitor,
      };
      return data;
    });
    /**
     * home team inning information
     * inning: number を key に {@link DaeInningTeam} が value
     * @type {object}
     */
    this.home = home;
    /**
     * visitor team inning information
     * inning: number を key に {@link DaeInningTeam} が value
     * @type {object}
     */
    this.visitor = visitor;
    /**
     * inning: number を key に {@link DaeInning} が value
     * @type {object}
     */
    this.info = information;
    /**
     * inning: number を key に {{home: DaeInningTeam, visitor: DaeInningTeam}} が value
     * @type {object}
     */
    this.board = board;
  }
}
