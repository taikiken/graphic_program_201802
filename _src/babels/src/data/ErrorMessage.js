/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 0:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from './Safety';

/**
 * form error 表示用の 管理クラスです
 *
 * ```
 * let email = new ErrorMessage();
 *
 * // error set
 * email.message = 'エラーがありました';
 *
 * // 判定
 * if ( email.error ) {
 *  // error あり
 * }
 * ```
 */
export class ErrorMessage {
  /**
   * form error 表示
   * @param {string} [message=''] 初期設定エラーメッセージ
   */
  constructor( message:string = '' ) {
    /**
     * エラーメッセージ
     * @type {string}
     * @protected
     */
    this._message = message;
  }
  /**
   * エラー有無を取得します
   * @return {Boolean} エラー有無を返します。 エラーあり: true
   */
  get error():Boolean {
    return this._message !== '';
  }
  /**
   * エラーメッセージ
   * @return {string|*} エラーメッセージ を返します
   */
  get message():string {
    return this._message;
  }
  /**
   * エラーメッセージ を設定します
   * @param {string} message エラーメッセージ
   */
  set message( message:string ):void {
    this._message = Safety.string( message, '' );
  }
  /**
   * エラーなしにします
   */
  reset():void {
    this.message = '';
  }
}
