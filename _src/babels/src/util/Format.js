/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 23:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// 日付フォーマットなど...

let _symbol = Symbol();

/**
 * <h3>サーバーリクエストAPIを管理します</h3>
 * 全て static<br>
 * <strong>文字を定型に変換します</strong>
 */
export class Format {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Format is not new Format().` );

    }

  }
  /**
   * ISO8601 日付を 日本語形式に変換します
   * @param {string} iso ISO8601 日付 "2016-01-14T18:25:45+09:00"
   * @return {string} 2016年1月14日8時25分45秒 日本語へ変換し返します
   */
  static date( iso:string ):string {

    // ["2016-01-14T18:25:45", "2016", "01", "14", "18", "25", "45"] 分解
    let nums = iso.match(/(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)?/);
    nums.shift();
    // 数値へ 頭 0 除去
    nums.map( function( num ) {
      return num * 1;
    } );
    return `${nums[0]}年${nums[1]}月${nums[2]}日${nums[3]}時${nums[4]}分${nums[5]}秒`;

  }
}
