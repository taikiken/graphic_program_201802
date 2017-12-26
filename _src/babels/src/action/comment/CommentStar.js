/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 14:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

import {ActionAuthBehavior} from '../ActionAuthBehavior';
import {Api} from '../../net/Api';
import {Path} from '../../app/const/Path';
import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {ActionType} from '../../app/const/ActionType';

/**
 * {@link CommentStar} inner symbol
 * @type {symbol}
 */
const commentsStarSymbol = Symbol('CommentStar symbol');

/**
 * コメント GOOD / BAD を行います
 * - `CommentStar.good` or `CommentStar.bad` でインスタンスを作成します
 * - `new CommentStar()` は実行不可です
 *
 * @example
 * const good = CommentStar.good( 12345 );
 * good.add();
 * good.remove();
 *
 * const bad  = CommentStar.bad( 12345 );
 * bad.add();
 * bad.remove()
 */
export class CommentStar extends ActionAuthBehavior {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * comment good instance 作成 - {@link ActionType}.GOOD
   * @param {number} commentId コメント Id
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {CommentStar} comment good instance を返します
   */
  static good(commentId, resolve = null, reject = null) {
    return new CommentStar(commentsStarSymbol, commentId, ActionType.GOOD, resolve, reject);
  }
  /**
   * comment bad instance 作成 - {@link ActionType}.BAD
   * @param {number} commentId コメント Id
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {CommentStar} comment bad instance を返します
   */
  static bad(commentId, resolve = null, reject = null) {
    return new CommentStar(commentsStarSymbol, commentId, ActionType.BAD, resolve, reject);
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * コメント GOOD / BAD を行います
   * @param {Symbol} target new でインスタンスを作成しないための private symbol
   * @param {number} commentId コメント Id
   * @param {string} type good or bad
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor(target, commentId, type, resolve = null, reject = null) {
    if (commentsStarSymbol !== target) {
      throw new Error('CommentStar is static Class. not use new CommentStar(). instead CommentStar.add, CommentStar.remove');
    }
    // 正規化
    // type は good | bad
    // mode は add | delete
    if (!Safety.normalize(type, [ActionType.GOOD, ActionType.BAD])) {
      throw new Error(`type is not correct. ${type}`);
    }

    // 登録
    const add = Api.comment(`${type}:${ActionType.ADD}`);
    // 解除
    const remove = Api.comment(`${type}:${ActionType.DELETE}`);

    // 登録用で super 実行
    super(User.token, add, null, resolve, reject);
    // global へ( super の後 )
    // /**
    //  * コメント GOOD リクエストに使用します
    //  * @type {Types}
    //  * @protected
    //  */
    // this._add = add;
    // /**
    //  * コメント BAD リクエストに使用します
    //  * @type {Types}
    //  * @protected
    //  */
    // this._remove = remove;
    /**
     * GOOD / BAD - action Types
     * @type {{add: Types, remove: Types}}
     */
    this.actions = {
      add,
      remove,
    };
    /**
     * コメント ID
     * @type {number}
     */
    this.commentId = commentId;
    /**
     * bind success
     * @type {function}
     */
    this.success = this.success.bind(this);
    /**
     * bind fail
     * @type {function}
     */
    this.fail = this.fail.bind(this);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * コメントId
  //  * @return {string} コメントIdを返します
  //  */
  // get commentId():number {
  //   return this._commentId;
  // }
  // /**
  //  * コメントId を設定
  //  * @param {number} id コメントId
  //  */
  // set commentId( id:number ):void {
  //   this._commentId = id;
  // }
  /**
   * url を作成します - {@link Path}.comment
   * @return {string} 作成した url を返します
   */
  get url() {
    return Path.comment(this._url, this.commentId);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // /**
  //  * start は使えません, add / remove を使用します
  //  * @param {string} method request method
  //  */
  // start(method:string = '') {
  //   // console.warn( 'illegal operation, use start. instead add / delete.' + method );
  // }
  /**
   * コメント Good / Bad 登録
   */
  add() {
    this.ajax.start(this.url, this.actions.add.method, this.success, this.fail, this.resultClass, this.headers);
  }
  /**
   * コメント Good / Bad 解除
   */
  remove() {
    this.ajax.start(this.url, this.actions.remove.method, this.success, this.fail, this.resultClass, this.headers, this.data);
  }
}
