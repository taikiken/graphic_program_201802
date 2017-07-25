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

// 何故か gsap が import で有効化されない global object は存在する ????
// // gsap / TweenMax
// import { TweenLite, Power3 } from 'gsap';
// // eslint-disable-next-line no-unused-vars
// import ScrollToPlugin from 'gsap/ScrollToPlugin';

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';


// define
import Style from '../../../define/Style';

// dae/master
import DaeTeamTypes from '../../../dae/master/DaeTeamTypes';
import DaeGameTypes from '../../../dae/master/DaeGameTypes';

// dae/schedule
import DaeSchedule from '../../../dae/schedule/DaeSchedule';

// util
import Print from '../../../util/Print';

// gsap
const TweenLite = self.TweenLite;
const Power3 = self.Power3;

// ----------------------------------------
// select / option - games
// ----------------------------------------

// ----------------------------------------
// select / option - team
// ----------------------------------------
const ComOptionTeams = ({ teams, change }) => (
  <div className="mlb__schedule__limit_search--team">
    <dl>
      <dt className="mlb__schedule__limit_search__heading">チーム別</dt>
      <dd className="mlb__schedule__limit_search__select">
        <select
          name="limit_search--team"
          id="limit_search--team"
          className="limit_search--team"
          onChange={change}
        >
          <option value="">チーム名を選択</option>
          {
            teams.list.map((team) => {
              const id = Print.int(team.id);
              const teamName = Print.str(team.team);
              if (!id || !teamName) {
                return null;
              }
              return (
                <option
                  key={`team-${id}`}
                  value={id}
                >
                  {teamName}
                </option>
              );
            })
          }
        </select>
      </dd>
    </dl>
  </div>
);

ComOptionTeams.propTypes = {
  teams: PropTypes.instanceOf(DaeTeamTypes).isRequired,
  change: PropTypes.func.isRequired,
};

// ----------------------------------------
// div.mlb__schedule__heading__container
// ----------------------------------------

const onWatchClick = (event) => {
  event.preventDefault();
  TweenLite.to(
    window,
    0.05,
    {
      scrollTo: {
        y: `#${Style.calendar.id}`,
      },
      ease: Power3.easeOut,
    },
  );
};

const ComHeading = () => (
  <div className="mlb__schedule__heading__container">
    <h2 className="mlb__schedule__heading">日程・結果</h2>
    <div className="mlb__schedule__heading__btn">
      <a href={`#${Style.calendar.id}`} onClick={onWatchClick}>
        <span>カレンダーを見る</span>
      </a>
    </div>
  </div>
);

// ----------------------------------------
// ComSchedule
// ----------------------------------------
export default class ComSchedule extends Component {
  static propTypes = {
    teams: PropTypes.instanceOf(DaeTeamTypes),
    types: PropTypes.instanceOf(DaeGameTypes),
    schedule: PropTypes.instanceOf(DaeSchedule),
  };
  static defaultProps = {
    teams: null,
    types: null,
    schedule: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      team: 'all',
      game: 'all',
    };
    this.onChangeTeams = this.onChangeTeams.bind(this);
  }
  onChangeTeams(event) {
    event.preventDefault();
    console.log('onChangeTeams event', event.target.value, event, this.state.team);
  }
  render() {
    const { teams, types, schedule } = this.props;
    if (!teams || !types || !schedule) {
      return null;
    }
    // render
    return (
      <section className="mlb__schedule">
        <ComHeading />
        <nav className="mlb__schedule__limit_search">
          <ComOptionTeams
            teams={teams}
            change={this.onChangeTeams}
          />
        </nav>
      </section>
    );
  }
}

// const ComSchedule = ({ teams, types, schedule }) => {
//   if (!teams || !types || !schedule) {
//     return null;
//   }
//   // render
//   return (
//     <section className="mlb__schedule">
//       <ComHeading />
//       <nav className="mlb__schedule__limit_search">
//         <ComOptionTeams
//           teams={teams}
//         />
//       </nav>
//     </section>
//   );
// };
//
// ComSchedule.propTypes = {
//   teams: PropTypes.instanceOf(DaeTeamTypes),
//   types: PropTypes.instanceOf(DaeGameTypes),
//   schedule: PropTypes.instanceOf(DaeSchedule),
// };
//
// ComSchedule.defaultProps = {
//   teams: null,
//   types: null,
//   schedule: null,
// };
//
// export default ComSchedule;
