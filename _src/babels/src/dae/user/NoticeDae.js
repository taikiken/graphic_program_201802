/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 20:10
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
 * 通知単独データ
 */
export class NoticeDae {
  /**
   * 通知
   * @param {Object} [notice={}] JSON response.notifications 配列単独データ
   */
  constructor( notice:Object = {} ) {

    notice = Safety.object( notice );

    // date check
    if ( Safety.check( notice, 'date' ) ) {

      this._formatDate = Format.date( notice.date );

    }
    /**
     * response.notifications.notice.user
     * @type {Object}
     * @protected
     */
    this._notice = notice;
    /**
     * response.notifications.notice.user
     * @type {UserDae}
     * @protected
     */
    this._user = new UserDae( notice.user );
    /**
     * response.notifications.notice.article
     * @type {NoticeArticleDae}
     * @protected
     */
    this._article = new NoticeArticleDae( notice.article );

  }
  /**
   * response.notifications
   * @return {Object|*} JSON response.notifications 配列単独データ を返します
   */
  get notice():Object {
    return this._notice;
  }
  /**
   * notifications.id
   * @return {Number} notifications id を返します
   */
  get id():Number {
    return this.notice.id;
  }
  /**
   * notifications.date
   * @return {string} ISO8601 日付を返します
   */
  get date():string {
    return this.notice.date;
  }
  /**
   * notifications.date フォーマット
   * **使用しません**
   * displayDate を代わりに使用します
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
    return this.notice.display_date;
  }
  /**
   * アクティビティの種類
   * - reply : 返信された
   * - good : goodされた
   * - bad : badされた
   * - notice : ニュース的通知
   *
   * @return {string} アクティビティの種類を返します
   */
  get action():string {
    return this.notice.action;
  }
  /**
   * notifications.user
   * @return {UserDae|*} 誰からの通知かユーザー情報を返します
   */
  get user():UserDae {
    return this._user;
  }
  /**
   * notifications.article
   * @return {NoticeArticleDae|*} 対象記事情報を返します
   */
  get article():NoticeArticleDae {
    return this._article;
  }
  /**
   * 運動通信編集部からのお知らせ
   * @return {string} 運動通信編集部からのお知らせ
   */
  get body():string {
    return this.notice.body;
  }

  /**
   * 運動通信編集部からのお知らせ url
   * @return {string} 運動通信編集部からのお知らせ url
   */
  get url():string {
    return this.notice.url;
  }
}
