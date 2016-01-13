/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Codes} from './Codes';
import {Result} from '../data/Result';

/**
 * 非同期通信でJSONを取得します
 */
export class Ajax {
  /**
   * instanceを作成します
   *
   */
  constructor() {

    // 実行可否判断 flag は trueです
    this._can = true;

  }

  /**
   *
   * @param {string} url request URL
   * @param {string} method POST|GET...
   * @param {Function} resolve success callback
   * @param {Function} reject fail callback
   */
  start( url, method, resolve, reject ) {

    let fetch = self.fetch;
    let _this = this;

    // 実行可否をチェックし, false の時は何もしません
    if ( !this.can ) {

      let error = new Error( `status:999, message:duplicate or busy.` );
      error.response = {};
      error.number = 999;
      reject( error );
      return;

    }

    // flag off
    this.disable();

    console.log( `ajax.start: ${url}, ${method}` );

    // https://github.com/github/fetch
    // request を開始します
    fetch( url, {
      method: method
    } )
    .then( function( response ) {
      // check status (Server)
      let status = response.status;

      if ( status >= 200 && status < 300 ) {
        // may be ok
        return response;

      } else {

        // bad response, サーバーからのエラーメッセージ
        let error = new Error( `status:${status}, message:${response.statusText}` );
        error.response = response;
        error.number = status;
        throw error;

      }

    } )
    .then( function( response ) {

      // parse JSON
      return response.json();

    } )
    .then( function( json:Object ) {
      // parsed JSON
      let result = new Result( json );

      if ( !Codes.status( result.status.code ) ) {
        // something bad
        let code = result.status.code;
        let error = new Error( `status:${code}, user:${result.status.user_message}, dev:${result.status.developer_message}` );
        error.response = result.response;
        error.number = result.status.code;
        throw error;
      }

      _this.enable();
      resolve( result );

    } )
    .catch( function( error ) {

      _this.enable();
      reject( error );

    } );

  }

  /**
   * 実行可否 flag を true にします
   */
  enable() {

    this._can = true;

  }
  /**
   * 実行可否 flag を false にします
   */
  disable() {

    this._can = false;

  }

  /**
   *
   * @return {boolean} 実行可否 flag を返します
   */
  get can() {

    return this._can;

  }
}
