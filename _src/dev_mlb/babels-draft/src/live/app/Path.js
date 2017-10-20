/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/13 - 13:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Env from '../../draft/app/Env';

/**
 * JSON 取得パス - draft live - を管理します
 */
export default class Path {
  /**
   * ドラフト速報 JSON path
   * @return {string} ドラフト速報 JSON パスを返します
   */
  static get live() {
    return `${Path.host()}/json/v1/2017/draft/result_bull.json?t=${Date.now()}`;
  }
  /**
   * Ajax 接続サーバーを Env のモードを元に決定します {@link Env}
   * ```
   * 前年データ : https://baseballgate.jp/api/v1/draft/2016/result.json
   * 2017データ
   * 開発 : https://dev.widget.sportsbull.jp/json/v1/2017/draft/list.json
   * 本番 : https://widget.sportsbull.jp/json/v1/2017/draft/list.json
   * ```
   * @return {string} 接続サーバーを返します
   * @see https://aws-plus.backlog.jp/view/BGATE-451#comment-1178935652
   */
  static host() {
    switch (Env.mode) {
      // case Env.LOCAL_DEV: {
      //   return '';
      //   // return 'https://dev.widget.sportsbull.jp';
      // }
      case Env.LOCAL_DEV:
      case Env.DEVELOPMENT: {
        return 'https://dev.widget.sportsbull.jp';
      }
      case Env.PRODUCTION:
      default: {
        return 'https://widget.sportsbull.jp';
      }
    }
  }
}
