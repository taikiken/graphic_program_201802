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
    data: PropTypes.instanceOf(DaeCalendar),
    maker: PropTypes.func.isRequired,
  };
  static defaultProps = {
    data: null,
  };
  static onSelected(event) {
    console.log('ComCalendarMam.onSelected', event);
  }
  // static onSlot(event) {
  //   console.log('ComCalendarMam.onSlot', event);
  // }
  static onView(event) {
    console.log('ComCalendarMam.onView', event);
  }
  // static onNavigate(event) {
  //   console.log('ComCalendarMam.onNavigate', event);
  // }
  constructor(props) {
    super(props);
    this.onNavigate = this.onNavigate.bind(this);
    this.onSlot = this.onSlot.bind(this);
  }
  componentDidMount() {
    // console.log('ComCalendarMam.componentDidMount', this.props.maker);
    this.props.maker();
  }
  shouldComponentUpdate(nextProps) {
    const { data } = this.props;
    console.log('ComCalendarMam.shouldComponentUpdate nextState', nextProps);
    return nextProps && data !== nextProps.data;
  }
  onNavigate(event) {
    console.log('ComCalendarMam.onNavigate', event);
    this.transition(event);
  }
  onSlot(event) {
    console.log('ComCalendarMam.onSlot', event);
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
        selected={ComCalendarMam.onSelected}
        slot={this.onSlot}
        view={ComCalendarMam.onView}
        navigate={this.onNavigate}
      />
    );
  }
}
