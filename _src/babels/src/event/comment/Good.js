/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 18:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint constructor-super: 0 */

import {EventDispatcher} from '../EventDispatcher';
import {CommentStatus} from '../CommentStatus';

/**
 * {@link Good} inner symbol
 * @type {symbol}
 */
const goodSymbol = Symbol('Good symbol');
/**
 * {@link Good} singleton instance
 * @type {?Good}
 */
let singletonInstance = null;

/**
 * コメントの good
 */
export class Good extends EventDispatcher {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {Good} Good instance を返します
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new Good(goodSymbol);
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * コメントの good
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {Good} Good instance
   */
  constructor(target) {
    if (goodSymbol !== target) {
      throw new Error( 'Good is static Class. not use new Good(). instead Good.factory()' );
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
   * - page 内に複数の記事詳細が存在するようになるため記事IDを識別子として加える
   * @param {string} type コメントタイプ
   * @param {string|Number} commentId コメント Id
   * @param {string} articleId 記事Id
   * @2016-11-05 article ID added
   */
  fire(type, commentId, articleId) {
    this.dispatch({ type, commentId, articleId });
  }
  /**
   * good する
   * - page 内に複数の記事詳細が存在するようになるため記事IDを識別子として加える</p>
   * @param {string} commentId コメントId
   * @param {string} articleId 記事Id
   * @2016-11-05 article ID added
   */
  add(commentId:string, articleId) {
    this.fire(CommentStatus.GOOD_ADD, commentId, articleId);
  }
  /**
   * good を外す
   * - page 内に複数の記事詳細が存在するようになるため記事IDを識別子として加える</p>
   * @param {string} commentId コメントId
   * @param {string} articleId 記事Id
   * @2016-11-05 article ID added
   */
  remove(commentId, articleId) {
    this.fire(CommentStatus.GOOD_DELETE, commentId, articleId);
  }
}
