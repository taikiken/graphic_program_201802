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

// data
import {Safety} from '../../data/Safety';
// util
import {Format} from '../../util/Format';
// dae
import {UserDae} from '../UserDae';

/**
 * article.comments_popular 配列内 1 data
 */
export class PopularDae {
  /**
   * article.comments_popular:[]
   * @param {Object} [comment={}] response.comment Object
   */
  constructor(comment = {}) {
    const altComment = Safety.object( comment );
    // if (Safety.check(altComment, 'date')) {
    //   /**
    //    * comment.date
    //    * @deprecated instead use article.display_date
    //    * @type {string}
    //    * @protected
    //    */
    //   this._formatDate = Format.date(altComment.date);
    //
    // }
    /**
     * comment.date
     * @deprecated instead use article.display_date
     * @type {string}
     */
    this.formatDate = Safety.check(altComment, 'date') ? Format.date(altComment.date) : '';
    /**
     * comments_popular.user
     * @type {UserDae}
     * @protected
     */
    this._user = new UserDae(altComment.user);
    /**
     * response.comment
     * @type {Object}
     * @protected
     */
    this._comment = altComment;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * response.comment
   * @return {Object} comment Object を返します
   */
  get comment() {
    return this._comment;
  }
  /**
   * @return {number} comment.id を返します
   */
  get id() {
    return this.comment.id;
  }
  /**
   * comment.date
   * @return {string} ISO8601 日付を返します
   */
  get date() {
    return this.comment.date;
  }
  // /**
  //  * comment.date をフォーマット **使用しない** <br>
  //  * displayDate を使用します
  //  * @deprecated instead use displayDate
  //  * @return {string} ISO8601 を日本語形式日付にし返します
  //  */
  // get formatDate():string {
  //   return this._formatDate;
  // }
  /**
   * 表示日付
   * @return {string} 相対日付返します
   */
  get displayDate() {
    return this.comment.display_date;
  }
  /**
   * comment.body
   * @return {string} コメント本文を返します
   */
  get body() {
    return this.comment.body;
  }
  /**
   * comment.body_escape
   * なんか増えてた...
   * タグがない様子
   * @return {string} エスケープされたコメント本文を返します
   */
  get bodyEscape() {
    return this.comment.body_escape;
  }
  /**
   * alias isLike
   * @return {boolean} 自分がGood済みかどうか を返します
   */
  get isGood() {
    return this.isLike;
  }
  /**
   * comment.is_like
   * @return {boolean} 自分がGood済みかどうか を返します
   */
  get isLike() {
    return this.comment.is_like;
  }
  /**
   * comment.is_bad
   * @return {boolean} 自分がBad済みかどうか を返します
   */
  get isBad() {
    return this.comment.is_bad;
  }
  /**
   * @return {number} Good数 を返します
   */
  get good() {
    return this.comment.like;
  }
  /**
   * this.good alias
   * @return {number} Good数 を返します
   */
  get like() {
    return this.good;
  }
  /**
   * comment.bad
   * @return {number|number} Bad数 を返します
   */
  get bad() {
    return this.comment.bad;
  }
  /**
   * comment.url
   * @return {string} コメント詳細のURLを返します
   */
  get url() {
    return this.comment.url;
  }
  /**
   * comment.user
   * @return {UserDae} comment した user 情報を返します
   */
  get user() {
    return this._user;
  }
}// class
