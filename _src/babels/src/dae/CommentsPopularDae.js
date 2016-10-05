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


import {PopularDae} from './comments/PopularDae';
import {Safety} from '../data/Safety';

/**
 * article.comments_popular
 */
export class CommentsPopularDae {
  /**
   * article.comments_popular
   * @param {Array} [comments=[]] article.comments_popular
   */
  constructor( comments:Array = [] ) {

    comments = Safety.array( comments );
    /**
     * article.comments_popular
     * @type {Array}
     * @protected
     */
    this._comments = comments;
    /**
     * article.comments_popular を 1件づつ PopularDae instance にし配列へ格納します
     * @type {null|Array<PopularDae>}
     * @protected
     */
    this._popularComments = null;
    this.init();
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * PopularDae instance を作成します
   */
  init() {
    if ( this._popularComments === null ) {
      let popularComments = [];
      for ( var comment of this._comments ) {
        popularComments.push( new PopularDae( comment ) );
      }

      this._popularComments = popularComments;
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * article.comments_popular オリジナル
   * @return {Array|*} article.comments_popular オリジナルを返します
   */
  get original():Array {
    return this._comments;
  }
  /**
   * article.comments_popular
   * @return {Array<CommentsDae>} article.comments_popular 配列, CommentsDae型を返します
   */
  get comments():Array<PopularDae> {
    return this._popularComments.slice( 0 );
  }
  /**
   * this.total alias
   * @return {Number} article.comments_popular.length
   */
  get length():Number {
    return this.total;
  }
  /**
   * comments_popular 配列数
   * @return {Number} article.comments_popular.length
   */
  get total():Number {
    return this.comments.length;
  }
  /**
   * comment 1 件目の存在有無
   * @return {Boolean} article.comments_popular 1件目があるかないかの真偽値を返します
   */
  get hasFirst():Boolean {
    return this.total > 0;
  }
  /**
   * comment 2 件目以降の存在有無
   * @return {Boolean} article.comments_popular 2件目以降があるかないかの真偽値を返します
   */
  get hasSecond():Boolean {
    return this.total > 1;
  }
  /**
   * 先頭のCommentsDae
   * @return {CommentsDae} 1件目のCommentsDaeを返します
   */
  get first():PopularDae {
    this.init();
    return this.comments[ 0 ];
  }
  /**
   * 先頭以外の配列
   * @return {Array.<PopularDae>} 2件目以降の配列を返します
   */
  get exceptFirst():Array<PopularDae> {
    // hasSecond false でも配列を担保します
    let clone = [].slice(0);

    if ( this.hasSecond ) {
      clone = this.comments.slice(0);
      clone.shift();
    }
    return clone;

  }
  /**
   * 先頭以外の配列, alias this.exceptFirst
   * @return {Array.<PopularDae>} 2件目以降の配列を返します
   */
  get seconds():Array<PopularDae> {
    return this.exceptFirst;
  }
}
