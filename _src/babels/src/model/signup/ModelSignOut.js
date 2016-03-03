/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/03 - 22:18
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
import {SignOut} from '../../action/signup/SignOut';
import {StatusDae} from '../../dae/StatusDae';

/**
 * 退会処理
 */
export class ModelSignOut extends Model {
  /**
   * 退会処理
   * @param {Object} [option={}] optional event handler
   */
  constructor( option:Object = {} ) {
    super( option );
    this._action = new SignOut( this.done.bind( this ), this.fail.bind( this ) );
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

    let status = new StatusDae( result.status );
    console.log( 'ModelSignOut done ', status );
    if ( status.code !== 200 ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[SIGN_OUT:UNDEFINED]サーバーレスポンスに問題が発生しました。' + status.code );
      this.executeSafely( Model.UNDEFINED_ERROR, error );

    } else {

      // 成功 callback
      this.executeSafely( Model.COMPLETE, status );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( Model.RESPONSE_ERROR, error );

  }
}
