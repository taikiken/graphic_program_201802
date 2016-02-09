/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 14:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../../data/Safety';
import {SlugDae} from './SlugDae';

/**
 * カテゴリー一覧 response を管理します
 */
export class CategoriesDae {
  /**
   * カテゴリー一覧 response を管理します
   * @param {Object} [response={}] JSON response
   */
  constructor( response:Object = {} ) {

    response = Safety.object( response );
    let categories = Safety.array( response.categories );

    let cats = [];
    let bank = {};

    // categories からデータを取り出し SlugDae instance を作成
    // cats: 配列にそのまま保持
    // bank: slug をキーにそ保持
    categories.forEach( function( category ) {

      let slugDae = new SlugDae( category );
      cats.push( slugDae );
      bank[ slugDae.slug ] = slugDae;

    } );

    this._response = response;
    this._categories = categories;
    this._cats = cats;
    this._bank = bank;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  /**
   * @return {Array|*} JSON response.categories を返します
   */
  get categories():Array {
    return this._categories;
  }
  /**
   * @return {Array<SlugDae>|*} response.categories を SlugDae instance 配列にし返します
   */
  get all():Array<SlugDae> {
    return this._cats;
  }
  /**
   * @return {{}|*} slug をキーにした SlugDae instance 全て
   */
  get bank():Object {
    return this._bank;
  }
  /**
   * alias total
   * @return {Number} JSON response.count を返します
   */
  get count():Number {
    return this.total;
  }
  /**
   * @return {Number} JSON response.count を返します
   */
  get total():Number {
    return this.response.count;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * @param {string} slug 検索したい slug
   * @return {SlugDae} 該当 SlugDae を返します
   */
  bySlug( slug:string ):SlugDae {
    return this._bank[ slug ];
  }
}
