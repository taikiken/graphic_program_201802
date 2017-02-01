/*!
 * Copyright (c) 2011-@@year inazumatv.com, @@copyright.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/12/22 - 14:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * @@buildTime
 *
 */
'use strict';

// library
const Dom = window.Sagen.Dom;

const $ = window.jQuery;

/**
 * [BULL'S PICKS とは]ボタンで開閉するジャバラ制御します
 */
class Picks {
  /**
   * div#js-summary__aboutus__inner element を保存し Dom instance を作成します
   * @param {Element} element div#js-summary__aboutus__inner
   * @param {Element} pageTop div#js-page_top
   */
  constructor(element, pageTop) {
    /**
     * 制御コンテナを取得します
     * @returns {Element} div#js-summary__aboutus__inner
     */
    this.element = () => element;

    this.pageTop = () => pageTop;
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
    this.$body = $(document.body);
  }
  /**
   * div#js-summary__aboutus__inner へ click イベントを bind します
   * @returns {boolean} true を返します
   */
  init() {
    let result = false;
    const element = this.element();
    if (element) {
      element.addEventListener('click', this.boundClick(), false);
      result = true;
    }
    const pageTop = this.pageTop();
    if (!pageTop) {
      result = false;
    } else {
      result = true;
      $(pageTop).on('click', this.onTop.bind(this));
    }
    // this.element().addEventListener('click', this.boundClick(), false);
    return result;
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
  onTop(event) {
    event.preventDefault();
    this.$body.stop()
      .animate({ scrollTop: 0 }, 400);
  }
  // -----------------------------------
  /**
   * Picks class を稼働させます, div#js-summary__aboutus__inner が存在するときに実行します
   * @returns {?Picks} element が存在すると Picks instance を返します
   */
  static execute() {
    const element = document.getElementById('js-summary__aboutus__inner');
    const pageTop = document.getElementById('js-page_top');
    // let picks = null;
    // if (element) {
    //   picks = new Picks(element, pageTop);
    //   picks.init();
    // }
    const picks = new Picks(element, pageTop);
    picks.init();
    return picks;
  }
}

Picks.execute();
