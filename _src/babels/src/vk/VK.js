/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/19 - 19:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

let prefix = '';

/**
 * VK - 設定ファイル
 */
export default class VK {
  static get prefix() {
    return prefix;
  }
  static set prefix(dataPrefix) {
    prefix = dataPrefix;
  }
}
