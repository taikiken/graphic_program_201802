/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/13 - 12:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * ga 送信データ
 */
export class GaData {
  /**
   * ga 送信データ
   * https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=ja#implementation
   * @param {string} method 発生場所（関数名）
   * @param {string} eventCategory 必須 通常は接点に使用されたオブジェクト（例: Video）
   * @param {string} eventAction 必須 接点の種類（例: play）
   * @param {string} [eventLabel=''] オプション イベントの分類に便利です（例: Fall Campaign）
   * @param {string} [eventValue=''] オプション イベントの分類に便利です（例: Fall Campaign）
   */
  constructor( method:string, eventCategory:string, eventAction:string, eventLabel:string = '', eventValue:string = '' ) {
    Object.assign( this, {method, eventCategory, eventAction, eventLabel, eventValue} );
  }
}
