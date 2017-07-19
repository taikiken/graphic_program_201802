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

// store
import store from '../async/store/';

// connect
import ConCalendar from '../async/connects/ConCalendar';

export default class View {
  static make(element) {
    ReactDOM.render(
      <Provider store={store}>
        <ConCalendar />
      </Provider>,
      element,
    );
  }
}
