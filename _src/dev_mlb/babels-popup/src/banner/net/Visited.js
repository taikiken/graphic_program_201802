/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/20 - 15:30
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/net
import Cookie from '../../moku/net/Cookie';

// moku/util
import Times from '../../moku/util/Times';

/**
 * app banner popup(modal) open check cookie を管理します
 * - modal open 24h 持続します
 * - cookie があると popup しません
 */
export default class Visited {
  /**
   * cookie name - __app_banner_visited__
   * @type {string}
   */
  static COOKIE = '__app_banner_visited__';
  /**
   * cookie 存在チェック
   * @returns {string|null} 存在する時は value を返します
   */
  static already() {
    return Cookie.get(Visited.COOKIE);
  }
  /**
   * cookie 24h セットします
   */
  static arrive() {
    Cookie.set(Visited.COOKIE, '1', Times.hour(24));
  }
}
