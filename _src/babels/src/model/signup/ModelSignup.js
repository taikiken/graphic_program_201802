/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from '../Model';
import {ModelBehavior} from '../ModelBehavior';
import {Result} from '../../data/Result';
import {Signup} from '../../action/signup/Signup';

/**
 * signup action を実行します
 */
export class ModelSignup extends ModelBehavior {
  /**
   * signup action を実行します
   * @param {FormData} [formData=null] リクエスト FormData
   * @param {Object} [option={}] optional event handler
   */
  constructor( formData:FormData = null, option:Object = {} ) {
    super( formData, option );
    // this._data = formData;
    this.action = new Signup( formData, this.done.bind( this ), this.fail.bind( this ) );
  }
  /**
   * Ajax request を開始します
   */
  start():void {

    if ( this.data === null ) {
      throw new Error( 'form data set first.' );
    }
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
      let error = new Error( '[SIGNUP:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
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
  fail( error:Error ):void {

    this.executeSafely( Model.RESPONSE_ERROR, error );

  }
}
