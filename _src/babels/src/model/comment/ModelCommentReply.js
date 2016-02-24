/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 16:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Model} from '../Model';
import {Result} from '../../data/Result';
import {CommentReply} from '../../action/comment/CommentReply';

/**
 * コメントへのコメント送信
 */
export class ModelCommentReply extends Model {
  /**
   * コメントへのコメント送信
   * @param {string} articleId 記事 id
   * @param {string|Number} commentId コメント ID
   * @param {FormData} formData comment form FormData
   * @param {Object} [option={}] optional event handler
   */
  constructor( articleId:string, commentId:string, formData:FormData, option:Object = {} ) {
    super( option );
    this._action = new CommentReply( articleId, commentId, formData, this.done.bind( this ), this.fail.bind( this ) );
  }
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.start();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let response = result.response;

    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[MODEL_COMMENT_REPLY:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( Model.UNDEFINED_ERROR, error );

    } else {

      // 成功 callback
      this.executeSafely( Model.COMPLETE, result );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error ):void {

    this.executeSafely( Model.RESPONSE_ERROR, error );

  }
}
