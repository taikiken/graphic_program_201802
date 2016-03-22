/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 21:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from '../Model';
import {SettingsAccount} from '../../action/settings/SettingsAccount';
import {UserDae} from '../../dae/UserDae';
import {Result} from '../../data/Result';

/**
 * 設定・アカウント 取得
 */
export class ModelAccount extends Model {
  /**
   * 設定・アカウント 取得
   * @param {Object} [option={}] optional event handler
   */
  constructor( option:Object = {} ) {
    super( option );
    this._action = new SettingsAccount( this.done.bind( this ), this.fail.bind( this ) );
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
      let error = new Error( '[MODEL_ACCOUNT:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( Model.UNDEFINED_ERROR, error );

    } else {

      // 成功 callback
      this.executeSafely( Model.COMPLETE, new UserDae( response ) );

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
