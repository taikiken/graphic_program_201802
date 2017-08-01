/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/01 - 13:59
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

export default class ComMemberTab extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{change: function}}
   */
  static propTypes = {
    change: PropTypes.func.isRequired,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  constructor(props) {
    super(props);
    // ---
    this.state = {
      current: {
        batter: true,
        pitcher: false,
      },
    };
    /**
     * bind onClick - tab click event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    event.preventDefault();
    console.log('ComMemberTab.onClick', event);
    const target = event.target;
    const tab = target.href.split('#').pop();
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
      <nav className="mlb_live__nav mlb_live__nav--tab_menu">
        <ul className="mlb_live__nav__list">
          <li id="batter" className="mlb_live__nav__item">
            <a
              href="#batter"
              data-tab="batter"
              className={current.batter ? 'current' : ''}
              onClick={this.onClick}
            >
              打者成績
            </a>
          </li>
          <li id="pitcher" className="mlb_live__nav__item">
            <a
              href="#pitcher"
              data-tab="pitcher"
              className={current.pitcher ? 'current' : ''}
              onClick={this.onClick}
            >
              投手成績
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
