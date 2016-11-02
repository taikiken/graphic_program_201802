/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/13 - 17:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 記事詳細, banner pc / sp 各データ
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=229180023
 *
 * 2016-10-02 使用先追加, category でも
 * 記事閲覧 / powered by エリアの追加（App, Web-Mobile） #1211
 * @see https://github.com/undotsushin/undotsushin/issues/1211
 */
export class BannerDae {
  /**
   * 記事詳細, banner pc / sp
   * @param {string} text 画像のALT
   * @param {string} image バナーのURL
   * @param {string} link リンク先
   */
  constructor( text:string, image:string, link:string ) {
    /**
     * 画像のALT
     * @type {string}
     */
    this.text = text;
    /**
     * バナーのURL
     * @type {string}
     */
    this.image = image;
    /**
     * リンク先
     * @type {string}
     */
    this.link = link;
  }
}
