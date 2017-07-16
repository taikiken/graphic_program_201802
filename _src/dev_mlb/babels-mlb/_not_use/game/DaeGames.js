/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/15 - 18:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

class DaeTeam {
  constructor(team) {
    const origin = team || {};
    this.origin = origin;
    this.score = Number.isInteger(origin.score) ? origin.score : 0;
    this.id = Number.isInteger(origin.score) ? origin.score : 0;
    this.team = origin.team_name || '';
  }
}

class DaeGame {
  constructor(game) {
    const origin = game || {};
    this.origin = origin;
    const home = origin.home || {};
    const visitor = origin.visitor || {};
    this.id = Number.isInteger(origin.game_id) ? origin.game_id : -1;
    this.studium = origin.studium || '';
    this.status = Number.isInteger(origin.status_id) ? origin.status_id : -1;
    this.home = new DaeTeam(home);
    this.visitor = new DaeTeam(visitor);
  }
}

// スケジュール JSON
export default class DaeGames {
  constructor(games) {
    const origin = games || [];
    this.origin = origin;
    this.games = origin.map(game => (new DaeGame(game)));
  }
}
