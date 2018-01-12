/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/15 - 16:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * ga 送信時に付与するタイトルを作成します
 *
 * @see https://github.com/undotsushin/undotsushin/issues/1334
 * @since 2016-11-15
 */
export class PageTitle {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   /**
   * タイトル区切り文字
   * @return {string} ' | ' を返します
   */
  static get DIVIDER() {
    return ' | ';
  }
  /**
   * サイトタイトル
   * @return {string} 'スポーツブル / SPORTS BULL'
   */
  static get SITE() {
    return 'スポーツブル / SPORTS BULL';
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 記事タイトル、記事カテゴリラベル
   * @param {string} title 記事タイトル
   * @param {string} [label=''] 記事カテゴリラベル(primary)
   */
  constructor(title, label = '') {
    /**
     * 記事タイトル
     * @type {string}
     */
    this.article = title;
    /**
     * 記事カテゴリラベル
     * @type {string}
     */
    this.label = label;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * ga 用送信タイトル（擬似ページタイトル）を取得します
   * ```
   * WBCの4番は中田か筒香か4戦連続で4番・中田とした小久保監督の狙いとは？ | 野球 | スポーツブル / SPORTS BULL
   * ```
   * @return {string} ga 用送信タイトル
   */
  title() {
    let title = `${this.article}`;
    const label = this.label;
    if (label) {
      title += `${PageTitle.DIVIDER}${label}`;
    }
    title += `${PageTitle.DIVIDER}${PageTitle.SITE}`;
    return title;
  }
}
