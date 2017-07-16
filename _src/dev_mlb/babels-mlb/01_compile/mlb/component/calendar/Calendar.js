'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBigCalendar = require('react-big-calendar');

var _reactBigCalendar2 = _interopRequireDefault(_reactBigCalendar);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('moment/locale/ja');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @see http://momentjs.com/docs/ search `longDateFormat`
// moment を使用し日付のローカライズを行う
// react-big-calendar API says
// @see http://intljusticemission.github.io/react-big-calendar/examples/index.html#api
// culture
// Specify a specific culture code for the Calendar.
// Note: it's generally better to handle this globally via your i18n library.

// import 'react-big-calendar/lib/css/react-big-calendar.css';
_moment2.default.locale('ja');

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.

// webpack が local file を動的 import しないので手動で読み込む
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

_reactBigCalendar2.default.momentLocalizer(_moment2.default);

// @see https://github.com/intljusticemission/react-big-calendar/issues/191
// toolbar を custom する
// https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
// div.onClick warning
/**
 * calendar toolbar をカスタマイズします
 * - prev
 * - 年月
 * - next
 * @param {object} toolbar react-big-calendar toolbar object
 * @returns {XML} calendar toolbar を返します
 * @see https://github.com/intljusticemission/react-big-calendar/issues/191
 */
var customToolbar = function customToolbar(toolbar) {
  // @type {function} - prev handler
  var goToBack = function goToBack() {
    toolbar.onNavigate('PREV');
  };
  // @type {function} - next handler
  var goToNext = function goToNext() {
    toolbar.onNavigate('NEXT');
  };
  // @type {function} - current handler
  var goToCurrent = function goToCurrent() {
    toolbar.onNavigate('TODAY');
  };
  // @returns {string} - 年月に与える className を作成します
  var labelClass = function labelClass(mode, n) {
    return 'calendar-label-date calendar-label-' + mode + ' calendar-label-' + mode + '-' + n;
  };
  // 年月コンテナを作成します
  var label = function label() {
    var date = (0, _moment2.default)(toolbar.date);
    return _react2.default.createElement(
      'p',
      { className: 'calendar-label' },
      _react2.default.createElement(
        'span',
        { className: labelClass('year', toolbar.date.getFullYear()) },
        date.format('YYYY'),
        '\u5E74'
      ),
      _react2.default.createElement(
        'span',
        { className: labelClass('month', toolbar.date.getMonth() + 1) },
        date.format('MMMM')
      )
    );
  };
  // component を返します
  return _react2.default.createElement(
    'div',
    { className: 'calendar-toolbar-container' },
    _react2.default.createElement(
      'header',
      { className: 'calendar-navigation-header' },
      _react2.default.createElement(
        'button',
        { className: 'calendar-btn calendar-btn-prev', onClick: goToBack },
        _react2.default.createElement(
          'p',
          { className: 'calendar-icon calendar-prev-icon' },
          '\u2039'
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'calendar-label-date', onClick: goToCurrent, role: 'button', tabIndex: '0' },
        label()
      ),
      _react2.default.createElement(
        'button',
        { className: 'calendar-btn calendar-btn-next', onClick: goToNext },
        _react2.default.createElement(
          'p',
          { className: 'calendar-icon calendar-next-icon' },
          '\u203A'
        )
      )
    )
  );
};

// event style custom
// @see https://github.com/intljusticemission/react-big-calendar/issues/419
/**
 * event のカラーを変更します
 * @returns {Object} style object を返します
 */
var style = function style() {
  return {
    style: {
      backgroundColor: '#89C540',
      borderColor: '#777'
    }
  };
};

/**
 * 週の名称の短いバージョンリスト
 * @type {{Mon: string, Tue: string, Wed: string, Thu: string, Fri: string, Sat: string, Sun: string}}
 */
var weeks = {
  Mon: '月',
  Tue: '火',
  Wed: '水',
  Thu: '木',
  Fri: '金',
  Sat: '土',
  Sun: '日'
};

/**
 * カレンダー上部週表示を日本語表記にする
 * @param {*} month react-big-calendar month object
 * @returns {XML} 週日本語表記を返します
 */
var customHeader = function customHeader(month) {
  var short = weeks[month.label];
  var label = month.label.toLowerCase();
  return _react2.default.createElement(
    'div',
    { className: 'weeks-header weeks-header-' + label },
    _react2.default.createElement(
      'span',
      { className: 'weeks-header-label' },
      short
    )
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
function Calendar(props) {
  return _react2.default.createElement(
    'div',
    { className: 'calendar-container' },
    _react2.default.createElement(_reactBigCalendar2.default, {
      selectable: true,
      events: props.events,
      defaultDate: props.today,
      startAccessor: 'start',
      endAccessor: 'end',
      onSelectEvent: props.selected,
      onSelectSlot: props.slot,
      onView: props.view,
      onNavigate: props.navigate,
      components: {
        toolbar: customToolbar,
        month: {
          header: customHeader
        }
      },
      eventPropGetter: style,
      views: ['month'],
      culture: 'en-GB'
    })
  );
}

Calendar.propTypes = {
  events: _propTypes2.default.arrayOf(_propTypes2.default.shape).isRequired,
  today: _propTypes2.default.instanceOf(Date).isRequired,
  selected: _propTypes2.default.func.isRequired,
  slot: _propTypes2.default.func.isRequired,
  view: _propTypes2.default.func.isRequired,
  navigate: _propTypes2.default.func.isRequired
};

exports.default = Calendar;