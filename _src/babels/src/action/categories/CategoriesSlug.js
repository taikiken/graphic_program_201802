/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 15:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Categories from './Categories';
// import {Safety} from '../../data/Safety';

/**
 * 引数 slug のカテゴリ情報を取得します
 *
 * `/api/v1/category/[:category_slug]`
 *
 * @since 2016-05-28
 */
export default class CategoriesSlug extends Categories {
  /**
   * 引数 slug のカテゴリ情報を取得し<br>
   * カテゴリ特有のデザイン、レイアウトへ対応します
   *
   * @param {string} [slug=all] category slug
   * @param {?function} [resolve=null] Ajax 成功時の callback
   * @param {?function} [reject=null] Ajax 失敗時の callback
   */
  constructor(slug = 'all', resolve = null, reject = null) {
    super(resolve, reject);
    /**
     * category slug
     * @type {string}
     */
    this.slug = slug;
    // override url property
    // /api/v1/category/[:category_slug]
    /**
     * API path
     * @type {string}
     */
    this.url = `${this.types.url}/${slug}`;
  }
  // /**
  //  * category slug を取得します
  //  * @return {string|*} category slug を返します
  //  */
  // get slug():string {
  //   return this._slug;
  // }
  /**
   * slug を変更し `path` 更新します
   * @param {string} slug category slug
   */
  updatePath(slug) {
    this.url = `${this.types.url}/${slug}`;
  }
}
