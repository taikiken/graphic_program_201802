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

// moku/util
import List from '../../../moku/util/List';

// dae
import DaeGameInfo, { DaeScores } from '../../dae/games/DaeGameInfo';

// util
import Print from '../../util/Print';

// component
import ComScoreRefresh from './score/ComScoreRefresh';


// moku/ticks
import Polling from '../../../moku/tick/Polling';

// async
import Creator from '../../async/Creator';

// app
import Games from '../../app/Games';

// ----------------------------------------
// Polling
// ----------------------------------------
/**
 * 自動更新管理・動的更新管理を行います
 * - {@link Polling} を使用します
 */
class Interval {
  /**
   * ゲーム情報を保存し自動更新管理・動的更新管理を行います
   * @param {number|string} year 年 yyyy
   * @param {number|string} id GAME ID
   * @param {number} [interval=30] 間隔（秒）
   */
  constructor(year, id, interval = 30) {
    /**
     * 間隔（秒）
     * @type {number}
     */
    this.interval = interval;
    /**
     * ポーリングを行います
     * @type {Polling}
     */
    this.polling = new Polling(interval * 1000);
    /**
     * bind onUpdate - Polling.UPDATE event handler
     * @type {function}
     */
    this.onUpdate = this.onUpdate.bind(this);
    /**
     * 年 yyyy
     * @type {number|string}
     */
    this.year = year;
    /**
     * GAME ID
     * @type {number|string}
     */
    this.id = id;
  }
  /**
   * Polling.UPDATE event handler
   * - this.request を call します
   */
  onUpdate() {
    this.request();
  }
  /**
   * Polling.UPDATE を watch します
   */
  resume() {
    this.pause();
    const polling = this.polling;
    polling.on(Polling.UPDATE, this.onUpdate);
    polling.start();
    this.request();
  }
  /**
   * Polling.UPDATE を unwatch します
   */
  pause() {
    this.polling.off(Polling.UPDATE, this.onUpdate);
  }
  /**
   * {@link Creator.games} を実行します
   * - ajax を行います
   */
  request() {
    Creator.games(this.year, this.id);
  }
}

// ----------------------------------------
// スコアボード・下 切替ボタン NEXT
// ----------------------------------------
/**
 * スコアボード・下 切替ボタン NEXT
 * - total inning 数が start + 9 以下の時は表示しません
 * @param {number} start 表示開始回
 * @param {number} innings ゲーム経過回数
 * @param {function} action callback
 * @returns {XML} li.mlb_live__scoreboard__inning_pager__item
 * @constructor
 */
