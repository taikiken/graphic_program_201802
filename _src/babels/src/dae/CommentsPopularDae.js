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
    console.log( 'CommentsPopularDae comments ', comments );
    this._comments = [];
    for ( var comment of comments ) {
      this._comments.push( new PopularDae( comment ) );
    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Array<CommentsDae>} article.comments_popular 配列, CommentsDae型を返します
   */
  get comments():Array<PopularDae> {
    return this._comments;
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
   * @return {boolean} article.comments_popular 1件目があるかないかの真偽値を返します
   */
  get hasFirst():boolean {
    return this.total > 0;
  }
  /**
   * comment 2 件目以降の存在有無
   * @return {boolean} article.comments_popular 2件目以降があるかないかの真偽値を返します
   */
  get hasSecond():boolean {
    return this.total > 1;
  }
  /**
   * 先頭のCommentsDae
   * @return {CommentsDae} 1件目のCommentsDaeを返します
   */
  get first():PopularDae {
    return this.comments[ 0 ];
  }
  /**
   * 先頭以外の配列
   * @return {Array.<CommentsDae>} 2件目以降の配列を返します
   */
  get exceptFirst():Array<PopularDae> {

    let clone;

    if ( this.hasSecond ) {
      clone = this.comments.splice( 0 );
      clone.shift();
    }
    return clone;

  }
  /**
   * 先頭以外の配列, alias this.exceptFirst
   * @return {Array.<CommentsDae>} 2件目以降の配列を返します
   */
  get seconds():Array<PopularDae> {
    return this.exceptFirst;
  }
}
