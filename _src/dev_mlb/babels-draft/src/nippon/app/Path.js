/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/17 - 20:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku
import Type from '../../moku/util/Type';

// draft/app
import Env from '../../draft/app/Env';

/**
 * 日本シリーズ 2017 JSON path を取得します
 * @since 2017-10-20
 */
export default class Path {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  // -------------------------------------------
  // 日本シリーズ
  /**
   * 日本シリーズ JSON path を取得します
   * @return {string} 日本シリーズ JSON path
   */
  static get nippon() {
    switch (Env.mode) {
      // case Env.LOCAL_DEV: {
      //   return `/api/v1/nippons/2017/live2017101902.json?t=${Date.now()}`;
      //   // return `https://dev.widget.sportsbull.jp/json/v1/2017/npb/live${Env.nipponId}.json`;
      // }
      case Env.LOCAL_DEV:
      case Env.DEVELOPMENT: {
        // eslint-disable-next-line max-len
        return `https://dev.widget.sportsbull.jp/json/v1/2017/npb/live${Env.nipponId}.json?t=${Date.now()}`;
      }
      case Env.PRODUCTION:
      default: {
        // eslint-disable-next-line max-len
        return `https://widget.sportsbull.jp/json/v1/2017/npb/live${Env.nipponId}.json?t=${Date.now()}`;
      }
    }
  }
  /**
   * 日本シリーズ JSON ID を取得します
   *
   * 以下の順序で取得します
   * 1. script#js-nippon2016-bundle data-id
   * 1. URLから生成
   * 1. 日付から生成
   *
   * <pre>
   * # 公開URL
   * https://baseballgate.jp/nippons/2016/
   *
   * 各試合URL
   * 第1戦：https://baseballgate.jp/nippons/2016/2016102201/
   * 第2戦：https://baseballgate.jp/nippons/2016/2016102301/
   * … https://baseballgate.jp/nippons/2016/[YYYYMMDD01]/
   * </pre>
   * @return {string} 日本シリーズ JSON ID を返します
   * @see https://aws-plus.backlog.jp/view/BGATE-98
   */
  static id() {
    // by path
    const fixed = '/nippons/2017/';
    const pathname = location.pathname;
    let stripped = pathname.replace(fixed, '');
    if (stripped.length > 0) {
      stripped = stripped.replace('/', '');
    }
    let id = stripped;
    if (!Type.number(id)) {
      // by Date
      const date = new Date();
      const yyyy = date.getFullYear();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      id = `${yyyy}${mm}${dd}01`;
    }
    return id;
  }
}
