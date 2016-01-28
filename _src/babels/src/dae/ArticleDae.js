/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../data/Safety';
import {Format} from '../util/Format';
import {CategoryDae} from './CategoryDae';
import {MediaDae} from './MediaDae';
import {UserDae} from './UserDae';
import {CommentsPopularDae} from './CommentsPopularDae';

/**
 * articles 記事単1データを管理します
 */
export class ArticleDae {
  /**
   * articles データを管理
   * @param {Object} [article={}] articles配列にセットされている article 記事1件データ
   */
  constructor( article:Object = {} ) {

    this._article = article;
    // article.category
    this._category = new CategoryDae( article.category );
    // article.media
    this._media = new MediaDae( article.media );
    // article.user
    this._user = new UserDae( article.user );
    // article.comments_popular
    this._popular = new CommentsPopularDae( article.comments_popular );

    // Safety.check, object に key が存在しタイプがあっているかを調べます
    // comments_count check
    if ( !Safety.check( article, 'comments_count', 'number' ) ) {

      article.comments_count = 0;

    }
    // date check
    if ( Safety.check( article, 'date' ) ) {

      article.formatDate = Format.date( article.date );

    }

    this._index = -1;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {number|*|Number} index number を返します, default -1, -1 の時は未設定なので使用してはいけない
   */
  get index():Number {
    return this._index;
  }

  /**
   * index number を設定します
   * @param {Number} index index number
   */
  set index( index:Number ):void {
    this._index = index;
  }
  /**
   * @return {Object|*} article 記事単1データ
   */
  get article():Object {
    return this._article;
  }
  /**
   *
   * @return {CategoryDae|*} article.category
   */
  get category():CategoryDae {
    return this._category;
  }
  /**
   *
   * @return {Number} article.comments_count
   */
  get commentsCount():Number {
    return parseInt( this.article.comments_count, 10 );
  }
  /**
   * @return {CommentsPopularDae|*} article.comments_popular
   */
  get commentsPopular():CommentsPopularDae {
    return this._popular;
  }
  /**
   * @return {string} article.date
   */
  get date():string {
    return this.article.date;
  }
  /**
   * @return {string} article.date を日本語日付に変換し返します
   */
  get formatDate():string {
    return this.article.formatDate;
  }
  /**
   *
   * @return {string} article.display_date
   */
  get displayDate():string {
    return this.article.display_date;
  }
  /**
   *
   * @return {string} article.description
   */
  get description():string {
    return this.article.description;
  }
  /**
   *
   * @return {string} article.id
   */
  get id():string {
    return this.article.id;
  }
  /**
   *
   * @return {boolean} article.is_bookmarked
   */
  get isBookmarked():boolean {
    return this.article.is_bookmarked;
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
   * @return {string} article.media_type
   */
  get mediaType():string {
    return this.article.media_type;
  }
  /**
   *
   * @return {string} article.title
   */
  get title():string {
    return this.article.title;
  }
  /**
   *
   * @return {string} article.url
   */
  get url():string {
    return this.article.url;
  }
  /**
   *
   * @return {UserDae} article.user
   */
  get user():UserDae {
    return this._user;
  }
}