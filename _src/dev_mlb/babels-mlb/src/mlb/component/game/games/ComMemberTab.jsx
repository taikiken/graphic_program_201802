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

/**
 * 出場成績 - 打者 / 投手 切替タブ
 */
export default class ComMemberTab extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{change: function, tab: string}}
   */
  static propTypes = {
    change: PropTypes.func.isRequired,
    tab: PropTypes.string.isRequired,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 出場成績 - 打者 / 投手 切替タブ
   * @param {*} props React.props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * tab の current state
     * @type {{current: {batter: boolean, pitcher: boolean}}}
     */
    this.state = {
      current: {
        batter: props.tab === 'batter',
        pitcher: props.tab === 'pitcher',
      },
    };
    /**
     * bind onClick - tab click event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  /**
   * tab click event handler,
   * event.target.href から label を取得し props.change へ通知します
   * @param {Event} event click event, event.target を取得し対象コンテナを特定します
   */
  onClick(event) {
    event.preventDefault();
    console.log('ComMemberTab.onClick', event);
    const target = event.target;
    const tab = target.href.split('#').pop();
    // state.current clone + all off
    const current = Object.assign({}, this.state.current);
    current.batter = false;
    current.pitcher = false;
    // current on
    current[tab] = true;
    // set state
    this.setState({ current });
    // call props.change
    this.props.change(tab);
  }
  /**
   * 出場成績 - 打者 / 投手 切替タブ
   * nav.mlb_live__nav
   * @returns {XML} nav.mlb_live__nav
   */
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
