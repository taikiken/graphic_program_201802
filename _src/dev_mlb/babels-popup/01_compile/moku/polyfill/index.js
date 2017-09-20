'use strict';

require('./method/babel');

require('./method/promise');

require('./method/fetch');

var _animationFrame = require('./method/animationFrame');

var _animationFrame2 = _interopRequireDefault(_animationFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ------------------------------------------------


// fetch
/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/28 - 18:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// babel polyfill
(0, _animationFrame2.default)();

/**
 * 以下全てを読み込みます、一部だけ必要な時は個別に `import` します
 * - babel-polyfill
 * - promise-polyfill
 * - whatwg-fetch
 * - animationFrame
 */


// promise