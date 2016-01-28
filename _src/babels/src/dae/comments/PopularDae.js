/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/25 - 22:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../../data/Safety';
import {Format} from '../../util/Format';
import {UserDae} from '../UserDae';

/**
 * article.comments_popular 配列内 1 data
 */
export class PopularDae {
  /**
   * article.comments_popular:[]
   * @param {Object} [comment={}]
   */
  constructor( comment:Object = {} ) {

    if ( !Safety.check( comment, 'date' ) ) {

      comment.formatDate = Format.date( comment.date );

    }

    // comments_popular.user
    this._user = new UserDae( comment.user );
    // property
    this._comment = comment;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} comment Object を返します
   */
  get comment():Object {
    return this._comment;
  }
  /**
   *
   * @return {Number} comment.id を返します
   */
  get id():Number {
    return this.comment.id;
  }
  /**
   *
   * @return {string} ISO8601 日付を返します
   */
  get date():string {
    return this.comment.date;
  }
  /**
   *
   * @return {string} ISO8601 を日本語形式日付にし返します
   */
  get formatDate():string {
    return this.comment.formatDate;
  }
  /**
   *
   * @return {string} 相対日付返します
   */
  get displayDate():string {
    return this.comment.display_date;
  }
  /**
   *
   * @return {string} コメント本文を返します
   */
  get body():string {
    return this.comment.body;
  }
  /**
   *
   * @return {boolean} 自分がGood済みかどうか を返します
   */
  get isLike():boolean {
    return this.comment.is_like;
  }
  /**
   *
   * @return {boolean} 自分がBad済みかどうか を返します
   */
  get isBad():boolean {
    return this.comment.is_bad;
  }
  /**
   *
   * @return {Number} Good数 を返します
   */
  get good():Number {
    return this.comment.like;
  }
  /**
   * this.good alias
   * @return {Number} Good数 を返します
   */
  get like():Number {
    return this.good;
  }
  /**
   *
   * @return {Number|number} Bad数 を返します
   */
  get bad():Number {
    return this.comment.bad;
  }
  /**
   *
   * @return {string} コメント詳細のURLを返します
   */
  get url():string {
    return this.comment.url;
  }
  /**
   *
   * @return {UserDae|*} comment した user 情報を返します
   */
  get user():UserDae {
    return this._user;
  }
}// class
