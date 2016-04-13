/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/13 - 12:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Env} from '../app/Env';
import {GaData} from './GaData';

let _symbol = Symbol();

let _requests:Array<GaData> = [];

/**
 * ga: イベント トラッキング
 */
export class Ga {
  /**
   * ga: イベント トラッキング
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( 'Ga is static Class. not use new Ga().' );

    }

  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * 送信予約
   * @param {GaData} data
   */
  static add( data:GaData ):void {
    _requests.push( data );
    Ga.send();
  }
  /**
   * 送信実行
   * global object `ga` 存在をチェックし送信する
   */
  static send():void {
    // ga 存在チェック
    let ga = self.ga;
    if ( typeof ga === 'undefined' ) {
      // ga undefined
      setTimeout( Ga.send, 25 );
      return;
    }

    // log を出力するかを選択する
    if (Env.mode === Env.PRODUCTION) {
      Ga.production(ga);
    } else {
      Ga.develop(ga);
    }
  }
  /**
   * 本番（ログなし）
   * @param {Function} ga ga関数
   */
  static production( ga:Function ):void {
    // _requests 内のデータがなくなるまで実行する
    while( _requests.length > 0 ) {
      let data:GaData = _requests.shift();
      ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel );
    }
  }
  /**
   * 開発（ログあり）
   * @param {Function} ga ga関数
   */
  static develop( ga ):void {
    // _requests 内のデータがなくなるまで実行する
    while( _requests.length > 0 ) {
      let data:GaData = _requests.shift();
      ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel );
      console.log( 'ga send ', data.method, data.eventCategory, data.eventAction, data.eventLabel );
    }
  }
}
