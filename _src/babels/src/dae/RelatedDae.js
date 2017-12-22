/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// 記事詳細 関連記事結果

import {Safety} from '../data/Safety';
// import {Format} from '../util/Format';

// dae
// import {CategoryDae} from './CategoryDae';
import MediaDae from './MediaDae';
import {UserDae} from './UserDae';
import {CategoriesDae} from './categories/CategoriesDae';
import {ThemeDae} from './theme/ThemeDae';
import {AdDae} from './theme/AdDae';
import {BannersDae} from './banner/BannersDae';
import AnotherCategoriesDae from './another-categories/AnotherCategoriesDae';

/**
 * 記事詳細 関連記事 JSON
 */
export class RelatedDae {
  /**
   * 記事詳細 関連記事結果 JSON をセットアップします
   * @param {Object} [response={}] JSON.response
   */
  constructor(response = {}) {
    const altResponse = Safety.object(response);
    /**
     * JSON.response
     * @type {Object}
     */
    this.response = altResponse;
    // /**
    //  * response.category
    //  * @deprecated instead use categories
    //  * @type {CategoryDae}
    //  * @protected
    //  */
    // this._category = new CategoryDae( response.category );
    // // docs には書いてないけど category2 も増やす, 2016-03-13
    // /**
    //  * response.category2
    //  * @deprecated instead use categories
    //  * @since 2016-03-13
    //  * @type {CategoryDae}
    //  * @protected
    //  */
    // this._category2 = new CategoryDae( response.category2 );
    // // docs には書いてないけど配列も増やしとく, 2016-03-13
    /**
     * response.categories
     * - カテゴリー配列
     * @since 2016-03-13
     * @type {CategoriesDae}
     */
    this.categories = new CategoriesDae(altResponse);
    /**
     * response.media
     * @type {MediaDae}
     */
    this.media = new MediaDae(altResponse.media);
    /**
     * response.user
     * @type {UserDae}
     */
    this.user = new UserDae(altResponse.user);
    
    // let formatDate;
    //
    // // date check
    // if (Safety.check(altResponse, 'date')) {
    //   formatDate = Format.date(altResponse.date);
    // }
    // /**
    //  * response.date
    //  * @type {string|undefined}
    //  * @protected
    //  */
    // this._formatDate = formatDate;

    // 以下仕様追加 from 2016-05-31
    /**
     * response.theme
     * @since 2016-05-31
     * @type {ThemeDae}
     */
    this.theme = new ThemeDae(altResponse.theme);
    /**
     * response.banner
     * @since 2016-05-31
     * @type {BannersDae}
     */
    this.banner = new BannersDae(altResponse.banner);
    /**
     * response.ad
     * @since 2016-05-31
     * @type {AdDae}
     */
    this.ad = new AdDae(altResponse.ad);
    /**
     * `another_categories` value - 地域の詳細
     * @type {AnotherCategoriesDae}
     * @since 2017-09-14
     */
    this.anotherCategories = new AnotherCategoriesDae(altResponse.another_categories);
    /**
     * response.id
     * - 記事 ID
     * @type {number}
     */
    this.id = altResponse.id;
    /**
     * response.date
     * - ISO8601 日付
     * @type {string}
     */
    this.date = altResponse.date;
    /**
     * response.display_date
     * - 表示日付
     * @type {string}
     */
    this.displayDate = altResponse.display_date;
    /**
     * response.title
     * - 記事タイトル
     * @type {string}
     */
    this.title = altResponse.title;
    /**
     * response.description
     * - 記事概要
     * @type {string}
     */
    this.description = altResponse.description;
    /**
     * response.url
     * - 記事URL
     * @type {string}
     */
    this.url = altResponse.url;
    /**
     * response.is_bookmarked
     * @type {boolean}
     */
    this.isBookmarked = altResponse.isBookmarked;
    /**
     * response.media_type
     * @type {string}
     */
    this.mediaType = altResponse.media_type;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * JSON.response
  //  * @return {Object|*} JSON.response を返します
  //  */
  // get response():Object {
  //   return this._response;
  // }
  // /**
  //  * response.id
  //  * @return {Number} 記事 ID を返します
  //  */
  // get id():Number {
  //   return this.response.id;
  // }
  // /**
  //  * response.date
  //  * @return {string} ISO8601 日付を返します
  //  */
  // get date():string {
  //   return this.response.date;
  // }
  // /**
  //  * response.date をフォーマットした
  //  * 使わない, displayDateを使用する
  //  * @return {string} response.date を日本語日付に変換し返します
  //  */
  // get formatDate():string {
  //   return this._formatDate;
  // }
  // /**
  //  * 表示日付
  //  * @return {string} article.display_date を返します
  //  */
  // get displayDate():string {
  //   return this.response.display_date;
  // }
  // /**
  //  * response.title
  //  * @return {string} 記事タイトル response.description を返します
  //  */
  // get title():string {
  //   return this.response.title;
  // }
  // /**
  //  * response.description
  //  * @return {string} 記事概要 response.description を
  //  */
  // get description():string {
  //   return this.response.description;
  // }
  // /**
  //  * response.category
  //  * @deprecated instead use categories
  //  * @return {CategoryDae|*} カテゴリー response.category CategoryDae として返します
  //  */
  // get category():CategoryDae {
  //   return this._category;
  // }
  // /**
  //  * response.category2
  //  * @deprecated instead use categories
  //  * @return {CategoryDae} カテゴリー2 response.category2 CategoryDae として返します
  //  */
  // get category2():CategoryDae {
  //   return this._category2;
  // }
  // /**
  //  * response.categories
  //  * @return {CategoriesDae} カテゴリー配列 response.categories を CategoriesDae として返します
  //  */
  // get categories():CategoriesDae {
  //   return this._categories;
  // }
  // /**
  //  * response.url
  //  * @return {string} 記事URL response.url を返します
  //  */
  // get url():string {
  //   return this.response.url;
  // }
  // /**
  //  * response.is_bookmarked
  //  * @return {Boolean} response.is_bookmarked を返します
  //  */
  // get isBookmarked():Boolean {
  //   return this.response.is_bookmarked;
  // }
  // /**
  //  * response.media_type
  //  * @return {string} response.media_type を返します
  //  */
  // get mediaType():string {
  //   return this.response.media_type;
  // }
  // /**
  //  * response.media
  //  * @return {MediaDae} response.media を MediaDae として返します
  //  */
  // get media():MediaDae {
  //   return this._media;
  // }
  // /**
  //  * response.user
  //  * @return {UserDae} response.user を UserDae として返します
  //  */
  // get user():UserDae {
  //   return this._user;
  // }
  // ----------------------------------------------
  // /**
  //  * response.theme
  //  * @return {ThemeDae} response.theme を ThemeDae として返します
  //  */
  // get theme():ThemeDae {
  //   return this._theme;
  // }
  // /**
  //  * response.banner
  //  * @return {BannersDae} response.banner を BannersDae として返します
  //  */
  // get banner():BannersDae {
  //   return this._banner;
  // }
  // /**
  //  * response.ad
  //  * @return {AdDae} response.ad を ThemeDae として返します
  //  */
  // get ad():AdDae {
  //   return this._ad;
  // }
}
