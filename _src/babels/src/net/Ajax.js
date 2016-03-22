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


// import {Env} from '../app/Env';
import {Codes} from './../app/Codes';
import {Result} from '../data/Result';

// dae
import {StatusDae} from '../dae/StatusDae';

/**
 * 非同期通信でJSONを取得します
 */
export class Ajax {
  /**
   * Ajax instanceを作成し、実行可能プロパティを可能に設定します
   */
  constructor() {

    // 実行可否判断 flag は trueです
    this._can = true;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * リクエストが可能かを返します
   * W click などで二重送信になるのを防ぎます
   * @return {boolean} 実行可否 flag を返します
   */
  get can():boolean {

    return this._can;

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} url request URL
   * @param {string} method POST|GET...
   * @param {Function} resolve success callback
   * @param {Function} reject fail callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   * @param {Object} [headers=null] headers option, Authorization token など...
   * @param {FormData} [formData=null] FormData Object
   */
  start( url, method, resolve, reject, ResultClass = Result, headers:Object = null, formData:FormData = null ):void {

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

    let option = {
      method: method,
      cache: 'no-cache',
      // https://developers.google.com/web/updates/2015/03/introduction-to-fetch
      // credentials: 'include'
      credentials: 'same-origin'
    };

    // body へ FormData をセット
    if ( formData !== null && typeof formData !== 'undefined' ) {

      option.body = formData;

    }

    // headers option
    // headers が null or undefined の時は 追加しません
    if ( headers !== null && typeof headers !== 'undefined' ) {

      option.headers = headers;

    }

    console.log( `ajax.start: ${url}, ${method}`, option );

    // https://github.com/github/fetch
    // request を開始します
    fetch( url, option )
    .then( function( response ) {

      // check status (Server)
      let status = response.status;

      if ( status >= 200 && status < 300 ) {
        // may be ok
        return response;

      } else {

        // bad response, サーバーからのエラーメッセージ
        let error = new Error( `status:${status}, message:${response.statusText}` );

        error.result = new ResultClass( response.json() );
        error.status = new StatusDae( status );
        throw error;

      }

    } )
    .then( function( response ) {

      // parse JSON
      return response.json();

    } )
    .then( function( json:Object ) {

      // parsed JSON
      let result = new ResultClass( json );

      if ( !Codes.status( result.status.code ) ) {

        // something bad
        let code = result.status.code;
        let error = new Error( `status:${code}, user:${result.status.user_message}, dev:${result.status.developer_message}` );
        error.result = result;
        error.status = new StatusDae( result.status );
        throw error;

      }

      // success callback
      _this.enable();
      resolve( result );

    } )
    .catch( function( error ) {

      // 何か問題発生
      // 注意！Promise が永遠に続くので Dom rendering error でもここに戻る
      // error callback
      _this.enable();
      reject( error );

    } );

  }
  /**
   * 実行可否 flag を true にします
   */
  enable():void {

    this._can = true;

  }
  /**
   * 実行可否 flag を false にします
   */
  disable():void {

    this._can = false;

  }

}
