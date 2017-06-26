/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 20:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import Env from './Env';

/**
 * API path を取得します,
 * {@link Env} により取得パスを変更します
 *
 * - dev: `https://dev-img.sportsbull.jp/json/bnr-sokuhou.json`
 * - stg: `https://img.sportsbull.jp/json/bnr-sokuhou_stg.json`
 * - www: `https://img.sportsbull.jp/json/bnr-sokuhou.json`
 * - local: dev を使用する
 *
 * @example
 * const path = Api.path();
 */
export default class Api {
  /**
   * dev API path を返します
   * @returns {string} https://dev-img.sportsbull.jp/json/bnr-sokuhou.json
   */
  static dev() {
    return 'https://dev-img.sportsbull.jp/json/bnr-sokuhou.json';
  }
  /**
   * stg API path を返します
   * @returns {string} https://img.sportsbull.jp/json/bnr-sokuhou_stg.json
   */
  static stg() {
    return 'https://img.sportsbull.jp/json/bnr-sokuhou_stg.json';
  }
  /**
   * 本番 API path を返します
   * @returns {string} 'img.sportsbull.jp/json/bnr-sokuhou.json'
   */
  static www() {
    return 'https://img.sportsbull.jp/json/bnr-sokuhou.json';
  }
  /**
   * {@link Env.mode} により Api path を変更します
   * @returns {string} Api path を返します
   */
  static path() {
    switch (Env.mode()) {
      case Env.WWW: {
        return Api.www();
      }
      case Env.STG: {
        return Api.stg();
      }
      default:
      case Env.LOCAL:
      case Env.DEV: {
        return Api.dev();
      }
    }
  }
}
