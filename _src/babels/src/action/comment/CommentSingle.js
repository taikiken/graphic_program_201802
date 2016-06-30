/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 21:42
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {OffsetAuth} from '../OffsetAuth';
import {Api} from '../../net/Api';
import {User} from '../../app/User';
import {Path} from '../../app/const/Path';
// import {CommentsType} from '../../app/const/CommentsType';
// import {Safety} from '../../data/Safety';

/**
 * <p>コメント詳細</p>
 */
export class CommentSingle extends OffsetAuth {
  /**
   * コメント詳細
   * @param {Number} articleId コメントを取得する記事 ID
   * @param {Number} commentId コメント ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:Number, commentId:Number, resolve, reject ) {
    super( User.token, Api.comment( 'single' ), resolve, reject );
    /**
     * コメントを取得する記事ID
     * @type {Number}
     * @protected
     */
    this._id = articleId;
    /**
     * コメント ID
     * @type {Number}
     * @protected
     */
    this._commentId = commentId;
  }
  /**
   * 再読み込み
   */
  reload():void {
    /**
     * 再読み込みフラッグ
     * @override
     * @type {boolean}
     */
    this.reloadFlag = true;
    let url = `${Path.comment( Path.article( this._url, this.id ), this.commentId )}?offset=0&length=${this.offset}`;
    this.ajax.start( url, this.method, this.boundSuccess, this.boundFail, this.resultClass, this.headers );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 記事ID
   * @return {Number|*} 記事IDを返します
   */
  get id():Number {
    return this._id;
  }
  /**
   * コメント ID
   * @return {Number|*} コメント IDを返します
   */
  get commentId():Number {
    return this._commentId;
  }
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return `${Path.comment( Path.article( this._url, this.id ), this.commentId )}?offset=${this.offset}&length=${this.length}`;
  }
}
