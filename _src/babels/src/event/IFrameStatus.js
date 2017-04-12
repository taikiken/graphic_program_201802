/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/04/12 - 19:16
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { EventDispatcher } from './EventDispatcher';

// private
/**
 * singleton を保証する Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('IFrameStatus singleton Symbol');
/**
 * IFrameStatus instance - singleton
 * @type {?IFrameStatus}
 * @private
 */
let _instance = null;

export class IFrameStatus extends EventDispatcher {
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  static factory() {
    if (_instance === null) {
      _instance = new IFrameStatus(_symbol);
    }
    return _instance;
  }
  // ---------------------------------------------------
  //  STATIC EVENT
  // ---------------------------------------------------
  /**
   * iFrame.onload 後に高さを通知するイベント
   * @event UPDATE
   * @returns {string} iFrameStatusUpdate
   */
  static get UPDATE() {
    return 'iFrameStatusUpdate';
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(target) {
    if (_symbol !== target) {
      throw new Error( 'CommentStatus is static Class. not use new IFrameStatus(). instead IFrameStatus.factory()' );
    }
    if (_instance) {
      return _instance;
    }
    // ---
    // once
    super();
    // instance
    _instance = this;
    // event bind
    window.addEventListener('message', this.onMessage.bind(this), false);
    return _instance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  update(id, height) {
    this.dispatch({ id, height, type: IFrameStatus.UPDATE });
  }
  onMessage(event) {
    const data = event.data;
    if (data.height && data.id) {
      this.update(parseInt(data.id, 10), data.height);
    }
  }
}

