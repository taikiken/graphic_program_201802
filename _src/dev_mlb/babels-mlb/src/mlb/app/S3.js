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
  // static AMAZON = '';
  static PROTOCOL = location.protocol;
  /**
   * dev 環境サーバー - [https|http]://dev-mlive.sportsbull.jp
   * - 接続元 protocol でリクエストします
   * @const DEV
   * @type {string}
   * @since 2017-09-10 - protocol 可変
   */
  static DEV = `${S3.PROTOCOL}//dev-mlive.sportsbull.jp`;
  // static DEV = `https://dev-mlive.sportsbull.jp.${S3.AMAZON}`;
  /**
   * stg 環境サーバー - [https|http]://stg-mlive.sportsbull.jp
   * - 接続元 protocol でリクエストします
   * @const DEV
   * @type {string}
   * @since 2017-09-10 - protocol 可変
   */
  static STG = `${S3.PROTOCOL}//stg-mlive.sportsbull.jp`;
  // static STG = `https://stg-mlive.sportsbull.jp.${S3.AMAZON}`;
  /**
   * 本番 環境サーバー - [https|http]://mlive.sportsbull.jp
   * - 接続元 protocol でリクエストします
   * @const WWW
   * @type {string}
   * @since 2017-09-10 - protocol 可変
   */
  static WWW = `${S3.PROTOCOL}//mlive.sportsbull.jp`;
  // static WWW = `https://mlive.sportsbull.jp.${S3.AMAZON}`;
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
    // console.log('S3.PROTOCOL', S3.PROTOCOL, S3.DEV);
    if (Env.www()) {
      return S3.WWW;
    } else if (Env.stg()) {
      // return S3.STG;
      // https://aws-plus.backlog.jp/view/UNDO_MLBSTATS-27#comment-1174830746
      // @since 2017-08-23 - stg www 見る
      return S3.WWW;
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
