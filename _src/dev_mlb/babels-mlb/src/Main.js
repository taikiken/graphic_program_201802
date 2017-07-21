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
import ViewIndex from './mlb/view/ViewIndex';

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
    const element = document.getElementById('js-mlb-index-container');
    if (!element) {
      return;
    }
    ViewIndex.make(element);
  }
  static init() {
    const page = Router.search();
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
