/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/08/29 - 22:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { OffsetAuth } from '../OffsetAuth';
import { Length } from '../../app/const/Length';
import { Api } from '../../net/Api';
import { User } from '../../app/User';

/**
 * 都道府県 - Ajax - 処理を行います
 * - ユーザー認証なし
 * - offset / length あり
 * ```
 * '北海道',
 * '青森',
 * '岩手',
 * '宮城',
 * '秋田',
 * '山形',
 * '福島',
 * '茨城',
 * '栃木',
 * '群馬',
 * '埼玉',
 * '千葉',
 * '東京',
 * '神奈川',
 * '富山',
 * '石川',
 * '福井',
 * '山梨',
 * '長野',
 * '岐阜',
 * '静岡',
 * '愛知',
 * '三重',
 * '滋賀',
 * '京都',
 * '大阪',
 * '兵庫',
 * '奈良',
 * '和歌山',
 * '鳥取',
 * '島根',
 * '岡山',
 * '広島',
 * '山口',
 * '徳島',
 * '香川',
 * '愛媛',
 * '高知',
 * '福岡',
 * '佐賀',
 * '長崎',
 * '熊本',
 * '大分',
 * '宮崎',
 * '鹿児島',
 * '沖縄',
 * ```
 * @since 2017-09-04
 */
export class PrefAuth extends OffsetAuth {
  /**
   * 都道府県 - Ajax - 処理を行います
   * @param {string} [area=''] 都道府県名称
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor(area = '', resolve = null, reject = null, offset = 0, length = Length.archive) {
    super(User.token, Api.pref(), resolve, reject, offset, length);
    /**
     * 都道府県名称
     * @type {string}
     */
    this.area = area;
  }
  /**
   * url を作成します
   * ```
   * /api/v1/articles/pref/{:keywords}[?[offset=:n][&[length=:m]]
   *
   * ex.
   * /api/v1/articles/pref/東京
   * - 「東京」に紐付けられた記事一覧
   * ```
   * @returns {string} 作成した url を返します
   * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=1942448379
   */
  get url() {
    return `${this._url}/${this.area}?offset=${this.offset}&length=${this.length}`;
  }
}
