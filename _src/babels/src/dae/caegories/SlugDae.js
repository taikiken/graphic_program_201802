/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 14:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../../data/Safety';

/**
 * カテゴリー一覧, カテゴリー毎のデータ
 */
export class SlugDae {
  /**
   * カテゴリー一覧, カテゴリー毎のデータ
   * @param {Object} [category={}] カテゴリー一覧, 1 カテゴリーdata
   */
  constructor( category:Object = {} ) {

    category = Safety.object( category );
    this._category = category;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} 1 カテゴリーdata
   */
  get category():Object {
    return this._category;
  }
  /**
   * @return {Number} category Id を返します
   */
  get id():Number {
    return this.category.id;
  }
  /**
   * @return {string} category label を返します
   */
  get label():string {
    return this.category.label;
  }
  /**
   * @return {string} category slug を返します
   */
  get slug():string {
    return this.category.slug;
  }
  /**
   * @return {string} category url を返します
   */
  get url():string {
    return this.category.url;
  }
}
