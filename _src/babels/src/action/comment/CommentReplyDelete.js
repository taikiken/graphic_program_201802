/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/26 - 15:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {ActionAuth} from '../ActionAuth';
import {Api} from '../../net/Api';
import {User} from '../../app/User';
import {Path} from '../../app/const/Path';
import {ActionType} from '../../app/const/ActionType';

/**
 * <p>コメントへのコメント削除</p>
 */
export class CommentReplyDelete extends ActionAuth {
  /**
   * コメントへのコメント削除 Action
   * @param {Number} articleId 記事 id
   * @param {Number} commentId コメント id
   * @param {Number} replyId reply comment id
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:Number, commentId:Number, replyId:Number, resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.replay( ActionType.DELETE ), resolve, reject );
    /**
     * 記事 ID
     * @type {Number}
     * @protected
     */
    this._articleId = articleId;
    /**
     * コメント ID
     * @type {Number}
     * @protected
     */
    this._commentId = commentId;
    /**
     * コメント返信 ID
     * @type {Number}
     * @protected
     */
    this._replyId = replyId;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return Path.reply( Path.comment( Path.article( this._url, this.articleId ), this.commentId ), this.replyId );
  }

  /**
   * 記事 ID
   * @return {Number} 記事 ID を返します
   */
  get articleId():Number {
    return this._articleId;
  }
  /**
   * コメント ID
   * @return {Number} コメント ID を返します
   */
  get commentId():Number {
    return this._commentId;
  }
  /**
   * コメント返信 ID
   * @return {Number} コメント返信 ID を返します
   */
  get replyId():Number {
    return this._replyId;
  }
}
