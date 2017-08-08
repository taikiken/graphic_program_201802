/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/29 - 16:45
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


// util
import Day from '../../../util/Day';

// ----------------------------------------
// 更新ボタン 3 種類
// ----------------------------------------
/**
 * 更新ボタン 3 種類
 */
export default class ComScoreRefresh extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  /**
   * propTypes
   * @type {{status: number, date: Date, auto: function, manual: function, reload: function}}
   */
  static propTypes = {
    status: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    auto: PropTypes.func.isRequired,
    manual: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
  };
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 更新ボタン 3 種類 初期処理します
   * @param {*} props React props
   */
  constructor(props) {
    super(props);
    // ---
    /**
     * state
     * - radio - manual / auto, default: manual
     * @type {{radio: string}}
     */
    this.state = {
      radio: 'manual',
    };
    /**
     * bind onClickAuto - auto event handler
     * @type {function}
     */
    this.onClickAuto = this.onClickAuto.bind(this);
    /**
     * bind onClickManual - manual event handler
     * @type {function}
     */
    this.onClickManual = this.onClickManual.bind(this);
    /**
     * bind onClickReload - reload event handler
     * @type {function}
     */
    this.onClickReload = this.onClickReload.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * auto click event handler - props.auto を call します
   * @param {Event} event click event
   */
  onClickAuto(event) {
    event.preventDefault();
    const { radio } = this.state;
    if (radio !== 'auto') {
      this.setState({ radio: 'auto' });
      this.props.auto();
    }
  }
  /**
   * manual click event handler - props.manual を call します
   * @param {Event} event click event
   */
  onClickManual(event) {
    event.preventDefault();
    const { radio } = this.state;
    if (radio !== 'manual') {
      this.setState({ radio: 'manual' });
      this.props.manual();
    }
  }
  /**
   * reload click event handler - props.reload を call します
   * @param {Event} event click event
   */
  onClickReload(event) {
    event.preventDefault();
    this.props.reload();
  }
  /**
   * 自動・手動更新ボタン
   * @param {boolean} show 表示・非表示フラッグ
   * @returns {XML} div.refresh-container > div.mlb_live__reload__btn--auto
   */
  renderRefresh(show) {
    // console.log('ComScoreRefresh.renderRefresh', show);
    // flag 判定
    // TODO: TEST CODE
    // if (!show) {
    //   return null;
    // }
    // render
    const { radio } = this.state;
    return (
      <div className="refresh-container" style={{ display: 'inline' }}>
        <div id="auto" className="mlb_live__reload__btn--auto">
          <a
            href="#auto"
            className={radio === 'auto' ? 'selected' : ''}
            onClick={this.onClickAuto}
          >
            <span>自動更新(30秒ごと)</span>
          </a>
        </div>
        <div id="manual" className="mlb_live__reload__btn--manual">
          <a
            href="#manual"
            className={radio === 'manual' ? 'selected' : ''}
            onClick={this.onClickManual}
          >
            <span>手動更新</span>
          </a>
        </div>
      </div>
    );
  }
  /**
   * 「更新」ボタン
   * div.mlb_live__reload__btn--reload
   * @param {boolean} show 表示・非表示フラッグ
   * @returns {XML} div.mlb_live__reload__btn--reload
   */
  renderReload(show) {
    // console.log('ComScoreRefresh.renderReload', show);
    // flag 判定
    // TODO: TEST CODE
    // if (!show) {
    //   return null;
    // }
    // render
    return (
      <div id="reload" className="mlb_live__reload__btn--reload">
        <a
          href="#reload"
          onClick={this.onClickReload}
        >
          <span>更新</span>
        </a>
      </div>
    );
  }
  /**
   * ボタンを出力します
   * - reload
   *   - renderRefresh
   *   - renderReload
   * @returns {XML} nav.mlb_live__reload
   */
  render() {
    const { status, date } = this.props;
    // console.log('ComScoreRefresh.render', status, date);
    let showRefresh = false;
    let showReload = false;
    // 表示ステータスチェック
    if (status === 2) {
      // status:2 - 試合中のみ「自動・手動」「更新」表示させる
      showRefresh = true;
      showReload = true;
    } else if (status === 1 || status === 23) {
      // status: 1 - 試合前,   23 - 遅延/中断
      // 当日のみ「更新」表示させる
      // @type {string} - YYYYMMDD
      const today = Day.full(new Date());
      // @type {string} - YYYYMMDD
      const play = Day.full(date);
      // 文字列比較する
      if (today === play) {
        showReload = true;
      }
    }
    // どちらも表示する必要がない時は null
    // TODO: TEST CODE
    // if (!showRefresh && !showReload) {
    //   return null;
    // }
    // render
    return (
      <nav className="mlb_live__reload">
        {
          this.renderRefresh(showRefresh)
        }
        {
          this.renderReload(showReload)
        }
      </nav>
    );
  }
}
