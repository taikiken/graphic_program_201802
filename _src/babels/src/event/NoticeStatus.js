/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/03 - 17:06
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * お知らせ更新を通知
 * @example
 * var status = NoticeStatus.factory();
 * */
export class NoticeStatus extends EventDispatcher {
  /**
   * お知らせ更新 を通知する SingleTon
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {UserStatus} UserStatus インスタンスを返します
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'NoticeStatus is static Class. not use new NoticeStatus().' );

    }

    if ( _instance === null ) {
      super();
      _instance = this;
    }
    return _instance;
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * UPDATE_COUNT, お知らせが更新された Event
   * @return {string} noticeUpdateCount を返します
   */
  static get UPDATE_COUNT():string {
    return 'noticeUpdateCount';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * お知らせが更新 Event を発火させます
   * @param {Number} count お知らせ件数
   */
  update( count:Number ):void {
    this.dispatch( { type: NoticeStatus.UPDATE_COUNT, count: count } );
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {NoticeStatus} NoticeStatus instance を返します
   */
  static factory():NoticeStatus {

    if ( _instance === null ) {

      _instance = new NoticeStatus( _symbol );

    }

    return _instance;
  }
}
