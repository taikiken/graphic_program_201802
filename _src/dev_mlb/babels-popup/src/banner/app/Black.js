/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 15:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * app banner popup 動作条件を管理します
 */
export default class Black {
  /**
   * URL black list
   * @type {[string,string]}
   */
  static list = [
    '/about',
    '/big6tv/live/2017a',
  ];
  /**
   * `userAgent` をチェックします
   * - gunosy
   * - newspass
   * - undotsushin-ios
   * - undotsushin-android
   * @returns {boolean} true: 該当する
   */
  static app() {
    return !!navigator.userAgent.match(/gunosy|newspass|undotsushin-ios|undotsushin-android/i);
  }
  /**
   * popup 対象かを `pathname`, `userAgent` でチェックします
   * @returns {boolean} true: 対象外
   */
  static detect() {
    if (Black.app()) {
      return true;
    }
    // check pathname with list
    const pathname = location.pathname;
    return Black.list.some(url => pathname.indexOf(url) === 0);
  }
}
