/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/20 - 16:21
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

// component
import ComponentScores from '../desktop/info/ComponentScores';

/**
 * {@link ComponentNippon} - Ajax error event handler
 * - `console.warn` します
 * @param {Error} error ajax error
 */
const fail = (error) => {
  console.warn('[ComponentNippon]', error);
};

/**
 * {@link ComponentNippon} - previous data
 * - 一度 data 取得に成功したらその後に ajax error が発生しても以前のデータを使用し表示させます
 * @type {?NipponDae}
 */
let data = null;

/**
 * mobile second component - {@link ComponentScores}
 * @param {NipponDae} result JSON
 * @param {Error} error ERROR
 * @returns {?XML} div.js-react-second > {@link ComponentScores}
 * @constructor
 */
const SPComponentSecond = ({ result, error }) => {
  // result data を書き換え可能な local variable `action` へ
  let action = result;
  // console.log('SPComponentSecond', action, error, data);
  if (!action && !error) {
    return null;
  }
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
  const scoreTexts = response.game.scoreTexts;
  // const gameResult = response.game.result;
  // const winner = response.winner;
  // const loser = response.loser;
  // // @type {number} 強制する
  // const statusId = parseInt(response.status.id, 10);
  // // Env 以下 2 props 設定
  // const noRecords = !!response.noRecords;
  // const interval = response.interval;
  // ----------------------------
  return (
    <div className="js-react-second">
      <ComponentScores
        scoreTexts={scoreTexts}
        home={home}
        visitor={visitor}
      />
    </div>
  );
};

/**
 * React.propTypes
 * @type {{result: ?NipponDae, error: ?Error}}
 */
SPComponentSecond.propTypes = {
  result: PropTypes.instanceOf(NipponDae),
  error: PropTypes.instanceOf(Error),
};

/**
 * React.defaultProps
 * @type {{result: null, error: null}}
 */
SPComponentSecond.defaultProps = {
  result: null,
  error: null,
};

export default SPComponentSecond;

