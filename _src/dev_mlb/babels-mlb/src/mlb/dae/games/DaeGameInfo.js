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

// dae
import Normalize from '../../util/Normalize';

class DaeRecord {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.win = Normalize.int(origin.win);
    this.lose = Normalize.int(origin.lose);
    this.tie = Normalize.int(origin.tie);
  }
}

class DaePitcher {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.average = Normalize.str(origin.average);
    this.gamesPitched = Normalize.str(origin.games_pitched);
    this.inningsPitched = Normalize.str(origin.innings_pitched);
    this.hits = Normalize.int(origin.hits);
    this.holds = Normalize.int(origin.holds);
    this.lose = Normalize.int(origin.lose);
    this.runs = Normalize.int(origin.runs);
    this.saves = Normalize.int(origin.saves);
    this.seasonHits = Normalize.int(origin.season_hits);
    this.seasonRuns = Normalize.int(origin.season_runs);
    this.sequence = Normalize.int(origin.sequence);
    this.wins = Normalize.int(origin.wins);
  }
}

class DaeStarting {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.home = DaePitcher(origin.home);
    this.visitor = DaePitcher(origin.visitor);
  }
}

class DaeScores {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    const scores = {};
    const innings = Object.keys(origin).map((inning) => {
      const score = String(origin[inning]);
      scores[inning] = score;
      return score;
    });
    this.score = scores;
    this.innings = innings;
  }
}

class DaeInnings {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.errors = Normalize.int(origin.errors);
    this.hits = Normalize.int(origin.errors);
    this.id = Normalize.int(origin.team_id);
    this.team = Normalize.str(origin.team_name);
    this.sccores = new DaeScores(origin.scores);
  }
}

class DaeBoard {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.home = new DaeInnings(origin.home);
    this.visitor = new DaeInnings(origin.visitor);
  }
}

/**
 * 試合情報json - game_info.json
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
    const record = new DaeRecord(origin.team_record);
    // property
    this.origin = origin;
    this.date = Normalize.str(origin.play_date);
    this.status = Normalize.int(origin.status_id);
    this.win = Normalize.str(origin.win);
    this.lose = Normalize.str(origin.lose);
    this.save = Normalize.str(origin.save);
    this.batteries = Normalize.arr(origin.batteries);
    this.hr = Normalize.arr(origin.hr);
    this.board = board;
    this.starting = starting;
    this.record = record;
    this.home = {
      id: board.home.id,
      board: board.home,
      starting: starting.home,
      record: record.home,
    };
    this.visitor = {
      id: board.visitor.id,
      board: board.visitor,
      starting: starting.visitor,
      record: record.visitor,
    };
  }
}
