/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 13:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// data
import {Safety} from '../../data/Safety';

/**
 * 記事詳細 canonical, カノニカル *Web版のみ
 * @since 2016-09-25
 */
export class CanonicalDae {
  /**
   * JSON.response.canonical Object を管理します
   * @param {Object} canonical JSON.article.canonical
   */
  constructor(canonical) {
    canonical = Safety.object(canonical);
    /**
     * JSON.response.canonical Object 保証済み
     * @type {Object}
     * @private
     */
    this._canonical = canonical;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.canonical
   * @return {string} カノニカル
   */
  get canonical():Object {
    return this._canonical;
  }
  /**
   * カノニカル判定
   * @return {boolean} 真偽値を返します
   */
  get isCanonical():boolean {
    return !!this.canonical.is_canonical;
  }
  /**
   * カノニカルタグに設定するURL
   *
   * `http://www.jsports.co.jp/press/article/N2016080913350503.html`
   * @return {string} カノニカルタグに設定するURLを返します
   */
  get url():string {
    return this.canonical.url;
  }
}
