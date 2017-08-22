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

// app
import Games from '../app/Games';

// ----------------------------
// eslint-disable-next-line max-len
Creator.calendar = (year, today) => (store.schedules.dispatch(actions.schedules.calendar(year, today)));
Creator.schedule = date => (store.schedules.dispatch(actions.schedules.schedule(date)));

// games
Creator.games = (year, id) => (store.games.dispatch(actions.games.game(year, id)));
// ----------------------------

// console.log('connects games', games);

/**
 * ゲーム情報を表示します
 */
class Game {
  /**
   * 上部対戦成績を表示します
   * @param {Element} element 親コンテナ
   */
  static overview(element) {
    // console.log('Game.overview', element);
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConOverview />
      </Provider>,
      element,
    );
  }
  /**
   * スコアボードを表示します
   * @param {Element} element 親コンテナ
   */
  static score(element) {
    // console.log('Game.score', element);
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConScore />
      </Provider>,
      element,
    );
  }
  /**
   * ゲーム情報を表示します
   * @param {Element} element 親コンテナ
   */
  static info(element) {
    // console.log('Game.info', element);
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConInfo />
      </Provider>,
      element,
    );
  }
}

/**
 * redux.Provider - component を結合し view を作成します
 */
export default class View {
  /**
   * `/stats/mlb` or `/stats/mlb/YYYYMMDD` を表示します
   *
   * コンテナを表示します
   * - {@link ConSchedule}
   *   - {@link ComScheduleMam}
   * - {@link ConCalendar}
   *    - {@link ComCalendarMam}
   *
   * redux dispatch bind した {@link Creator}.calendar | schedule を実行します,
   * 関数実態は `async/actions/schedules` を参照します
   * {@link calendar}, {@link schedule}
   * @param {Element} element 出力コンテナ
   * @param {?number} year YYYY 年
   * @param {?Date} today 日付 Date instance
   */
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
    // console.log('ViewIndex.index', year, today);
  }
  // ---------------------------------------
  // game
  /**
   * `/stats/mlb/game/YYYY/GAME_ID` を表示します
   * - {@link Game}.overvie|score|info で表示を行います
   * - redux dispatch bind した {@link Creator}.games を実行します,
   * 関数実態は `async/games/games` を参照します
   * @param {number|string} year 年 YYYY形式
   * @param {number|string} id game ID
   * @param {Element} overview 上部対戦成績表示コンテナ
   * @param {Element} score 中部スコアボード表示コンテナ
   * @param {Element} info ゲーム情報表示コンテナ
   */
  static game(year, id, { overview, score, info }) {
    // console.log('View.game', year, id, overview, score, info);
    // save
    Games.year = year;
    Games.id = id;
    // component
    Game.overview(overview);
    Game.score(score);
    Game.info(info);
    // action
    Creator.games(year, id);
  }
}
