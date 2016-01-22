/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * article.category を管理します
 */
export class CategoryDae {
  /**
   * article.category を管理します
   * @param {Object} [category={}]
   */
  constructor( category:Object = {} ) {
    this._category = category;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} article.category を返します
   */
  get category():Object {
    return this._category;
  }
  /**
   *
   * @return {string|undefined} article.category.label を返します
   */
  get label():string {
    return this.category.label;
  }
  /**
   *
   * @return {string|undefined} article.category.slug を返します
   */
  get slug():string {
    return this.category.slug;
  }
}
