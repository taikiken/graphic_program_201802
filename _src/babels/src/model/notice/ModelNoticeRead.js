/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/03 - 15:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from '../Model';
import {Result} from '../../data/Result';
import {NoticeRead} from '../../action/users/NoticeRead';
import {StatusDae} from '../../dae/StatusDae';

/**
 * お知らせの既読化
 */
export class ModelNoticeRead extends Model {
  /**
   * お知らせの既読化
   * @param {Object} [option={}] optional event handler
   */
  constructor( option:Object = {} ) {
    super( option );
    this._action = new NoticeRead( this.done.bind( this ), this.fail.bind( this ) );
  }
  /**
   * Ajax request を開始します, 全て既読化します
   */
  start():void {

    this.action.start();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let status:StatusDae = new StatusDae( result.status );

    if ( status.code !== 200 ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[MODEL_NOTICE_READ:UNDEFINED]サーバーレスポンスに問題が発生しました。' + status.code );
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
