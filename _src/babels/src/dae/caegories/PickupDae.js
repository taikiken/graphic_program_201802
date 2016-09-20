/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/13 - 18:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Safety } from '../../data/Safety';

import { RelatedDae } from '../RelatedDae';

/**
 * 「記事カテゴリー情報」 response.pickup[.articles] を管理します
 * @since 2016-09-13
 */
export class PickupDae {
  /**
   * response.pickup, response.pickup.articles を管理します
   * @param {Object|undefined} pickup response.pickup, 存在しないことがあるので注意
   */
  constructor(pickup) {
    // response.pickup
    const pickupObject = Safety.object(pickup);
    // response.pickup.articles
    const articlesArray = Safety.array(pickupObject.articles);
    const articles = articlesArray.map((article) => new RelatedDae(article));
    /**
     * response.pickup
     * @type {Object}
     * @private
     */
    this._pickup = pickupObject;
    /**
     * response.pickup.articles
     * <pre>
     * - 最大5件
     * pickup.articles が存在しない場合は、ピックアップエリアを表示しない
     * </pre>
     * @type {Array}
     * @private
     */
    this._articles = articles;
  }
  /**
   * response.pickup
   * @return {Object} response.pickup JSON 生データを返します
   */
  get pickup():Object {
    return this._pickup;
  }
  /**
   * response.pickup.articles
   * @return {Array<RelatedDae>} response.pickup.articles 配列を返します
   */
  get articles():Array<RelatedDae> {
    return this._articles;
  }
  /**
   * pickup.article がデータを持っているかを取得します
   * @return {boolean} pickup.article が存在するときは true を返します
   */
  has():boolean {
    return this.articles.length > 0;
  }
}