const ComSwitchNext = ({ start, innings, action }) => {
  // console.log('ComSwitchNext', start, innings);
  // 表示切替します
  if (start + 9 > innings) {
    return (
      <li id="innings-prev" className="mlb_live__scoreboard__inning_pager__item">
        <p className="mlb_live__scoreboard__inning_pager__link disabled">
          <span className="mlb_live__scoreboard__inning_pager__link__icon">次の回</span>
        </p>
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
        <span className="mlb_live__scoreboard__inning_pager__link__icon">次の回</span>
      </a>
    </li>
  );
};

/**
 * propTypes
 * @type {{start: number, innings: number, action: function}}
 */
ComSwitchNext.propTypes = {
  start: PropTypes.number.isRequired,
  innings: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired,
};

// ----------------------------------------
// スコアボード・下 切替ボタン PREV
// ----------------------------------------
/**
 * スコアボード・下 切替ボタン PREV
 * - active / inactive: a <-> p tag を切替えます
 * - start 1 の時は表示しません
 * @param {number} start 表示開始回
 * @param {function} action callback
 * @returns {XML} li.mlb_live__scoreboard__inning_pager__item
 * @constructor
 */
const ComSwitchPrev = ({ start, action }) => {
  // console.log('ComSwitchPrev', start);
  if (start === 1) {
    return (
      <li id="innings-prev" className="mlb_live__scoreboard__inning_pager__item">
        <p className="mlb_live__scoreboard__inning_pager__link disabled">
          <span className="mlb_live__scoreboard__inning_pager__link__icon">前の回</span>
        </p>
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
        <span className="mlb_live__scoreboard__inning_pager__link__icon">前の回</span>
      </a>
    </li>
  );
};

/**
 * propTypes
 * @type {{start: number, action: function}}
 */
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
  // console.log('ComScoreSwitch', start, innings);
  // test code
  if (innings <= 9) {
    return null;
  }
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

/**
 * propTypes
 * @type {{start: number, innings: number, prev: function, next: function}}
 */
ComScoreSwitch.propTypes = {
  start: PropTypes.number.isRequired,
  innings: PropTypes.number.isRequired,
  prev: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
};

// ----------------------------------------
// スコアボード・中 イニング
// ----------------------------------------

// スコアボード・中 イニング - title
// ----------------------------------------
/**
 * スコアボード・中 イニング - title 試合回
 * @param {number} start 表示開始回
 * @param {Array.<number>} boards 9回分の配列
 * @returns {XML} thead > tr > th.mlb_live__scoreboard__th--inning
 * @constructor
 */
const ComScoreInningsHead = ({ start, boards, innings }) => {
  // console.log('ComScoreInningsHead', start, boards);
  const className = 'mlb_live__scoreboard__th--inning';
  return (
    <thead>
      <tr>
        {
          boards.map((value, index) => {
            const inning = start + index;
            // 総イニング数より表示イニングが超えていたら表示しない
            if (inning > innings) {
              return (
                <th key={`inning-${inning}`} className={`${className} ${className}-${inning}`}>
                  &nbsp;
                </th>
              );
            }
            // 表示する
            // render
            return (
              <th key={`inning-${inning}`} className={`${className} ${className}-${inning}`}>
                {Print.int(inning)}
              </th>
            );
          })
        }
      </tr>
    </thead>
  );
};

/**
 * propTypes
 * @type {{start: number, boards: Array}}
 */
ComScoreInningsHead.propTypes = {
  start: PropTypes.number.isRequired,
  boards: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  innings: PropTypes.number.isRequired,
};

// スコアボード・中 イニング - visitor
// ----------------------------------------
/**
 * スコアボード・中 イニング - visitor
 * @param {DaeScores} visitor visitor team score
 * @param {number} start 表示開始回
 * @param {Array.<number>} boards 9回分の配列
 * @param {number} innings game innings - 試合経過回数
 * @returns {XML} tr > td
 * @constructor
 */
const ComScoreVisitor = ({ visitor, start, boards, innings }) => {
  console.log('ComScoreVisitor', visitor, start, boards, innings);
  return (
    <tr>
      {
        boards.map((value, index) => {
          const inning = start + index;
          // 総イニング数より表示イニングが超えていたら表示しない
          if (inning > innings || !visitor.score || !visitor.score[inning]) {
            return (
              <td key={`visitor-${inning}`} className={`visitor-${inning}`}>&nbsp;</td>
            );
          }
          // 表示する
          const scores = visitor.score[inning];
          let alt = '0';
          if (inning > innings) {
            alt = '';
          }
          // render
          return (
            <td key={`visitor-${inning}`} className={`visitor-${inning}`}>
              {Print.str(scores.score, alt)}
            </td>
          );
        })
      }
    </tr>
  );
};

/**
 * propTypes
 * @type {{visitor: DaeScores, start: number, boards: Array.<number>, innings: number}}
 */
ComScoreVisitor.propTypes = {
  visitor: PropTypes.instanceOf(DaeScores).isRequired,
  start: PropTypes.number.isRequired,
  boards: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  innings: PropTypes.number.isRequired,
};

// スコアボード・中 イニング - home
// ----------------------------------------
/**
 * home team score X(alpha) 表示が必要な時に add します
 * - 9 回未満はそのまま返す
 * - visitor が勝っているときはそのまま返す
 * - home が勝って点数が 0 の時は X を返す
 * - home が勝って点数が 0 以外の時は 点数 + X を返す
 * @param {{score: number, total: number}} home home team score 情報
 * @param {{score: number, total: number}} visitor visitor team score 情報
 * @param {number} inning 現在の回数
 * @param {number} innings 試合の経過回数
 * @returns {string|number} 表示点数を返します
 */
const scoreAlpha = (home, visitor, inning, innings) => {
  if (!home || !visitor) {
    return '';
  }
  // 9 回未満はそのまま返す
  if (inning < 9 || inning !== innings) {
    return home.score;
  }
  // visitor が勝っているときはそのまま返す
  if (home.total <= visitor.total) {
    return home.score;
  }
  // home が勝って点数が 0 の時は X を返す
  if (home.score <= 0) {
    return 'X';
  }
  // home が勝って点数が 0 以外の時は 点数 + X を返す
  return `${home.score}X`;
};

/**
 * home team スコアボード
 * @param {DaeScores} home home score
 * @param {DaeScores} visitor visitor score
 * @param {number} start 表示開始回
 * @param {Array.<number>} boards 9回分の配列
 * @param {number} innings game innings - 試合経過回数
 * @returns {XML} tr > td
 * @constructor
 */
const ComScoreHome = ({ home, visitor, start, boards, innings }) => {
  console.log('ComScoreHome', home, visitor, start, boards, innings);
  return (
    <tr>
      {
        boards.map((value, index) => {
          const inning = start + index;
          // 総イニング数より表示イニングが超えていたら表示しない
          if (inning > innings || !home.score || !home.score[inning]) {
            return (
              <td key={`home-${inning}`} className={`home-${inning}`}>&nbsp;</td>
            );
          }
          // 表示する
          const score = home.score[inning];
          let visitorScore = null;
          if (visitor.score && visitor.score[inning]) {
            visitorScore = visitor.score[inning];
          }
          // const visitorScore = visitor.score[inning];
          // let alt = '0';
          // if (inning > innings) {
          //   alt = '';
          // }
          // render
          const alpha = scoreAlpha(score, visitorScore, inning, innings);
          const point = alpha || Print.int(score.score);
          // console.log('ComScoreHome', inning, score, alpha, point);
          return (
            <td key={`home-${inning}`} className={`home-${inning}`}>
              {point}
            </td>
          );
        })
      }
    </tr>
  );
};

/**
 * propTypes
 * @type {{home: DaeScores, visitor: DaeScores, start: number, boards: Array, innings: number}}
 */
ComScoreHome.propTypes = {
  home: PropTypes.instanceOf(DaeScores).isRequired,
  visitor: PropTypes.instanceOf(DaeScores).isRequired,
  start: PropTypes.number.isRequired,
  boards: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  innings: PropTypes.number.isRequired,
};

// スコアボード・中 イニング - home / visitor
// ----------------------------------------
/**
 * スコアボード・中 イニング - home / visitor 親コンテナ
 * @param {DaeGameInfo} info ゲーム情報
 * @param {number} start 表示開始回
 * @param {number} innings 試合経過回数
 * @returns {XML} div.mlb_live__scoreboard__column
 * @constructor
 */
const ComScoreInnings = ({ info, start, innings }) => {
  const home = info.home.scores;
  const visitor = info.visitor.scores;
  // console.log('ComScoreInnings', home, visitor, innings);
  const boards = List.fill(9);
  return (
    <div className="mlb_live__scoreboard__column mlb_live__scoreboard__column--score">
      <table className="mlb_live__scoreboard__table mlb_live__scoreboard__table--score">
        <ComScoreInningsHead
          start={start}
          boards={boards}
          innings={innings}
        />
        <tbody>
          <ComScoreVisitor
            visitor={visitor}
            start={start}
            boards={boards}
            status={info.status}
            innings={innings}
          />
          <ComScoreHome
            home={home}
            visitor={visitor}
            start={start}
            boards={boards}
            innings={innings}
            status={info.status}
          />
        </tbody>
      </table>
    </div>
  );
};

/**
 * propTypes
 * @type {{info: DaeGameInfo, start: number, innings: number}}
 */
ComScoreInnings.propTypes = {
  info: PropTypes.instanceOf(DaeGameInfo).isRequired,
  start: PropTypes.number.isRequired,
  innings: PropTypes.number.isRequired,
};

// ----------------------------------------
// スコアボード・右 対戦結果
// ----------------------------------------
/**
 * スコアボード・右 対戦結果
 * div.mlb_live__scoreboard__column
 * @param {DaeGameInfo} info ゲーム情報
 * @returns {XML} div.mlb_live__scoreboard__column
 * @constructor
 */
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

/**
 * propTypes
 * @type {{info: DaeGameInfo}}
 */
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
  /**
   * propTypes
   * @type {{info: DaeGameInfo}}
   */
  static propTypes = {
    info: PropTypes.instanceOf(DaeGameInfo),
  };
  /**
   * defaultProps
   * @type {{info: ?DaeGameInfo}}
   */
  static defaultProps = {
    info: null,
  };
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * data 不正の時に空タグを出力します
   * @returns {XML} section.mlb_live__scoreboard__th--team
   * @since 2017-08-17
   * @see https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-24#comment-1174362975
   */
  static empty() {
    const thClass = 'mlb_live__scoreboard__th--team';
    return (
      <section className="mlb_live__scoreboard__section">
        <div className="mlb_live__scoreboard">
          {/* left */}
          <div className="mlb_live__scoreboard__column mlb_live__scoreboard__column--team">
            <table className="mlb_live__scoreboard__table mlb_live__scoreboard__table--team">
              <thead>
                <tr><th>&nbsp;</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td className={`${thClass} ${thClass}--visitor`}>
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td className={`${thClass} ${thClass}--home`}>
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* center */}
          <div className="mlb_live__scoreboard__column mlb_live__scoreboard__column--score">
            <table className="mlb_live__scoreboard__table mlb_live__scoreboard__table--score">
              <thead>
                <tr>
                  <th className="mlb_live__scoreboard__th--inning">1</th>
                  <th className="mlb_live__scoreboard__th--inning">2</th>
                  <th className="mlb_live__scoreboard__th--inning">3</th>
                  <th className="mlb_live__scoreboard__th--inning">4</th>
                  <th className="mlb_live__scoreboard__th--inning">5</th>
                  <th className="mlb_live__scoreboard__th--inning">6</th>
                  <th className="mlb_live__scoreboard__th--inning">7</th>
                  <th className="mlb_live__scoreboard__th--inning">8</th>
                  <th className="mlb_live__scoreboard__th--inning">9</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                <tr>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* right */}
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
                    &nbsp;
                  </td>
                  <td className="mlb_live__scoreboard__td--hit">
                    &nbsp;
                  </td>
                  <td className="mlb_live__scoreboard__td--error">
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <td className="mlb_live__scoreboard__td--sum">
                    &nbsp;
                  </td>
                  <td className="mlb_live__scoreboard__td--hit">
                    &nbsp;
                  </td>
                  <td className="mlb_live__scoreboard__td--error">
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    );
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * スコアボードを表示を始めます
   * @param {*} props {@link ComScore.propTypes}
   */
  constructor(props) {
    super(props);
    // ----
    /**
     * 表示開始回 - default: 1
     * @type {{start: number}}
     */
    this.state = {
      start: 1,
    };
    /**
     * 延長表示切替 - next event handler
     * @type {function}
     */
    this.onNext = this.onNext.bind(this);
    /**
     * 延長表示切替 - prev event handler
     * @type {function}
     */
    this.onPrev = this.onPrev.bind(this);
    // ---
    /**
     * 更新系 instance
     * @type {Interval}
     */
    this.interval = new Interval(Games.year, Games.id);
    /**
     * 更新・自動 - click event handler
     * @type {function}
     */
    this.onAuto = this.onAuto.bind(this);
    /**
     * 更新・手動 - click event handler
     * @type {function}
     */
    this.onManual = this.onManual.bind(this);
    /**
     * 更新 - click event handler
     * @type {function}
     */
    this.onReload = this.onReload.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * 延長表示切替 - next event handler
   * - state.start +9 しアップデートします
   * @param {Event} event click Event
   */
  onNext(event) {
    event.preventDefault();
    this.setState({ start: this.state.start + 9 });
  }
  /**
   * 延長表示切替 - prev event handler
   * - state.start -9 しアップデートします
   * @param {Event} event click Event
   */
  onPrev(event) {
    event.preventDefault();
    this.setState({ start: this.state.start - 9 });
  }
  // ----------------------------------------
  /**
   * 更新・自動 - click event handler
   */
  onAuto() {
    // console.log('ComScore.onAuto');
    this.interval.resume();
  }
  /**
   * 更新・手動 - click event handler
   */
  onManual() {
    // console.log('ComScore.onManual');
    this.interval.pause();
  }
  /**
   * 更新 - click event handler
   */
  onReload() {
    // console.log('ComScore.onReload');
    this.interval.request();
  }
  // ----------------------------------------
  /**
   * スコアボードを出力します
   * section.mlb_live__scoreboard__section
   * @returns {?XML} section.mlb_live__scoreboard__section
   */
  render() {
    const { info } = this.props;
    if (!info) {
      // data 不正時 からタグを出力する
      return ComScore.empty();
      // return null;
    }
    // render
    return (
      <section className="mlb_live__scoreboard__section">
        <div className="mlb_live__scoreboard">
          <ComScoreLeft
            info={info}
          />
          <ComScoreInnings
            info={info}
            start={this.state.start}
            innings={info.innings}
          />
          <ComScoreRight
            info={info}
          />
        </div>
        <ComScoreSwitch
          start={this.state.start}
          innings={info.innings}
          prev={this.onPrev}
          next={this.onNext}
        />
        <ComScoreRefresh
          status={info.status}
          date={info.date}
          auto={this.onAuto}
          manual={this.onManual}
          reload={this.onReload}
        />
      </section>
    );
  }
}
