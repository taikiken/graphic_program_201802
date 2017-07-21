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

// TODO: props maker, json 2つにする
export default class ComCalendarMam extends Component {
  static propTypes = {
    // maker: PropTypes.func.isRequired,
    data: PropTypes.instanceOf(DaeCalendar),
    year: PropTypes.number,
  };
  static defaultProps = {
    data: null,
    year: null,
  };
  // static onSelected(event) {
  //   console.log('ComCalendarMam.onSelected', event);
  // }
  // static onSlot(event) {
  //   console.log('ComCalendarMam.onSlot', event);
  // }
  // static onView(event) {
  //   console.log('ComCalendarMam.onView', event);
  // }
  // static onNavigate(event) {
  //   console.log('ComCalendarMam.onNavigate', event);
  // }
  constructor(props) {
    super(props);
    this.onNavigate = this.onNavigate.bind(this);
    this.onSlot = this.onSlot.bind(this);
    this.onSelected = this.onSelected.bind(this);
  }
  // componentDidMount() {
  //   // async request start
  //   // {@link ConCalendar}.calendarMam
  //   // `dispatch(actions.calendar())`
  //   console.log('ComCalendarMam.componentDidMount', this.props.year);
  //   this.props.maker(2018);
  // }
  shouldComponentUpdate(nextProps) {
    const { year } = this.props;
    console.log('ComCalendarMam.shouldComponentUpdate nextState', nextProps);
    return nextProps && year !== nextProps.year;
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
  transition(date) {
    const game = this.props.data.events.game(date);
    console.log('ComCalendarMam.transition', date, game);
    if (game) {
      console.log('ComCalendarMam.transition', game.full);
    }
  }
  render() {
    console.log('ComCalendarMam.render ============', this.props);
    const data = this.props.data;
    if (!data) {
      return null;
    }
    return (
      <ComCalendar
        events={data.events.games}
        today={Day.current()}
        selected={this.onSelected}
        slot={this.onSlot}
        navigate={this.onNavigate}
      />
    );
  }
}
