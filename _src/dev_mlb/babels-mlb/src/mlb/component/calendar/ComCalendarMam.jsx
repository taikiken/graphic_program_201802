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


import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ComCalendar from './ComCalendar';

export default class ComCalendarMam extends Component {
  static propTypes = {
    events: PropTypes.arrayOf(PropTypes.shape),
    today: PropTypes.instanceOf(Date),
    selected: PropTypes.func,
    slot: PropTypes.func,
    view: PropTypes.func,
    navigate: PropTypes.func,
    maker: PropTypes.func.isRequired,
  };
  static defaultProps = {
    events: [],
    today: new Date(),
    selected: () => {},
    slot: () => {},
    view: () => {},
    navigate: () => {},
  };
  componentDidMount() {
    this.props.maker();
  }
  render() {
    if (this.props.events.length === 0) {
      return null;
    }
    return (
      <ComCalendar
        events={this.props.events}
        today={this.props.today}
        selected={this.props.selected}
        slot={this.props.slot}
        view={this.props.view}
        navigate={this.props.navigate}
      />
    );
  }
}
