/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/28 - 22:04
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

// dae
import DaeGameInfo from '../../dae/games/DaeGameInfo';

// util
import Print from '../../util/Print';

// component
import ComScoreRefresh from './ComScoreRefresh';

// ----------------------------------------
// スコアボード・下 切替ボタン NEXT
// ----------------------------------------
const ComSwitchNext = ({ start, innings, action }) => {
  console.log('ComSwitchNext', start, innings);
  // TODO: remove test code
  if (start + 9 >= innings) {
    return (
      <li id="innings-prev" className="mlb_live__scoreboard__inning_pager__item">
        <span className="mlb_live__scoreboard__inning_pager__link disabled">
          <span>次の回</span>
        </span>
      </li>
    );
  }
  // render
  return (
    <li id="innings-next" className="mlb_live__scoreboard__inning_pager__item">
      <a
        href="#innings-next"
        className="mlb_live__scoreboard__inning_pager__link"
        onClick={action}
      >
        <span>次の回</span>
      </a>
    </li>
  );
};

ComSwitchNext.propTypes = {
  start: PropTypes.number.isRequired,
  innings: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
};

// ----------------------------------------
// スコアボード・下 切替ボタン PREV
// ----------------------------------------
const ComSwitchPrev = ({ start, action }) => {
  console.log('ComSwitchPrev', start);
  if (start === 1) {
    return (
      <li id="innings-prev" className="mlb_live__scoreboard__inning_pager__item">
        <span className="mlb_live__scoreboard__inning_pager__link disabled">
          <span>前の回</span>
        </span>
      </li>
    );
  }
  // render
  return (
    <li id="innings-prev" className="mlb_live__scoreboard__inning_pager__item">
      <a
        href="#innings-prev"
        className="mlb_live__scoreboard__inning_pager__link"
        onClick={action}
      >
        <span>前の回</span>
      </a>
    </li>
  );
};

ComSwitchPrev.propTypes = {
  start: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
};

// ----------------------------------------
// スコアボード・下 切替ボタン
// ----------------------------------------
/**
 * score board 9 回以上 延長表示切替ボタン
 * @param {number} start 表示スタート回 1, 10, 19~
 * @param {number} innings total inning 数
 * @param {function} prev prev callback
 * @param {function} next next callback
 * @return {XML} nav.mlb_live__scoreboard__inning_pager
 * @constructor
 */
const ComScoreSwitch = ({ start, innings, prev, next }) => {
  console.log('ComScoreSwitch', start, innings);
  // TODO: remove test code
  // if (innings <= 9) {
  //   return null;
  // }
  // render
  return (
    <nav className="mlb_live__scoreboard__inning_pager">
      <ul className="mlb_live__scoreboard__inning_pager__list">
        <ComSwitchPrev
          start={start}
          action={prev}
        />
        <ComSwitchNext
          start={start}
          innings={innings}
          action={next}
        />
      </ul>
    </nav>
  );
};

ComScoreSwitch.propTypes = {
  start: PropTypes.number.isRequired,
  innings: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

// ----------------------------------------
// スコアボード・中 イニング
// ----------------------------------------
// const ComScoreMiddle = ({ info }) => {};

// ----------------------------------------
// スコアボード・右 対戦結果
// ----------------------------------------
const ComScoreRight = ({ info }) => (
  <div className="mlb_live__scoreboard__column mlb_live__scoreboard__column--count">
    <table className="mlb_live__scoreboard__table mlb_live__scoreboard__table--count">
      <thead>
        <tr>
          <th className="mlb_live__scoreboard__th--sum">計</th>
          <th className="mlb_live__scoreboard__th--hit">安</th>
          <th className="mlb_live__scoreboard__th--error">失</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="mlb_live__scoreboard__td--sum">
            {Print.int(info.visitor.total, '0')}
          </td>
          <td className="mlb_live__scoreboard__td--hit">
            {Print.int(info.visitor.hits, '0')}
          </td>
          <td className="mlb_live__scoreboard__td--error">
            {Print.int(info.visitor.errors, '0')}
          </td>
        </tr>
        <tr>
          <td className="mlb_live__scoreboard__td--sum">
            {Print.int(info.home.total, '0')}
          </td>
          <td className="mlb_live__scoreboard__td--hit">
            {Print.int(info.home.hits, '0')}
          </td>
          <td className="mlb_live__scoreboard__td--error">
            {Print.int(info.home.errors, '0')}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

ComScoreRight.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};


// ----------------------------------------
// スコアボード・左 対戦チーム
// ----------------------------------------
/**
 * スコアボード・左 対戦チーム
 * @param {DaeGameInfo} info ゲーム情報
 * @constructor
 */
const ComScoreLeft = ({ info }) => (
  <div className="mlb_live__scoreboard__column mlb_live__scoreboard__column--team">
    <table className="mlb_live__scoreboard__table mlb_live__scoreboard__table--team">
      <thead>
        <tr><th>&nbsp;</th></tr>
      </thead>
      <tbody>
        <tr>
          <td className="mlb_live__scoreboard__th--team mlb_live__scoreboard__th--team--visitor">
            {Print.str(info.visitor.initials)}
          </td>
        </tr>
        <tr>
          <td className="mlb_live__scoreboard__th--team mlb_live__scoreboard__th--team--home">
            {Print.str(info.home.initials)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

/**
 * propTypes
 * @type {{info: DaeGameInfo}}
 */
ComScoreLeft.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
};


// ----------------------------------------
// スコアボード親
// ----------------------------------------
/**
 * スコアボードを表示します
 * - ComScore
 *   - {@link ComScoreLeft}
 *   - {@link ComScoreRight}
 *   - {@link ComScoreSwitch}
 *   - {@link ComScoreRefresh}
 */
export default class ComScore extends Component {
  // ----------------------------------------
  // STATIC PROPERTY
  // ----------------------------------------
  static propTypes = {
    info: PropTypes.instanceOf(DaeGameInfo),
  };
  static defaultProps = {
    info: null,
  };
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  static onAuto() {
    console.log('ComScore.onAuto');
  }
  static onManual() {
    console.log('ComScore.onManual');
  }
  static onReload() {
    console.log('ComScore.onReload');
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      inning: 1,
      start: 1,
      innings: 1,
    };
    this.onNext = this.onNext.bind(this);
    this.onPrev = this.onPrev.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  onNext(event) {
    event.preventDefault();
    this.setState({ start: this.state.start + 9 });
  }
  onPrev(event) {
    event.preventDefault();
    this.setState({ start: this.state.start - 9 });
  }
  render() {
    const { info } = this.props;
    if (!info) {
      return null;
    }
    // render
    return (
      <section className="mlb_live__scoreboard__section">
        <div className="mlb_live__scoreboard">
          <ComScoreLeft
            info={info}
          />
          <ComScoreRight
            info={info}
          />
        </div>
        <ComScoreSwitch
          start={this.state.start}
          innings={this.state.innings}
          prev={this.onPrev}
          next={this.onNext}
        />
        <ComScoreRefresh
          status={info.status}
          date={info.date}
          auto={ComScore.onAuto}
          manual={ComScore.onManual}
          reload={ComScore.onReload}
        />
      </section>
    );
  }
}
