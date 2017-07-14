/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/14 - 19:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';

import Calendar from './mlb/module/Calendar';

export default class Test {
  static make(element, events, today) {
    ReactDOM.render(
      <Calendar
        events={events}
        today={today}
      />,
      element,
    );
  }
}
