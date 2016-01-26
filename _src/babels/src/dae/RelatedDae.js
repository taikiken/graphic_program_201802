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
'use strict';

// 記事詳細 関連記事結果

import {Safety} from '../data/Safety';
import {Format} from '../util/Format';
import {CategoryDae} from './CategoryDae';
import {MediaDae} from './MediaDae';
import {UserDae} from './UserDae';

export class RelatedDae {
  constructor( response:Object = {} ) {

    this._response = response;
    // response.category
    this._category = new CategoryDae( response.category );
    // response.media
    this._media = new MediaDae( response.media );
    // response.user
    this._user = new UserDae( response.user );

    // date check
    if ( Safety.check( response, 'date' ) ) {

      response.formatDate = Format.date( response.date );

    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} JSON.response を返します
   */
  get response():Object {
    return this._response;
  }

  /**
   *
   * @return {Number} 記事 ID を返します
   */
  get id():Number {
    return this.response.id;
  }

  /**
   *
   * @return {string} ISO8601 日付
   */
  get date():string {
    return this.response.date;
  }
  /**
   * @return {string} response.date を日本語日付に変換し返します
   */
  get formatDate():string {
    return this.response.formatDate;
  }
  /**
   *
   * @return {string} article.display_date
   */
  get displayDate():string {
    return this.response.display_date;
  }

  /**
   *
   * @return {string} 記事タイトル
   */
  get title():string {
    return this.response.title;
  }

  /**
   *
   * @return {string} 記事概要
   */
  get description():string {
    return this.response.description;
  }

  /**
   *
   * @return {CategoryDae|*} カテゴリー
   */
  get category():CategoryDae {
    return this._category;
  }

  /**
   *
   * @return {string} 記事URL
   */
  get url():string {
    return this.response.url;
  }
  /**
   *
   * @return {boolean} response.is_bookmarked
   */
  get isBookmarked():boolean {
    return this.response.is_bookmarked;
  }
  /**
   *
   * @return {string} response.media_type
   */
  get mediaType():string {
    return this.response.media_type;
  }
  /**
   *
   * @return {MediaDae} article.media
   */
  get media():MediaDae {
    return this._media;
  }
  /**
   *
   * @return {UserDae} article.user
   */
  get user():UserDae {
    return this._user;
  }
}
