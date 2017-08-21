/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 12:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Env from './Env';

/**
 * S3 環境のアクセスパスを管理します
 */
export default class S3 {
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * suffix として使用する s3 amazon domain - s3.amazonaws.com
   * @const AMAZON
   * @type {string}
   */
  static AMAZON = 's3.amazonaws.com';
  /**
   * dev 環境サーバー - https://dev-mlive.sportsbull.jp.
   * @const DEV
   * @type {string}
   */
  static DEV = `http://dev-mlive.sportsbull.jp.${S3.AMAZON}`;
  /**
   * stg 環境サーバー - https://stg-mlive.sportsbull.jp.
   * @const DEV
   * @type {string}
   */
  static STG = `http://stg-mlive.sportsbull.jp.${S3.AMAZON}`;
  /**
   * 本番 環境サーバー - https://mlive.sportsbull.jp.
   * @const WWW
   * @type {string}
   */
  static WWW = `http://mlive.sportsbull.jp.${S3.AMAZON}`;
  // ---------------------------------------------------
  //  PROPERTY
  // ---------------------------------------------------
  /**
   * サーバー定数
   * @type {?string}
   */
  static server = null;
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * {@link Env} により DEV | STG | WWW を取得します
   * @returns {string} DEV | STG | WWW を返します
   */
  static init() {
    if (Env.www()) {
      return S3.WWW;
    } else if (Env.stg()) {
      return S3.STG;
    }
    return S3.DEV;
  }
  /**
   * ホスト名称を取得します
   * @returns {?string} DEV | STG | WWW を返します
   */
  static host() {
    if (!S3.server) {
      S3.server = S3.init();
    }
    return S3.server;
  }
}
