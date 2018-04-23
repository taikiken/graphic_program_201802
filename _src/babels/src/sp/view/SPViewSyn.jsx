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
import Syn from './Syn';

// app
import { User } from '../../app/User';

// node
// import {SPSynItemNode} from '../node/SPSynItemNode';
import { LogoutNode } from '../../node/modal/LogoutNode';
import SPComponentSynItem from '../component/syn/SPComponentSynItem';

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
 * Syn. menu
 * ```
 * https://github.com/undotsushin/undotsushin/tree/feature/195-synmenu_sp
 * https://github.com/undotsushin/undotsushin/issues/195
 * https://github.com/bitcellar/synapse-sdk/tree/master/javascript
 * http://www.undotsushin.com/syn-demo/
 * ```
 * @since 2018-04-19 vk header - flag 追加
 */
export default class SPViewSyn extends View {
  /**
   * Syn. menu と slide in 機能を実装します
   * @param {Element} element login の有無で切り替える menu の基点
   * @param {Element} button menu opener element, menu-opener
   * @param {Element} menu slide in する menu element, side-menu-container
   * @param {?Element} [modal=null] modal 基点 Element, logout modal 表示に使用します
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag
   * @since 2018-04-19 vk header - flag 追加
   */
  constructor(element, button, menu, modal = null, vk = false) {
    super(element, {}, vk);
    /**
     * button menu opener element, menu-opener
     * @type {Element}
     * @private
     */
    this.button = button;
    /**
     *  menu slide in する menu element, side-menu-container
     * @type {Element}
     * @private
     */
    this.menu = menu;
    /**
     * modal modal 基点 Element, logout modal 表示に使用します
     * @type {?Element}
     * @private
     */
    this.modal = modal;
    /**
     * bound synapse
     * @type {any}
     */
    this.synapse = this.synapse.bind(this);
  }
  /**
   * rendering 開始
   */
  start() {
    this.render();
  }
  /**
   * rendering
   */
  render() {
    const modal = this.modal;
    // since 2018-04-20 - vk: modal nullable なので判定追加する
    if (modal) {
      ReactDOM.render(
        <LogoutNode
          listen={true}
        />,
        modal
      );
    }
    // ReactDOM.render(
    //   <SPSynItemNode
    //     sign={User.sign}
    //     callback={this.synapse}
    //   />,
    //   this.element
    // );
    // since 2018-04-20
    ReactDOM.render(
      <SPComponentSynItem
        sign={User.sign}
        callback={this.synapse}
        vk={this.vk}
      />,
      this.element
    );
  }
  /**
   * SPSynItemNode.didMount callback 関数です
   * - HTML の準備を待って Syn. menu の準備を始めるために didMount まで待ちます
   * - Syn. menu setup を行います
   */
  synapse() {
    const syn = new Syn(this.button, this.menu, this.vk);
    syn.init();
  }
}
