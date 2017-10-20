/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/06 - 14:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import Env from './Env';

// // util
// import { default as Type } from '../util/Type';
//
// // moku/util
// import Type from '../../moku/util/Type';
//
// let path = '';

/**
 * JSON 取得パス - 候補選手一覧 - を管理します
 */
export default class Path {
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * 選手一覧 JSON path
   * @return {string} 選手一覧 JSON パスを返します
   * @see https://aws-plus.backlog.jp/view/BGATE-451#comment-1178935652
   */
  static get players() {
    return `${Path.host()}/json/v1/2017/draft/list.json`;
  }
  // /**
  //  * ドラフト速報 JSON path
  //  * @return {string} ドラフト速報 JSON パスを返します
  //  */
  // static get live() {
  //   return `${Path.host()}/api/v1/draft/2017/result.json`;
  // }
  /**
   * @deprecated instead use Path.news
   * ドラフト関連ニュース headline に流れるニュース
   * <pre>
   * 本番では https://baseballgate.jp/api/posts/ になります。
   * </pre>
   * @return {string} ドラフト関連ニュース headline に流れるニュース JSON パスを返します
   * @see https://cloudpack.slack.com/archives/xpj-hhd-baseball/p1476440406000396
   */
  static get related() {
    return Path.news;
  }
  /**
   * ドラフト関連ニュース headline に流れるニュース
   * <pre>
   * 本番では https://baseballgate.jp/api/posts/ になります。
   * </pre>
   * @return {string} ドラフト関連ニュース headline に流れるニュース JSON パスを返します
   * @see https://cloudpack.slack.com/archives/xpj-hhd-baseball/p1476440406000396
   * @since 2017-10-05
   */
  static get news() {
    // console.log('Env.news', Env.mode);
    switch (Env.mode) {
      case Env.LOCAL_DEV: {
        return '/api/posts/tag.json';
      }
      case Env.DEVELOPMENT:
      case Env.PRODUCTION:
      default: {
        return '/api/posts/?tag=draft2017';
      }
    }
  }
  // // -------------------------------------------
  // // 日本シリーズ
  // /**
  //  * 日本シリーズ JSON path を取得します
  //  * @return {string} 日本シリーズ JSON path
  //  */
  // static get nippon() {
  //   switch (Env.mode) {
  //     case Env.LOCAL_DEV: {
  //       // return '/api/v1/game/2016/postseason/nipponseries/live2016101602.json';
  //       return '/api/v1/game/2016/postseason/nipponsiries/live2016102901.json';
  //       // return '/api/v1/game/2016/postseason/nipponseries/live2016101602.json?_=1476942141389';
  //     }
  //     case Env.DEVELOPMENT: {
  //       // eslint-disable-next-line max-len
  //       return 'https://dev.baseballgate.jp/api/v1/game/2016/postseason/nipponseries/live2016101602.json';
  //     }
  //     case Env.PRODUCTION:
  //     default: {
  //       return `/api/v1/game/2016/postseason/nipponseries/live${Env.nipponId}.json`;
  //     }
  //   }
  // }
  // // ----------------------------------------
  // // STATIC METHOD
  // // ----------------------------------------
  // /**
  //  * 日本シリーズ JSON ID を取得します
  //  *
  //  * 以下の順序で取得します
  //  * 1. script#js-nippon2016-bundle data-id
  //  * 1. URLから生成
  //  * 1. 日付から生成
  //  *
  //  * <pre>
  //  * # 公開URL
  //  * https://baseballgate.jp/nippons/2016/
  //  *
  //  * 各試合URL
  //  * 第1戦：https://baseballgate.jp/nippons/2016/2016102201/
  //  * 第2戦：https://baseballgate.jp/nippons/2016/2016102301/
  //  * … https://baseballgate.jp/nippons/2016/[YYYYMMDD01]/
  //  * </pre>
  //  * @return {string} 日本シリーズ JSON ID を返します
  //  * @see https://aws-plus.backlog.jp/view/BGATE-98
  //  */
  // static id() {
  //   // by path
  //   const fixed = '/nippons/2016/';
  //   const pathname = location.pathname;
  //   let stripped = pathname.replace(fixed, '');
  //   if (stripped.length > 0) {
  //     stripped = stripped.replace('/', '');
  //   }
  //   let id = stripped;
  //   if (!Type.number(id)) {
  //     // by Date
  //     const date = new Date();
  //     const yyyy = date.getFullYear();
  //     const mm = date.getMonth() + 1;
  //     const dd = date.getDate();
  //     id = `${yyyy}${mm}${dd}01`;
  //   }
  //   return id;
  // }
  /**
   * Ajax 接続サーバーを Env のモードを元に決定します {@link Env}
   * ```
   * 2017データ
   * 開発 : https://dev.widget.sportsbull.jp/json/v1/2017/draft/list.json
   * 本番 : https://widget.sportsbull.jp/json/v1/2017/draft/list.json
   * ```
   * @return {string} 接続サーバーを返します
   * @see https://aws-plus.backlog.jp/view/BGATE-451#comment-1178935652
   */
  static host() {
    switch (Env.mode) {
      case Env.DEVELOPMENT: {
        return 'https://dev.widget.sportsbull.jp';
      }
      case Env.LOCAL_DEV: {
        return 'https://dev.widget.sportsbull.jp';
      }
      case Env.PRODUCTION:
      default: {
        return 'https://widget.sportsbull.jp';
      }
    }
  }
  // // ----------------------------------------
  // // JSON path
  // /**
  //  * JSON path を取得します
  //  * @return {string} JSON path を返します
  //  */
  // static get() {
  //   return path;
  // }
  // /**
  //  * JSON path を設定します
  //  * @param {string} pathString JSON path
  //  */
  // static set(pathString) {
  //   path = pathString;
  // }
}

