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

/**
 * 記事詳細・次の記事一覧データを保存します
 * @since 2016-10-27
 */
export class NextPages {
  /**
   * singleton
   * @param {Symbol} target single ton を保証するためのインナーシンボル
   * @return {?NextPages} NextPages instance
   */
  constructor(target) {
    if (_symbol !== target) {
      throw new Error( 'NextPages is static Class. not use new NextPages().' );
    }
    if (_instance !== null) {
      return _instance;
    }
    const pages = {};
    /**
     * ページ情報を保持します
     *
     * - url を key に Page データをセットします
     * @return {Object} Page instance がセットされた配列を返します
     */
    this.pages = () => pages;

    _instance = this;
    return _instance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * page 追加
   * @param {Page} page 追加する Page instance
   */
  add(page) {
    // @type {Object}
    const pages = this.pages();
    pages[page.url()] = page;
  }
  /**
   * Page を最後から取り出します
   * @param {string} url キーになる url
   * @return {Page} 取り出した Page 情報
   */
  get(url) {
    return this.pages()[url];
  }
  // shift() {
  //   return this.pages().shift();
  // }
  /**
   * クローンを作成します
   * @return {Object} クローンを返します
   */
  clone() {
    return Object.create(this.pages());
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {NextPages} SinglesHistory instance を返します
   */
  static factory():NextPages {
    if (_instance === null) {
      _instance = new NextPages(_symbol);
    }
    return _instance;
  }
}
