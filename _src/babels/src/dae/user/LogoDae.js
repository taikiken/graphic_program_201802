/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/31 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../data/Safety';

/**
 * response.user.logo<br>
 * from 2016-05-31
 *
 * 追加になった記事詳細・レスポンス user.logo
 */
export class LogoDae {
  /**
   * response.user.logo
   * @param {Object} [logo={}] response.user.logo
   */
  constructor( logo:Object = {} ) {
    logo = Safety.object( logo );
    this._logo = logo;
  }
  /**
   * response.user.logo
   * @return {Object|*} response.user.logo を返します
   */
  get logo():Object {
    return this._logo;
  }
  /**
   * 媒体ロゴ画像URL<br>
   * response.user.logo.img
   * @return {string} response.user.logo.img を返します
   */
  get img():string {
    return this.logo.img;
  }
  /**
   * 媒体ロゴリンク先<br>
   * response.user.logo.link
   * @return {string} response.user.logo.link を返します
   */
  get link():string {
    return this.logo.link;
  }
}
