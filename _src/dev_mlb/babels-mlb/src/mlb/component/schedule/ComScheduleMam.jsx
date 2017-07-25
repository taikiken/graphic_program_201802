/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/22 - 14:15
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

// dae/schedule
import DaeSchedule from '../../dae/schedule/DaeSchedule';

// dae/master
import DaeGameTypes from '../../dae/master/DaeGameTypes';
import DaeTeamTypes from '../../dae/master/DaeTeamTypes';

// component/schedule/node
import ComJapanese from './node/ComJapanese';
import ComSchedule from './node/ComSchedule';

/**
 * 日程・結果 - `/stats/mlb/` or `/stats/mlb/YYYYMMDD`
 * - ComScheduleMam
 *   - {@link ComJapanese}
 * @param {DaeSchedule} schedule JSON {@link Api.schedule} - `/master/schedule/2017/7/25.json`
 * @param {{year: number, month: number, day: number}} date {@link Day}.today object
 * @param {DaeGameTypes} types ゲーム種類
 * @param {DaeTeamTypes} teams チーム一覧
 * @returns {?XML} 日本人選手一覧 or null
 * @constructor
 */
const ComScheduleMam = ({ schedule, date, types, teams }) => {
  //  data が存在しない時は null
  if (!schedule || !date) {
    return null;
  }
  // render
  return (
    <div className="index-container">
      <ComJapanese
        japanese={schedule.japanese}
        date={date}
      />
      <ComSchedule
        schedule={schedule}
        types={types}
        teams={teams}
      />
    </div>
  );
};

/**
 * propTypes
 * @type {{
 *  schedule: DaeSchedule,
 *  date: {year: number, month: number, day: number},
 *  types: DaeGameTypes
 *  teams: DaeTeamTypes
 * }}
 */
ComScheduleMam.propTypes = {
  schedule: PropTypes.instanceOf(DaeSchedule),
  date: PropTypes.shape({
    year: PropTypes.number,
    month: PropTypes.number,
    day: PropTypes.number,
  }),
  types: PropTypes.instanceOf(DaeGameTypes),
  teams: PropTypes.instanceOf(DaeTeamTypes),
};

/**
 * defaultProps
 * @type {{schedule: null, date: null}}
 */
ComScheduleMam.defaultProps = {
  schedule: null,
  date: null,
  types: null,
  teams: null,
};

export default ComScheduleMam;
