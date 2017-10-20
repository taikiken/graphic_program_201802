/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/20 - 17:04
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
import './moku/polyfill/method/babel';

import Elements from './moku/dom/Elements';

// video iframe 存在する時は
// `video-block-off` -> `video-block`

/**
 * 1. `div.video-block-off` 走査
 * 2. `div.video-block-off > iframe` 走査
 * 3. iframe ある時は `video-block-off` -> `video-block` 変更する
 * @since 2017-10-20
 */
const player = () => {
  const element = document.querySelector('div.video-block-off');
  if (!element) {
    return;
  }
  const iframe = element.getElementsByTagName('iframe');
  if (!iframe || !iframe.length) {
    return;
  }
  const elements = new Elements(element);
  elements.classes.remove('video-block-off');
  elements.classes.add('video-block');
};

/**
 * DOMContentLoaded event handler
 * - player 実行
 */
const ready = () => {
  window.removeEventListener('DOMContentLoaded', ready);
  player();
};

window.addEventListener('DOMContentLoaded', ready, false);
