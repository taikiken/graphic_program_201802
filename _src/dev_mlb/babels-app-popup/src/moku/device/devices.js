/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/28 - 16:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * [native code] userAgent
 * `device/index.js`
 * @type {string}
 */
const ua = navigator.userAgent;
/**
 * [native code] appVersion
 * `device/index.js`
 * @type {string}
 */
const app = navigator.appVersion;
/**
 * Safari - userAgent に `Safari` が含まれる
 * - 【注意】Safari browser を保証しない
 * @type {boolean}
 */
const safari = !!ua.match(/safari/i);
/**
 * device property
 * `device/index.js`
 * @type {{ios: boolean, ipad: boolean, ipod: boolean, iphone: boolean, windows: boolean, android: boolean, standard: boolean, phone: boolean, tablet: boolean, hd: boolean, webView: boolean, standalone: boolean, version: number, major: number, build: number, numbers: Array.<number>}}
 */
const props = {
  ios: false,
  ipad: false,
  ipod: false,
  iphone: false,
  windows: false,
  android: false,
  standard: false,
  phone: false,
  tablet: false,
  hd: false,
  webView: false,
  standalone: false,
  version: -1,
  major: -1,
  build: '',
  numbers: [-1, -1, -1],
};

/**
 * devices object
 * `device/index.js`
 * ```
 * @import device from './device';
 * const property = Object.assign({}, device);
 * ```
 * @type {{
 *  ua: string,
 *  app: string,
 *  props: {ios: boolean, ipad: boolean, ipod: boolean, iphone: boolean, windows: boolean, android: boolean, standard: boolean, phone: boolean, tablet: boolean, hd: boolean, webView: boolean, standalone: boolean, version: number, major: number, build: number, numbers: Array.<number>},
 *  safari: boolean
 * }}
 */
const devices = {
  ua,
  app,
  props,
  safari,
};

export default devices;
