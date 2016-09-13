/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/13 - 20:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { Safety } from '../../data/Safety';

// dae
import { RelatedDae } from '../RelatedDae';
import { HeadlineAdDae } from './HeadlineAdDae';

/**
 * カテゴリー一覧のヘッドライン<br>
 * - 表示レイアウト・内容は一面のヘッドラインと同じ
 */
export class HeadlineDae {
  /**
   * response.headline
   * @param {Object} headline response.headline
   */
  constructor(headline) {
    // response.pickup
    const headlineObject = Safety.object(headline);
    // response.pickup.articles
    const articlesArray = Safety.array(headlineObject.articles);
    const articles = [];
    articlesArray.forEach((article) => articles.push(new RelatedDae(article)));
    /**
     * response.headline
     * @type {Object}
     * @private
     */
    this._headline = headlineObject;
    /**
     * response.headline.articles
     * <pre>
     * - 最大5件
     * pickup.articles が存在しない場合は、ピックアップエリアを表示しない
     * </pre>
     * @type {Array}
     * @private
     */
    this._articles = articles;
    /**
     * response.headline.ad
     * @type {HeadlineAdDae}
     * @private
     */
    this._ad = new HeadlineAdDae(headlineObject.ad);
  }
  /**
   * response.headline
   * @return {Object} response.headline JSON 生データを返します
   */
  get headline():Object {
    return this._headline;
  }
  /**
   * response.pickup.articles
   * @return {Array<RelatedDae>} response.pickup.articles 配列を返します
   */
  get articles():Array<RelatedDae> {
    return this._articles;
  }
  /**
   * response.pickup.articles
   * @return {Array<RelatedDae>} response.pickup.articles 配列を返します
   */
  get ad():Object {
    return this._ad;
  }
}
