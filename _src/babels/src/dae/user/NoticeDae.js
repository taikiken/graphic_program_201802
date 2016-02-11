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
'use strict';

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

    this._notice = notice;

    // user
    this._user = new UserDae( notice.user );

    // article
    this._article = new NoticeArticleDae( notice.article );

  }
  /**
   * @return {Object|*} JSON response.notifications 配列単独データ を返します
   */
  get notice():Object {
    return this._notice;
  }
  /**
   * @return {Number} notifications id を返します
   */
  get id():Number {
    return this.notice.id;
  }
  /**
   * @return {string} ISO8601 日付を返します
   */
  get date():string {
    return this.notice.date;
  }
  /**
   * @return {string} ISO8601 を日本語形式日付にし返します
   */
  get formatDate():string {
    return this._formatDate;
  }
  /**
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
   * @return {UserDae|*} 誰からの通知かユーザー情報を返します
   */
  get user():UserDae {
    return this._user;
  }
  /**
   * @return {NoticeArticleDae|*} 対象記事情報を返します
   */
  get article():NoticeArticleDae {
    return this._article;
  }
}