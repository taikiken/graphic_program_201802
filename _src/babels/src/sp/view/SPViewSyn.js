/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 14:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
import View from '../../view/View';

// app
import {User} from '../../app/User';

// node
import {SPSynItemNode} from '../node/SPSynItemNode';
import {LogoutNode} from '../../node/modal/LogoutNode';

// React
let ReactDOM = self.ReactDOM;

import {Syn} from './Syn';

/**
 * Syn. menu
 * <pre>
 * https://github.com/undotsushin/undotsushin/tree/feature/195-syn_menu_sp
 * https://github.com/undotsushin/undotsushin/issues/195
 * https://github.com/bitcellar/synapse-sdk/tree/master/javascript
 * http://www.undotsushin.com/syn-demo/
 * </pre>
 */
export class SPViewSyn extends View {
  /**
   * Syn. menu と slide in 機能を実装します
   * @param {Element} element login の有無で切り替える menu の基点
   * @param {Element} button menu opener element, menu-opener
   * @param {Element} menu slide in する menu element, side-menu-container
   * @param {Element} modal modal 基点 Element, logout modal 表示に使用します
   */
  constructor( element:Element, button:Element, menu:Element, modal:Element ) {
    super( element );
    /**
     * button menu opener element, menu-opener
     * @type {Element}
     * @private
     */
    this._button = button;
    /**
     *  menu slide in する menu element, side-menu-container
     * @type {Element}
     * @private
     */
    this._menu = menu;
    /**
     * modal modal 基点 Element, logout modal 表示に使用します
     * @type {Element}
     * @private
     */
    this._modal = modal;
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

    let modal = ReactDOM.render(
      <LogoutNode
        listen={true}
      />,
      this._modal
    );

    ReactDOM.render(
      <SPSynItemNode
        sign={User.sign}
        modal={modal}
        callback={this.synapse.bind(this)}
      />,
      this.element
    );
  }
  /**
   * SPSynItemNode.didMount callback 関数です<br>
   * HTML の準備を待って Syn. menu の準備を始めるために didMount まで待ちます<br>
   * Syn. menu setup を行います
   */
  synapse():void {
    let syn = new Syn( this._button, this._menu );
    syn.init();
  }
}
