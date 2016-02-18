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
'use strict';

import {EventDispatcher} from './EventDispatcher';

let _instance = null;

/**
 * コメントの good / bad / delete / notice  Event
 */
export class CommentStatus extends EventDispatcher {
  /**
   * <h3>Singleton</h3>
   * <p>コメントの good / bad / delete / notice  Event</p>
   * @return {*}
   */
  constructor() {

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
   * @return {string}
   */
  static get COMMENT_DELETE():string {
    return 'commentDelete';
  }
  /**
   * event NOTICE 通報
   * @return {string}
   */
  static get NOTICE():string {
    return 'commentNotice';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  fire( type:string, commentId:string ):void {
    this.dispatch( { type: type, commentId: commentId } );
  }
  remove( commentId:string ):void {
    this.fire( CommentStatus.DELETE, commentId );
  }
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

      _instance = new CommentStatus();

    }

    return _instance;
  }
}
