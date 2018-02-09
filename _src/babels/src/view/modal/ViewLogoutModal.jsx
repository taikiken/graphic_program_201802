/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/08 - 19:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import View from '../View';
// node
import {LogoutNode} from '../../node/modal/LogoutNode';
// event
import {LogoutStatus} from '../../event/LogoutStatus';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * logout modal control
 */
export default class ViewLogoutModal extends View {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * logout modal 表示
   * @param {Element} element 親 Element
   * @param {?Function} [yesCallback=null] yes / ok click callback
   * @param {?Function} [noCallback=null] no / cancel click callback
   */
  constructor(element, yesCallback = null, noCallback = null) {
    super( element );
    /**
     * modal instance
     * @type {null|Object}
     * @private
     */
    this._render = null;
    /**
     * yes / ok click callback
     * @type {Function}
     * @private
     */
    this._yes = yesCallback;
    /**
     * no / cancel click callback
     * @type {Function}
     * @private
     */
    this._no = noCallback;
    /**
     * LogoutStatus instance
     * @type {LogoutStatus}
     * @private
     */
    this._status = LogoutStatus.factory();
    /**
     * bind onOpen
     * @type {function}
     */
    this.onOpen = this.onOpen.bind(this);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @param {Function} callback ok / yes callback
   */
  set yes(callback) {
    this._yes = callback;
  }
  /**
   * @param {Function} callback cancel / no callback
   */
  set no(callback) {
    this._no = callback;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * rendering 開始
   */
  start() {
    this.render();
  }
  /**
   * rendering - {@link LogoutNode}
   */
  render() {
    if ( this._render === null ) {
      this._render = ReactDOM.render(
        <LogoutNode
          ok={this._yes}
          cancel={this._no}
        />,
        this.element
      );
    }
    const status = this._status;
    status.off(LogoutStatus.OPEN, this.onOpen);
    status.on(LogoutStatus.OPEN, this.onOpen);
  }
  /**
   * modal 開く
   */
  open() {
    if (this._render !== null) {
      this._render.updateShow(true);
    }
  }
  /**
   * LogoutStatus.OPEN event handler
   * event が発生したら this.open を実行します
   */
  onOpen() {
    // console.log( 'logout open event handler will open logout modal........' );
    this.open();
  }
}
