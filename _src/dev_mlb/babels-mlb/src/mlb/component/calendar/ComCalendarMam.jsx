/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 22:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// rect-big-calendar component
import ComCalendar from './ComCalendar';

// dae
import DaeCalendar from '../../dae/schedule/DaeCalendar';

// util
import Day from '../../util/Day';

// app
import Link from '../../app/Link';

/**
 * カレンダー親コンポーネント
 * - {@link ConCalendar}
 *   - {@link ComCalendarMam}
 *     - {@link ComCalendar}
 */
export default class ComCalendarMam extends Component {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * propTypes
   * @type {{data: ?DaeCalendar, year: ?number, today: ?Date}}
   */
  static propTypes = {
    // maker: PropTypes.func.isRequired,
    data: PropTypes.instanceOf(DaeCalendar),
    year: PropTypes.number,
    today: PropTypes.instanceOf(Date),
  };
  /**
   * defaultProps
   * @type {{data: ?DaeCalendar, year: ?number, today: ?Date}}
   */
  static defaultProps = {
    data: null,
    year: null,
    today: null,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * calendar callback を準備します
   * @param {{data: ?DaeCalendar, year: ?number, today: ?Date}} props component 初期値
   */
  constructor(props) {
    super(props);
    // ----
    /**
     * bind onNavigate
     * @type {function}
     */
    this.onNavigate = this.onNavigate.bind(this);
    /**
     * bind onSlot
     * @type {function}
     */
    this.onSlot = this.onSlot.bind(this);
    /**
     * bind onSelected
     * @type {function}
     */
    this.onSelected = this.onSelected.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  // componentDidMount() {
  //   // async request start
  //   // {@link ConCalendar}.calendarMam
  //   // `dispatch(actions.calendar())`
  //   console.log('ComCalendarMam.componentDidMount', this.props.year);
  //   this.props.maker(2018);
  // }
  /**
   * props 変更 update 可否を判断します
   * @param {*} nextProps 次の props
   * @returns {boolean} true - render します
   */
  shouldComponentUpdate(nextProps) {
    const { year, today, data } = this.props;
    console.log('ComCalendarMam.shouldComponentUpdate nextState', nextProps);
    return nextProps &&
      (
        (nextProps.year && year !== nextProps.year) ||
        (nextProps.today && today !== nextProps.today) ||
        (nextProps.data && data !== nextProps.data)
      );
  }
  /**
   * 日付 click callback
   * @param {Date} event カレンダー日付 Date instance
   */
  onNavigate(event) {
    console.log('ComCalendarMam.onNavigate', event);
    this.transition(event);
  }
  /**
   * 日付枠内 click callback
   * @param {?object} event event が存在しない時は null
   * ```
   * Object {slots: Array(1), start: Wed Jul 12 2017 00:00:00 GMT+0900 (JST), end: Wed Jul 12 2017 00:00:00 GMT+0900 (JST), action: "click"}
   * ```
   */
  onSlot(event) {
    // console.log('ComCalendarMam.onSlot', event);
    this.transition(event.start);
  }
  /**
   * event 表示エリア click callback
   * @param {ModCalendarEvents} event
   * ```
   *  {start: Tue Jul 11 2017 00:00:00 GMT+0900 (JST), end: Tue Jul 11 2017 00:00:00 GMT+0900 (JST), allDay: true, title: "2017年7月11日", year: 2017…}
   * ```
   */
  onSelected(event) {
    console.log('ComCalendarMam.onSelected', event);
    this.transition(event.start);
  }
  /**
   * calendar click 遷移を行います
   * @param {Date} date 遷移パス取得するための Date instance
   */
  transition(date) {
    // ゲーム開催日チェック
    const game = this.props.data.events.game(date);
    console.log('ComCalendarMam.transition', date, game);
    if (game) {
      console.log('ComCalendarMam.transition', game.full, Link.schedule(game.full));
    }
  }
  /**
   * data が存在する時に{@link ComCalendar} を出力します
   * @returns {?ComCalendar} data が存在する時に{@link ComCalendar} を返します
   */
  render() {
    console.log('ComCalendarMam.render ============', this.props);
    const data = this.props.data;
    if (!data) {
      return null;
    }
    return (
      <ComCalendar
        events={data.events.games}
        today={this.props.today || Day.current()}
        selected={this.onSelected}
        slot={this.onSlot}
        navigate={this.onNavigate}
      />
    );
  }
}
