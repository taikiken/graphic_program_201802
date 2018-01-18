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
import Codes from './../app/Codes';
// data
import {Result} from '../data/Result';
// dae
import {StatusDae} from '../dae/StatusDae';

/**
 * 非同期通信でJSONを取得します
 * - Fetch API を使用し通信を行います
 * - Action 系 Class で extends し使用します - **直接実行することはありません**
 * @see https://github.com/github/fetch
 * @see https://developers.google.com/web/updates/2015/03/introduction-to-fetch
 */
export class Ajax {
  /**
   * Ajax instanceを作成し、実行可能プロパティを可能に設定します
   */
  constructor() {
    /**
     * Ajax request 実行可否判断 flag
     * - 二重送信を防止するために使用します
     * - true: 実行可能
     * - false: 実行不可
     * @type {boolean}
     * @private
     */
    this._can = true;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * リクエストが可能かを取得します
   * - W click などで二重送信になるのを防ぎます
   * @return {boolean} 実行可否 flag を返します
   */
  get can() {
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
  start(url, method, resolve, reject, ResultClass = Result, headers = null, formData = null) {
    const fetch = self.fetch;
    // let _this = this;

    // 実行可否をチェックし, false の時は何もしません
    if (!this.can) {
      let error = new Error( 'status:999, message:duplicate or busy.' );
      error.response = {};
      error.number = 999;
      reject( error );
      return;
    }

    // flag off
    this.disable();

    const option = {
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

    // console.log(`Ajax.start: ${url}, ${method}`, option);

    // https://github.com/github/fetch
    // request を開始します
    fetch( url, option )
    .then((response) => {
      // check status (Server)
      const status = response.status;
      // console.log('Ajax.then response', response);
      if (status >= 200 && status < 300) {
        // may be ok
        return response;
      }
      // bad response, サーバーからのエラーメッセージ
      const error = new Error( `status:${status}, message:${response.statusText}` );

      error.result = new ResultClass( response.json() );
      error.status = new StatusDae( status );
      throw error;
    } )
    .then((response) => {
      // parse JSON
      return response.json();
    } )
    .then((json) => {
      // parsed JSON
      const result = new ResultClass( json );
      // console.log('Ajax.then result', result);
      if ( !Codes.status( result.status.code ) ) {
        // something bad
        let code = result.status.code;
        let error = new Error( `status:${code}, user:${result.status.user_message}, dev:${result.status.developer_message}` );
        error.result = result;
        error.status = new StatusDae( result.status );
        throw error;
      }

      // success callback
      this.enable();
      resolve(result);
      return result;
    } )
    .catch((error) => {
      // 何か問題発生
      // 注意！Promise が永遠に続くので Dom rendering error でもここに戻る
      // error callback
      // console.log('Ajax.then error', error);
      this.enable();
      reject(error);
      return error;
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

}
