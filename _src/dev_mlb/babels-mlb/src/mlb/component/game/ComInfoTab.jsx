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
  /**
   * tab 切替 nav.mlb_live__nav 準備します
   * @param {*} props Reacr.props
   */
  constructor(props) {
    super(props);
    // ----
    /**
     * state - tab状態
     * @type {{tab: string, current: {game: boolean, member: boolean, inning: boolean}}}
     */
    this.state = {
      tab: 'game',
      current: {
        game: true,
        member: false,
        inning: false,
      },
    };
    /**
     * bind onClick - tab click event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * tab click event handler
   * - current 状態を変更します
   * - props.change を call します
   * @param {Event} event click event - event.target.href から tab name を取得します
   */
  onClick(event) {
    event.preventDefault();
    // console.log('ComNav.onClick', event);
    const target = event.target;
    // const tab = target.dataset.tab;
    const tab = target.href.split('#').pop();
    const current = {
      game: false,
      member: false,
      inning: false,
    };
    current[tab] = true;
    // state update
    this.setState({ current });
    // callback
    this.props.change(tab);
  }
  /**
   * タブを出力します
   * - 試合情報
   * - 出場成績
   * - イニング速報
   * nav.mlb_live__nav
   * @returns {XML} nav.mlb_live__nav
   */
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
