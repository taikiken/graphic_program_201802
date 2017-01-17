/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/12/22 - 14:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// library
const Dom = window.Sagen.Dom;

/**
 * [BULL'S PICKS とは]ボタンで開閉するジャバラ制御します
 */
class Picks {
  /**
   * div#js-summary__aboutus__inner element を保存し Dom instance を作成します
   * @param {Element} element div#js-summary__aboutus__inner
   */
  constructor(element) {
    /**
     * 制御コンテナを取得します
     * @returns {Element} div#js-summary__aboutus__inner
     */
    this.element = () => element;
    // ---
    const boundClick = this.onClick.bind(this);
    /**
     * bound onClick
     * @returns {function} bound onClick
     */
    this.boundClick = () => boundClick;
    // ---
    const dom = new Dom(element);
    /**
     * div#js-summary__aboutus__inner Dom instance を取得します
     * @returns {Dom} div#js-summary__aboutus__inner Dom instance
     */
    this.dom = () => dom;
  }
  /**
   * div#js-summary__aboutus__inner へ click イベントを bind します
   * @returns {boolean} true を返します
   */
  init() {
    this.element().addEventListener('click', this.boundClick(), false);
    return true;
  }
  /**
   * div#js-summary__aboutus__inner.onClick event handler
   * @param {Event} event click event object, preventDefault します
   * @returns {Event} click event を返します
   */
  onClick(event) {
    event.preventDefault();
    // const element = this.element();
    const dom = this.dom();
    const className = 'active';
    // element.removeEventListener('click', this.boundClick());
    if (dom.hasClass(className)) {
      dom.removeClass(className);
    } else {
      dom.addClass(className);
    }
    return event;
  }
  // -----------------------------------
  /**
   * Picks class を稼働させます, div#js-summary__aboutus__inner が存在するときに実行します
   * @returns {?Picks} element が存在すると Picks instance を返します
   */
  static execute() {
    const element = document.getElementById('js-summary__aboutus__inner');
    let picks = null;
    if (element) {
      picks = new Picks(element);
      picks.init();
    }
    return picks;
  }
}

Picks.execute();
