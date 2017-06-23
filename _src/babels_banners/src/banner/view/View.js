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

export default class View {
  constructor(ajax, sp) {
    this.ajax = ajax;
    this.sp = sp;
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  start(path) {
    this.ajax.start(path, this.resolve, this.reject);
  }
  resolve(data) {
    console.warn('View.resolve', data);
  }
  reject(error) {
    console.warn('View.reject', error);
  }
}
