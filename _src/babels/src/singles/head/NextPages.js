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
 * {@link NextPages} singleton instance のためのチェック用 Symbol
 * @type {Symbol}
 * @private
 */
const nextPagesSymbol = Symbol('NextPages singleton instance');
/**
 * {@link NextPages} instance
 * @type {?NextPages}
 * @private
 * @static
 */
let singletonInstance = null;

/**
 * 記事詳細・次の記事一覧データを保存します
 * @since 2016-10-27
 */
export class NextPages {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {NextPages} SinglesHistory instance を返します
   */
  static factory():NextPages {
    if (singletonInstance === null) {
      singletonInstance = new NextPages(nextPagesSymbol);
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * singleton
   * @param {Symbol} target single ton を保証するためのインナーシンボル
   * @return {?NextPages} NextPages instance
   */
  constructor(target) {
    if (nextPagesSymbol !== target) {
      throw new Error( 'NextPages is static Class. not use new NextPages().' );
    }
    if (singletonInstance !== null) {
      return singletonInstance;
    }
    const pages = {};
    /**
     * ページ情報を保持します
     *
     * - url を key に Page データをセットします
     * @return {Object} Page instance がセットされた配列を返します
     */
    this.pages = () => pages;

    const list = [];
    /**
     * ページ情報をストックします
     * @returns {Array<string>} ページ情報(URL)リストを返します
     */
    this.list = () => list;

    singletonInstance = this;
    return singletonInstance;
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
    const url = page.url();
    pages[url] = page;
    // @since 2017-01-13
    // array に追加する
    const list = this.list();
    if (list.indexOf(url) === -1) {
      list.push(url);
    }
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
  /**
   * 一つ前の URL を取得する
   * @param {Page} page 対象の Page instance
   * @returns {string} URL を返します、見つからない時は空のURLを返します
   */
  before(page) {
    const url = page.url();
    const list = this.list();
    const index = list.indexOf(url);
    if (index === -1) {
      return '';
    }
    const beforeIndex = index - 1;
    if (beforeIndex < 0) {
      return '';
    }
    return list[beforeIndex];
  }
  /**
   * 最初のURLを返します
   * @returns {string|undefined} 最初のURLを返します
   */
  top() {
    return this.list[0];
  }
}
