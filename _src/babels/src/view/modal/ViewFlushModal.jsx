/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/26 - 13:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import View from '../View';

import {MessageStatus} from '../../event/MessageStatus';

// node
import {FlushNode} from '../../node/modal/FlushNode';

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
 * フラッシュ・メッセージ・モーダル
 */
export default class ViewFlushModal extends View {
  /**
   * フラッシュ・メッセージ・モーダル
   * @param {Element} element target HTMLElement
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2-18-04-19 vk header - flag 追加
   */
  constructor(element, option = {}, vk = false) {
    super(element, option, vk);
    /**
     * modal instance
     * @type {null|Object}
     * @private
     */
    this._render = null;
    /**
     * bind onModal
     * @type {function}
     */
    this.onModal = this.onModal.bind(this);
    /**
     * 完了・注意など一時表示メッセージイベント instance
     * @type {MessageStatus}
     */
    this.status = MessageStatus.factory();
  }
  /**
   * 初期化
   */
  start() {
    this.render();

    const status = this.status;
    status.off(MessageStatus.FLUSH, this.onModal);
    status.on(MessageStatus.FLUSH, this.onModal);
  }
  /**
   * component 作成
   */
  render():void {
    this._render = ReactDOM.render(
      <FlushNode />,
      this.element,
    );
  }
  /**
   * MessageStatus.FLUSH event handler,
   * modal window を open します
   * @param {Object} event MessageStatus.FLUSH event instance
   */
  onModal(event) {
    // console.log( 'flush modal event ', event );
    this._render.updateShow(true, event.message, event.kind, event.sp);
  }
}
