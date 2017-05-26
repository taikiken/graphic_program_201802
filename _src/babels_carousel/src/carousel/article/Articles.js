/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Article from './Article';

/**
 * スライドへ CSS class current を add / remove する {@link Article} を実装します
 */
export default class Articles {
  /**
   * スライド Element を保存します
   * @param {Element} element ul.pager-list - li.view-pickup を抽出します
   */
  constructor(element) {
    /**
     * li.view-pickup
     * @type {Element}
     */
    this.element = element;
  }
  /**
   * {@link Article} を作成します
   */
  start() {
    // @type {NodeList} - li.view-pickup を抽出
    const elements = this.element.getElementsByClassName('view-pickup');
    // {@link Article} を作成
    Array.from(elements).map((element, index) => {
      const article = new Article(element, index);
      article.start();
    });
  }
}
