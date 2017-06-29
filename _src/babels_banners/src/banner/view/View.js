/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 22:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * Ajax 処理を行い JSON 取得後 `component` をマウント処理親クラスです、
 * 各クラスで `extends` し使用します
 */
export default class View {
  /**
   * 各プロパティを準備します
   * @param {Ajax} ajax Ajax instance
   * @param {boolean} sp true: SP - component 出力時に使用します
   */
  constructor(ajax, sp) {
    /**
     * JSON 取得する {@link Ajax} instance
     * @type {Ajax}
     */
    this.ajax = ajax;
    /**
     * sp flag
     * @type {boolean}
     */
    this.sp = sp;
    /**
     * bind resolve - {@link Ajax} promise success
     * @type {function}
     */
    this.resolve = this.resolve.bind(this);
    /**
     * bind reject - {@link Ajax} promise error
     * @type {function}
     */
    this.reject = this.reject.bind(this);
  }
  /**
   * {@link Ajax} request を開始します
   * @param {string} path request path
   */
  start(path) {
    this.ajax.start(path, this.resolve, this.reject);
  }
  /**
   * {@link Ajax} promise success handler - 継承クラスで override します
   * @param {object} data JSON data
   */
  resolve(data) {
    console.warn('View.resolve', data);
  }
  /**
   * @link Ajax} promise error handler - 継承クラスで override します
   * @param {Error} error Ajax ERROR instance
   */
  reject(error) {
    console.warn('View.reject', error);
  }
}
