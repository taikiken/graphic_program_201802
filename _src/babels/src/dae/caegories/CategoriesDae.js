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

// data
import {Safety} from '../../data/Safety';

// dae/categories
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
      const slugDae = new SlugDae( category );
      // slug, label に null があるようなので null は skip する
      // @since 2016-09-20
      if (!!slugDae.slug && !!slugDae.label) {
        cats.push(slugDae);
        bank[slugDae.slug] = slugDae;
      }
    } );

    /**
     * JSON response
     * @type {Object}
     * @protected
     */
    this._response = response;
    /**
     * response.categories
     * @type {Array<SlugDae>}
     * @protected
     */
    this._categories = categories;
    /**
     * response.categories を 1件づつ SlugDae instance にし格納します
     * @type {Array<SlugDae>}
     * @protected
     */
    this._cats = cats;
    /**
     * category slug をキーに SlugDae instance を格納します
     * @type {Object}
     * @protected
     */
    this._bank = bank;

    // @since 2016-09-15
    const slugs = cats.map((slugDae) => slugDae.slug);
    // cats.forEach((slugDae) => {
    //   slugs.push(slugDae.slug);
    // });
    /**
     * category.slug を ', ' で連結した文字列
     * @type {string}
     * @protected
     */
    this._slugs = slugs.join(', ');
    /**
     * category.slug を '-' で連結した文字列
     * @type {string}
     * @protected
     */
    this._slugsClasses = slugs.join('-');

    this._slug = cats.length > 0 ? cats[0].slug : '';
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response
   * @return {Object|*} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  /**
   * response.categories
   * @return {Array|*} JSON response.categories を返します
   */
  get categories():Array {
    return this._categories;
  }
  /**
   * response.categories
   * @return {Array<SlugDae>} response.categories を SlugDae instance 配列にし返します
   */
  get all():Array<SlugDae> {
    return this._cats;
  }
  /**
   * slug をキーにした Object
   * @return {Object} slug をキーにした SlugDae instance 全て
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
   * response.count
   * @return {Number} JSON response.count を返します
   */
  get total():Number {
    return this.response.count;
  }
  /**
   * category.slug を ', ' で連結した文字列
   * @since 2016-09-15
   * @return {string} category.slug を ', ' で連結した文字列を返します
   */
  get slugs():string {
    return this._slugs;
  }
  /**
   * category.slug を '-' で連結した CSS class フレンドリーな文字列
   * @since 2016-09-16
   * @return {string} category.slug を '-' で連結した文字列を返します
   */
  get slugsClasses():string {
    return this._slugsClasses;
  }
  /**
   * category 配列の先頭 slug
   * @since 2016-09-16
   * @return {string} category 配列の先頭 slug を返します
   */
  get slug():string {
    return this._slug;
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
