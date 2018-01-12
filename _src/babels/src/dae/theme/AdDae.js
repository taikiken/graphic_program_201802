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

import {Safety} from '../../data/Safety';
import {AdPcDae} from './AdPcDae';

export class AdMobileIds {
  constructor(data = {}) {
    const origin = data || {};
    /**
     * response.ad.mobile.[sp|ios|android] - original
     * @type {*}
     */
    this.origin = origin;
    /**
     * response.ad.[sp|ios|android].article_list - 記事一覧
     * @type {string}
     */
    this.list = origin.article_list;
    /**
     * response.ad.[sp|ios|android].article_detail - 記事詳細
     * @type {string}
     */
    this.detail = origin.article_detail;
    /**
     * response.ad.[sp|ios|android].headline_list - ヘッドラインニュース
     * @type {string}
     */
    this.headline = origin.headline_list;
    /**
     * response.ad.[sp|ios|android].popular_list - オススメ記事
     * @type {string}
     */
    this.popular = origin.popular_list;
    /**
     * response.ad.[sp|ios|android].reccomend_list - 人気記事
     * @type {string}
     */
    this.recommend = origin.reccomend_list;
  }
}

/**
 * [ad] 構成変更 - [#1554](https://github.com/undotsushin/undotsushin/issues/1544#issuecomment-286534040)
 * - 記事一覧：article_list
 * - 記事詳細：article_detail
 * - ヘッドラインニュース：headline_list
 * - オススメ記事：popular_list
 * - 人気記事：reccomend_list
 * ```
 * "ad":{
 * "ios"     : "33504",
 * "android" : "34424",
 * "sp"      : "35244",
 * "pc"      : {
 *   "sidebar_top"    : "pc_sidebar_top",
 *   "sidebar_bottom" : "pc_sidebar_bottom"
 * },
 * "mobile"  : {
 *   "sp" : {
 *     "article_list"   : "35244",
 *     "article_detail" : "35245",
 *     "headline_list"  : "35244",
 *     "popular_list"   : "35244","reccomend_list" : "35244"
 *     },
 *     "ios" : {
 *     "article_list"   : "33504",
 *     "article_detail" : "33505",
 *     "headline_list"  : "33504",
 *     "popular_list"   : "33504",
 *     "reccomend_list" : "33504"
 *     },
 *     "android" : {
 *     "article_list"   : "34424",
 *     "article_detail" : "34425",
 *     "headline_list"  : "34424",
 *     "popular_list"   : "34424",
 *     "reccomend_list" : "34424"
 *     },
 *   }
 * }
 * ```
 * @since 2018-01-12
 */
export class AdMobileDae {
  /**
   * for sp ad id
   * @param {*} data JSON.response.ad.sp
   */
  constructor(data = {}) {
    const origin = data || {};
    /**
     * response.ad.sp - original
     * @type {*}
     */
    this.origin = origin;
    /**
     * response.ad.mobile.sp
     * @type {AdMobileIds}
     */
    this.sp = new AdMobileIds(origin.sp);
    /**
     * response.ad.mobile.ios
     * @type {AdMobileIds}
     */
    this.ios = new AdMobileIds(origin.ios);
    /**
     * response.ad.mobile.android
     * @type {AdMobileIds}
     */
    this.android = new AdMobileIds(origin.android);
  }
}

/**
 * この記事詳細の広告設定 - `response.ad`
 * - ※それぞれ値が空なら広告表示ナシとなります
 */
export class AdDae {
  /**
   * response.ad を管理します
   * @param {Object} [ad={}] response.ad
   */
  constructor(ad = {}) {
    const origin = Safety.object(ad);
    // console.log('AdDae', origin);
    /**
     * `response.ad.pc` - JSON.response.ad.pc
     * - 仮)PC版右のバナー広告設定
     * - Web版バナー広告はDFP管理に以降すれば管理画面から自在に制御できるので不要かも。調査中。
     * @type {AdPcDae}
     */
    this.pc = new AdPcDae(origin.pc);
    // /**
    //  * response.ad - original
    //  * @type {Object}
    //  * @protected
    //  */
    // this._origin = origin;
    // this._ad = altAd;
    /**
     * response.ad - original
     * @type {Object}
     */
    this.ad = origin;
    /**
     * Android版アドジェネID
     * - JSON.response.ad.android
     * @type {string}
     */
    this.android = origin.android;
    /**
     * iOS版アドジェネID
     * - JSON.response.ad.ios
     * @type {string}
     */
    this.ios = origin.ios;
    /**
     * スマホ版アドジェネID - `JSON.response.ad.mobile`
     * @type {AdMobileDae}
     * @since 2018-01-12
     */
    this.mobile = new AdMobileDae(origin.mobile);
    /**
     * スマホ版アドジェネID - `JSON.response.ad.sp`
     * @type {string}
     */
    this.sp = origin.sp;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * JSON.response.ad
  //  * @return {Object|*} JSON response.ad を返します
  //  */
  // get ad():Object {
  //   return this._ad;
  // }
  // /**
  //  * iOS版アドジェネID
  //  * JSON.response.ad.ios
  //  * @return {string|*} iOS版アドジェネID を返します
  //  */
  // get ios():string {
  //   return this.ad.ios;
  // }
  // /**
  //  * Android版アドジェネID
  //  * JSON.response.ad.android
  //  * @return {string|*} Android版アドジェネID を返します
  //  */
  // get android():string {
  //   return this.ad.android;
  // }
  // /**
  //  * スマホ版アドジェネID
  //  * JSON.response.ad.sp
  //  * @return {string} スマホ版アドジェネID を返します
  //  */
  // get sp():string {
  //   return this.ad.sp;
  // }
  // /**
  //  * JSON.response.ad.pc
  //  *
  //  * 仮)PC版右のバナー広告設定
  //  * Web版バナー広告はDFP管理に以降すれば管理画面から自在に制御できるので不要かも。調査中。
  //  * @return {AdPcDae} JSON.response.ad.pc を AdPcDae instance とし返します
  //  */
  // get pc():AdPcDae {
  //   return this._pc;
  // }
}
