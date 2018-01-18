/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/12 - 17:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// comment 取得 [type]

import {Query} from './Query';

/**
 * 記事詳細でのコメント一覧表示のリクエスト・オプションです
 *
 * `/api/1/comments/article/{:article_id}[/type]`
 *
 * 取得するコメントタイプ
 * - なし    : すべてのユーザーのコメント
 * - normal : 通常ユーザーのコメント
 * - official : 公式ユーザーのコメント
 * - self : 自分のコメント
 * - [commend_id] : 特定のコメントのみ
 */
export class CommentType extends Query {
  /**
   * 記事詳細でのコメント一覧表示のリクエスト・オプション
   * @param {string} key dog|cat|food のように | 区切りでオプションをつなげます
   * @param {boolean} [require=false] 必須真偽値
   */
  constructor(key, require = false) {
    super(key, 'string', '', require);
    // 'dog|cat' を分割する
    /**
     * key(dog|cat|food...)を '|' で分割します
     * @type {Array.<string>}
     * @private
     */
    this._keys = key.split('|');
  }
  /**
   * Query override して使います
   * @param {string} key query key
   * @return {boolean} query key が存在するかを返します
   */
  has(key:string) {
    return this._keys.indexOf(key) !== -1;
  }

}
