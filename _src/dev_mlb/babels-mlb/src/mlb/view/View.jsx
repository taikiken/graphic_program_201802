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

// async/
import Creator from '../async/Creator';

console.log('store', store);
Creator.calendar = (year, today) => (store.dispatch(actions.calendar(year, today)));
Creator.schedule = date => (store.dispatch(actions.schedule(date)));

export default class View {
  static index(element, year = null, today = null) {
    ReactDOM.render(
      <Provider store={store}>
        {/* [TODAY JAPANESE] */}
        {/* [SCHEDULE] */}
        <ConCalendar />
      </Provider>,
      element,
    );
    // -----
    // Creator.calendar(year, today);
    Creator.calendar(year, new Date(2017, 8, 15));
    console.log('ViewIndex.make', year, today);
  }
}
