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
 * コメントへのコメント削除
 */
export class CommentReplyDelete extends ActionAuth {
  /**
   * コメントへのコメント削除 Action
   * @param {string} articleId 記事 id
   * @param {string} commentId コメント id
   * @param {string} replyId reply comment id
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:string, commentId:string, replyId:string, resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.replay( ActionType.DELETE ), resolve, reject );
    this._articleId = articleId;
    this._commentId = commentId;
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
    return Path.reply( Path.comment( Path.article( this._url, this._articleId ), this._commentId ), this._replyId );
  }
}
