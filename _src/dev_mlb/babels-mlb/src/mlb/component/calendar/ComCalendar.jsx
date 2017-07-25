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
// import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
// webpack が local file を動的 import しないので手動で読み込む
import 'moment/locale/ja';

// define
import Style from '../../define/Style';

// @see http://momentjs.com/docs/ search `longDateFormat`
// moment を使用し日付のローカライズを行う
// react-big-calendar API says
// @see http://intljusticemission.github.io/react-big-calendar/examples/index.html#api
// culture
// Specify a specific culture code for the ComCalendar.
// Note: it's generally better to handle this globally via your i18n library.
moment.locale('ja');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment);

// @see https://github.com/intljusticemission/react-big-calendar/issues/191
// toolbar を custom する
/**
 * calendar toolbar をカスタマイズします
 * - prev
 * - 年月
 * - next
 * @param {object} toolbar react-big-calendar toolbar object
 * @returns {XML} calendar toolbar を返します
 * @see https://github.com/intljusticemission/react-big-calendar/issues/191
 */
const customToolbar = (toolbar) => {
  // @type {function} - prev handler
  const goToBack = () => {
    toolbar.onNavigate('PREV');
  };
  // @type {function} - next handler
  const goToNext = () => {
    toolbar.onNavigate('NEXT');
  };
  // @type {function} - current handler
  const goToCurrent = () => {
    toolbar.onNavigate('TODAY');
  };
  // @returns {string} - 年月に与える className を作成します
  const labelClass = (mode, n) => (
    `calendar-label-date calendar-label-${mode} calendar-label-${mode}-${n}`
  );
  // 年月コンテナを作成します
  const label = () => {
    const date = moment(toolbar.date);
    return (
      <p className="calendar-label">
        <span className={labelClass('year', toolbar.date.getFullYear())}>
          {date.format('YYYY')}年
        </span>
        <span className={labelClass('month', toolbar.date.getMonth() + 1)}>
          {date.format('MMMM')}
        </span>
      </p>
    );
  };
  // component を返します
  return (
    <div className="calendar-toolbar-container">
      {/* header */}
      <header className="calendar-navigation-header">
        <button className="calendar-btn calendar-btn-prev" onClick={goToBack}>
          <span className="calendar-icon calendar-prev-icon">&#8249;</span>
        </button>
        <div className="calendar-label-date">{label()}</div>
        <button className="calendar-btn calendar-btn-next" onClick={goToNext}>
          <span className="calendar-icon calendar-next-icon">&#8250;</span>
        </button>
      </header>
      {/* footer */}
      <footer className="calendar-navigation-footer">
        <button className="calendar-btn calendar-btn-today" onClick={goToCurrent}>
          <span className="calendar-btn-txt calendar-btn-txt-today">今日</span>
        </button>
      </footer>
    </div >
  );
};

// // event style custom
// // @see https://github.com/intljusticemission/react-big-calendar/issues/419
// /**
//  * event のカラーを変更します
//  * @returns {Object} style object を返します
//  */
// const style = () => (
//   {
//     style: {
//       backgroundColor: '#89C540',
//       borderColor: '#777',
//     },
//   }
// );

/**
 * 週の名称の短いバージョンリスト
 * @type {{mon: string, tue: string, wed: string, thu: string, fri: string, sat: string, sun: string}}
 */
const weeks = {
  mon: '月',
  tue: '火',
  wed: '水',
  thu: '木',
  fri: '金',
  sat: '土',
  sun: '日',
};

/**
 * 月曜スタートにするために `culture="en-GB"` にしたために英語表記に変わった曜日を
 * カレンダー上部週表示を日本語表記にする
 * @param {*} month react-big-calendar month object
 * @returns {XML} 週日本語表記を返します
 */
const customHeader = (month) => {
  const label = month.label.toLowerCase();
  const short = weeks[label];
  return (
    <div className={`weeks-header weeks-header-${label}`}>
      <span className="weeks-header-label">{short}</span>
    </div>
  );
};

// 月曜スタートするには culture: en-GB にしないとなので...
// 週表示が英語表記になるのは header component でカスタムする
/**
 * react-big-calendar を使用しカレンダー component を出力します
 * - 月曜スタートにするために `culture="en-GB"` にします
 * - view month 限定にします
 * @param {*} props 表記に必要な引数 object
 * @returns {XML} div.calendar-container > BigCalendar
 * @see http://intljusticemission.github.io/react-big-calendar/
 */
function ComCalendar(props) {
  return (
    <div className="mlb__schedule__calendar" id={Style.calendar.id}>
      <h3 className="mlb__schedule__calendar__heading">試合カレンダー</h3>
      <BigCalendar
        selectable
        events={props.events}
        defaultDate={props.today}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={props.selected}
        onSelectSlot={props.slot}
        onView={props.view}
        onNavigate={props.navigate}
        components={{
          toolbar: customToolbar,
          month: {
            header: customHeader,
          },
        }}
        // eventPropGetter={style}
        views={['month']}
        culture="en-GB"
      />
    </div>
  );
}

/**
 * - events {Array.<ModSchedules>} - 表示する予定・イベント
 * - today {Date} - デフォルト位置（今日）
 * - selected {function} - 予定・イベントを選択した callback
 * - slot {function} - 日付を選択した callback
 * - view {function} - month / week / day を変更した callback
 * - navigate {function} - 前月 / 翌月 を変更した callback
 * @type {{events: Array.<ModSchedules>, today: Date, selected: function, slot: function, view: function, navigate: function}}
 */
ComCalendar.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape).isRequired,
  today: PropTypes.instanceOf(Date).isRequired,
  selected: PropTypes.func.isRequired,
  slot: PropTypes.func.isRequired,
  view: PropTypes.func,
  navigate: PropTypes.func.isRequired,
};

ComCalendar.defaultProps = {
  view: () => {},
};

export default ComCalendar;
