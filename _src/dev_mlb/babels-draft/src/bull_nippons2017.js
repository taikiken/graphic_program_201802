/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/17 - 20:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * version: @@version
 * buildTime: @@buildTime
 */
// use strict は本来不要でエラーになる
// 無いと webpack.optimize.UglifyJsPlugin がコメントを全部削除するので記述する
/* eslint strict: [0, "global"] */

'use strict';

// polyfill
import './moku/polyfill/';

// moku/device
import Android from './moku/device/os/Android';
import iOS from './moku/device/os/iOS';

// draft/app
import Env from './draft/app/Env';

// nippon/app
import Path from './nippon/app/Path';

// view
import ViewNippon from './nippon/view/ViewNippon';

// -------------------------
// sp flag
/**
 * sp flag - true: sp
 * @type {boolean}
 */
Env.sp = Android.phone() || iOS.phone();

/**
 * 動作モードを `location.hostname` から判定します
 * - `local`
 * - `dev`
 */
const mode = () => {
  const hostname = location.hostname;
  if (
    hostname.indexOf('192.168.1.') !== -1 ||
    hostname.indexOf('127.0.0.1') !== -1 ||
    hostname.indexOf('localhost') !== -1 ||
    hostname.indexOf('baseballgate.local') !== -1 ||
    location.port === '8000'
  ) {
    Env.local();
    Env.mode = Env.LOCAL_DEV;
  } else if (hostname.indexOf('dev.baseballgate.jp') !== -1) {
    Env.mode = Env.DEVELOPMENT;
  }
};

mode();

/**
 * script.data-interval value を polling interval にします
 * @returns {boolean} true: success
 */
const interval = () => {
  const element = document.getElementById('js-nippon-games');
  if (!element) {
    return false;
  }
  const dataset = element.dataset;
  if (!dataset) {
    return false;
  }
  const polling = dataset.interval || -1;
  let time = parseFloat(polling);
  // polling time 負数でも local.dev の時は 60 をセットしテストする
  if (time <= 0 && Env.mode === Env.LOCAL_DEV) {
    time = 60;
  }
  Env.nipponInterval = time;
  // ---
  // game id
  Env.nipponId = dataset.id || Path.id();
  // console.log('interval, id', Env.nipponInterval, Env.nipponId);
  return true;
};

/**
 * mobile 日本シリーズ
 */
const mobile = () => {
  // console.log('mobile');
  const game = document.getElementById('js-nippon-game');
  const first = document.getElementById('js-nippon-first');
  const second = document.getElementById('js-nippon-second');
  const third = document.getElementById('js-nippon-third');
  // console.log('mobile', game, first, second, third);
  if (!game || !first || !second || !third) {
    return;
  }
  ViewNippon.mobile(game, first, second, third);
};

/**
 * desktop 日本シリーズ
 */
const desktop = () => {
  // console.log('desktop');
  const first = document.getElementById('js-nippon-first');
  const second = document.getElementById('js-nippon-second');
  if (!first || !second) {
    return;
  }
  ViewNippon.desktop(first, second);
};

/**
 * DOMContentLoaded
 */
const ready = () => {
  window.removeEventListener('DOMContentLoaded', ready);
  interval();
  if (Env.sp) {
    mobile();
  } else {
    desktop();
  }
};

window.addEventListener('DOMContentLoaded', ready, false);
