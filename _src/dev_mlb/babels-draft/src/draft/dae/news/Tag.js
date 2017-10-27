/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/12 - 16:07
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// util
// moku/util
// import Type from '../../../moku/util/Type';

// data/related
import Category from './Category';

/**
 * 間連ニュース 1記事
 */
export default class Tag {
  /**
   * 間連ニュース
   * @param {Object} json 1記事
   */
  constructor(json) {
    // let tag = tagData;
    // if (Type.nil(tag) || !Type.exist(tag)) {
    //   tag = {};
    // }
    // /**
    //  * 1記事 生データ
    //  * @type {Object}
    //  */
    // this.tag = tag;
    // let categories = tag.category;
    // if (!Type.array(categories)) {
    //   categories = [];
    // }
    const origin = json || {};
    /**
     * オリジナル JSON
     * @type {Object|{}}
     */
    this.origin = origin;
    const categories = Array.isArray(origin.category) ? origin.category : [];
    /**
     * category
     * @type {Array<Category>}
     */
    this.category = categories.map(category => new Category(category));
  }
  /**
   * id
   * @return {number} id を返します
   */
  get id() {
    return this.origin.id;
  }
  /**
   * post_title
   * @return {string} post_title を返します
   */
  get postTitle() {
    return this.origin.post_title;
  }
  /**
   * post_date
   * @return {string} post_date を返します
   */
  get postDate() {
    return this.origin.post_date;
  }
  /**
   * post_date_display
   * @return {string} post_date_display を返します
   */
  get postDateDisplay() {
    return this.origin.post_date_display;
  }
  /**
   * permalink
   * @return {string} permalink を返します
   */
  get permalink() {
    return this.origin.permalink;
  }
  /**
   * post_title
   * @return {string} article_type を返します
   */
  get articleType() {
    return this.origin.article_type;
  }
  /**
   * thumbnail
   * @return {string} thumbnail を返します
   */
  get thumbnail() {
    return this.origin.thumbnail;
  }
  /**
   * is_video
   * @return {boolean} is_video を返します
   */
  get isVideo() {
    return this.origin.is_video;
  }
}
