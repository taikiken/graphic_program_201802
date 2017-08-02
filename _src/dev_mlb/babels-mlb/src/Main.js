/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/21 - 16:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import Router from './mlb/app/Router';

// view
import View from './mlb/view/View';
import Day from './mlb/util/Day';

/**
 * [native code] - document
 * @type {HTMLDocument}
 */
const document = self.document;

/**
 * 実行ファイル
 * - {@link Router} でロケーションチェックを行います
 * - 該当ローケーションの時は index / game を実行します
 */
export default class Main {
  /**
   * `/stats/mlb/game/*` を表示します
   * - コンテナチェックします
   *   - div#js-mlb-game-overview
   *   - div#js-mlb-game-score
   *   - div#js-mlb-game-info
   * - {@link View.game} を実行します
   * @param {{path: ?string, id: ?string, year: ?string}} page {@link Router.search} 戻り値
   */
  static game(page) {
    console.log('Main.game', page);
    const overview = document.getElementById('js-mlb-game-overview');
    const score = document.getElementById('js-mlb-game-score');
    const info = document.getElementById('js-mlb-game-info');
    // console.log('Main.game ', overview, score, info);
    if (!overview || !score || !info) {
      return;
    }
    View.game(page.year, page.id, { overview, score, info });
  }
  /**
   * `/stats/mlb/` を表示します
   * - `page` の id を評価します id.length === 8
   * - div#js-mlb-index-container 存在チェック
   * - page.id `/stats/mlb/YYYYMMDD` - YYYYMMDD があればその日,
   * なければ当日を表示します
   * - {@link View.index} を実行します
   * @param {{path: ?string, id: ?string, year: ?string}} page {@link Router.search} 戻り値
   */
  static index(page) {
    console.log('Main.index', page);
    const id = page.id;
    if (id) {
      // id: not null - /stats/mlb/yyyymmdd/
      // id: null - /stats/mlb/
      if (!id.length || id.length !== 8) {
        return;
      }
    }
    const element = document.getElementById('js-mlb-index-container');
    if (!element) {
      return;
    }
    // 日付を生成します
    const date = id ? Day.convert(id) : Day.current();
    // 年情報を取得します
    const { year } = Day.date(date);
    View.index(element, year, date);
  }
  /**
   * {@link Router} を起動し `pathname` をチェックし表示コンテンツを選別します
   * @returns {?string} index / game 表示 page id を返します
   */
  static init() {
    const page = Router.search();
    console.log('Main.init page', page);
    // ---------------------------
    // 処理開始
    switch (page.path) {
      case 'index': {
        Main.index(page);
        return 'index';
      }
      case 'game': {
        Main.game(page);
        return 'game';
      }
      default: {
        return null;
      }
    }
  }
}
