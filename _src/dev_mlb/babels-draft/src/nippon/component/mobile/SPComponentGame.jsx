/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/20 - 16:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// dae
import NipponDae from '../../dae/NipponDae';

// event
import RefreshEvent from '../../event/RefreshEvent';

/**
 * ajax load 通知 event instance
 * @type {RefreshEvent}
 */
const refresh = RefreshEvent.factory();

/**
 * RefreshEvent.LOAD 発火させます
 */
const load = () => {
  refresh.load();
};

/**
 * {@link ComponentNippon} - Ajax error event handler
 * - `console.warn` します
 * @param {Error} error ajax error
 */
const fail = (error) => {
  console.warn('[ComponentNippon]', error);
};

/**
 * {@link SPComponentGame} - previous data
 * - 一度 data 取得に成功したらその後に ajax error が発生しても以前のデータを使用し表示させます
 * @type {?NipponDae}
 */
let data = null;

/**
 * 対戦カード, div.game-card を出力
 * @param {NipponDae} result JSON
 * @param {Error} error ERROR
 * @returns {?XML} div.game-card
 * @constructor
 */
const SPComponentGame = ({ result, error }) => {
  // result data を書き換え可能な local variable `action` へ
  let action = result;
  // console.log('SPComponentGame', action, error, data);
  if (!action && !error) {
    return null;
  }
  // ----------------------------
  // RefreshEvent.LOAD 発火させます
  load();
  // ----------------------------
  if (error && !data) {
    fail(error);
    return null;
  }
  // ---
  // error でも前回データが存在すれば使用しエラー表示しない
  if (action) {
    // 取得データを `data` 保存する
    data = action;
  } else if (error) {
    action = data;
  }
  const response = action.response;
  // const status = response.status;
  const home = response.home;
  const visitor = response.visitor;
  // const scoreTexts = response.game.scoreTexts;
  // const gameResult = response.game.result;
  // const winner = response.winner;
  // const loser = response.loser;
  const status = response.status;
  const game = response.game;
  // // @type {number} 強制する
  // const statusId = parseInt(response.status.id, 10);
  // // Env 以下 2 props 設定
  // const noRecords = !!response.noRecords;
  // const interval = response.interval;
  // ---------------------------------
  // output
  return (
    <div className="game-card">
      <div className="game-card-inner">
        {
          // U23 SP だけデザインが違うので...
          // this.head(home, game, visitor)
        }
        <div className="game-card-header">
          {/* home */}
          <div className={`home team-${home.info.id}`}>後攻</div>
          {/* inning */}
          <div className="inning">{game.round}</div>
          {/* visitor */}
          <div className={`visitor team-${visitor.info.id}`}>先攻</div>
        </div>
        <div className="game-card-body">
          <div className="game-info">
            <p className={`status status-${status.id}`}>{status.name}</p>
            <p className="stadium">{game.stadium}</p>
            <p className="date">{`${game.dateM}/${game.dateD}(${game.weekday}）${game.time}〜`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{result: ?NipponDae, error: ?Error}}
 */
SPComponentGame.propTypes = {
  result: PropTypes.instanceOf(NipponDae),
  error: PropTypes.instanceOf(Error),
};

/**
 * React.defaultProps
 * @type {{result: null, error: null}}
 */
SPComponentGame.defaultProps = {
  result: null,
  error: null,
};

export default SPComponentGame;
