/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11 - 16:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * コメント返信フォーム
 */
export class ReplyStatus extends EventDispatcher {
  /**
   * コメント返信フォームの open, close, sending, complete を通知します。
   * @example
   * var eplyStatus = ReplyStatus.factory();
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {ReplyStatus} ReplyStatus instance を返します
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `ReplyStatus is static Class. not use new ReplyStatus(). instead ReplyStatus.factory()` );

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
   * event OPEN
   * @return {string} replyOpen を返します
   */
  static get OPEN():string {
    return 'replyOpen';
  }
  /**
   * event CLOSE
   * @return {string} replyClose を返します
   */
  static get CLOSE():string {
    return 'replyClose';
  }
  /**
   * event START
   * @return {string} replyStart を返します
   */
  static get START():string {
    return 'replyStart';
  }
  /**
   * event COMPLETE
   * @return {string} replyComplete を返します
   */
  static get COMPLETE():string {
    return 'replyComplete';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * open event を発火します
   * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
   */
  open( id:string ):void {
    this.dispatch( { type: ReplyStatus.OPEN, id: id } );
  }
  /**
   * close event を発火します
   * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
   */
  close( id:string ):void {
    this.dispatch( { type: ReplyStatus.CLOSE, id: id } );
  }
  /**
   * start event を発火します
   * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
   */
  start( id:string ):void {
    this.dispatch( { type: ReplyStatus.START, id: id } );
  }
  /**
   * complete event を発火します
   * @param {Number} id comment id, form 設置 ID, 要 Page 内ユニーク
   * @param {string} kind 記事へのコメントかを表すための文字列 normal | official | self | independent
   */
  complete( id:string, kind:string = '' ):void {
    this.dispatch( { type: ReplyStatus.COMPLETE, id: id, kind: kind } );
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {ReplyStatus} ReplyStatus instance を返します
   */
  static factory():ReplyStatus {

    if ( _instance === null ) {

      _instance = new ReplyStatus( _symbol );

    }

    return _instance;
  }
}
