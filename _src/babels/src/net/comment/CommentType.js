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

'use strict';

import {Query} from '../types/Query';

/**
 * 記事詳細でのコメント一覧表示のリクエスト・オプションです
 */
export class CommentType extends Query {
  /**
   * <code>/api/1/comments/artice/{:article_id}[/type]</code>
   * <pre>
   * 取得するコメントタイプ
   * - なし    : すべてのユーザーのコメント
   * - normal : 通常ユーザーのコメント
   * - official : 公式ユーザーのコメント
   * - self : 自分のコメント
   * - [commend_id] : 特定のコメントのみ
   * </pre>
   * @param {string} key dog|cat|food のように | 区切りでオプションをつなげます
   * @param {boolean} [require=false] 必須真偽値
   */
  constructor( key:string, require:boolean = false ) {

    super( key, 'string', '', require );
    // 'dog|cat' を分割する
    this._keys = key.split('|');

  }

  /**
   * Query override して使います
   * @method has
   * @param {string} key query key
   * @returns {boolean} query key が存在するかを返します
   */
  has( key:string ):boolean {

    return this._keys.indexOf( key ) !== -1;

  }

}
