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


import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * コメントの good / bad / delete / notice  Event
 */
export class CommentStatus extends EventDispatcher {
  /**
   * <h3>Singleton</h3>
   * <p>コメントの good / bad / delete / notice  Event</p>
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {CommentStatus} CommentStatus instance を返します
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `CommentStatus is static Class. not use new CommentStatus(). instead CommentStatus.factory()` );

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
   * event GOOD_ADD
   * @return {string} goodAdd を返します
   */
  static get GOOD_ADD():string {
    return 'goodAdd';
  }
  /**
   * event GOOD_DELETE
   * @return {string} goodDelete を返します
   */
  static get GOOD_DELETE():string {
    return 'goodDelete';
  }
  /**
   * event BAD_ADD
   * @return {string} badAdd を返します
   */
  static get BAD_ADD():string {
    return 'badAdd';
  }
  /**
   * event BAD_DELETE
   * @return {string} badDelete を返します
   */
  static get BAD_DELETE():string {
    return 'badDelete';
  }
  /**
   * event COMMENT_DELETE 削除
   * @return {string} commentDelete を返します
   */
  static get COMMENT_DELETE():string {
    return 'commentDelete';
  }
  /**
   * event NOTICE 通報
   * @return {string} commentNotice を返します
   */
  static get NOTICE():string {
    return 'commentNotice';
  }

  /**
   * event COMMENT_WILL_DELETE 削除
   * @return {string} commentWillDelete を返します
   */
  static get COMMENT_WILL_DELETE():string {
    return 'commentWillDelete';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * イベント強制発火
   * @param {string} type コメントタイプ
   * @param {string|Number} commentId コメント Id
   */
  fire( type:string, commentId:string ):void {
    this.dispatch( { type: type, commentId: commentId } );
  }
  /**
   * コメント削除
   * @param {string|Number} commentId コメント Id
   */
  remove( commentId:string ):void {
    this.fire( CommentStatus.COMMENT_DELETE, commentId );
  }
  /**
   * 通報
   * @param {string|Number} commentId コメント Id
   */
  notice( commentId:string ):void {
    this.fire( CommentStatus.NOTICE, commentId );
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {CommentStatus} CommentStatus instance を返します
   */
  static factory():CommentStatus {

    if ( _instance === null ) {

      _instance = new CommentStatus( _symbol );

    }

    return _instance;
  }
}
