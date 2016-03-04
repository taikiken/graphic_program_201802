/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 22:47
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Dom} from '../dom/Dom';

let _symbol = Symbol();

// UT
let UT = self.UT;

/**
 * <h3>Comment 詳細</h3>
 * 全て static です
 */
export class Comment {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Comment is static Class. not use new Comment().` );

    }
  }
  /**
   * コメント 詳細
   * @param {Number} articleId 記事 ID :article_id
   * @param {Number} commentId コメント ID
   */
  static comment( articleId:Number, commentId:Number ):void {
    let commentNormal = Dom.commentNormal();

    // comment 詳細
    if ( commentNormal !== null ) {
      let comment = new UT.view.ViewCommentSingle( articleId, commentId, commentNormal );
      comment.start();
    }

    Comment.single( articleId );
  }
  /**
   * コメント返信 詳細
   * @param {Number} articleId 記事 ID :article_id
   * @param {Number} commentId コメント ID
   * @param {Number} replyId コメント返信 ID
   */
  static reply( articleId:Number, commentId:Number, replyId:Number ):void {
    let commentNormal = Dom.commentNormal();

    // comment 詳細
    if ( commentNormal !== null ) {
      let comment = new UT.view.ViewCommentSingle( articleId, commentId, commentNormal, replyId );
      comment.start();
    }

    Comment.single( articleId );
  }

  /**
   * 記事タイトル
   * @param {Number} articleId 記事 ID
   */
  static single( articleId:Number ):void {
    let headerElement = Dom.singleHeader();
    if ( headerElement !== null ) {
      let title = new UT.view.single.ViewSingleTitle( articleId, headerElement );
      title.start();
    }
  }
}
