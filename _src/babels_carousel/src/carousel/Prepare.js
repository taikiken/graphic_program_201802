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

// moku/util
import List from '../moku/util/List';

// // moku/dom
// import Classes from '../moku/dom/Classes';

// carousel
import Carousel from './Carousel';

/**
 * [native code] - document
 * @private
 * @type {HTMLDocument}
 */
const document = self.document;

/**
 * Sagen
 * @private
 * @type {Sagen}
 */
const Sagen = self.Sagen;

/**
 * carousel を HTMLElement が存在する状態で実装する準備を行います
 *
 * 必要なタグを増やします
 * - slide コンテナを複製します
 * - pager 中身を作成します
 *
 * スライドが 2 の時は便宜的に 4 として運用します
 */
export default class Prepare {
  /**
   * 準備を始めます
   * ul#js-pickup-slider 存在を確認します
   *
   * データによっては存在しないことがあります
   * @returns {boolean} true: 実装します
   */
  static start() {
    console.log('Prepare.start', document.getElementById);
    // ul#js-pickup-slider
    const element = document.getElementById('js-pickup-slider');
    console.log('Prepare.start element', element);
    if (!element) {
      return false;
    }
    // li.js-pickup 数
    const length = Prepare.articles(element);
    console.log('Prepare.start length', length);
    if (!length) {
      // li が 0 の時は実装しない
      return false;
    }
    const { pagers } = Prepare.pager(length);
    const { prev, next } = Prepare.direction(length);
    const carousel = new Carousel(element, pagers, prev, next);
    carousel.start();
    return true;
  }
  /**
   * carousel slide 複製を行います
   * @param {Element|Document} element ul#js-pickup-slider
   * @returns {number} ul > li の初期数 === スライド数を返します
   */
  static articles(element) {
    // ul#js-pickup-slider > li.js-pickup
    const nodeList = element.getElementsByClassName('js-pickup');
    if (!nodeList || !nodeList.length) {
      return 0;
    }
    const articles = Array.from(nodeList);
    // li 数を取得します
    const length = articles.length;
    // スライド数 2 の時は複製を2回増やします
    const needFourth = length === 2;
    // 真ん中のグループにマーキングするためのフラッグ
    let center = true;
    // スライド数 1 を超えている時に複製を行います
    if (length > 1) {
      if (needFourth) {
        Prepare.clone(element, articles);
        Prepare.clone(element, articles, center);
        center = false;
      }
      Prepare.clone(element, articles, center);
      Prepare.clone(element, articles);
    }
    // スライド数を返します
    return length;
  }
  /**
   * スライド複製を行います
   * @param {Element} element ul#js-pickup-slider
   * @param {Array<Element>} articles ul#js-pickup-slider > li.js-pickup
   * @param {boolean} [center=false] 真ん中のグループフラッグ
   */
  static clone(element, articles, center = false) {
    console.log('clone element', element);
    const fragment = document.createDocumentFragment();
    let isCurrent = true;
    for (const article of articles) {
      const clone = article.cloneNode(true);
      if (center) {
        clone.className += ' view-pickup';
        if (isCurrent) {
          clone.className += ' current';
          isCurrent = false;
        }
      }
      fragment.appendChild(clone);
      console.log('clone', clone);
    }
    element.appendChild(fragment);
  }
  /**
   * pager element を作成します
   * - div#js-pager-container'
   *  - div.pager
   *    - ul.pager-list
   *      - li.pager-item
   *        - a.pager-link
   * @param {number} length スライド数
   * @returns {?object} {{pagers: Array<Element>}} - pagers: li.pager-item
   */
  static pager(length) {
    // mobile phone pager なし
    // 1件 pager なし
    if (Sagen.Browser.Mobile.phone() || length === 1) {
      return null;
    }
    // pager root element
    const container = document.getElementById('js-pager-container');
    if (!container) {
      return null;
    }
    // div.pager
    const pager = document.createElement('div');
    pager.className = 'pager';
    // ul.pager-list
    const element = document.createElement('ul');
    element.className = 'pager-list';
    // map するためのダミー配列
    const list = List.fill(length, 0);
    let isCurrent = true;
    const pagers = list.map((value, index) => {
      const li = document.createElement('li');
      li.className = `pager-item pager-${index}`;
      if (isCurrent) {
        li.className += ' current';
        isCurrent = false;
      }
      const a = document.createElement('a');
      a.className = 'pager-link';
      a.href = `#pickup-${index}`;
      a.innerHTML = String(index);
      li.appendChild(a);
      element.appendChild(li);
      return li;
    });
    // appendChild
    pager.appendChild(element);
    container.appendChild(pager);
    // return ul
    return {
      // element,
      pagers,
    };
  }
  /**
   * prev / next nav element を作成します
   * - div#js-direction-container
   *  - div
   *    - a#prev
   *    - a#next
   * @param {number} length スライド数
   * @returns {?object} {{prev: a#prev, next: a#next}}
   */
  static direction(length) {
    if (length === 1) {
      return null;
    }
    // direction root element
    const container = document.getElementById('js-direction-container');
    if (!container) {
      return null;
    }
    const div = document.createElement('div');
    div.className = 'direction';
    const prev = document.createElement('a');
    prev.className = 'direction-prev';
    prev.href = '#prev';
    prev.id = 'prev';
    const next = document.createElement('a');
    next.className = 'direction-next';
    next.href = '#next';
    next.id = 'next';
    // appendChild
    div.appendChild(prev);
    div.appendChild(next);
    container.appendChild(div);
    // return div.direction
    return {
      prev,
      next,
    };
  }
}
