/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/29 - 20:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

/**
 * View callback の定型
 *
 * @example
 * var receiver = new Receiver();
 * receiver.didMount = function() {}
 * receiver.emptyError = function() {}
 *
 * var action = new View( element );
 * action.on( View.DID_MOUNT, receiver.didMount );
 * action.on( View.EMPTY_ERROR, receiver.emptyError );
 *
 */
export class Receiver {
  // /**
  //  * <p>View callback の定型<br>
  //  * instance を作成し callback をカスタマイズします<p>
  //  *
  //  */
  // constructor() {}
  /**
   * ReactDOM.render 前に呼び出されます
   * @param {Object} event Event object
   */
  beforeRender(event) {
    console.warn('Receiver.beforeRender', event, this);
  }
  /**
   * React.componentWillMount callback
   * @param {Object} event Event object
   */
  willMount(event) {
    console.warn('Receiver.willMount', event, this);
  }
  /**
   * React.componentDidMount callback
   * @param {Object} event Event object
   */
  didMount(event) {
    console.warn('Receiver.didMount', event, this);
  }
  /**
   * データが見つからない時に呼び出されます
   * @param {Error} error エラーインスタンス
   */
  undefinedError(error) {
    console.warn('Receiver.undefinedError', error, this);
  }
  /**
   * データが空の時に呼び出されます
   * @param {Error} error エラーインスタンス
   */
  emptyError(error) {
    console.warn('Receiver.emptyError', error, this);
  }
  /**
   * 処理中にエラーが起きた時に呼び出されます
   * @param {Error} error エラーインスタンス
   */
  responseError(error) {
    console.warn('Receiver.responseError', error, this);
  }
  /**
   * エラーDOMがマウントされた時に呼び出されます
   * @param {Error} error エラーインスタンス
   */
  errorMount(error) {
    console.warn('Receiver.errorMount', error, this);
  }
}
