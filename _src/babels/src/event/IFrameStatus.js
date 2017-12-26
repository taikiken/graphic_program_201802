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
 * singleton を保証する Symbol - {@link IFrameStatus}
 * @type {Symbol}
 * @private
 */
const iframeStatusSymbol = Symbol('IFrameStatus singleton Symbol');
/**
 * IFrameStatus instance - singleton
 * @type {?IFrameStatus}
 * @private
 */
let singletonInstance = null;

/**
 * iframe 内部関数からの通知を `window.onmessage` から取得します
 * @since 2017-04-17
 */
export class IFrameStatus extends EventDispatcher {
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
  /**
   * iFrame mount 後に通知するイベント
   * @event DID_MOUNT
   * @returns {string} iFrameDidMount
   */
  static get DID_MOUNT() {
    return 'iFrameDidMount';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * singleton instance を返します
   * @returns {?IFrameStatus} singleton instance
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new IFrameStatus(iframeStatusSymbol);
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * singleton を保証し `window.onmessage` を監視します
   * @param {Symbol} target singleton のための Symbol
   * @returns {?IFrameStatus} singleton
   */
  constructor(target) {
    if (iframeStatusSymbol !== target) {
      throw new Error( 'CommentStatus is static Class. not use new IFrameStatus(). instead IFrameStatus.factory()' );
    }
    if (singletonInstance) {
      return singletonInstance;
    }
    // ---
    // once
    super();
    // instance
    singletonInstance = this;
    /**
     * bind onMessage
     * @type {function}
     */
    this.onMessage = this.onMessage.bind(this);
    // event bind
    window.addEventListener('message', this.onMessage, false);
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * window.message を受診し IFrameStatus.UPDATE を発火します
   * @param {number} id 記事id int 保証
   * @param {number} height iframe 高さ
   */
  update(id, height) {
    this.dispatch({ id, height, type: IFrameStatus.UPDATE });
  }
  /**
   * window.onmessage event handler
   * @param {Event} event event.data から 記事id と iframe.height を取り出し `this.update` を実行します
   */
  onMessage(event) {
    // const data = JSON.parse(event.data);
    const data = event.data;
    // console.log(`onMessage height: ${data.height}, id: ${data.id}`);
    if (data && data.height && data.id) {
      this.update(parseInt(data.id, 10), data.height);
    }
  }
  /**
   * iframe mount を通知します
   * @param {number} id マウントされた記事 ID
   */
  mount(id) {
    this.dispatch({ id, type: IFrameStatus.DID_MOUNT });
  }
}

