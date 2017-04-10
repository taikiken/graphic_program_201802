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
 * @since 2017-04-10
 */
let _pickup = 9999;
// 最終データ(last 1)を CM にするために 6件 -> 5件 にする
let _headline = 5;
let _ranking = 5;
let _video = 5;
let _archive = 16;
// データが少ない時用
// let _archive = 2;
let _list = 10;
let _max = 999;

// polling 間隔
let _interval = 1000 * 60;

/**
 * <p>offset length default value<br>
 * Ajax request 時の query, length の default value です</p>
 * <p>全て static です</p>
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
   * @return {Number} pickup default 取得数を返します
   */
  static get pickup() {
    return _pickup;
  }
  /**
   * home pickup, length を設定します
   * @param {Number} value pickup default 取得数
   */
  static set pickup(value):void {
    if (Number.isInteger(value)) {
      _pickup = value;
    } else {
      throw new Error( `pickup: integer required. ${value}` );
    }
  }
  // --- headline
  /**
   * home headline
   * @default 5
   * @return {Number} headline default 取得数を返します
   */
  static get headline() {
    return _headline;
  }
  /**
   * home headline, length を設定します
   * @param {Number} value headline default 取得数
   */
  static set headline(value) {
    if (Number.isInteger(value)) {
      _headline = value;
    } else {
      throw new Error(`headline: integer required. ${value}`);
    }
  }
  // --- ranking
  /**
   * sidebar ranking
   * @default 5
   * @return {Number} ranking default 取得数を返します
   */
  static get ranking() {
    return _ranking;
  }
  /**
   * sidebar ranking, length を設定します
   * @param {Number} value ranking default 取得数
   */
  static set ranking(value) {
    if ( Number.isInteger(value) ) {
      _ranking = value;
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
   * @return {Number} video default 取得数を返します
   */
  static get video() {
    return _video;
  }
  /**
   * sidebar video, length を設定します
   * @param {Number} value video default 取得数
   */
  static set video(value) {
    if ( Number.isInteger(value)) {
      _video = value;
    } else {
      throw new Error(`video: integer required. ${value}`);
    }
  }
  // --- archive
  /**
   * 記事一覧
   * @default 16
   * @return {Number} archive default 取得数を返します
   */
  static get archive() {
    return _archive;
  }
  /**
   * 記事一覧, length を設定します
   * @param {Number} value archive default 取得数
   */
  static set archive(value) {
    if (Number.isInteger(value)) {
      _archive = value;
    } else {
      throw new Error(`archive: integer required. ${value}`);
    }
  }
  // --- list
  /**
   * mypage 一覧
   * @default 10
   * @return {Number} archive default 取得数を返します
   */
  static get list() {
    return _list;
  }
  /**
   * mypage 一覧, length を設定します
   * @param {Number} value archive default 取得数
   */
  static set list(value) {
    if (Number.isInteger(value)) {
      _list = value;
    } else {
      throw new Error(`archive: integer required. ${value}`);
    }
  }
  // --- max
  /**
   * 最大値
   * @return {Number} length 最大値を返します
   */
  static get max() {
    return _max;
  }
  // --- interval
  /**
   * polling 間隔(ms)
   * @default 1000 * 60
   * @return {Number} interval(ms) を返します
   */
  static get interval() {
    return _interval;
  }
  /**
   * polling 間隔(ms) を設定します
   * @param {Number} value interval ms
   */
  static set interval(value) {
    if (Number.isInteger(value)) {
      _interval = value;
    } else {
      throw new Error(`interval: integer required. ${value}`);
    }
  }
}
