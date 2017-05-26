/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Pager from './Pager';

/**
 * pager current mark を付けるように {@link Pager} を必要な Element へ設定します
 */
export default class Pagers {
  /**
   * 処理対象 NodeList を取得しプロパティ設定します
   * @param {Array<Element>} pagers ul > li.pager-item list
   */
  constructor(pagers) {
    this.pagers = pagers;
  }
  /**
   * {@link Pager} インスタンスを作成します
    */
  start() {
    this.pagers.map((element, index) => {
      const pager = new Pager(element, index);
      pager.start();
    });
  }
}
