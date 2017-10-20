/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// react
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// draft/app
import Env from '../../draft/app/Env';

// dae
import LivesDae from '../dae/LivesDae';

// component/draft
import ComponentFlash from './draft/ComponentFlash';

// component/sp-draft
import SPComponentFlash from './sp-draft/SPComponentFlash';

// async
import Creators from '../async/Creator';

// moku/ticks
import Polling from '../../moku/tick/Polling';

/* eslint-enable no-unused-vars */

/**
 * {@link ComponentLives} - previous data
 * - 一度 data 取得に成功したらその後に ajax error が発生しても以前のデータを使用し表示させます
 * @type {?LivesDae}
 */
let data = null;

/**
 * {@link ComponentLives} - live data 取得間隔(sec.)
 * - `data-interval` attribute から取得する
 * - 0 を超えた値の時に発動させます
 * @type {?Polling}
 */
let polling = null;

/**
 * {@link ComponentLives} - {@link Polling}.UPDATE event handler
 * - {@link Creators}.lives 実行します
 */
const onUpdate = () => {
  Creators.lives();
};

/**
 * {@link ComponentLives} - private variable `polling` をチェックし `null` の時に Polling 処理を開始します
 */
const sequence = () => {
  if (!polling && Env.flashInterval > 0) {
    polling = new Polling(Env.flashInterval * 1000);
    polling.on(Polling.UPDATE, onUpdate);
    polling.start();
  }
};

/**
 * {@link ComponentLives} - Ajax error event handler
 * - `console.warn` します
 * @param {Error} error ajax error
 */
const fail = (error) => {
  console.warn('[DRAFT:LIVE]', error);
};

/**
 * draft 2017 速報
 * @param {?LivesDae} result ajax result - JSON 変換データ
 * @param {?Error} error ajax error
 * @returns {?XML} {@link ComponentFlash}, {@link SPComponentFlash}
 * @constructor
 */
const ComponentLives = ({ result, error }) => {
  // result data を書き換え可能な local variable `action` へ
  let action = result;
  // console.log('ComponentLives', action, error, data);
  if (!action && !error) {
    return null;
  }
  if (error && !data) {
    fail(error);
    return null;
  }
  // ---
  // polling setting
  sequence();
  // error でも前回データが存在すれば使用しエラー表示しない
  if (action) {
    // 取得データを `data` 保存する
    data = action;
  } else if (error) {
    action = data;
  }
  // -------------------------------
  if (Env.sp) {
    return (
      <SPComponentFlash
        teams={action.team}
      />
    );
  }
  return (
    <ComponentFlash
      teams={action.team}
    />
  );
};

/**
 * React.propTypes
 * @type {{result: ?LivesDae, error: ?Error}}
 */
ComponentLives.propTypes = {
  result: PropTypes.instanceOf(LivesDae),
  error: PropTypes.instanceOf(Error),
};

/**
 * React.defaultProps
 * @type {{result: null, error: null}}
 */
ComponentLives.defaultProps = {
  result: null,
  error: null,
};

export default ComponentLives;
