/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/12 - 15:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/util
import Type from '../../../moku/util/Type';


/**
 * 関連記事・カテゴリ 1カテゴリデータ
 */
export default class Category {
  /**
   * 関連記事・カテゴリ
   * @param {Object} categoryData 関連記事・カテゴリ
   */
  constructor(categoryData) {
    let category = categoryData;
    if (Type.nil(category) || !Type.exist(category)) {
      category = {};
    }
    /**
     * 関連記事・カテゴリ
     * @type {Object}
     */
    this.category = category;
  }
  /**
   * term_id
   * @return {number} term_id を返します
   */
  get termId() {
    return this.category.term_id;
  }
  /**
   * name
   * @return {string} name を返します
   */
  get name() {
    return this.category.name;
  }
  /**
   * slug
   * @return {string} slug を返します
   */
  get slug() {
    return this.category.slug;
  }
  /**
   * term_group
   * @return {string} term_group を返します
   */
  get termGroup() {
    return this.category.term_group;
  }
  /**
   * term_taxonomy_id
   * @return {string} term_taxonomy_id を返します
   */
  get termTaxonomyId() {
    return this.category.term_taxonomy_id;
  }
  /**
   * taxonomy
   * @return {string} taxonomy を返します
   */
  get taxonomy() {
    return this.category.taxonomy;
  }
  /**
   * description
   * @return {string} description を返します
   */
  get description() {
    return this.category.description;
  }
  /**
   * parent
   * @return {string} parent を返します
   */
  get parent() {
    return this.category.parent;
  }
  /**
   * count
   * @return {string} count を返します
   */
  get count() {
    return this.category.count;
  }
  /**
   * filter
   * @return {string} filter を返します
   */
  get filter() {
    return this.category.filter;
  }
  /**
   * term_order
   * @return {string} term_order を返します
   */
  get termOrder() {
    return this.category.term_order;
  }
}
