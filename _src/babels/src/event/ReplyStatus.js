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
/* eslint constructor-super: 0 */

import {EventDispatcher} from './EventDispatcher';

/**
 * {@link ReplyStatus} - inner symbol
 * @type {symbol}
 */
const singletonSymbol = Symbol('ReplyStatus singleton inner symbol');
/**
 * {@link ReplyStatus} singleton instance
 * @type {?ReplyStatus}
 */
let singletonInstance = null;

/**
 * コメント返信フォーム custom event
 * - OPEN
 * - CLOSE
 * - START
 * - COMPLETE
 * @example
 * var replyStatus = ReplyStatus.factory();
 *
 */
export class ReplyStatus extends EventDispatcher {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {ReplyStatus} ReplyStatus instance を返します
   */
  static factory():ReplyStatus {
    if ( singletonInstance === null ) {
      singletonInstance = new ReplyStatus( singletonSymbol );
    }
    return singletonInstance;
  }
  /**
   * コメント返信フォームの open, close, sending, complete を通知します。
   *
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {ReplyStatus} ReplyStatus instance を返します
   */
  constructor(target) {
    if (singletonSymbol !== target) {
      throw new Error( 'ReplyStatus is static Class. not use new ReplyStatus(). instead ReplyStatus.factory()' );
    }
    if (singletonInstance === null) {
      super();
      singletonInstance = this;
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * event OPEN
   * @return {string} replyOpen を返します
   */
  static get OPEN() {
    return 'replyOpen';
  }
  /**
   * event CLOSE
   * @return {string} replyClose を返します
   */
  static get CLOSE() {
    return 'replyClose';
  }
  /**
   * event START
   * @return {string} replyStart を返します
   */
  static get START() {
    return 'replyStart';
  }
  /**
   * event COMPLETE
   * @return {string} replyComplete を返します
   */
  static get COMPLETE() {
    return 'replyComplete';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * open event を発火します
   * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
   */
  open(id) {
    this.dispatch({ type: ReplyStatus.OPEN, id });
  }
  /**
   * close event を発火します
   * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
   */
  close(id) {
    this.dispatch({ type: ReplyStatus.CLOSE, id });
  }
  /**
   * start event を発火します
   * @param {string} id comment id, form 設置 ID, 要 Page 内ユニーク
   */
  start(id) {
    this.dispatch({ type: ReplyStatus.START, id });
  }
  /**
   * complete event を発火します
   * <p>page 内に複数の記事詳細が存在するようになるため<br>
   * 記事IDを識別子として加える</p>
   * @param {Number} id comment id, form 設置 ID, 要 Page 内ユニーク
   * @param {string} kind 記事へのコメントかを表すための文字列 normal | official | self | independent
   * @param {string} articleId 記事ID 識別子として追加
   * @since 2016-11-05 articleId added
   */
  complete(id, kind = '', articleId = '') {
    // console.log('ReplyStatus.complete', id, kind, articleId);
    this.dispatch({ type: ReplyStatus.COMPLETE, id, kind, articleId });
  }
}
