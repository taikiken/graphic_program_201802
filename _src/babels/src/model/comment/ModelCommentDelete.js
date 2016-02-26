/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/26 - 15:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Model} from '../Model';
import {CommentDelete} from '../../action/comment/CommentDelete';
import {Result} from '../../data/Result';

/**
 * 記事へのコメント削除を行います
 */
export class ModelCommentDelete extends Model {
  /**
   * 記事へのコメント削除を行います
   * @param {string} articleId 記事 id
   * @param {string} commentId コメント id
   * @param {Object} [option={}] optional event handler
   */
  constructor( articleId:string, commentId:string, option:Object = {} ) {
    super( option );
    this._action = new CommentDelete( articleId, commentId, this.done.bind( this ), this.fail.bind( this ) );
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

      // response undefined
      // JSON に問題がある
      let error = new Error( '[MODEL_COMMENT_DELETE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
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
