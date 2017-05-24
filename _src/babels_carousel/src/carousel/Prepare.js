/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

const document = self.document;

const Sagen = self.Sagen;
const MOKU = self.MOKU;

export default class Prepare {
  static start() {
    const element = document.getElementById('js-pickup-carousel');
    if (!element) {
      return false;
    }
    const length = Prepare.articles(element);
    if (!length) {
      return false;
    }
    Prepare.pager(length);
    return true;
  }
  static articles(element) {
    const articles = element.getElementsByClassName('js-pickup-article');
    if (!articles || !articles.length) {
      return 0;
    }
    const length = articles.length;
    const needFourth = length === 2;
    if (length > 1) {
      if (needFourth) {
        Prepare.clone(element, articles, length);
        Prepare.clone(element, articles, length);
      }
      Prepare.clone(element, articles, length);
      Prepare.clone(element, articles, length);
    }
    return length;
  }
  static clone(element, articles, length) {
    for (const article of articles) {
      const clone = article.cloneNode();
      element.appendChild(clone);
    }
  }
  static pager(length) {
    // mobile phone pager なし
    // 1件 pager なし
    if (Sagen.Browser.Mobile.phone() || length === 1) {
      return;
    }
    // pager root element
    const element = document.getElementById('js-pickup-pager-list');
    if (!element) {
      return;
    }
    const list = MOKU.util.List.fill(length, 0);
    list.map((value, index) => {
      const li = document.createElement('li');
      li.className = `pager-item pager-${index}`;
      const a = document.createElement('a');
      a.className = 'pager-link';
      a.href = `#pickup-${index}`;
      a.innerHTML = String(index);
      li.appendChild(a);
      element.appendChild(li);
      return index;
    });
  }
}
