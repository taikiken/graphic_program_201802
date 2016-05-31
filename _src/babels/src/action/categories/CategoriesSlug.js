/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 15:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Categories} from './Categories';

/**
 * 引数 slug のカテゴリ情報を取得します<br>
 * from 2016-05-28<br>
 *
 * <pre>
 * 特定のカテゴリー情報を取得する
 ※ 主に企画モノの記事一覧ページを生成するにあたり利用する
 * </pre>
 *
 * ```
 * /api/v1/category/[:category_slug]
 * ```
 *
 */
export class CategoriesSlug extends Categories {
  /**
   * 引数 slug のカテゴリ情報を取得し<br>
   * カテゴリ特有のデザイン、レイアウトへ対応します<br>
   *
   * @param {string} slug category slug
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( slug:string, resolve:Function = null, reject:Function = null ) {
    super( resolve, reject );

    this._slug = slug;
    // override url property
    // /api/v1/category/[:category_slug]
    this._url = `${this._types.url}/${slug}`;
  }
  /**
   * category slug を取得します
   * @return {string|*} category slug を返します
   */
  get slug():string {
    return this._slug;
  }
}
