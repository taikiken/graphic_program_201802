/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 12:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * [native code] - location
 * @type {*}
 */
const location = self.location;
/**
 * [native code] - location.hostname
 * @type {string}
 */
const hostname = location.hostname;

/**
 * location.hostname と location.port から dev mode 判定
 * - location.hostname
 *   - 192.168.1.
 *   - localhost.
 *   - dev.sportsbull.jp
 * - location.port
 *   - 8080
 * @type {boolean}
 */
const dev = hostname.indexOf('192.168.1.') === 0 ||
    hostname.indexOf('localhost') === 0 ||
    hostname.indexOf('dev.sportsbull.jp') === 0 ||
    location.port === '8080';
/**
 * location.hostname から stg mode 判定
 * - location.hostname
 *    - stg.sportsbull.jp
 * @type {boolean}
 */
const stg = hostname.indexOf('stg.sportsbull.jp') === 0;
/**
 * location.hostname から 本番 mode 判定
 * - location.hostname
 *    - sportsbull.jp
 * @type {boolean}
 */
const www = hostname.indexOf('sportsbull.jp') === 0;

/**
 * 動作環境を管理します
 */
export default class Env {
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * dev domainname - dev.sportsbull.jp'
   * @const DEV
   * @type {string}
   */
  static DEV = 'dev.sportsbull.jp';
  /**
   * stg domainname - stg.sportsbull.jp'
   * @const STG
   * @type {string}
   */
  static STG = 'stg.sportsbull.jp';
  /**
   * 本番 domainname - sportsbull.jp'
   * @const WWW
   * @type {string}
   */
  static WWW = 'sportsbull.jp';
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * dev mode 判定します
   * @returns {boolean} true: dev mode
   */
  static dev() {
    return dev;
  }
  /**
   * stg mode 判定します
   * @returns {boolean} true: stg mode
   */
  static stg() {
    return stg;
  }
  /**
   * 本番 mode 判定します
   * @returns {boolean} true: 本番 mode
   */
  static www() {
    return www;
  }
  /**
   * DEV | STG | WWW のいずれかを取得します
   * @returns {string} DEV | STG | WWW のいずれかを返します
   */
  static mode() {
    if (Env.www()) {
      return Env.WWW;
    } else if (Env.stg()) {
      return Env.STG;
    }
    return Env.DEV;
  }
  static node() {
    return '@@nodeEnv';
  }
}
