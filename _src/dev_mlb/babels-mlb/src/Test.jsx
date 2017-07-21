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

import ComCalendar from './mlb/component/calendar/ComCalendar';

import ViewIndex from './mlb/view/ViewIndex';

export default class Test {
  static make(element, option) {
    console.log('Test.make option', option);
    ReactDOM.render(
      <ComCalendar
        events={option.events}
        today={option.today}
        selected={option.selected}
        slot={option.slot}
        view={option.view}
        navigate={option.navigate}
      />,
      element,
    );
  }
  static view(element) {
    ViewIndex.make(element);
  }
}
