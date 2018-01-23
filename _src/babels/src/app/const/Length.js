/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 16:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// let _symbol = Symbol();
// let _pickup = 5;
/**
 * PICKUP - Carousel articles, 記事数無制限変更になったのでリクエスト数を変更する
 * @type {number}
 * @private
 * @default 9999
 * @since 2017-04-10
 */
let valuePickup = 9999;
// 最終データ(last 1)を CM にするために 6件 -> 5件 にする
/**
 * headline 件数
 * @type {number}
 * @private
 * @default 5
 */
let valueHeadline = 5;
/**
 * sidebar ranking 件数
 * @type {number}
 * @private
 * @default 5
 */
let valueRanking = 5;
/**
 * sidebar recommend video 件数
 * @type {number}
 * @private
 * @default 5
 */
let valueVideo = 5;
/**
 * 一覧出力件数
 * @type {number}
 * @private
 * @default 16
 */
let valueArchive = 16;
// データが少ない時用
// let _archive = 2;
/**
 * mypage 一覧件数
 * @type {number}
 * @private
 * @default 10
 */
let valueList = 10;
/**
 * 最大値
 * @type {number}
 * @private
 * @default 999
 */
let valueMax = 999;

/**
 * polling 間隔
 * @type {number}
 * @private
 * @default 1000 * 60 (1m.)
 */
let valueInterval = 1000 * 60;

/**
 * offset length default value
 * - Ajax request 時の query, length の default value です
 * - 全て static です
 */
export class Length {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if (_symbol !== target) {
  //     throw new Error( 'Length is static Class. not use new Length().' );
  //   }
  // }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // --- pickup
  /**
   * home pickup
   * @default 5
   * @return {number} pickup default 取得数を返します
   */
  static get pickup() {
    return valuePickup;
  }
  /**
   * home pickup, length を設定します
   * @param {number} value pickup default 取得数
   */
  static set pickup(value):void {
    if (Number.isInteger(value)) {
      valuePickup = value;
    } else {
      throw new Error(`pickup: integer required. ${value}`);
    }
  }
  // --- headline
  /**
   * home headline
   * @default 5
   * @return {number} headline default 取得数を返します
   */
  static get headline() {
    return valueHeadline;
  }
  /**
   * home headline, length を設定します
   * @param {number} value headline default 取得数
   */
  static set headline(value) {
    if (Number.isInteger(value)) {
      valueHeadline = value;
    } else {
      throw new Error(`headline: integer required. ${value}`);
    }
  }
  // --- ranking
  /**
   * sidebar ranking
   * @default 5
   * @return {number} ranking default 取得数を返します
   */
  static get ranking() {
    return valueRanking;
  }
  /**
   * sidebar ranking, length を設定します
   * @param {number} value ranking default 取得数
   */
  static set ranking(value) {
    if (Number.isInteger(value)) {
      valueRanking = value;
    } else {
      throw new Error(`ranking: integer required. ${value}`);
    }
  }

  // sp single ranking
  /**
   * SP, 記事詳細「人気記事」表示件数<br>
   * default: 10
   * @since 2016-06-16
   * @return {number} SP, 記事詳細「人気記事」表示件数を返します
   */
  static get spRanking() {
    return 10;
  }
  // --- video
  /**
   * sidebar video
   * @default 5
   * @return {number} video default 取得数を返します
   */
  static get video() {
    return valueVideo;
  }
  /**
   * sidebar video, length を設定します
   * @param {number} value video default 取得数
   */
  static set video(value) {
    if ( Number.isInteger(value)) {
      valueVideo = value;
    } else {
      throw new Error(`video: integer required. ${value}`);
    }
  }
  // --- archive
  /**
   * 記事一覧
   * @default 16
   * @return {number} archive default 取得数を返します
   */
  static get archive() {
    return valueArchive;
  }
  /**
   * 記事一覧, length を設定します
   * @param {number} value archive default 取得数
   */
  static set archive(value) {
    if (Number.isInteger(value)) {
      valueArchive = value;
    } else {
      throw new Error(`archive: integer required. ${value}`);
    }
  }
  // --- list
  /**
   * mypage 一覧
   * @default 10
   * @return {number} archive default 取得数を返します
   */
  static get list() {
    return valueList;
  }
  /**
   * mypage 一覧, length を設定します
   * @param {number} value archive default 取得数
   */
  static set list(value) {
    if (Number.isInteger(value)) {
      valueList = value;
    } else {
      throw new Error(`archive: integer required. ${value}`);
    }
  }
  // --- max
  /**
   * 最大値
   * @return {number} length 最大値を返します
   */
  static get max() {
    return valueMax;
  }
  // --- interval
  /**
   * polling 間隔(ms)
   * @default 1000 * 60
   * @return {number} interval(ms) を返します
   */
  static get interval() {
    return valueInterval;
  }
  /**
   * polling 間隔(ms) を設定します
   * @param {number} value interval ms
   */
  static set interval(value) {
    if (Number.isInteger(value)) {
      valueInterval = value;
    } else {
      throw new Error(`interval: integer required. ${value}`);
    }
  }
}
