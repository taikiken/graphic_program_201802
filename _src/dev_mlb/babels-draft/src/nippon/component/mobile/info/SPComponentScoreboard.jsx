/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/20 - 17:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// component
import SPComponentScoreboardTable from './SPComponentScoreboardTable';

// dae
import Team from '../../../dae/nippon/Team';

/**
 * SP スコアボード parent
 * ```
 * SPComponentScoreboard
 *    SPComponentScoreboardTable
 * ```
 * {@link SPComponentScoreboardTable}
 */
export default class SPComponentScoreboard extends Component {
  // ---------------------------------------------------
  //  [RECT NATIVE] STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @type {{
   *    home: Team,
   *    visitor: Team
   * }}
   */
  static propTypes = {
    // @type {Team} - response.home
    home: PropTypes.instanceOf(Team).isRequired,
    // @type {Team} - response.visitor
    visitor: PropTypes.instanceOf(Team).isRequired,
  };
  /**
   * 延長切替ボタン親コンテナの表示・非表示クラス出力
   * @param {number} count イニング数 9 以下は `switch-hide` を返し非表示にします
   * @return {string} `switch-hide` or ''
   */
  static hideSwitch(count) {
    return count <= 9 ? 'switch-hide' : '';
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentScoreboard.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * React state
     * @type {{
     *  home: Team,
     *  visitor: Team,
     *  first: boolean,
     *  second: boolean,
     *  btnFirst: string,
     *  btnSecond: string,
     * }}
     */
    this.state = {
      // home: props.home,
      // visitor: props.visitor,
      first: true,
      second: false,
      btnFirst: 'btn-hide',
      btnSecond: '',
    };
    /**
     * bound onFirst
     * @type {function}
     */
    this.onFirst = this.onFirst.bind(this);
    /**
     * bound onSecond
     * @type {function}
     */
    this.onSecond = this.onSecond.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * a.onclick event handler
   * @param {Event} event a.onclick event
   */
  onFirst(event) {
    event.preventDefault();
    this.setState({
      btnFirst: 'btn-hide',
      btnSecond: '',
      first: true,
      second: false,
    });
  }
  /**
   * a.onclick event handler
   * @param {Event} event a.onclick event
   */
  onSecond(event) {
    event.preventDefault();
    this.setState({
      btnFirst: '',
      btnSecond: 'btn-hide',
      first: false,
      second: true,
    });
  }
  /**
   * div.scoreboard, スコアボードを出力します
   * @return {?XML} div.scoreboard or null
   * */
  render() {
    const { home, visitor } = this.props;
    // 表示イニングを計算する, 9を確保
    const count = Math.max(home.score.inningCount, visitor.score.inningCount, 9);
    return (
      <div className="scoreboard">
        <div className={`team team-${visitor.info.id} visitor`}>
          {visitor.info.name}
        </div>
        <div className="scoreboard-table">
          {/* 1 ~ 9 */}
          <SPComponentScoreboardTable
            home={home}
            visitor={visitor}
            show={this.state.first}
            extra={false}
          />
          {/* extra */}
          <SPComponentScoreboardTable
            home={home}
            visitor={visitor}
            show={this.state.second}
            extra
          />
        </div>
        <div className={`team team-${home.info.id} home`}>
          {home.info.name}
        </div>
        <div className={`extra-switch ${SPComponentScoreboard.hideSwitch(count)}`}>
          <div className={`btn-to-default ${this.state.btnFirst}`}>
            <a href="#normal" onClick={this.onFirst}>1〜9回</a>
          </div>
          <div className={`btn-to-extra ${this.state.btnSecond}`}>
            <a href="#extra" onClick={this.onSecond}>延長戦</a>
          </div>
        </div>
      </div>
    );
  }
}
