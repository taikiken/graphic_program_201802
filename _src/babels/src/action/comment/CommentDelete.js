/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/26 - 14:57
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
 * <p>記事へのコメント削除</p>
 */
export class CommentDelete extends ActionAuth {
  /**
   * 記事へのコメント削除 Action
   * @param {Number} articleId 記事 id
   * @param {Number} commentId コメント id
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:string, commentId:string, resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.comment( ActionType.DELETE ), resolve, reject );
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
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return Path.comment( Path.article( this._url, this.articleId ), this.commentId );
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
}
