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


import {Safety} from '../../data/Safety';
import {Format} from '../../util/Format';
import {UserDae} from '../UserDae';

/**
 * article.comments_popular 配列内 1 data
 */
export class PopularDae {
  /**
   * article.comments_popular:[]
   * @param {Object} [comment={}] response.comment Object
   */
  constructor( comment:Object = {} ) {

    comment = Safety.object( comment );

    if ( Safety.check( comment, 'date' ) ) {

      this._formatDate = Format.date( comment.date );

    }
    /**
     * comments_popular.user
     * @type {UserDae}
     * @protected
     */
    this._user = new UserDae( comment.user );
    /**
     * response.comment
     * @type {Object}
     * @protected
     */
    this._comment = comment;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * response.comment
   * @return {Object|*} comment Object を返します
   */
  get comment():Object {
    return this._comment;
  }
  /**
   * @return {Number} comment.id を返します
   */
  get id():Number {
    return this.comment.id;
  }
  /**
   * comment.date
   * @return {string} ISO8601 日付を返します
   */
  get date():string {
    return this.comment.date;
  }
  /**
   * comment.date をフォーマット **使用しない**
   * displayDate を使用します
   * @return {string} ISO8601 を日本語形式日付にし返します
   */
  get formatDate():string {
    return this._formatDate;
  }
  /**
   * 表示日付
   * @return {string} 相対日付返します
   */
  get displayDate():string {
    return this.comment.display_date;
  }
  /**
   * comment.body
   * @return {string} コメント本文を返します
   */
  get body():string {
    return this.comment.body;
  }
  /**
   * comment.body_escape
   * なんか増えてた...
   * タグがない様子
   * @return {string} エスケープされたコメント本文を返します
   */
  get bodyEscape():string {
    return this.comment.body_escape;
  }
  /**
   * alias isLike
   * @return {Boolean} 自分がGood済みかどうか を返します
   */
  get isGood():Boolean {
    return this.isLike;
  }
  /**
   * comment.is_like
   * @return {Boolean} 自分がGood済みかどうか を返します
   */
  get isLike():Boolean {
    return this.comment.is_like;
  }
  /**
   * comment.is_bad
   * @return {Boolean} 自分がBad済みかどうか を返します
   */
  get isBad():Boolean {
    return this.comment.is_bad;
  }
  /**
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
   * comment.bad
   * @return {Number|Number} Bad数 を返します
   */
  get bad():Number {
    return this.comment.bad;
  }
  /**
   * comment.url
   * @return {string} コメント詳細のURLを返します
   */
  get url():string {
    return this.comment.url;
  }
  /**
   * comment.user
   * @return {UserDae|*} comment した user 情報を返します
   */
  get user():UserDae {
    return this._user;
  }
}// class
