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
'use strict';

let _symbol = Symbol();
let _pickup = 5;
// last 1 を CM にするために 6 -> 5 にする
let _headline = 5;
let _ranking = 5;
let _video = 5;
let _archive = 10;
let _max = 999;

// polling 間隔
let _interval = 1000 * 60;

/**
 * <h3>offset length default value</h3>
 * 全て static です
 */
export class Length {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Length is static Class. not use new Length().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // --- pickup
  /**
   * @return {Number} pickup default 取得数を返します
   */
  static get pickup():Number {
    return _pickup;
  }
  /**
   * @param {Number} value pickup default 取得数
   */
  static set pickup( value:Number ):void {
    if ( Number.isInteger( value ) ) {
      _pickup = value;
    } else {
      throw new Error( `pickup: integer required. ${value}` );
    }
  }
  // --- headline
  /**
   * @return {Number} headline default 取得数を返します
   */
  static get headline():Number {
    return _headline;
  }
  /**
   * @param {Number} value headline default 取得数
   */
  static set headline( value:Number ):void {
    if ( Number.isInteger( value ) ) {
      _headline = value;
    } else {
      throw new Error( `headline: integer required. ${value}` );
    }
  }
  // --- ranking
  /**
   * @return {Number} ranking default 取得数を返します
   */
  static get ranking():Number {
    return _ranking;
  }
  /**
   *
   * @param {Number} value ranking default 取得数
   */
  static set ranking( value:Number ):void {
    if ( Number.isInteger( value ) ) {
      _ranking = value;
    } else {
      throw new Error( `ranking: integer required. ${value}` );
    }
  }
  // --- video
  /**
   * @return {Number} video default 取得数を返します
   */
  static get video():Number {
    return _video;
  }
  /**
   * @param {Number} value video default 取得数
   */
  static set video( value:Number ):void {
    if ( Number.isInteger( value ) ) {
      _video = value;
    } else {
      throw new Error( `video: integer required. ${value}` );
    }
  }
  // --- archive
  /**
   * @return {Number} archive default 取得数を返します
   */
  static get archive():Number {
    return _archive;
  }
  /**
   * @param {Number} value archive default 取得数
   */
  static set archive( value:Number ):void {
    if ( Number.isInteger( value ) ) {
      _archive = value;
    } else {
      throw new Error( `archive: integer required. ${value}` );
    }
  }
  // --- max
  /**
   * 最大値
   * @return {Number} length 最大値を返します
   */
  static get max():Number {
    return _max;
  }
  // --- interval
  /**
   * @return {Number} interval(ms) を返します
   */
  static get interval():Number {
    return _interval;
  }
  /**
   * @param {Number} value interval ms
   */
  static set interval( value:Number ):void {
    if ( Number.isInteger( value ) ) {
      _interval = value;
    } else {
      throw new Error( `interval: integer required. ${value}` );
    }
  }
}
