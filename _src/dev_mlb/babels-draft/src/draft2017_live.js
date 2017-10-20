/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/03 - 20:26
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

// app
import Env from './draft/app/Env';

// view
// import ViewDraft from './draft/view/ViewDraft';
import ViewLives from './live/view/ViewLives';

// ui
import ModalManager from './draft/ui/ModalManager';


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
 * {@link ModalManager}.render `modal` の準備をします
 * `players` 実行の前に行います
 */
const modal = () => {
  // modal
  const element = document.getElementById('js-modal');
  if (!element) {
    return;
  }
  ModalManager.render(element);
};

/**
 * script.data-inter value を polling interval にします
 * @returns {boolean} true: success
 */
const interval = () => {
  const element = document.getElementById('js-live-bundle');
  if (!element) {
    return false;
  }
  let time = parseFloat(element.dataset.interval);
  // polling time 負数でも local.dev の時は 5 をセットしテストする
  if (time <= 0 && Env.mode === Env.LOCAL_DEV) {
    time = 5;
  }
  Env.flashInterval = time;
  return true;
};

/**
 * #js-players - draft 選手一覧を表示します
 * {@link ViewDraft}
 */
const lives = () => {
  if (!interval()) {
    return;
  }
  const element = document.getElementById('js-live');
  if (!element) {
    return;
  }
  ViewLives.lives(element);
};

// // news
// const news = () => {
//   const element = document.getElementById('js-related-news');
//   if (!element) {
//     return;
//   }
//   ViewDraft.news(element);
// };

/**
 * `DOMContentLoaded` event handler
 * - modal
 * - players
 */
const ready = () => {
  window.removeEventListener('DOMContentLoaded', ready);
  modal();
  lives();
  // ---
  // news();
};

window.addEventListener('DOMContentLoaded', ready, false);
