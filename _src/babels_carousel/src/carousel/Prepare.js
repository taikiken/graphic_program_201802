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
    Prepare.pager(element, length);
    return true;
  }
  static articles(element) {
    const articles = element.getElementsByClassName('js-pickup-article');
    if (!articles || !articles.length) {
      return 0;
    }
    const length = articles.length;
    Prepare.clone(articles, length);
    return length;
  }
  static clone(articles, length) {
    console.log('Prepare.clone', articles, length);
  }
  static pager(element, length) {
    if (Sagen.Browser.Mobile.phone()) {
      return;
    }
    console.log('Prepare.pager', element, length);
  }
}
