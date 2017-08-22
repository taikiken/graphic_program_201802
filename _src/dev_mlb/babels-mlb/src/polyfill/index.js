/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/21 - 16:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// polyfill

// android 4.3 under not defined requestAnimationFrame
// @see http://caniuse.com/#search=requestanimationframe

import animationFrame from './method/animationframe';

// ---------------------------------
// requestAnimationFrame
animationFrame();

const polyfill = {
  animationFrame,
};

export default polyfill;
