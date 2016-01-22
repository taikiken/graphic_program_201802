/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * article.comments_popular
 */
export class CommentsPopularDae {
  /**
   * article.comments_popular
   * @param {Array} [comments=[]] article.comments_popular
   */
  constructor( comments:Array = [] ) {
    this._comments = comments;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Array|*} article.comments_popular
   */
  get comments():Array {
    return this._comments;
  }
  /**
   * @return {Number} article.comments_popular.length
   */
  get length():Number {
    return this.comments.length;
  }
}
