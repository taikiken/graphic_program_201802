/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from '../../data/Safety';

/**
 * article.media.images
 */
export default class ImagesDae {
  /**
   * article.media.images 画像情報を保存します
   * @param {Object} [images={}] article.media.images
   */
  constructor(images = {}) {
    const altImages = Safety.object(images);
    /**
     * article.media.images - original
     * @type {Object}
     */
    this.images = altImages;
    /**
     * キャプション - `media.images.caption`
     * @type {string}
     */
    this.caption = altImages.caption;
    /**
     * スライド用 - `media.images.large` - old type
     * @type {string}
     */
    this.large = altImages.large;
    /**
     * 画像 : 記事一覧用 - 横長 - 16:9 - `media.images.medium`
     * @type {string}
     */
    this.medium = altImages.medium;
    /**
     * 画像 : 正方形 - `media.images.thumbnail`
     * @type {string}
     */
    this.thumbnail = altImages.thumbnail;
    /**
     * 画像 : 詳細用元比率画像 - `media.images.original`
     * @type {string}
     */
    this.original = altImages.original;
    /**
     * 表示画像は 対象レスポンス ( 750 x 320 )  - `media.images.carousel`
     * - ref. UNDO_SPBL-281 【Web】一面のリニューアル / Web - Desktop対応
     * @type {string}
     * @since 2017-12-18
     * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-281
     */
    this.carousel = altImages.carousel;
  }
  // /**
  //  * article.media.images
  //  * @return {Object|*} article.media.images
  //  */
  // get images():Object {
  //   return this._images;
  // }
  // /**
  //  * キャプション
  //  * @return {string} article.media.images.caption
  //  */
  // get caption():string {
  //   return this.images.caption;
  // }
  // /**
  //  * スライド用
  //  * @return {string} article.media.images.large
  //  */
  // get large():string {
  //   return this.images.large;
  // }
  // /**
  //  * 記事一覧用 - 横長 or 16:9
  //  * @return {string} article.media.images.medium
  //  */
  // get medium():string {
  //   return this.images.medium;
  // }
  // /**
  //  * 1 x 1 small
  //  * @return {string} article.media.images.thumbnail
  //  */
  // get thumbnail():string {
  //   return this.images.thumbnail;
  // }
  // /**
  //  * 詳細用元比率画像
  //  * @return {string} article.media.images.original
  //  */
  // get original():string {
  //   return this.images.original;
  // }
}
