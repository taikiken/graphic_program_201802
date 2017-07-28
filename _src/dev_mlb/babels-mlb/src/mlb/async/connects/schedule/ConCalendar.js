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

// redux
import { connect } from 'react-redux';

// component
import ComCalendarMam from '../../../component/calendar/ComCalendarMam';

/**
 * state を redux 経由し props 変換します
 * @returns {*} 引数 state を返します
 */
const mapStateToProps = ({ calendar }) => (calendar);

/**
 * react-redux.connect {@link ComCalendarMam}
 * @type {*}
 */
const ConCalendar = connect(mapStateToProps)(ComCalendarMam);

export default ConCalendar;
