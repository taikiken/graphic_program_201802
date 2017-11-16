/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/19 - 22:37
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
import store from '../async/store/index';

// async/actions
import actions from '../async/actions/index';

// connects
// async/connect
import games from '../async/connects/ConnectsGame';

// async/
import Creator from '../async/Creator';

// ticks
import Sequence from '../ticks/Sequence';

Creator.games = () => (store.games.dispatch(actions.games()));

/**
 * 日本シリーズを表示する
 */
export default class ViewNippon {
  /**
   * {@link Sequence} - polling 処理を開始します
   */
  static loop() {
    const sequence = new Sequence();
    sequence.start();
  }
  /**
   * desktop 表示します
   * @param {Element} first div#js-nippon-first
   * @param {Element} second div#js-nippon-second
   */
  static desktop(first, second) {
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConnectsGame />
      </Provider>,
      first,
    );
    ReactDOM.render(
      <Provider store={store.games}>
        <games.ConnectsNippon />
      </Provider>,
      second,
    );
    // -------
    ViewNippon.loop();
  }
  /**
   * desktop 表示します
   * @param {Element} game div#js-nippon-game
   * @param {Element} first div#js-nippon-first
   * @param {Element} second div#js-nippon-second
   * @param {Element} third div#js-nippon-third
   */
  static mobile(game, first, second, third) {
    // console.log('ViewNippon', game, first, second, third);
    ReactDOM.render(
      <Provider store={store.games}>
        <games.SPConnectsGame />
      </Provider>,
      game,
    );
    ReactDOM.render(
      <Provider store={store.games}>
        <games.SPConnectsFirst />
      </Provider>,
      first,
    );
    ReactDOM.render(
      <Provider store={store.games}>
        <games.SPConnectsSecond />
      </Provider>,
      second,
    );
    ReactDOM.render(
      <Provider store={store.games}>
        <games.SPConnectsThird />
      </Provider>,
      third,
    );
    // -------
    ViewNippon.loop();
  }
}
