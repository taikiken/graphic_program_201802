/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 22:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import View from '../View';

import {MessageStatus} from '../../event/MessageStatus';
import {CommentDeleteNode} from '../../node/modal/CommentDeleteNode';

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
 * コメント削除モーダル
 */
export default class ViewDeleteModal extends View {
  /**
   * コメント削除モーダル
   * @param {Element} element target HTMLElement
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, option = {}) {
    super(element, option);
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
   * 初期化 + {@link MessageStatus}.DELETE event を watch します
   */
  start() {
    const status = this.status;
    status.off(MessageStatus.DELETE, this.onModal);
    status.on(MessageStatus.DELETE, this.onModal);
  }
  /**
   * MessageStatus.DELETE event handler,
   * modal window を open します
   * @param {Object} event MessageStatus.DELETE event instance
   */
  onModal(event) {
    if (this._render === null) {
      this._render = ReactDOM.render(
        <CommentDeleteNode
          id={event.id}
          type={event.kind}
          ok={event.ok}
          cancel={event.cancel}
        />,
        this.element
      );
    } else {
      this._render.updateShow(true, event.id, event.ok, event.cancel, event.type);
    }
  }
}
