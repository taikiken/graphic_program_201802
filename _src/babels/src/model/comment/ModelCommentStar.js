/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 15:35
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
import {CommentStar} from '../../action/comment/CommentStar';

/**
 * コメント GOOD / BAD を行い結果 event を返します
 */
export class ModelCommentStar extends Model {
  /**
   * コメント GOOD / BAD を行い結果 event を返します
   * @param {Number} commentId コメント Id
   * @param {string} type GOOD / BAD どちらか
   * @param {string} mode ADD / DELETE どちらか
   * @param {Object} [option={}] optional event handler
   */
  constructor( commentId:Number, type:string, mode:string, option:Object = {} ) {
    super( option );
    this._action = new CommentStar( commentId, type, mode, this.done.bind( this ), this.fail.bind( this ) );
    this._actionType = type;
    this._actionMode = mode;
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
      let error = new Error( `[MODEL_STAR:UNDEFINED]${this._actionType}:${this._actionMode}.サーバーレスポンスに問題が発生しました。` );
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
