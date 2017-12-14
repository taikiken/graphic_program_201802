/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 20:53
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
import {NoticeArticleDae} from './NoticeArticleDae';

/**
 * アクティビティ一覧配列 1 data
 */
export class ActivityDae {
  /**
   * アクティビティ一覧 配列 1 data
   * @param {Object} activity アクティビティ一覧
   */
  constructor(activity) {
    activity = Safety.object(activity);
    // // date check
    // if (Safety.check(activity, 'date')) {
    //   /**
    //    * activity.date
    //    * @deprecated instead use article.display_date
    //    * @type {string}
    //    * @protected
    //    */
    //   this._formatDate = Format.date( activity.date );
    // }
    /**
     * activity.date
     * @deprecated instead use article.display_date
     * @type {string}
     */
    this.formatDate = Safety.check(activity, 'date') ? Format.date(activity.date) : '';
    /**
     * アクティビティ一覧 配列 1 data
     * @type {Object}
     * @protected
     */
    this._activity = activity;
    /**
     * activity.user
     * @type {UserDae}
     * @protected
     */
    this._user = new UserDae(activity.user);
    // article
    /**
     * activity.article
     * @type {NoticeArticleDae}
     * @protected
     */
    this._article = new NoticeArticleDae(activity.article);
    /**
     * 添え字
     * @type {number}
     * @default 0
     * @since 2017-12-14
     */
    this.index = 0;
  }
  /**
   * response.notifications
   * @return {Object} JSON response.notifications 配列単独データ を返します
   */
  get activity() {
    return this._activity;
  }
  /**
   * activity.id
   * @return {number} activity id を返します
   */
  get id() {
    return this.activity.id;
  }
  /**
   * activity.date
   * @return {string} ISO8601 日付を返します
   */
  get date() {
    return this.activity.date;
  }
  // /**
  //  * <p>activity.date をフォーマット</p>
  //  * **使用しません** <br>
  //  * 代わりに displayDate使用
  //  * @deprecated instead use displayDate使用
  //  * @return {string} ISO8601 を日本語形式日付にし返します
  //  */
  // get formatDate() {
  //   return this._formatDate;
  // }
  /**
   * 表示日付
   * @return {string} 相対日付返します
   */
  get displayDate() {
    return this.activity.display_date;
  }
  /**
   * アクティビティの種類
   *
   * - reply : 返信された
   * - good : goodされた
   * - bad : badされた
   * - notice : ニュース的通知
   *
   * @return {string} アクティビティの種類を返します
   */
  get action() {
    return this.activity.action;
  }
  /**
   * activity.user
   * @return {UserDae} 誰からの通知かユーザー情報を返します
   */
  get user() {
    return this._user;
  }
  /**
   * activity.article
   * @return {NoticeArticleDae} 対象記事情報を返します
   */
  get article() {
    return this._article;
  }
}
