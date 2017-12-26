/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 18:00
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
 * {@link CommentStatus} inner symbol
 * @type {symbol}
 */
const commentStatusSymbol = Symbol('CommentStatus symbol');
/**
 * {@link CommentStatus} singleton instance
 * @type {?CommentStatus}
 */
let singletonInstance = null;

/**
 * コメントの good / bad / delete / notice  Event
 * - Singleton
 */
export class CommentStatus extends EventDispatcher {
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * event GOOD_ADD
   * @return {string} goodAdd を返します
   */
  static get GOOD_ADD() {
    return 'goodAdd';
  }
  /**
   * event GOOD_DELETE
   * @return {string} goodDelete を返します
   */
  static get GOOD_DELETE() {
    return 'goodDelete';
  }
  /**
   * event BAD_ADD
   * @return {string} badAdd を返します
   */
  static get BAD_ADD() {
    return 'badAdd';
  }
  /**
   * event BAD_DELETE
   * @return {string} badDelete を返します
   */
  static get BAD_DELETE() {
    return 'badDelete';
  }
  /**
   * event COMMENT_DELETE 削除
   * @return {string} commentDelete を返します
   */
  static get COMMENT_DELETE() {
    return 'commentDelete';
  }
  /**
   * event NOTICE 通報
   * @return {string} commentNotice を返します
   */
  static get NOTICE() {
    return 'commentNotice';
  }
  /**
   * event COMMENT_WILL_DELETE 削除
   * @return {string} commentWillDelete を返します
   */
  static get COMMENT_WILL_DELETE() {
    return 'commentWillDelete';
  }
  /**
   * event COMMENT_DELETE_MODAL_OPEN, コメント削除モーダルオープン
   * @return {string} commentDeleteModalOpen を返します
   */
  static get COMMENT_DELETE_MODAL_OPEN() {
    return 'commentDeleteModalOpen';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {CommentStatus} CommentStatus instance を返します
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new CommentStatus(commentStatusSymbol);
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * コメントの good / bad / delete / notice  Event
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {CommentStatus} CommentStatus instance を返します
   */
  constructor(target) {
    if (commentStatusSymbol !== target) {
      throw new Error('CommentStatus is static Class. not use new CommentStatus(). instead CommentStatus.factory()');
    }
    if (singletonInstance === null) {
      super();
      singletonInstance = this;
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * イベント強制発火
   * @param {string} type コメントタイプ
   * @param {string|Number} commentId コメント Id
   */
  fire(type, commentId) {
    this.dispatch({ type, commentId });
  }
  // /**
  //  * コメント削除
  //  * @param {string|Number} commentId コメント Id
  //  */
  // remove( commentId:string ):void {
  //   this.fire( CommentStatus.COMMENT_DELETE, commentId );
  // }
  /**
   * コメント削除
   * @param {string|Number} commentId コメント Id
   * @param {string|Number} articleId 記事 Id
   * @since 2017-04-17, 記事id 加える
   */
  remove(commentId, articleId) {
    // this.fire( CommentStatus.COMMENT_DELETE, commentId );
    this.dispatch({ commentId, articleId, type: CommentStatus.COMMENT_DELETE });
  }
  /**
   * 通報
   * @param {string|Number} commentId コメント Id
   */
  notice(commentId) {
    this.fire(CommentStatus.NOTICE, commentId);
  }
  /**
   * コメント削除モーダルを開くことを通知します
   * @param {string} commentId コメント Id
   */
  modal(commentId) {
    this.fire(CommentStatus.COMMENT_DELETE_MODAL_OPEN, commentId);
  }
}
