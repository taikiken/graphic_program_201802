/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 15:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Result} from '../data/Result';
import {Ajax} from '../net/Ajax';
import {Types} from '../net/Types';

// interface
// 基本機能を設定し Interface として使用します

/**
 * Ajax 処理を行います
 * Interface として使用します
 * 各 Class で extends して下さい
 */
export class Action {
  /**
   * Ajax 処理, query なし
   * @param {Types} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( types:Types, resolve:Function = null, reject:Function = null ) {

    this._types = types;
    this._resolve = resolve;
    this._reject = reject;
    this._ajax = new Ajax();

  }

  /**
   * Ajax request を開始します
   */
  start():void {

    this._ajax.start( this.url(), this._types.method, this.success.bind( this ), this.fail.bind( this ) );

  }

  /**
   * url を作成します
   * @returns {string} 作成した url を返します
   */
  url():string {
    return this._types.url;
  }

  /**
   * Ajax success callback
   * @param {Result} result Ajax成功結果
   */
  success( result:Result ):void {

    // success
    var resolve = this._resolve;

    if ( typeof resolve === 'function' ) {

      resolve( result );

    }

  }

  /**
   * Ajax error callback
   * @param {Error} error Ajax失敗結果
   */
  fail( error:Error ):void {

    // error
    var reject = this._reject;

    if ( typeof reject === 'function' ) {

      reject( error );

    }

  }
}
