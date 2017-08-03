/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/22 - 15:54
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
import ComScheduleMam from '../../../component/schedule/ComScheduleMam';

/**
 * redux - connect する schedule state コンバーター
 * @param {*} schedule redux state
 * @returns {*} redux state
 */
const mapStateToProps = ({ schedule }) => (schedule);

/**
 * react-redux.connect {@link ComScheduleMam}
 * @type {*}
 */
const ConSchedule = connect(mapStateToProps)(ComScheduleMam);

export default ConSchedule;
