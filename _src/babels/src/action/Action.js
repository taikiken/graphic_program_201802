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

// data
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

// net
import {Ajax} from '../net/Ajax';
// import {Types} from '../net/Types';

// interface
// 基本機能を設定し Interface として使用します

/**
 * Ajax 処理を行います
 *
 * Ajax 処理を行う Template Pattern として使用し
 * 各実装 Class で extends （継承）します
 *
 * - token（認証）が必要な場合は {@link ActionAuth} を使用します
 * - データ送信を伴う (POST, PUT, DELETE)場合は {@link ActionBehavior}, {@link ActionAuthBehavior} を使用します
 * - リクエストに offset, length が必要な時は {@link Offset} Class を継承します
 *
 * @example
 * class Offset extends Action {
 *  constructor(types, resolve = null, reject = null, offset = 0, length = Length.archive, ResultClass = Result) {
 *    super(types, resolve, reject);
 *  }
 * }
 */
export class Action {
  /**
   * Ajax 処理, query なし<br>
   * 1回だけのリクエストに使用します
   * @param {Types} types Types instance, Ajax request に使用します
   * @param {?Function} [resolve=null] Ajax 成功時の callback
   * @param {?Function} [reject=null] Ajax 失敗時の callback
   * @param {Result} [ResultClass=Result] 成功結果をセットします
   */
  constructor(types, resolve = null, reject = null, ResultClass = Result) {
    /**
     * API url, path option, query 情報を引数から保持します
     * @type {Types}
     * @protected
     */
    this._types = types;
    /**
     * Ajax 成功時の callback を引数から保持します
     * @type {?Function}
     * @protected
     */
    this._resolve = resolve;
    /**
     * Ajax 失敗時の callback を引数から保持します
     * @type {?Function}
     * @protected
     */
    this._reject = reject;
    /**
     * <p>Ajax instance を保持します<br>
     * `start` 時に各種パラメタを設定します</p>
     * @type {Ajax}
     * @protected
     */
    this._ajax = new Ajax();
    /**
     * API path を types 引数から取り出します
     * @type {string}
     * @protected
     */
    this._url = types.url;
    /**
     * `this._url` の代りに使用する Api path property
     * @type {string}
     * @since 2018-01-10
     */
    this.path = types.url;
    /**
     * API リクエスト時の method( GET, POST, PUT, DELETE )を types 引数から取り出します
     * @type {string}
     * @protected
     */
    this._method = types.method;
    /**
     * Ajax 成功時に処理する Class を保持します
     * @type {*|Result}
     * @protected
     */
    this._resultClass = ResultClass;
    /**
     * <p>Ajax 成功時の callback<br>
     * this.success を bind します</p>
     * @type {Function}
     * @protected
     */
    this._boundSuccess = this.success.bind(this);
    /**
     * <p>Ajax 失敗時の callback<br>
     * this.fail を bind します</p>
     * @type {Function}
     * @protected
     */
    this._boundFail = this.fail.bind(this);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url() {
    return this._url;
  }
  /**
   * url をを設定します
   * @param {string} url API path
   */
  set url(url) {
    this._url = url;
  }
  /**
   * GET|POST|DELETE|PUT form method を返します
   * @return {string|*} method, GET|POST|DELETE|PUT... を返します
   */
  get method() {
    return this._method;
  }
  /**
   * Types instance, Ajax request に使用します
   * - path, method 情報などが格納されています
   * @return {Types} Ajax request に使用する Types instance を返します
   */
  get types() {
    return this._types;
  }
  /**
   * 引数 resolve から設定された Ajax 成功時のコールバック関数
   * - 成功時に call します
   * @return {?Function} 引数 resolve から設定された Ajax 成功時のコールバック関数を返します
   */
  get resolve() {
    return this._resolve;
  }
  /**
   * 引数 reject から設定された Ajax 失敗時のコールバック関数
   * - 失敗時に call します
   * @return {?Function} 引数 reject から設定された Ajax 失敗時のコールバック関数を返します
   */
  get reject() {
    return this._reject;
  }
  /**
   * Ajax instance
   * API リクエスト時に使用します
   * @example
   * this.ajax.start(url, method, resolve, reject, ResultClass, headers, formData);
   *
   * @return {Ajax} API リクエスト時に使用する Ajax instance を返します
   */
  get ajax() {
    return this._ajax;
  }
  // /**
  //  * Ajax instance を設定します
  //  * @param {Ajax} ajax
  //  */
  // set ajax( ajax:Ajax ):void {
  //   this._ajax = ajax;
  // }
  /**
   * このクラスの Ajax 成功時のコールバック関数
   * - Ajax Class から成功時に call されます
   * @return {Function} このクラスの Ajax 成功時のコールバック関数を返します
   */
  get boundSuccess() {
    return this._boundSuccess;
  }
  /**
   * このクラスの Ajax 失敗時のコールバック関数
   * - Ajax Class から失敗時に call されます
   * @return {Function} このクラスの Ajax 失敗時のコールバック関数を返します
   */
  get boundFail() {
    return this._boundFail;
  }
  /**
   * 成功結果をセットする data Class
   * @return {Result} 成功結果をセットする data Class を返します
   */
  get resultClass() {
    return this._resultClass;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */
  start(method = this.method) {
    method = Safety.string(method, this.method);
    this.ajax.start(this.url, method, this.boundSuccess, this.boundFail, this.resultClass);
  }
  /**
   * Ajax success callback
   * @param {Result} result Ajax成功結果 data
   */
  success(result) {
    // success
    const resolve = this.resolve;
    if (typeof resolve === 'function') {
      resolve( result );
    }
  }
  /**
   * Ajax error callback
   * @param {Error} error Ajax失敗結果 Error instance
   */
  fail(error) {
    // error
    const reject = this.reject;
    if (typeof reject === 'function') {
      reject( error );
    }
  }
}
