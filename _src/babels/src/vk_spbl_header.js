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
import VK from './vk/VK';
import { Url } from './app/const/Url';
import { User } from './app/User';

// -----------------------------------------------
// VK 用の header 機能を提供します
// -----------------------------------------------
/**
 * `Sagen.Browser.Mobile` で判定を行い端末毎に処理を分岐します
 * @param {*} Sagen `Sagen` object
 */
const device = (Sagen) => {
  // console.log('device vk', vk);
  // execute
  if (Sagen.Browser.Mobile.is()) {
    vk.mobile();
  } else {
    vk.desktop();
  }
};

/**
 * login check します
 */
const user = () => {
  // login check
  User.init();
};

/**
 * `Sagen` を外部関数経由でキックします
 * @param {*} Sagen `Sagen` object
 * @param {string} selector script ID
 */
const sagen = (Sagen, selector) => {
  Sagen.start(selector);
  Sagen.Device.init();
};

/**
 * 引数 `selector` ID を取得し存在する場合は処理を続行します
 * @param {string} selector script tag ID - 取得可能な場合に処理を続行します
 * @returns {boolean} true: 処理続行 flag on
 */
const init = (selector) => {
  const script = document.getElementById(selector);
  // console.log('init', selector, script);
  if (!script) {
    return false;
  }
  // ---
  const domain = script.dataset.domain || '';
  const prefix = script.dataset.prefix || '';
  // console.log('init', domain, prefix);
  Url.host = domain;
  VK.PREFIX = prefix;
  return true;
};

/**
 * VK - header 対応
 * - `script#SPBL_header` 必須 - 引数 `selector` での対応も可能
 * - script[data-domain] - option, default: '', リクエスト絶対パス使用
 * - script[data-prefix] - option, default: '', css className prefix
 * @param {string} [selector=SPBL_header] script tag ID
 */
const main = (selector = 'SPBL_vk-header_script') => {
  if (!init(selector)) {
    return;
  }
  const Sagen = self.Sagen;
  sagen(Sagen, selector);
  user();
  device(Sagen);
};

main();

/**
 * global 出力セット
 * @type {{build: string, main: main}}
 */
const SPBL_VK = {
  build: '@@buildTime',
  main,
};

self.SPBL_VK = SPBL_VK;
