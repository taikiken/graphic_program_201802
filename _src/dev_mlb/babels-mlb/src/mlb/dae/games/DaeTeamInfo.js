/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/16 - 17:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Type from '../../../moku/util/Type';

class DaePlayer {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    this.id = Type.int(origin.player_id) ? origin.player_id : -1;
    this.no = Type.int(origin.bat_no) ? origin.bat_no : -1;
    this.number = Type.int(origin.number) ? origin.number : -1;
    this.country = Type.int(origin.country) ? origin.country : -1;
    this.batHand = origin.bat_hand || '';
    this.hand = origin.hand || '';
    this.player = origin.name || '';
    this.position = origin.position || '';
    this.positionCategory = origin.position_category || '';
  }
}

class DaePlayers {
  constructor(info) {
    const origin = info || [];
    this.origin = origin;
    this.players = origin.map(player => (new DaePlayer(player)));
  }
}

class DaeTeam {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    this.reserve = new DaePlayers(origin.reserve);
    this.starting = new DaePlayers(origin.starting);
  }
}

// チーム情報json
export default class DaeTeamInfo {
  constructor(info) {
    const origin = info || {};
    this.origin = origin;
    const ids = Object.keys(origin);
    const teams = {};
    this.list = ids.map((id) => {
      const team = new DaeTeam(origin[id]);
      teams[id] = team;
      return team;
    });
    this.ids = ids;
    this.teams = teams;
  }
  team(id) {
    return this.teams[id];
  }
}
