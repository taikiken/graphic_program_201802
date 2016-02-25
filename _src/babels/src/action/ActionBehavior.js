/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/19 - 20:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Action} from './Action';
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';
import {Types} from '../net/Types';

/**
 * token なし POST
 */
export class ActionBehavior extends Action {
  /**
   * token なし POST
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {FormData} [formData=null] FormData リクエストで必要の場合に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */
  constructor( types:Types, formData:FormData = null, resolve:Function = null, reject:Function = null, ResultClass = Result ) {
    super( types, resolve, reject, ResultClass );
    this._data = formData;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 設定された FormData instance
   * @returns {FormData} 設定された FormData instance を返します
   */
  get data():FormData {
    return this._data;
  }
  /**
   * FormData instance 設定します
   * @param {FormData} formData FormData instance
   */
  set data( formData:FormData ):void {
    this._data = formData;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [method=this.method] request method POST
   */
  start( method:string = this.method ):void {

    method = Safety.string( method, this.method );
    this._ajax.start( this.url, method, this._boundSuccess, this._boundFail, this._resultClass, null, this._data );

  }
}
