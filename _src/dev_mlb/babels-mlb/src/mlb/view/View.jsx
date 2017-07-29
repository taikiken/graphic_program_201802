/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 21:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';

// async/store
import store from '../async/store/';

// async/actions
import actions from '../async/actions';

// async/connect
import ConCalendar from '../async/connects/schedule/ConCalendar';
import ConSchedule from '../async/connects/schedule/ConSchedule';

import games from '../async/connects/games/ConGames';

// async/
import Creator from '../async/Creator';

// util
import Day from '../util/Day';

// ----------------------------
Creator.calendar = (year, today) => (store.schedules.dispatch(actions.schedules.calendar(year, today)));
Creator.schedule = date => (store.schedules.dispatch(actions.schedules.schedule(date)));

// games
Creator.games = (year, id) => (store.games.dispatch(actions.games.game(year, id)));
// ----------------------------

console.log('connects games', games);

class Game {
  static overview(element) {
    console.log('Game.overview', element);
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConOverview />
      </Provider>,
      element,
    );
  }
  static score(element) {
    console.log('Game.score', element);
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConScore />
      </Provider>,
      element,
    );
  }
  static info(element) {
    console.log('Game.info', element);
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConInfo />
      </Provider>,
      element,
    );
  }
}

export default class View {
  static index(element, year = null, today = null) {
    // console.log('ConSchedule', ConSchedule);
    ReactDOM.render(
      <div className="provider-root">
        <Provider store={store.schedules}>
          <ConSchedule />
        </Provider>
        <Provider store={store.schedules}>
          <ConCalendar />
        </Provider>
      </div>,
      element,
    );
    // ----------------------------------------
    // schedule 実行は calendar 取得後にゲームがあるか確認後の方が良いかと思ったけど
    // ajax error が出ても表示に問題は無いようなのでこのままにする
    Creator.calendar(year, today);
    Creator.schedule(Day.date(today));
    console.log('ViewIndex.make', year, today);
  }
  // ---------------------------------------
  // game
  static game(year, id, { overview, score, info }) {
    console.log('View.game', year, id, overview, score, info);
    Game.overview(overview);
    Game.score(score);
    Game.info(info);
    // action
    Creator.games(year, id);
  }
}
