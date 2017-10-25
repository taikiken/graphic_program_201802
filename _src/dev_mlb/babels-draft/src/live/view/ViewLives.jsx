/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:35
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
import ConnectsLives from '../async/connects/ConnectsLives';

// async/
import Creator from '../async/Creator';

Creator.lives = () => (store.lives.dispatch(actions.lives()));

/**
 * draft 2017 速報を表示します
 */
export default class ViewLives {
  /**
   * draft 2017 速報
   * - {@link ConnectsLives}
   * - {@link Creator}.lives
   * @param {Element} element mount container
   */
  static lives(element) {
    ReactDOM.render(
      <Provider store={store.lives}>
        <ConnectsLives />
      </Provider>,
      element,
    );
    // ajax request を開始します
    Creator.lives();
  }
}
