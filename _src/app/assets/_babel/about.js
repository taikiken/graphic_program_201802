/*!
 * @copyright (c) 2011-@@year inazumatv.com, @@copyright.
 * @author (at)taikiken / http://inazumatv.com
 * @date @@buildTime
 * @license
 * @date 2016/09/06 - 16:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// library
const Dom = window.Sagen.Dom;

/**
 * about page, hamburger menu
 */
class Nav {
  /**
   * button / nav それぞれ Sagen.Dom instance として保存します
   * @param {Sagen.Dom} button div#js-header__btn--toggle
   * @param {Sagen.Dom} target div#js-header__nav
   * @param {Sagen.Dom} close div#js-header__btn--close
   */
  constructor(button:Dom, target:Dom, close:Dom) {
    /**
     * @property {Sagen.Dom} this.button - div#js-header__btn--toggle
     * @property {Sagen.Dom} this.target - div#js-header__nav
     * @property {Sagen.Dom} this.close - div#js-header__btn--close
     */
    Object.assign(this, { button, target, close });
  }
  /**
   * 初期処理, button へ click event を bind します
   * @return {Nav} method chain 用に this を返します
   */
  init():boolean {
    this.button.element().addEventListener('click', this.onClick.bind(this), false);
    this.close.element().addEventListener('click', this.onClose.bind(this), false);
    return this;
  }
  /**
   * div#js-header__btn--toggle click event handler
   * @param {Event} event div#js-header__btn--toggle click event
   * @return {boolean} 処理結果を返します
   */
  onClick(event:Event):void {
    event.preventDefault();

    const button = this.button;

    if (button.hasClass('active')) {
      return this.beClose();
    }

    return this.beOpen();
  }
  /**
   * div#js-header__btn--close click event handler
   * @param {Event} event div#js-header__btn--close click event
   * @return {boolean} 処理結果を返します
   */
  onClose(event:Event) {
    event.preventDefault();

    return this.beClose();
  }
  /**
   * メニューを閉じます
   * @return {boolean} 閉じると true を返します
   */
  beClose():boolean {
    const button = this.button;
    const target = this.target;

    if (!button.hasClass('active') && !target.hasClass('active')) {
      return false;
    }

    button.removeClass('active');
    target.removeClass('active');

    return true;
  }
  /**
   * メニューを開きます
   * @return {boolean} 開くと true を返します
   */
  beOpen():boolean {
    const button = this.button;
    const target = this.target;

    if (button.hasClass('active') && target.hasClass('active')) {
      return false;
    }

    button.addClass('active');
    target.addClass('active');

    return true;
  }
  /**
   * about hamburger menu を実行します
   */
  static execute():void {
    // execute
    const button = document.getElementById('js-header__btn--toggle');
    if (!button) {
      return;
    }

    const target = document.getElementById('js-header__nav');
    if (!button) {
      return;
    }

    const close = document.getElementById('js-header__btn--close');
    if (!close) {
      return;
    }

    const nav = new Nav(new Dom(button), new Dom(target), new Dom(close));
    nav.init();
  }
}

// 処理を開始します
Nav.execute();
