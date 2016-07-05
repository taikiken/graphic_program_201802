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
   * <p>外部からトラッキングコード送信ができるようにします</p>
   * <p>GA / CRAZY系コンテンツ用トラッキングを追加 - バナー & 動画 / Web版 #842</p>
   * @from 2016-06-22
   * @param {string} method 発生場所（関数名）
   * @param {string} category 必須 通常は接点に使用されたオブジェクト（例: Video）
   * @param {string} action 必須 接点の種類（例: play）
   * @param {string} label イベントの分類に便利です（例: Fall Campaign）
   * @param {Boolean} [eventInteraction=false] オプション イベントをインタラクション以外のイベントとして送信できます。その場合、nonInteraction フィールドを true に指定します（send コマンドの fieldsObject を使用）
   */
  static click( method:string, category:string, action:string, label:string, eventInteraction:Boolean = false ):void {
    // ----------------------------------------------
    // GA 計測タグ
    Ga.add( new GaData( method, category, action, label, 0, eventInteraction ) );
    // ----------------------------------------------
  }
  /**
   * 送信予約
   * @param {GaData} data 送信するデータ
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
      // ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel, data.eventValue );
      Ga.tracking( ga, data );
    }
  }
  /**
   * 開発（ログあり）
   * @param {Function} ga ga関数
   */
  static develop( ga:Function ):void {
    // _requests 内のデータがなくなるまで実行する
    while( _requests.length > 0 ) {
      let data:GaData = _requests.shift();
      // ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel, data.eventValue );
      Ga.tracking( ga, data );
      console.log( `${data.method}: ga, send, `, data.eventCategory, data.eventAction, data.eventLabel, data.eventValue, data.eventInteraction );
    }
  }
  /**
   * ga 関数を実行し tracking を行います
   * @since 2016-07-04
   * @param {Function} ga Google.ga
   * @param {GaData} data 送信する GaData Object
   */
  static tracking( ga:Function, data:GaData ):void {
    if ( data.eventInteraction ) {
      ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel, data.eventValue, GaData.nonInteraction() );
    } else {
      ga( 'send', 'event', data.eventCategory, data.eventAction, data.eventLabel, data.eventValue );
    }
  }
}
