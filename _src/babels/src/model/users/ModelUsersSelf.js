/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/03 - 16:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from '../Model';
import {UsersSelf} from '../../action/users/UsersSelf';
import {UserDae} from '../../dae/UserDae';
import {Result} from '../../data/Result';

/**
 * <p>マイページの表示に利用<br>
 * 自分の情報を取得します</p>
 */
export class ModelUsersSelf extends Model {
  /**
   * マイページの表示に利用, 自分の情報
   * @param {Object} [option={}] optional event handler
   */
  constructor( option:Object = {} ) {
    super( option );
    this.action = new UsersSelf( this.done.bind( this ), this.fail.bind( this ) );
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
      let error = new Error( '[USER_SELF:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
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
  fail( error ):void {

    this.executeSafely( Model.RESPONSE_ERROR, error );

  }
}
