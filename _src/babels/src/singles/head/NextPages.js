/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 18:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


/**
 * singleton instance のためのチェック用 Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('NextPages singleton instance');
/**
 * NextPages instance
 * @type {?NextPages}
 * @private
 * @static
 */
let _instance = null;

export class NextPages {
  constructor(target) {
    if (_symbol !== target) {
      throw new Error( 'NextPages is static Class. not use new NextPages().' );
    }
    if (_instance !== null) {
      return _instance;
    }
    const pages = [];
    this.pages = () => pages;

    _instance = this;
    return _instance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  add(page) {
    // @type {Array}
    const pages = this.pages();
    pages.push(page);
    return pages.length - 1;
  }
  pop() {
    return this.pages().pop();
  }
  shift() {
    return this.pages().shift();
  }
  clone() {
    return this.pages().slice(0);
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {NextPages} SingleManager instance を返します
   */
  static factory():NextPages {
    if (_instance === null) {
      _instance = new NextPages(_symbol);
    }
    return _instance;
  }
}
