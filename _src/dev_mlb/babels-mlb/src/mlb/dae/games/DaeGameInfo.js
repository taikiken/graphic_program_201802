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

import Type from '../../../moku/util/Type';

class DaeRecord {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    this.win = Type.int(origin.win) ? origin.win : -1;
    this.lose = Type.int(origin.lose) ? origin.lose : -1;
    this.tie = Type.int(origin.tie) ? origin.tie : -1;
  }
}

class DaePitcher {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    this.average = origin.average || '';
    this.gamesPitched = origin.games_pitched || '';
    this.inningsPitched = origin.innings_pitched || '';
    this.hits = Type.int(origin.hits) ? origin.hits : -1;
    this.holds = Type.int(origin.holds) ? origin.holds : -1;
    this.lose = Type.int(origin.lose) ? origin.lose : -1;
    this.runs = Type.int(origin.runs) ? origin.runs : -1;
    this.saves = Type.int(origin.saves) ? origin.saves : -1;
    this.seasonHits = Type.int(origin.season_hits) ? origin.season_hits : -1;
    this.seasonRuns = Type.int(origin.season_runs) ? origin.season_runs : -1;
    this.sequence = Type.int(origin.sequence) ? origin.sequence : -1;
    this.wins = Type.int(origin.wins) ? origin.wins : -1;
  }
}

class DaeStarting {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    this.home = DaePitcher(origin.home);
    this.visitor = DaePitcher(origin.visitor);
  }
}

class DaeScores {
  constructor(info) {
    const origin = info || {};
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
    const origin = info || {};
    this.origin = origin;
    this.errors = Type.int(origin.errors) ? origin.errors : -1;
    this.hits = Type.int(origin.errors) ? origin.errors : -1;
    this.id = Type.int(origin.team_id) ? origin.team_id : -1;
    this.team = origin.team_name || '';
    this.sccores = new DaeScores(origin.scores);
  }
}

class DaeBoard {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    this.home = new DaeInnings(origin.home);
    this.visitor = new DaeInnings(origin.visitor);
  }
}

export default class DaeGameInfo {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    this.date = origin.play_date || '';
    this.status = Type.int(origin.status_id) ? origin.status_id : -1;
    const board = new DaeBoard(origin.score_board);
    this.win = origin.win || '';
    this.lose = origin.lose || '';
    this.save = origin.save || '';
    this.batteries = origin.batteries || [];
    this.hr = origin.hr || [];
    const starting = new DaeStarting(origin.starting_pitcher);
    const record = new DaeRecord(origin.team_record);
    this.board = board;
    this.starting = starting;
    this.record = record;
    this.home = {
      board: board.home,
      starting: starting.home,
      record: record.home,
    };
    this.visitor = {
      board: board.visitor,
      starting: starting.visitor,
      record: record.visitor,
    };
  }
}
