/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/20 - 15:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../data/Safety';

/**
 * <p>動画広告用タグのパス</p>
 *
 * - 動画タイプが `brightcove` の場合で、動画広告ある場合は表示する動画広告の内容が記載されたVASTのパスが設定されます
 * - 空の場合は広告なしということです。
 *
 * ```
 * "ad_url"   : {
 *  "pc" : "http://web-jp.ad-v.jp/adam/inline?CE=0&cat=RAN.CBC.PC&format=cm&page=",
 *  "sp" : "http://web-jp.ad-v.jp/adam/inline?CE=0&cat=RAN.CBC.PC&format=cm&page="
 * }
 * ```
 * @from 2016-06-20
 * */
export class AdUrl {
  /**
   * 動画広告用タグのパス pc / sp data を取得します
   * @param {Object} adUrl {{pc: string, sp: string}} JSON.response.media.video.add_url object
   */
  constructor( adUrl:Object = {} ) {
    /**
     * <p>ad_url Object</p>
     * @type {Object}
     * @private
     */
    this._adURl = Safety.object( adUrl );
  }
  /**
   * JSON.response.media.video.add_url
   * @return {*} JSON.response.media.video.add_url を
   */
  static get adUrl():Object {
    return this._adUrl;
  }
  /**
   * JSON.response.media.video.add_url.pc
   * @return {string} JSON.response.media.video.add_url.pc を返します
   */
  static get pc():string {
    return Safety.string( this.adUrl.pc, '' );
  }
  /**
   * JSON.response.media.video.add_url.sp
   * @return {string} JSON.response.media.video.add_url.sp を返します
   */
  static get sp():string {
    return Safety.string( this.adUrl.sp, '' );
  }
}
