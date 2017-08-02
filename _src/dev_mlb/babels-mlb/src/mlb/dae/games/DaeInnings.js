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
 * イベント一覧・攻撃打順を表示するために 1 ~ 9 の循環ナンバリングを行います
 */
class Sequence {
  /**
   * indexes property を初期化します
   */
  constructor() {
    /**
     * 循環ナンバリング - home / visitor 用
     * @type {{home: number, visitor: number}}
     */
    this.indexes = {
      home: 0,
      visitor: 0,
    };
  }
  /**
   * カウントアップします,
   * 9 を超えると 1 に戻ります
   * @param {string} type home|visitor
   */
  up(type) {
    let index = this.indexes[type];
    index += 1;
    if (index > 9) {
      index = 1;
    }
    this.indexes[type] = index;
  }
  /**
   * index を取得します
   * @param {string} type home|visitor
   * @returns {number}  1 ~ 9 の循環ナンバリング
   */
  index(type) {
    return this.indexes[type];
  }
}

/**
 * 発生したイベント（事象） - 詳細
 */
export class DaeEvent {
  /**
   * 発生したイベント（事象） - 詳細
   * @param {number} inning 回 1 ~
   * @param {object} info JSON
   * @param {Sequence} sequence 試合中の打順を生成します
   * @param {string} type home|visitor
   */
  constructor(inning, info, sequence, type) {
    const origin = Normalize.obj(info);
    const batter = Normalize.str(origin.batter);
    // 打者が存在する時のみカウントアップします
    if (batter) {
      sequence.up(type);
    }
    const index = sequence.index(type);
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
    this.batter = batter;
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
    /**
     * 1 ~ 9 ナンバー
     * @type {number}
     */
    this.index = index;
    /**
     * home|visitor
     * @type {string}
     */
    this.type = type;
    /**
     * ユニークでは無い ID
     * @type {string}
     */
    this.id = `${type}-${inning}-${index}`;
  }
}

/**
 * 発生したイベント（事象）
 */
class DaeEvents {
  /**
   * 発生したイベント（事象）
   * @param {number} inning 回 1 ~
   * @param {Array} info JSON
   * @param {string} type home|visitor
   * @param {Sequence} sequence event 添え字
   */
  constructor(inning, info, type, sequence) {
    const origin = Normalize.arr(info);
    const list = origin.map(event => new DaeEvent(inning, event, sequence, type));
    /**
     * original JSON
     * @type {Array.<*>}
     */
    this.origin = origin;
    /**
     * イベント個別情報
     * @type {Array.<DaeEvent>}
     */
    this.list = list;
    /**
     * イニング
     * @type {number}
     */
    this.inning = inning;
    /**
     * イベントを逆順 3 out -> 0 にします
     * @type {Array.<DaeEvent>}
     */
    this.opposite = list.slice(0).reverse();
    /**
     * home|visitor
     * @type {string}
     */
    this.type = type;
  }
}

/**
 * イニングの情報 - チーム別
 */
export class DaeInningTeam {
  /**
   * イニングの情報 - チーム別
   * @param {number} inning 回 1 ~
   * @param {object} info JSON
   * @param {string} type home|visitor
   * @param {Sequence} sequence event 添え字
   */
  constructor(inning, info, type, sequence) {
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
    this.events = new DaeEvents(inning, origin.events, type, sequence);
    /**
     * イニング
     * @type {number}
     */
    this.inning = inning;
    /**
     * home|visitor
     * @type {string}
     */
    this.type = type;
  }
}

/**
 * イニングの情報
 */
export class DaeInning {
  /**
   * インイングの情報
   * @param {number} inning 回 1 ~
   * @param {object} info JSON
   * @param {Sequence} sequence event 添え字
   */
  constructor(inning, info, sequence) {
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
    this.visitor = new DaeInningTeam(inning, origin.visitor, 'visitor', sequence);
    /**
     * home team インイングの情報
     * @type {DaeInningTeam}
     */
    this.home = new DaeInningTeam(inning, origin.home, 'home', sequence);
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
    const sequence = new Sequence();
    // @type {Array.<DaeInning>} - 回毎の情報配列
    const list = Object.keys(innings).map((inning) => {
      // inning: string なので int 型変換します
      const num = parseInt(inning, 10);
      // @type {DaeInning}
      const data = new DaeInning(num, innings[inning], sequence);
      // home / visitor 毎にセットします
      home[num] = data.home;
      visitor[num] = data.visitor;
      information[num] = data;
      // 回毎に home / visitor を保持します
      board[num] = {
        home: data.home,
        visitor: data.visitor,
      };
      // return data;
      return num;
    });
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
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
    /**
     * 回毎の情報配列
     * @type {Array.<DaeInning>}
     */
    this.list = list;
    /**
     * 9回から1回へ逆順リストします
     * @type {Array.<DaeInning>}
     */
    this.opposite = list.slice(0).reverse();
  }
}
