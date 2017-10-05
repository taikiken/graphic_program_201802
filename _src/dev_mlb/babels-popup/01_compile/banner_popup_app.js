/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 15:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 * buildTime: 2017-10-5 22:41:44
 */
// eslint-disable-next-line strict, lines-around-directive
'use strict';

require('./moku/polyfill/method/babel');

var _Main = require('./Main');

var _Main2 = _interopRequireDefault(_Main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 処理開始します
_Main2.default.start();