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

import {View} from '../View';

import {MessageStatus} from '../../event/MessageStatus';

// node
import {FlushNode} from '../../node/modal/FlushNode';

// React
let ReactDOM = self.ReactDOM;

/**
 * フラッシュ・メッセージ・モーダル
 */
export class ViewFlushModal extends View {
  /**
   * フラッシュ・メッセージ・モーダル
   * @param {Element} element target HTMLElement
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
    this._render = null;
  }
  /**
   * 初期化
   */
  start() {
    this.render();

    let status = MessageStatus.factory();
    status.on( MessageStatus.FLUSH, this.onModal.bind( this ) );
  }
  /**
   * component 作成
   */
  render():void {
    this._render = ReactDOM.render(
      <FlushNode />,
      this.element
    );
  }
  /**
   * MessageStatus.FLUSH event handler,
   * modal window を open します
   * @param {Object} event MessageStatus.FLUSH event instance
   */
  onModal( event:Object ):void {
    // console.log( 'flush modal event ', event );
    this._render.updateShow( true, event.message, event.kind, event.sp );

  }
}
