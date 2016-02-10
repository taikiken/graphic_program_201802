/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 18:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Offset} from './Offset';
// import {User} from '../app/User';
import {Length} from '../app/const/Length';
import {Token} from '../data/Token';
import {Safety} from '../data/Safety';

import {Result} from '../data/Result';
import {Types} from '../net/Types';

/**
 * **要認証** Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends して下さい
 */
export class OffsetAuth extends Offset {
  /**
   * **要認証** Ajax 処理, queryあり<br>
   * **Next 読込** がある時に使用します
   * @link Types.js
   *
   * @param {string} token Authorization token
   * @param {Types} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */
  constructor( token:string, types:Types, resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.archive, ResultClass = Result ) {
    /*
    // ログインか必須かよくわからない
    if ( !User.sign ) {
      // not login
      throw new Error( `Authorization required.` );
    }
    */
    super( types, resolve, reject, offset, length, ResultClass );
    this._headers = Token.token( token );
  }
  /**
   * 次の読込を開始します<br>
   * start の代わりに使用します
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */
  next( method:string = this.method ):void {

    // next data があるかないかを調べます
    // next がある時は Ajax を実行します
    if ( this.hasNext() ) {

      method = Safety.string( method, this.method );
      this._ajax.start( this.url, method, this.success.bind( this ), this.fail.bind( this ), this._resultClass, this._headers );

    }

  }
}
