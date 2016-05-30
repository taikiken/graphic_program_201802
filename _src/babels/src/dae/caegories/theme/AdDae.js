/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';
import {AdPcDae} from './AdPcDae';

/**
 * response.ad
 *
 * この記事詳細の広告設定
 * ※それぞれ値が空なら広告表示ナシとなります
 */
export class AdDae {
  /**
   * response.ad を管理します
   * @param {Object} [ad={}] response.ad
   */
  constructor( ad:Object = {} ) {
    ad = Safety.object( ad );

    this._pc = new AdPcDae( ad.pc );
    this._ad = ad;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.ad
   * @return {Object|*} JSON response.ad を返します
   */
  get ad():Object {
    return this._ad;
  }
  /**
   * iOS版アドジェネID
   * JSON.response.ad.ios
   * @return {string|*} iOS版アドジェネID を返します
   */
  get ios():string {
    return this.ad.ios;
  }
  /**
   * Android版アドジェネID
   * JSON.response.ad.android
   * @return {string|*} Android版アドジェネID を返します
   */
  get android():string {
    return this.ad.android;
  }
  /**
   * スマホ版アドジェネID
   * JSON.response.ad.sp
   * @return {string} スマホ版アドジェネID を返します
   */
  get sp():string {
    return this.ad.sp;
  }
  /**
   * JSON.response.ad.pc
   *
   * 仮)PC版右のバナー広告設定
   * Web版バナー広告はDFP管理に以降すれば管理画面から自在に制御できるので不要かも。調査中。
   * @return {AdPcDae} JSON.response.ad.pc を AdPcDae instance とし返します
   */
  get pc():AdPcDae {
    return this._pc;
  }
}
