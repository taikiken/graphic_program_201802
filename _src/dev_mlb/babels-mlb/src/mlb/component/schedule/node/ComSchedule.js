/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/25 - 18:24
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

// dae/master
import DaeTeamTypes from '../../../dae/master/DaeTeamTypes';
import DaeGameTypes from '../../../dae/master/DaeGameTypes';

// dae/schedule
import DaeSchedule from '../../../dae/schedule/DaeSchedule';


// ----------------------------------------
// div.mlb__schedule__heading__container
// ----------------------------------------
const ComHeading = () => (
  <div className="mlb__schedule__heading__container">
    <h2 className="mlb__schedule__heading">日程・結果</h2>
  </div>
);

// ----------------------------------------
// ComSchedule
// ----------------------------------------
const ComSchedule = ({ teams, types, schedule }) => {
  if (!teams || !types || !schedule) {
    return null;
  }
  // render
  return (
    <section className="mlb__schedule">

    </section>
  );
};

ComSchedule.propTypes = {
  teams: PropTypes.instanceOf(DaeTeamTypes),
  types: PropTypes.instanceOf(DaeGameTypes),
  schedule: PropTypes.instanceOf(DaeSchedule),
};

ComSchedule.defaultProps = {
  teams: null,
  types: null,
  schedule: null,
};

export default ComSchedule;
