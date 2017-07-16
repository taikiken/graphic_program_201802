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

import Calendar from './mlb/component/calendar/Calendar';

export default class Test {
  static toolbar() {
    // @see https://github.com/intljusticemission/react-big-calendar/issues/191
    // toolbar を custom する
    // https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    // div.onClick warning
    return (toolbar) => {
      const goToBack = () => { toolbar.onNavigate('PREV'); };
      const goToNext = () => { toolbar.onNavigate('NEXT'); };
      const goToCurrent = () => { toolbar.onNavigate('TODAY'); };
      return (
        <div className="toolbar-container">
          <div className="navigation-buttons">
            <button className="btn btn-back" onClick={goToBack}>
              <p className="prev-icon" />
            </button>
            <div className="label-date" onClick={goToCurrent} role="button" tabIndex="0">
              {this.state.monthLabel}
            </div>
            <button className="btn btn-next" onClick={goToNext}>
              <p className="next-icon" />
            </button>
          </div>
        </div >
      );
    };
  }
  static make(element, option) {
    console.log('Test.make option', option);
    ReactDOM.render(
      <Calendar
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
}
