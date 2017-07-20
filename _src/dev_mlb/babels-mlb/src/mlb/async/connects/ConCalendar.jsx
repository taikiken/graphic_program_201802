/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 21:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React from 'react';
import PropTypes from 'prop-types';

// redux
import { connect } from 'react-redux';

// component
import ComCalendarMam from '../../component/calendar/ComCalendarMam';

// actions
import actions from '../actions';

// dae
import DaeCalendar from '../../dae/schedule/DaeCalendar';

/**
 * state を redux 経由し props 変換します
 * @param {*} request 更新される state {button, request}
 * @returns {*} 引数 state を返します
 */
const mapStateToProps = ({ calendar }) => (calendar);

// TODO: この構造だとダメ ViewCalendar 作る
const calendarMam = ({ dispatch, data }) => {
  console.log('calendarMam', data);
  return (
    <ComCalendarMam
      maker={() => (dispatch(actions.calendar()))}
      data={data}
    />
  );
};

// // TODO: この構造だとダメ ViewCalendar 作る
// const calendarMam = ({ dispatch, data }) => (
//   <ComCalendarMam
//     maker={() => (dispatch(actions.calendar()))}
//     data={data}
//   />
// );

calendarMam.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.instanceOf(DaeCalendar),
};

calendarMam.defaultProps = {
  data: null,
};

const ConCalendar = connect(mapStateToProps)(calendarMam);

export default ConCalendar;
