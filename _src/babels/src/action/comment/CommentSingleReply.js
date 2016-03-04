/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 22:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {CommentSingle} from './CommentSingle';
import {Path} from '../../app/const/Path';

/**
 * コメント返信の詳細
 */
export class CommentSingleReply extends CommentSingle {
  /**
   * コメント返信の詳細
   * @param {Number} articleId コメントを取得する記事 ID
   * @param {Number} commentId コメント ID
   * @param {Number} replyId コメント返信 ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:Number, commentId:Number, replyId:Number, resolve, reject ) {
    super( articleId, commentId, resolve, reject );
    this._replyId = replyId;
  }
  /**
   * 再読み込み
   */
  reload():void {
    this._reload = true;
    let url = `${Path.reply( Path.comment( Path.article( this._url, this.id ), this.commentId ), this.replyId )}?offset=0&length=${this.offset}`;
    this._ajax.start( url, this.method, this._boundSuccess, this._boundFail, this._resultClass, this._headers );
  }
  /**
   * コメントへの返信 ID
   * @return {Number|*} コメントへの返信 IDを返します
   */
  get replyId():Number {
    return this._replyId;
  }
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return `${Path.reply( Path.comment( Path.article( this._url, this.id ), this.commentId ), this.replyId )}?offset=${this.offset}&length=${this.length}`;
  }
}
