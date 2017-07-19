/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 17:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
import Normalize from '../../util/Normalize';

// player
import DaeBatting from '../player/DaeBatting';
import DaePitching from '../player/DaePitching';


class DaePlayer {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    this.id = Normalize.int(origin.player_id);
    this.teamId = Normalize.int(origin.team_id);
    this.position = Normalize.int(origin.position);
    this.country = Normalize.int(origin.country);
    this.number = Normalize.int(origin.number);
    this.bat = Normalize.int(origin.bat_no);
    this.batting = new DaeBatting(origin.batting);
    this.pitching = new DaePitching(origin.pitching);
  }
}

class DaePlayers {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    const players = {};
    this.ids = Object.keys(origin).map((playerId) => {
      const id = parseInt(playerId, 10);
      players[id] = new DaePlayer(origin[playerId]);
      return id;
    });
    this.players = players;
  }
}

// member_info.json - 選手情報
export default class DaeMemberInfo {
  constructor(info) {
    const origin = Normalize.obj(info);
    this.origin = origin;
    const players = {};
    this.ids = Object.keys(origin).map((teamId) => {
      const id = parseInt(teamId, 10);
      const data = new DaePlayers(origin[teamId]);
      players[id] = data;
      return id;
    });
    this.players = players;
  }
}
