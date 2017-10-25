/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/12 - 22:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 選手記事リンク - 正規化
 */
export class UrlDae {
  /**
   * 選手記事リンク
   * @param {string} url 選手記事リンク
   * @param {number} index リンク添え字
   * @param {string} id player.id
   */
  constructor(url, index, id) {
    /**
     * リンク添え字
     * @type {number}
     */
    this.index = index;
    /**
     * 選手記事リンク
     * @type {string}
     */
    this.url = url;
    /**
     * 選手記事リンク存在 flag
     * @type {boolean}
     */
    this.has = !!url;
    /**
     * player.id
     * @type {string}
     */
    this.id = id;
  }
}

/**
 * 2017 ドラフトから - BASEBALL GATE 選手記事リンク
 * ```
 * BGの選手紹介記事ページURL（複数の場合アリ）、ない場合は空配列
 * ```
 * @since 2017-10-13
 */
export default class UrlsDae {
  /**
   * BASEBALL GATE 選手記事リンク用データ
   * @param {Array.<string>} json JSON.[pitcher|catcher|...].urls
   * @param {string} id player.id
   * @param {string} name player.name
   */
  constructor(json, id, name) {
    const origin = Array.isArray(json) ? json : [];
    /**
     * JSON original
     * @type {Array.<string>}
     */
    this.origin = origin;
    const list = origin.map((url, index) => new UrlDae(url, index, id));
    /**
     * 正規化済み - BASEBALL GATE 選手記事リンク
     * @type {Array.<UrlDae>}
     */
    this.list = list;
    /**
     * player.id
     * @type {string}
     */
    this.id = id;
    /**
     * player.name
     * @type {string}
     */
    this.name = name;
    /**
     * urls length - リンク数
     */
    this.length = list.length;
  }
}
