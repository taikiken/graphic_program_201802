/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 20:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * {@link Env}
 * [native code] - location
 * @private
 * @type {*}
 */
const location = self.location;
/**
 * {@link Env}
 * [native code] - location.port
 * @private
 * @type {string}
 */
const port = location.port;
/**
 * {@link Env}
 * [native code] - location.hostname
 * @private
 * @type {string}
 */
const hostname = location.hostname;
/**
 * {@link Env}
 * [native code] - location.pathname
 * @private
 * @type {string}
 */
const pathname = location.pathname;

// ---
/**
 * {@link Env}
 * port が '8080' と等価判定 - ローカルモード flag として使用します
 * @private
 * @type {boolean}
 */
const local = port === '8080';
/**
 * {@link Env}
 * hostname が `dev.sportsbull.jp` と等価判定 - dev mode flag
 * @private
 * @type {boolean}
 */
const dev = hostname === 'dev.sportsbull.jp';
/**
 * {@link Env}
 * hostname が `stg.sportsbull.jp` と等価判定 - stg mode flag
 * @private
 * @type {boolean}
 */
const stg = hostname === 'stg.sportsbull.jp';
/**
 * {@link Env}
 * hostname が `sportsbull.jp` と等価判定 - 本番 mode flag
 * @private
 * @type {boolean}
 */
const www = hostname === 'sportsbull.jp';

/**
 * 環境変数（動作モード）を管理します
 */
export default class Env {
  /**
   * モード名称
   * @const LOCAL
   * @returns {string} local
   */
  static get LOCAL() {
    return 'local';
  }
  /**
   * モード名称
   * @const DEV
   * @returns {string} dev
   */
  static get DEV() {
    return 'dev';
  }
  /**
   * モード名称
   * @const STG
   * @returns {string} stg
   */
  static get STG() {
    return 'stg';
  }
  /**
   * モード名称
   * @const WWW
   * @returns {string} www
   */
  static get WWW() {
    return 'www';
  }
  /**
   * モードを取得します
   * @returns {?string} Env.[LOCAL|DEV|STG|WWW] or null
   */
  static mode() {
    if (www) {
      return Env.WWW;
    } else if (local) {
      return Env.LOCAL;
    } else if (dev) {
      return Env.DEV;
    } else if (stg) {
      return Env.STG;
    }
    return null;
  }
  /**
   * home `/` かどうかを取得します
   * `/` の数が 1 だったら home
   * @param {string} [path=location.pathname] 判定する `pathname`
   * @returns {boolean} true: home
   */
  static home(path = pathname) {
    // '/' find all
    const matches = path.match(/\//g);
    return matches.length === 1;
  }
  /**
   * location.pathname が `/stats` に該当するかを調べます
   * @param {string} [path=location.pathname] 判定する `pathname`
   * @returns {boolean} true: stats 配下
   */
  static stats(path = pathname) {
    return path.indexOf('/stats') === 0 && path.indexOf('/stats/webview') === -1;
  }
}
