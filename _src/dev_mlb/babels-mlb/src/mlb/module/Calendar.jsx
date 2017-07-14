/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/14 - 18:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import BigCalendar from 'react-big-calendar';
import moment from 'moment';

// @see http://momentjs.com/docs/ search `longDateFormat`
moment.locale('ja', {
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/DD/MM',
    LL: 'YYYY MMMM D',
    LLL: 'YYYY MMMM D HH:mm',
    LLLL: 'YYYY MMMM D dddd HH:mm',
  },
  calendar: {
    sameDay: '[今日] LT',
    nextDay: '[明日] LT',
    nextWeek: '[次週] LT',
    lastDay: '[昨日] LT',
    lastWeek: 'dddd [先週] LT',
    sameElse: 'L',
  },
  months: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  weekdays: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  weekdaysShort: [
    '日',
    '月',
    '火',
    '水',
    '木',
    '金',
    '土',
  ],
  relativeTime: {
    future: '%s 後',
    past: '%s 前',
    s: '秒',
    m: '1分',
    mm: '%d 分',
    h: '1時間',
    hh: '%d 時間',
    d: '1日',
    dd: '%d 日',
    M: '1月',
    MM: '%d 月',
    y: '1年',
    yy: '%d 年',
  },

});

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment);


function Calendar(props) {
  return (
    <div className="calendar-container">
      <BigCalendar
        selectable
        events={props.events}
        defaultDate={props.today}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={props.selected}
        onSelectSlot={props.slot}
      />
    </div>
  );
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape).isRequired,
  today: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.func.isRequired,
  slot: PropTypes.func.isRequired,
};

export default Calendar;
