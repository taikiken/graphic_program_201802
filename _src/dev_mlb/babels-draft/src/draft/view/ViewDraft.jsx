/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/03 - 20:49
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

// async/connect
import ConnectsPlayers from '../async/connects/ConnectsPlayers';
import ConnectsNews from '../async/connects/ConnectsNews';

// async/
import Creator from '../async/Creator';

// store.dispatch を bind します
Creator.players = () => (store.players.dispatch(actions.players()));
Creator.news = () => (store.news.dispatch(actions.news()));

// console.log('Creator', Creator);
// console.log('actions', actions);
// console.log('store', store);

/**
 * ドラフト選手一覧・関連ニュースを出力します
 */
export default class ViewDraft {
  /**
   * ドラフト選手一覧
   * - {@link ConnectsPlayers}
   * @param {Element} element 出力ターゲット
   */
  static players(element) {
    ReactDOM.render(
      <Provider store={store.players}>
        <ConnectsPlayers />
      </Provider>,
      element,
    );
    // ajax request を開始します
    Creator.players();
  }
  /**
   * 関連ニュース
   * - {@link ConnectsNews}
   * @param {Element} element 出力ターゲット
   */
  static news(element) {
    ReactDOM.render(
      <Provider store={store.news}>
        <ConnectsNews />
      </Provider>,
      element,
    );
    // ajax request を開始します
    Creator.news();
  }
}
