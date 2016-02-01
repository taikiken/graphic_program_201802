/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 17:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Action} from './Action';
import {User} from '../app/User';
import {Token} from '../data/Token';
import {Safety} from '../data/Safety';

import {Result} from '../data/Result';
import {Types} from '../net/Types';

/**
 * **要認証** Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends して下さい
 */
export class ActionAuth extends Action {
  /**
   * **要認証** Ajax 処理
   * @param {string} token Authorization token
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */
  constructor( token:string, types:Types, resolve:Function = null, reject:Function = null, ResultClass = Result ) {
    if ( !User.sign ) {
      // not login
      throw new Error( `Authorization required.` );
    }
    super( types, resolve, reject, ResultClass );
    this._headers = Token.token( token );
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
    this._ajax.start( this.url, method, this.success.bind( this ), this.fail.bind( this ), this._resultClass, this._headers );

  }
}
