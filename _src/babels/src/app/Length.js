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

/*
// Proxy は使えない
// https://babeljs.io/docs/learn-es2015/#proxies
// babel not support

export let Length = new Proxy(
  {
    headline: 6
  },
  {
    has: function( target, property ) {
      return property in target;
    },
    set: function( target, property, value, receiver ) {
      if ( Number.isInteger( value ) ) {
        target[ property ] = value;
        return true;
      } else {
        throw new Error( `${property} integer required. ${value}` );
      }
    },
    get: function( target, property, receiver ) {
      console.log(receiver);

      if ( property in target ) {
        console.log(receiver);
        return target[property];
      } else {
        return 'Not Found';
      }
    }
  }
);
*/

let _symbol = Symbol();
let _pickup = 5;
let _headline = 6;
let _ranking = 5;
let _video = 5;
let _archive = 10;

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
}
