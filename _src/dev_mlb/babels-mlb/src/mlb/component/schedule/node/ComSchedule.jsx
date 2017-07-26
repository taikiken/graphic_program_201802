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
const ComOptionTypes = ({ types, change }) => (
  <div className="mlb__schedule__limit_search--game">
    <dl>
      <dt className="mlb__schedule__limit_search__heading">試合種別</dt>
      <dd className="mlb__schedule__limit_search__select">
        <select
          name="limit_search--game"
          id="limit_search--game"
          className="limit_search--game"
          onChange={change}
        >
          <option value="">すべての試合</option>
          {
            types.list.map((type) => {
              console.log('type', type);
              const id = Print.int(type.id);
              const typeName = Print.str(type.type);
              if (!id || !typeName) {
                return null;
              }
              return (
                <option
                  key={`type-${id}`}
                  value={id}
                >
                  {typeName}
                </option>
              );
            })
          }
        </select>
      </dd>
    </dl>
  </div>
);

ComOptionTypes.propTypes = {
  types: PropTypes.instanceOf(DaeGameTypes).isRequired,
  change: PropTypes.func.isRequired,
};

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
      type: 'all',
    };
    this.onChangeTeams = this.onChangeTeams.bind(this);
    this.onChangeTypes = this.onChangeTypes.bind(this);
    this.onNavClick = this.onNavClick.bind(this);
    this.id = Style.calendar.id;
  }
  onChangeTypes(event) {
    event.preventDefault();
    const id = event.target.value;
    this.setState({
      type: id || 'all',
    });
    console.log('onChangeTypes event', event.target.value, event, this.state.type);
  }
  onChangeTeams(event) {
    event.preventDefault();
    const id = event.target.value;
    this.setState({
      team: id || 'all',
    });
    console.log('onChangeTeams event', event.target.value, event, this.state.team);
  }
  onNavClick(event) {
    event.preventDefault();
    TweenLite.to(
      window,
      0.05,
      {
        scrollTo: {
          y: `#${this.id}`,
        },
        ease: Power3.easeOut,
      },
    );
  }
  render() {
    const { teams, types, schedule } = this.props;
    if (!teams || !types || !schedule) {
      return null;
    }
    console.log('ComSchedule.render ---------------- ', types);
    // render
    return (
      <section className="mlb__schedule">
        <div className="mlb__schedule__heading__container">
          <h2 className="mlb__schedule__heading">日程・結果</h2>
          <div className="mlb__schedule__heading__btn">
            <a href={`#${Style.calendar.id}`} onClick={this.onNavClick}>
              <span>カレンダーを見る</span>
            </a>
          </div>
        </div>
        <nav className="mlb__schedule__limit_search">
          <ComOptionTeams
            teams={teams}
            change={this.onChangeTeams}
          />
          <ComOptionTypes
            types={types}
            change={this.onChangeTypes}
          />
        </nav>
      </section>
    );
  }
}
