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
'use strict';

import {View} from '../View';
import {LogoutNode} from '../../node/modal/LogoutNode';

// react
let ReactDOM = self.ReactDOM;

/**
 * logout modal control
 */
export class ViewLogoutModal extends View {
  /**
   * logout
   * @param element
   * @param yesCallback
   * @param noCallback
   */
  constructor( element:Element, yesCallback:Function = null, noCallback:Function = null ) {
    super( element );
    this._render = null;
    this._yes = yesCallback;
    this._no = noCallback;
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

  }
  /**
   * 開く
   */
  open():void {
    if ( this._render !== null ) {
      this._render.updateShow( true );
    }
  }
}
