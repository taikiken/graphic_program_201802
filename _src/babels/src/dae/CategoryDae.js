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


import {Safety} from '../data/Safety';

/**
 * article.category を管理します
 */
export class CategoryDae {
  /**
   * article.category を管理します
   * @param {Object} [category={}] article.category
   */
  constructor( category:Object = {} ) {
    category = Safety.object( category );
    this._category = category;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * article.category
   * @return {Object|*} article.category を返します
   */
  get category():Object {
    return this._category;
  }
  /**
   * article.category.label
   * @return {string|undefined} article.category.label を返します
   */
  get label():string {
    return Safety.string( this.category.label, '' );
  }
  /**
   * article.category.slug
   * @return {string|undefined} article.category.slug を返します
   */
  get slug():string {
    return Safety.string( this.category.slug, '' );
  }
}
