/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:28
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';
/**
 * `response.banner.pc`
 * `response.banner.sp`
 *
 * <pre>
 * 記事詳細本文後に表示されるバナー、無い場合もあります
 * バナーの指定は 記事 > 媒体(ユーザ) > カテゴリー の優先順位で設定されます。
 * </pre>
 */
export class BannerDae {
  /**
   * response.banner pc or sp
   * @param {Object} [banner={}] response.banner pc or sp のどちらか
   */
  constructor( banner:Object = {} ) {
    banner = Safety.object( banner );

    this._banner = banner;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.banner. pc or sp
   * @return {Object} JSON.response.banner pc or sp を返します
   */
  get banner():Object {
    return this._banner;
  }
  /**
   * JSON.response.banner. pc or sp .text
   * Web用altタグテキスト
   * @return {string} JSON.response.banner pc or sp .text を返します
   */
  get text():string {
    return this.banner.text;
  }
  /**
   * JSON.response.banner. pc or sp .image
   * 表示画像
   * @return {string} JSON.response.banner pc or sp .image を返します
   */
  get image():string {
    return this.banner.image;
  }
  /**
   * JSON.response.banner. pc or sp .link
   * <pre>
   * リンク先
   * Web版ではtarget="_blank"で開く
   * </pre>
   * @return {string} JSON.response.banner pc or sp .link を返します
   */
  get link():string {
    return this.banner.link;
  }
}
