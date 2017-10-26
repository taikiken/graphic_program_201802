/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 20:03
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
import Response from '../../dae/nippon/Response';

/**
 * desktop 対戦成績を表示します
 * @param {Response} response JSON.response
 * @returns {XML} div.game-card
 * @constructor
 */
const ComponentCard = ({ response }) => {
  const status = response.status;
  const game = response.game;
  const home = response.home;
  const visitor = response.visitor;
  return (
    <div className="game-card">
      <div className="game-card-inner">
        <div className="game-card-header">
          {/* home */}
          <div className={`home team-${home.info.id}`}>後攻</div>
          {/* inning */}
          <div className="inning">{game.round}</div>
          {/* visitor */}
          <div className={`visitor team-${visitor.info.id}`}>先攻</div>
        </div>
        <div className="game-card-body">
          <div className="team home">
            {home.info.name}
          </div>
          <div className="game-info">
            <p className={`status status-${status.id}`}>{status.name}</p>
            <p className="stadium">{game.stadium}</p>
            <p className="date">{`${game.dateM}/${game.dateD}(${game.weekday}）${game.time}〜`}</p>
          </div>
          <div className="team visitor">
            {visitor.info.name}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * React.propTypes
 * @type {{response: Response}}
 */
ComponentCard.propTypes = {
  response: PropTypes.instanceOf(Response).isRequired,
};


/**
 * {@link ComponentGame} - previous data
 * - 一度 data 取得に成功したらその後に ajax error が発生しても以前のデータを使用し表示させます
 * @type {?NipponDae}
 */
let data = null;

/**
 * {@link ComponentGame} - Ajax error event handler
 * - `console.warn` します
 * @param {Error} error ajax error
 */
const fail = (error) => {
  console.warn('[ComponentGame]', error);
};

/**
 * {@link ComponentCard} 出力します
 * @param {NipponDae} result JSON
 * @param {Error} error ERROR
 * @returns {?XML} {@link ComponentCard}
 * @constructor
 */
const ComponentGame = ({ result, error }) => {
  let action = result;
  // console.log('ComponentGame', action, error, data);
  if (!action && !error) {
    return null;
  }
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
  // ----
  return (
    <ComponentCard
      response={action.response}
    />
  );
};

/**
 * React.propTypes
 * @type {{result: ?NipponDae, error: ?Error}}
 */
ComponentGame.propTypes = {
  result: PropTypes.instanceOf(NipponDae),
  error: PropTypes.instanceOf(Error),
};

/**
 * React.defaultProps
 * @type {{result: null, error: null}}
 */
ComponentGame.defaultProps = {
  result: null,
  error: null,
};

export default ComponentGame;
