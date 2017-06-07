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

// carousel
import Carousel from './Carousel';

// pagers
import Pagers from './pager/Pagers';

// nav
import Nav from './nav/Nav';

// articles
import Articles from './article/Articles';

// ui
import Swipe from './ui/Swipe';

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
 * sp flag
 * @private
 * @type {boolean}
 */
const sp = Sagen.Browser.Mobile.phone();

/**
 * スライド幅
 * - PC: 640
 * - SP: 240;
 * @private
 * @type {number}
 */
const width = sp ? 280 : 640;

/**
 * carousel を HTMLElement が存在する状態で実装する準備を行います
 *
 * 必要なタグを増やします
 * - slide コンテナを複製します
 * - pager 中身を作成します
 *
 * スライドが 2 の時は便宜的に 4 として運用します
 *
 * 1. #js-pickup-slider-wrapper 存在チェック
 * 1. #js-pickup-slider 存在チェック
 * 1. #js-pickup-slider > li.js-pickup 存在チェック
 *  1. 存在する場合は複製を作成する
 *  1. 存在数が 1 を越える時に pager, nav を作成する
 * 1. {@link Controller} でイベントを管理します
 *
 * - Prepare
 *  - {@link Controller}
 *  - {@link Nav}
 *  - {@link Pagers}
 *    - {@link Pager}
 *  - {@link Articles}
 *    - {@link Article}
 *  - {@link Carousel}
 */
export default class Prepare {
  /**
   * 各パーツを作成します
   * - Prepare
   *  - {@link Controller}
   *  - {@link Nav}
   *  - {@link Pagers}
   *    - {@link Pager}
   *  - {@link Articles}
   *    - {@link Article}
   *  - {@link Carousel}
   * @param {number} length スライド数
   * @param {Element} wrapper div#js-pickup-slider-wrapper
   * @param {Array.<Element>} pagers li.pager-item - current 対象のみ
   * @param {Element} prev a.direction-prev
   * @param {Element} next a.direction-next
   * @param {Element} element ul#js-pickup-slider
   */
  static start(length, wrapper, pagers, prev, next, element) {
    // prev / next
    const nav = new Nav(prev, next);
    nav.start();
    // articles
    const articles = new Articles(element);
    articles.start();
    // pagers
    if (pagers) {
      const pager = new Pagers(pagers);
      pager.start();
    }
    // carousel init & start
    const carousel = new Carousel(width, length, wrapper);
    carousel.start();
    // only sp - swipe
    if (sp) {
      const swipe = new Swipe(element);
      swipe.start();
    }
  }
  /**
   * スライド幅を css 設定する - style tag を head へ appendChild します
   * ```
   * <style media="screen" type="text/css">
   *   #js-pickup-slider {
   *    width: 6400px;
   *   }
   * </style>
   * ```
   * @param {number} length スライド数
   */
  static css(length) {
    const style = document.createElement('style');
    const rule = document.createTextNode(`#js-pickup-slider{width: ${length * width}px;}`);
    style.media = 'screen';
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = rule.nodeValue;
    } else {
      style.appendChild(rule);
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }
  /**
   * 準備を始めます
   * ul#js-pickup-slider 存在を確認します
   *
   * データによっては存在しないことがあります
   * @returns {boolean} true: 実装します
   */
  static init() {
    // div#js-pickup-slider-wrapper
    const wrapper = document.getElementById('js-pickup-slider-wrapper');
    if (!wrapper) {
      return false;
    }
    // ul#js-pickup-slider
    const element = document.getElementById('js-pickup-slider');
    if (!element) {
      return false;
    }
    // li.js-pickup 数
    const { length, count } = Prepare.articles(element);
    console.log('Prepare.start length', length);
    if (!length) {
      // li が 0 の時は実装しない
      return false;
    }
    let pagers = null;
    if (!sp) {
      pagers = Prepare.pager(length);
    }
    const { prev, next } = Prepare.direction(length);
    // style insert
    Prepare.css(count);
    // carousel init & start
    Prepare.start(length, wrapper, pagers, prev, next, element);
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
    const center = true;
    let isCurrent = true;
    let count = length;
    // スライド数 1 を超えている時に複製を行います
    if (length > 1) {
      if (needFourth) {
        Prepare.clone(element, articles);
        count += length;
        Prepare.clone(element, articles, center, isCurrent);
        count += length;
        isCurrent = false;
      }
      Prepare.clone(element, articles, center, isCurrent);
      count += length;
      Prepare.clone(element, articles);
      count += length;
    }
    // スライド数を返します
    return {
      length,
      count,
    };
  }
  /**
   * スライド複製を行います
   * @param {Element} element ul#js-pickup-slider
   * @param {Array<Element>} articles ul#js-pickup-slider > li.js-pickup
   * @param {boolean} [center=false] 真ん中のグループフラッグ <- 表示グループ
   * @param {boolean} [current=false] current class つけるフラッグ
   */
  static clone(element, articles, center = false, current = false) {
    // 一旦 fragment へ appendChild する
    const fragment = document.createDocumentFragment();
    // first element へ `current` class 追加するフラッグ
    let isCurrent = true;
    // TODO: Array.map へ変更する
    for (const article of articles) {
      const clone = article.cloneNode(true);
      // 表示するコンテンツのみ
      if (center) {
        clone.className += ' view-pickup';
        if (current && isCurrent) {
          clone.className += ' current';
          isCurrent = false;
        }
      }
      fragment.appendChild(clone);
    }
    // element へ追加
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
    if (sp || length === 1) {
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
    return pagers;
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
    prev.innerHTML = 'Prev';
    const next = document.createElement('a');
    next.className = 'direction-next';
    next.href = '#next';
    next.id = 'next';
    next.innerHTML = 'Next';
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
