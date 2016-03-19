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

import {Safety} from '../data/Safety';

// interface
// 基本機能を設定し Interface として使用します

/**
 * Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends します
 */
export class Action {
  /**
   * Ajax 処理, query なし<br>
   * 1回だけのリクエストに使用します
   * @param {Types} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */
  constructor( types:Types, resolve:Function = null, reject:Function = null, ResultClass = Result ) {

    this._types = types;
    this._resolve = resolve;
    this._reject = reject;
    this._ajax = new Ajax();
    this._url = types.url;
    this._method = types.method;
    this._resultClass = ResultClass;
    this._boundSuccess = this.success.bind( this );
    this._boundFail = this.fail.bind( this );

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return this._url;
  }
  /**
   * GET|POST|DELETE|PUT form method を返します
   * @return {string|*} method, GET|POST|DELETE|PUT... を返します
   */
  get method():string {
    return this._method;
  }

  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */
  start( method:string = this.method ):void {

    method = Safety.string( method, this.method );
    this._ajax.start( this.url, method, this._boundSuccess, this._boundFail, this._resultClass );

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
