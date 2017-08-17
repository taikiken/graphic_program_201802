/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/14 - 16:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * @@version
 * @@buildTime
 */
// use strict は本来不要でエラーになる
// 無いと webpack.optimize.UglifyJsPlugin がコメントを全部削除するので記述する
/* eslint strict: [0, "global"] */

'use strict';

// fetch / Promise polyfill
import 'whatwg-fetch';
import Promise from 'promise-polyfill';

// for IE ES 2015 / 2016 / 2017 polyfill
import 'babel-polyfill';

// 何故か gsap が import で有効化されない global object は存在する ????
// gsap
import 'gsap';
// eslint-disable-next-line no-unused-vars
import ScrollToPlugin from 'gsap/ScrollToPlugin';

// -----------------------------------------------
// main
import Main from './Main';

// -----------------------------------------------
// import Test from './Test';
// -----------------------------------------------

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

// main execute
Main.init();
