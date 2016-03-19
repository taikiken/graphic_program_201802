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
'use strict';

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
  constructor( activity:Object ) {
    activity = Safety.object( activity );

    // date check
    if ( Safety.check( activity, 'date' ) ) {

      this._formatDate = Format.date( activity.date );

    }

    this._activity = activity;
    this._user = new UserDae( activity.user );
    // article
    this._article = new NoticeArticleDae( activity.article );
  }
  /**
   * response.notifications
   * @return {Object|*} JSON response.notifications 配列単独データ を返します
   */
  get activity():Object {
    return this._activity;
  }

  /**
   * activity.id
   * @return {Number} activity id を返します
   */
  get id():Number {
    return this.activity.id;
  }
  /**
   * activity.date
   * @return {string} ISO8601 日付を返します
   */
  get date():string {
    return this.activity.date;
  }
  /**
   * activity.date をフォーマット
   * **使用しません**
   * 代わりに displayDate使用
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
    return this.activity.display_date;
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
    return this.activity.action;
  }
  /**
   * activity.user
   * @return {UserDae|*} 誰からの通知かユーザー情報を返します
   */
  get user():UserDae {
    return this._user;
  }
  /**
   * activity.article
   * @return {NoticeArticleDae|*} 対象記事情報を返します
   */
  get article():NoticeArticleDae {
    return this._article;
  }
}
