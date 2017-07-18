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

class DaeEvent {
  constructor(inning, info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.pitcher = Normalize.str(origin.pitcher);
    this.batter = Normalize.str(origin.batter);
    this.result = Normalize.str(origin.result);
    this.out = Normalize.int(origin.out);
    this.score = Normalize.int(origin.score);
    this.inning = inning;
  }
}

class DaeEvents {
  constructor(inning, info) {
    const origin = Normalize.arr(info);
    this.origin = origin;
    this.events = origin.map(event => new DaeEvent(inning, event));
    this.inning = inning;
  }
}

class DaeInningTeam {
  constructor(inning, info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.title = Normalize.str(origin.title);
    this.events = new DaeEvents(inning, origin.events);
    this.inning = inning;
  }
}

class DaeInning {
  constructor(inning, info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.inning = inning;
    this.visitor = new DaeInningTeam(inning, origin.visitor);
    this.home = new DaeInningTeam(inning, origin.home);
    this.inning = inning;
  }
}

// innings.json - inning 情報
export default class DaeInnings {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    const innings = Normalize.obj(origin.innings);
    const home = {};
    const visitor = {};
    const information = {};
    const board = {};
    this.list = Object.keys(innings).map((inning) => {
      // inning: string なので int 型変換します
      const num = parseInt(inning, 10);
      const data = new DaeInning(num, innings[inning]);
      home[num] = data.home;
      visitor[num] = data.visitor;
      information[num] = data;
      board[num] = {
        home: data.home,
        visitor: data.visitor,
      };
      return data;
    });
    this.home = home;
    this.visitor = visitor;
    this.info = information;
    this.board = board;
  }
}
