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
'use strict';

import {Safety} from './Safety';

/**
 * form error
 */
export class ErrorMessage {
  /**
   * form error
   * @param {string} message 初期設定エラーメッセージ
   */
  constructor( message:string = '' ) {
    this._message = message;
  }

  /**
   * エラー有無
   * @return {boolean} エラー有無を返します。 エラーあり: true
   */
  get error():boolean {
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
