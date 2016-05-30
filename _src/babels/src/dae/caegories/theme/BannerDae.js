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
 * response.banner.pc | sp
 *
 * 記事詳細本文後に表示されるバナー、無い場合もあります
 * バナーの指定は 記事 > 媒体(ユーザ) > カテゴリー の優先順位で設定されます。
 *
 */
export class BannerDae {
  /**
   * response.banner.pc | sp
   * @param {Object} [banner={}] response.banner.pc | sp のどちらか
   */
  constructor( banner:Object = {} ) {
    banner = Safety.object( banner );

    this._banner = banner;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.banner.[pc, sp]
   * @return {Object|*} JSON.response.banner.[pc, sp] を返します
   */
  get banner():Object {
    return this._banner;
  }
  /**
   * JSON.response.banner.[pc, sp].text
   * Web用altタグテキスト
   * @return {string} JSON.response.banner.[pc, sp].text
   */
  get text():string {
    return this.banner.text;
  }
  /**
   * JSON.response.banner.[pc, sp].image
   * 表示画像
   * @return {string} JSON.response.banner.[pc, sp].image
   */
  get image():string {
    return this.banner.image;
  }
  /**
   * JSON.response.banner.[pc, sp].link
   * リンク先
   * Web版ではtarget="_blank"で開く
   * @return {string} JSON.response.banner.[pc, sp].link
   */
  get link():string {
    return this.banner.link;
  }
}
