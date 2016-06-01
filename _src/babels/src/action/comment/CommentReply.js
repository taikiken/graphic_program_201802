/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 16:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {ActionAuthBehavior} from '../ActionAuthBehavior';
import {Api} from '../../net/Api';
import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {Path} from '../../app/const/Path';

/**
 * <p>コメントへのコメント返信</p>
 */
export class CommentReply extends ActionAuthBehavior {
  /**
   * コメントへのコメント返信
   * @param {Number} articleId 記事 id
   * @param {Number} commentId コメント id
   * @param {FormData} formData body に送る FormData
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:string, commentId:string, formData:FormData, resolve:Function = null, reject:Function = null ) {
    if ( !Safety.isFormData( formData ) ) {
      throw new Error( 'need correct formData ', formData );
    }
    super( User.token, Api.comment( 'reply' ), formData, resolve, reject );
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
