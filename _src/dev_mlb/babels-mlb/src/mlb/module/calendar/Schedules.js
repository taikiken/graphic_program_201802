/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/15 - 14:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const Date = self.date;

// inter league は league 無い

class Events {
  constructor(date, game, season, league) {
    this.id = game.id;
    // this.home = game.home;
    // this.visitor = game.visitor;
    // this.stadium = game.stadium;
    this.status = game.status;
    this.season = season;
    this.league = league;
    const day = new Date(date.substr(0, 4), date.substr(4, 2), date.substr(6, 2));
    // ---- calendar property
    this.start = day;
    this.end = day;
    this.allDay = true;
    this.title = `${game.stadium}: ${game.home.team} - ${game.visitor.team}`;
  }
}

export default class Schedules {
  constructor(date, games, season, league = '') {
    // this.games = games;
    // this.season = season;
    // this.league = league;
    this.games = games.map(game => (new Events(date, game, season, league)));
  }
  events() {
    return this.games.slice(0);
  }
}
