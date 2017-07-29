/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:49
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

/**
 * tab 切替 nav.mlb_live__nav
 */
export default class ComInfoTab extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  static propTypes = {
    change: PropTypes.func.isRequired,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      tab: 'game',
      current: {
        game: true,
        member: false,
        inning: false,
      },
    };
    this.onClick = this.onClick.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  onClick(event) {
    event.preventDefault();
    console.log('ComNav.onClick', event);
    const target = event.target;
    const tab = target.dataset.tab;
    const current = {
      game: false,
      member: false,
      inning: false,
    };
    current[tab] = true;
    this.setState({ current });
    this.props.change(tab);
  }
  render() {
    const { current } = this.state;
    return (
      <nav className="mlb_live__nav mlb_live__nav--global">
        <ul className="mlb_live__nav__list">
          <li className="mlb_live__nav__item">
            <a
              href="#game"
              data-tab="game"
              className={current.game ? 'current' : ''}
              onClick={this.onClick}
            >
              試合情報
            </a>
          </li>
          <li className="mlb_live__nav__item">
            <a
              href="#member"
              data-tab="member"
              className={current.member ? 'current' : ''}
              onClick={this.onClick}
            >
              出場成績
            </a>
          </li>
          <li className="mlb_live__nav__item">
            <a
              href="#inning"
              data-tab="inning"
              className={current.inning ? 'current' : ''}
              onClick={this.onClick}
            >
              イニング速報
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
