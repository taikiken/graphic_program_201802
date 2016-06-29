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


import {View} from '../View';
// node
import {LogoutNode} from '../../node/modal/LogoutNode';
// event
import {LogoutStatus} from '../../event/LogoutStatus';

// react
let ReactDOM = self.ReactDOM;

/**
 * logout modal control
 */
export class ViewLogoutModal extends View {
  /**
   * logout modal 表示
   * @param {Element} element 親 Element
   * @param {Function} yesCallback yes / ok click callback
   * @param {Function} noCallback no / cancel click callback
   */
  constructor( element:Element, yesCallback:Function = null, noCallback:Function = null ) {
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
  }
  /**
   * @param {Function} callback ok / yes callback
   */
  set yes( callback:Function ):void {
    this._yes = callback;
  }
  /**
   * @param {Function} callback cancel / no callback
   */
  set no( callback:Function ):void {
    this._no = callback;
  }
  /**
   * rendering 開始
   */
  start():void {
    this.render();
  }
  /**
   * rendering
   */
  render():void {

    if ( this._render === null ) {
      this._render = ReactDOM.render(
        <LogoutNode
          ok={this._yes}
          cancel={this._no}
        />,
        this.element
      );
    }

    this._status.on( LogoutStatus.OPEN, this.onOpen.bind( this ) );

  }
  /**
   * 開く
   */
  open():void {
    if ( this._render !== null ) {
      this._render.updateShow( true );
    }
  }
  /**
   * LogoutStatus.OPEN event handler
   * event が発生したら this.open を実行します
   */
  onOpen():void {
    // console.log( 'logout open event handler will open logout modal........' );
    this.open();
  }
}
