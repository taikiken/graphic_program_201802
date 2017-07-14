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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

_moment2.default.locale('ja', {
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'YYYY/DD/MM',
    LL: 'YYYY MMMM D',
    LLL: 'YYYY MMMM D HH:mm',
    LLLL: 'YYYY MMMM D dddd HH:mm'
  },
  calendar: {
    sameDay: '[今日] LT',
    nextDay: '[明日] LT',
    nextWeek: '[次週] LT',
    lastDay: '[昨日] LT',
    lastWeek: 'dddd [先週] LT',
    sameElse: 'L'
  },
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  weekdays: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
  weekdaysShort: ['日', '月', '火', '水', '木', '金', '土'],
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
    yy: '%d 年'
  }

});

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
_reactBigCalendar2.default.momentLocalizer(_moment2.default);
//
// export default class Calendar extends Component {
//   // static propTypes = {
//   //   events: PropTypes.arrayOf(PropTypes.string).isRequired,
//   // }
//   constructor() {
//     super();
//     this.id = 1;
//   }
//   render() {
//     return (
//       <div className="calendar-conatiner">
//         <BigCalendar
//           startAccessor="startDate"
//           endAccessor="endDate"
//         />
//       </div>
//     );
//   }
// }

function Calendar(props) {
  return _react2.default.createElement(
    'div',
    { className: 'calendar-container' },
    _react2.default.createElement(_reactBigCalendar2.default, {
      events: props.events,
      defaultDate: props.today
    })
  );
}

Calendar.propTypes = {
  events: _propTypes2.default.arrayOf(_propTypes2.default.shape).isRequired,
  today: _propTypes2.default.instanceOf(Date).isRequired
};

// function Calendar() {
//   return (
//     <div className="calendar-conatiner">
//       <BigCalendar
//         startAccessor="startDate"
//         endAccessor="endDate"
//       />
//     </div>
//   );
// }


exports.default = Calendar;

// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
//
// /**
//  * input type: button を作成します
//  */
// export default class Button extends Component {
//   /**
//    * - maker - PropTypes.func.isRequired
//    * @returns {{maker: Function}} default props
//    */
//   static get propTypes() {
//     return {
//       maker: PropTypes.func.isRequired,
//       loading: PropTypes.string,
//     };
//   }
//   /**
//    * default props.loading - empty
//    * @returns {{loading: string}} react default props.loading を設定します
//    */
//   static get defaultProps() {
//     return {
//       loading: '',
//     };
//   }
//   /**
//    * onClick を bind します
//    * @param {Object} props {maker}
//    */
//   constructor(props) {
//     super(props);
//     console.log('Button.constructor', props);
//     /**
//      * bound this.onClick
//      * @type {function}
//      */
//     this.onClick = this.onClick.bind(this);
//   }
//   /**
//    * delegate - render するかを判断します, props.loading が違っていたら render します
//    * @override
//    * @param {?Object} nextProps 更新される props
//    * @param {?Object} nextState 更新される state
//    * @returns {boolean} true: will be render
//    */
//   shouldComponentUpdate(nextProps, nextState) {
//     const { loading } = this.props;
//     const needUpdate = nextProps.loading !== loading;
//     console.log('Button.shouldComponentUpdate', needUpdate, loading, nextProps, nextState);
//     return needUpdate;
//   }
//   // componentWillUnmount() {
//   //   console.log('Button.componentWillUnmount');
//   // }
//   /**
//    * input.onclick event handler
//    * @param {Event} event input.onclick Event object
//    */
//   onClick(event) {
//     event.preventDefault();
//     console.log('Button.onClick', event);
//     this.props.maker();
//   }
//   /**
//    * input
//    * @returns {XML} input type: button
//    */
//   render() {
//     console.log('Button.render style', this.props.loading);
//     return (
//       <div className={`input-container ${this.props.loading}`}>
//         <input
//           type="button"
//           onClick={this.onClick}
//           value="CLICK ME!"
//         />
//       </div>
//     );
//   }
// }