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
import ConCalendar from '../async/connects/ConCalendar';

// app
import Creator from '../app/Creator';

// util
import Day from '../util/Day';

console.log('store', store);

export default class ViewIndex {
  static make(element, year = Day.thisYear()) {
    ReactDOM.render(
      <Provider store={store}>
        {/* [TODAY JAPANESE] */}
        {/* [SCHEDULE] */}
        <ConCalendar />
      </Provider>,
      element,
    );
    // -----
    Creator.calendar = target => (store.dispatch(actions.calendar(target)));
    Creator.calendar(year);
  }
}
