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
 */
export class PickupDae {
  constructor(pickup) {
    // response.pickup
    const pickupObject = Safety.object(pickup);
    /**
     * response.pickup
     * @type {Object}
     * @private
     */
    this._pickup = pickupObject;

    // response.pickup.articles
    const articlesArray = Safety.array(pickupObject.articles);
    const articles = [];
    articlesArray.forEach((article) => articles.push(new RelatedDae(article)));
    /**
     * response.pickup.articles
     * <pre>
     * - 最大5件
     * pickup.articles が存在しない場合は、ピックアップエリアを表示しない
     * </pre>
     * @type {Array}
     * @private
     */
    this._artickes = articles;
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
    return this._artickes;
  }
}

