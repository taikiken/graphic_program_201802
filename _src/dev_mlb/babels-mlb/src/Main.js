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

const document = self.document;

/**
 * 実行ファイル
 */
export default class Main {
  static game(page) {
    console.log('Main.game', page);
  }
  static index(page) {
    console.log('Main.index', page);
    const id = page.id;
    if (!id.length || id.length !== 8) {
      return;
    }
    const element = document.getElementById('js-mlb-index-container');
    if (!element) {
      return;
    }
    const year = id.substr(0, 4);
    const date = Day.convert(id);
    View.index(element, year, date);
  }
  static init() {
    const page = Router.search();
    console.log('Main.init page', page);
    // ---------------------------
    // 処理開始
    switch (page.path) {
      case 'index': {
        return Main.index(page);
      }
      case 'game': {
        return Main.game(page);
      }
      default: {
        return null;
      }
    }
  }
}
