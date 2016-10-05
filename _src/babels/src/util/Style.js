/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/18 - 18:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// Sagen.Dom class
const Dom = self.Sagen.Dom;

/**
 * オリジナルの element.style.cssText を保持するための Symbol
 * @private
 * @type {Symbol}
 */
const cssSymbol = Symbol();

/**
 * Element の style を操作します
 */
export class Style {
  /**
   * 引数 element の初期 style 設定を保存し復元できるようにします
   * @param {?Element} element 操作対象 Element
   */
  constructor(element) {
    /**
     * 操作対象 Element
     * @type {Element}
     */
    this.element = element;
    // @type {string} - オリジナルの element.style.cssText を保持します
    this[cssSymbol] = this.current();
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * instance 作成時の style.cssText
   * @return {string} instance 作成時の style.cssText を返します
   */
  get origin() {
    return this[cssSymbol];
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * style value を取得します
   * @param {string} propertyName 調査する style property name
   * @return {string} style value を返します
   */
  get(propertyName) {
    return Dom.getStyle(this.element, propertyName);
  }
  /**
   * element へ css を設定します、設定済み css を上書きします
   * @param {string} css 設定する css
   * @param {boolean} [update=false] 保存済み css を上書きするか否かの真偽値, true: 上書き
   * @return {boolean} 保存済み css を上書きするか否かの真偽値を返します
   */
  set(css, update = false) {
    // 更新依頼ありの時のみ書換える
    if (update) {
      this[cssSymbol] = css;
    }
    // 存在チェック
    const element = this.element;
    if (!element) {
      return update;
    }
    // 存在する時のみ処理を行います
    element.style.cssText = css;

    return update;
  }
  /**
   * element の style.cssText を取得します
   * @return {string} style.cssText を返します
   */
  current() {
    const element = this.element;
    if (!!element) {
      return element.style.cssText;
    }

    // this.element 不正の時は空文字を返します
    return '';
  }
  /**
   * element の style.cssText を変更前まで戻します
   * @return {string} 設定した css を返します
   */
  restore() {
    const css = this.origin;
    this.element.style.cssText = css;
    return css;
  }
}
