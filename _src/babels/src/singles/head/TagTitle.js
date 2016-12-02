/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/27 - 16:28
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Temporary } from './Temporary';

/**
 * title tag(head > title) 書換えを行います
 * @since 2016-10-27
 */
export class TagTitle {
  /**
   * title tag(head > title)
   * @param {Element} head head tag
   */
  constructor(head) {
    // -------------------------------
    // initialize
    // head > title 情報を取得します
    const tag = head.getElementsByTagName('title')[0] || {};
    /**
     * title tag を取得します
     * @return {Element} head > title
     */
    this.tag = () => tag;
    // title 区切り文字
    let divider = ' | ';
    // /**
    //  * title 区切り文字を取得します
    //  * @returns {string} title 区切り文字
    //  * @default ' | '
    //  */
    // this.divider = () => divider;
    // /**
    //  * title 区切り文字を設定します
    //  * @param {string} dividerText title 区切り文字
    //  */
    // this.setDivider = (dividerText) => {
    //   divider = dividerText;
    // };
    // 現在の title 内文字
    const value = tag.innerHTML;
    /**
     * default title text（ページタイトル | サイトタイトル）
     * @return {string} デフォルトのタイトルを返します
     */
    this.title = () => value;
    // 区切り文字前の page title
    const titles = value.split(divider);
    const length = titles.length;
    const page = titles.shift();
    const site = titles.pop();
    let label = '';
    if (length === 3) {
      label = titles.shift();
    }
    /**
     * デフォルトの「ページタイトル」を取得します
     * @return {string} デフォルトの「ページタイトル」を返します
     */
    this.page = () => page;
    /**
     * デフォルトの「サイトタイトル」を取得します
     * @return {string} デフォルトの「サイトタイトル」を返します
     */
    this.site = () => site;
    /**
     * 真ん中のカテゴリラベル
     * @return {string} デフォルトの「サイトタイトルのカテゴリ」を返します
     */
    this.label = () => label;

    // temporary
    const temporary = new Temporary(page);
    /**
     * 一時情報保管庫
     * @return {Temporary} 一時情報保管庫 Temporary instance
     */
    this.temporary = () => temporary;
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * 英語表記サイトタイトル
   * @returns {string} SPORTS BULL
   */
  static get EN() {
    return 'SPORTS BULL';
  }
  /**
   * 日本語表記タイトル
   * @returns {string} スポーツブル
   */
  static get JP() {
    return 'スポーツブル';
  }
  /**
   * 英語表記・日本語表記の区切り文字
   * @returns {string} ' / ' を返します
   */
  static get SLASH() {
    return ' / ';
  }
  /**
   * title 区切り文字を取得します
   * @returns {string} title 区切り文字
   */
  static get DIVIDER() {
    return ' | ';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * タイトル文字を書換えます
   * @param {string} pageTitle ページタイトル
   * @param {string} [label=this.label()] ページタイトル
   * @return {string} 書換え後のタイトルテキスト
   */
  set(pageTitle, label = this.label()) {
    let title = `${pageTitle}`;
    if (label) {
      // title += `${this.divider()}${label}`;
      title += `${TagTitle.DIVIDER}${label}`;
    }
    // title += `${this.divider()}${this.site()}`;
    title += `${TagTitle.DIVIDER}${this.site()}`;
    this.tag().innerHTML = title;
    return title;
  }
  /**
   * 現在のタイトル文字を取得します
   * @return {string} 現在のタイトル文字
   */
  get() {
    return this.tag().innerHTML;
  }
  /**
   * default 状態に戻します
   */
  restore() {
    this.set(this.page());
  }
}
