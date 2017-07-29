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
import Day from '../../util/Day';

export default class ComScoreRefresh extends Component {
  static propTypes = {
    status: PropTypes.number.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    auto: PropTypes.func.isRequired,
    manual: PropTypes.func.isRequired,
    reload: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      radio: 'auto',
    };
    this.onClickAuto = this.onClickAuto.bind(this);
    this.onClickManual = this.onClickManual.bind(this);
    this.onClickReload = this.onClickReload.bind(this);
  }
  onClickAuto(event) {
    event.preventDefault();
    const { radio } = this.state;
    if (radio !== 'auto') {
      this.setState({ radio: 'auto' });
      this.props.auto();
    }
  }
  onClickManual(event) {
    event.preventDefault();
    const { radio } = this.state;
    if (radio !== 'manual') {
      this.setState({ radio: 'manual' });
      this.props.manual();
    }
  }
  onClickReload(event) {
    event.preventDefault();
    this.props.reload();
  }
  renderRefresh(show) {
    console.log('ComScoreRefresh.renderRefresh', show);
    // TODO: remove test code
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
  renderReload(show) {
    console.log('ComScoreRefresh.renderReload', show);
    // TODO: remove test code
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
  render() {
    const { status, date } = this.props;
    console.log('ComScoreRefresh.render', status, date);
    let showRefresh = false;
    let showReload = false;
    if (status === 2) {
      // status:2 - 試合中のみ「自動・手動」「更新」表示させる
      showRefresh = true;
      showReload = true;
    } else if (status === 1) {
      // status: 1 - 試合前
      // 当日のみ「更新」表示させる
      const today = Day.full(new Date());
      const play = Day.full(date);
      if (today === play) {
        showReload = true;
      }
    }
    // TODO: remove test code
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
