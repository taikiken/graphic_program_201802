/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/18 - 19:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

// component
import ComponentScoreboard from './info/ComponentScoreboard';
import ComponentReload from './info/ComponentReload';

import ComponentScores from './info/ComponentScores';
import ComponentBattery from './info/ComponentBattery';

import ComponentMembers from './info/ComponentMembers';
import ComponentResult from './info/ComponentResult';

import NipponDae from '../../dae/NipponDae';

// event
import RefreshEvent from '../../event/RefreshEvent';


// // react
// const React = self.React;
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
 * {@link ComponentNippon} - previous data
 * - 一度 data 取得に成功したらその後に ajax error が発生しても以前のデータを使用し表示させます
 * @type {?NipponDae}
 */
let data = null;

/**
 *  日本シリーズ・出力基底クラス
 * @param {NipponDae} result JSON
 * @param {Error} error ERROR
 * @param {number} interval polling 間隔（秒）
 * @param {boolean} noRecords 出力 flag, false: 出力します
 * @returns {?XML} div.js-info-root
 * @constructor
 */
const ComponentNippon = ({ result, error, interval, noRecords }) => {
  // result data を書き換え可能な local variable `action` へ
  let action = result;
  // console.log('ComponentNippon', action, error, data, interval, noRecords);
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
  const scoreTexts = response.game.scoreTexts;
  const gameResult = response.game.result;
  const winner = response.winner;
  const loser = response.loser;
  // @type {number} 強制する
  const statusId = parseInt(response.status.id, 10);
  // // Env 以下 2 props 設定
  // const noRecords = !!response.noRecords;
  // const interval = response.interval;
  // ----------------------------
  return (
    <div className="js-info-root">
      {/* 2017 -> template(.php)
      <ComponentLive
        src={Live.src()}
        caption={Live.caption()}
        needTitle={false}
      />
      */}
      <ComponentScoreboard
        home={home}
        visitor={visitor}
      />
      <ComponentReload
        interval={interval}
        statusId={statusId}
      />
      <ComponentScores
        scoreTexts={scoreTexts}
        home={home}
        visitor={visitor}
      />
      <ComponentResult
        result={gameResult}
        winner={winner}
        loser={loser}
        noRecords={noRecords}
      />
      <ComponentBattery
        home={home}
        visitor={visitor}
      />
      <ComponentMembers
        home={home}
        visitor={visitor}
        noRecords={noRecords}
      />
    </div>
  );
};

/**
 * React.propTypes
 * @type {{result: ?NipponDae, error: ?Error}}
 */
ComponentNippon.propTypes = {
  result: PropTypes.instanceOf(NipponDae),
  error: PropTypes.instanceOf(Error),
  interval: PropTypes.number,
  noRecords: PropTypes.bool,
};

/**
 * React.defaultProps
 * @type {{result: null, error: null}}
 */
ComponentNippon.defaultProps = {
  result: null,
  error: null,
  interval: 5,
  noRecords: false,
};

export default ComponentNippon;
