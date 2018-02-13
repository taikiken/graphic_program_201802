/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/21 - 19:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// let _symbol = Symbol();

/**
 * 経過時間に利用する関数群を用意しました
 */
export class Time {
  // /**
  //  * 経過時間に利用する関数
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Time is static Class. not use new Time().' );
  //
  //   }
  // }
  /**
   * 現在からの経過時間を Date instance で作成します
   * @param {number} days 計算元にする経過日数
   * @return {Date} 引数 days を元に現在からの経過時間を Date instance で返します
   */
  static later(days:number) {
    return new Date(Time.current() + Time.day() * days);
  }
  /**
   * 現在時間
   * @return {number} 現在時間 Date.now を返します
   */
  static current() {
    return Date.now();
  }
  /**
   * 1 week ms
   * @return {number} 1 week ms を返します
   */
  static week() {
    return Time.day() * 7;
  }
  /**
   * 1 day ms
   * @return {number} 1 day ms を返します
   */
  static day() {
    return 1000 * 60 * 60 * 24;
  }
}
