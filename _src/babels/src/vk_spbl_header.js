/*!
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/19 - 12:41
 * buildTime: @@buildTime
 * @license MIT
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * @requires React, Sagen.js. es5-promise
 */
'use strict';

import vk from './vk';
import { Url } from './app/const/Url';
import { User } from './app/User';

// -----------------------------------------------
// VK 用の header 機能を提供します
// -----------------------------------------------

// login check
User.init();

// vk detect
const names = location.hostname.split('.');
if (names[0] === 'vk') {
  Url.host = 'https://sportsbull.jp';
}

// execute
const Sagen = self.Sagen;
if (Sagen.Browser.Mobile.is()) {
  vk.mobile();
} else {
  vk.desktop();
}
