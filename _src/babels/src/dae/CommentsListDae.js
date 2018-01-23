/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 22:36
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {CommentsDae} from './comments/CommentsDae';
import {Safety} from '../data/Safety';

/**
 * コメント一覧表示,
 * 再帰的に処理する必要があったため少々複雑な処理工程を辿ります
 *
 * - {@link CommentsListDae}
 * - {@link CommentsDae}
 * - {@link PopularDae}
 * - {@link ReplyDae}
 * - {@link CommentsPopularDae}
 * */
export class CommentsListDae {
  /**
   * コメント一覧表示 reply 含む
   * @param {Object} response JSON.response
   */
  constructor(response = {}) {
    response = Safety.object(response);
    /**
     * JSON.response
     * @type {Object}
     * @protected
     */
    this._response = response;
    // console.log( 'CommentsListDae ', response, response.comments );
    /**
     * response.comments
     * @type {CommentsDae}
     * @protected
     */
    this._comments = new CommentsDae(response.comments);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response
   * @return {Object|*} JSON.response を返します
   */
  get response() {
    return this._response;
  }
  /**
   * 総コメント数
   * @return {number} response.count を返します
   */
  get total() {
    return this.response.count;
  }
  /**
   * alias this.total
   * @return {number} response.count を返します
   */
  get count() {
    return this.total;
  }
  /**
   * response.comments
   * @return {CommentsDae} response.comments を CommentsDae instance に内包し返します
   */
  get comments() {
    return this._comments;
  }
}
