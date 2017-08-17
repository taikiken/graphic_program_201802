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

// component/schedule/node
import ComScheduleList from './ComScheduleList';

// gsap
/**
 * gsap.TweenLite
 * @type {TweenLite}
 */
const TweenLite = self.TweenLite;
/**
 * gsap.Power3
 * @type {Power3}
 */
const Power3 = self.Power3;

// ----------------------------------------
// select / option - games
// ----------------------------------------
/**
 * 試合種類（シーズン）を選択します,
 * div.mlb__schedule__limit_search--game
 * @param {DaeGameTypes} types 出力対象 JSON 変換データ
 * @param {function} change select.onChange callback method
 * @constructor
 */
const ComOptionTypes = ({ types, change }) => (
  <div className="mlb__schedule__limit_search--game">
    <dl>
      <dt className="mlb__schedule__limit_search__heading">
        <label htmlFor="limit_search--game">試合種別</label>
      </dt>
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
              // console.log('type', type);
              const id = Print.int(type.id);
              const typeName = Print.str(type.type);
              if (!id || !typeName) {
                return null;
              }
              return (
                <option
                  key={`type-${id}`}
                  value={type.key}
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
/**
 * div.mlb__schedule__limit_search--team
 * - team 選択 select / option を出力します
 * @param {DaeTeamTypes} teams team master
 * @param {function} change select.onChange callback
 * @constructor
 */
const ComOptionTeams = ({ teams, change }) => (
  <div className="mlb__schedule__limit_search--team">
    <dl>
      <dt className="mlb__schedule__limit_search__heading">
        <label htmlFor="limit_search--team">チーム別</label>
      </dt>
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

/**
 * propTypes
 * @type {{teams: DaeTeamTypes, change: function}}
 */
ComOptionTeams.propTypes = {
  teams: PropTypes.instanceOf(DaeTeamTypes).isRequired,
  change: PropTypes.func.isRequired,
};

// ----------------------------------------
// ComSchedule
// ----------------------------------------
/**
 * section.mlb__schedule
 * - ComSchedule
 *   - {@link ComOptionTeams}
 *   - {@link ComOptionTypes}
 *   - {@link ComScheduleList}
 */
export default class ComSchedule extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{teams: DaeTeamTypes, types: DaeGameTypes, schedule: DaeSchedule, date: {year: number, month: number, day: number}}}
   */
  static propTypes = {
    teams: PropTypes.instanceOf(DaeTeamTypes),
    types: PropTypes.instanceOf(DaeGameTypes),
    schedule: PropTypes.instanceOf(DaeSchedule),
    date: PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
      day: PropTypes.number,
    }),
  };
  /**
   * defaultProps
   * @type {{teams: ?DaeTeamTypes, types: ?DaeGameTypes, schedule: ?DaeSchedule}}
   */
  static defaultProps = {
    teams: null,
    types: null,
    schedule: null,
    date: null,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * {@link ComOptionTeams},
   * {@link ComOptionTypes} の選択状態を state 管理します
   * @param {object} props {@link ComSchedule.propTypes} 参照
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * state - {@link ComOptionTeams}, {@link ComOptionTypes} の選択状態を state 管理します
     *
     * 初期値
     * - team: all
     * - type: all
     * @type {{team: string, type: string}}
     */
    this.state = {
      team: 'all',
      type: 'all',
    };
    /**
     * bind onChangeTeams - team select.onChange event handler
     * @type {function}
     */
    this.onChangeTeams = this.onChangeTeams.bind(this);
    /**
     * bind onChangeTypes - type select.onChange event handler
     * @type {function}
     */
    this.onChangeTypes = this.onChangeTypes.bind(this);
    /**
     * bind onNavClick - nav click event handler
     * @type {function}
     */
    this.onNavClick = this.onNavClick.bind(this);
    /**
     * calendar id {@link Style.calendar}
     * @type {string}
     */
    this.id = Style.calendar.id;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * team select.onChange event handler
   * 1. value が空の時は `all` にする
   * 2. setState を行う
   * @param {Event} event select.onChange event
   */
  onChangeTypes(event) {
    event.preventDefault();
    const id = event.target.value;
    this.setState({
      type: id || 'all',
    });
    // console.log('onChangeTypes event', event.target.value, event, this.state.type);
  }
  /**
   * type select.onChange event handler
   * 1. value が空の時は `all` にする
   * 2. setState を行う
   * @param {Event} event select.onChange event
   */
  onChangeTeams(event) {
    event.preventDefault();
    const id = event.target.value;
    this.setState({
      team: id || 'all',
    });
    // console.log('onChangeTeams event', event.target.value, event, this.state.team);
  }
  /**
   * nav.onClick event handler
   * 1. calendar まで smooth scroll します
   * @param {Event} event nav.onClick event
   */
  onNavClick(event) {
    event.preventDefault();
    TweenLite.to(
      window,
      0.5,
      {
        scrollTo: {
          y: `#${this.id}`,
        },
        ease: Power3.easeOut,
      },
    );
  }
  /**
   * section.mlb__schedule を出力します
   * - section.mlb__schedule
   *   - {@link ComOptionTeams}
   *   - {@link ComOptionTypes}
   *   - {@link ComScheduleList}
   * @returns {?XML} section.mlb__schedule
   */
  render() {
    const { teams, types, schedule, date } = this.props;
    if (!teams || !types || !schedule) {
      return null;
    }
    // console.log('ComSchedule.render ---------------- ', types);
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
        <ComScheduleList
          seasons={schedule.seasons}
          date={date}
          team={this.state.team}
          type={this.state.type}
        />
      </section>
    );
  }
}
