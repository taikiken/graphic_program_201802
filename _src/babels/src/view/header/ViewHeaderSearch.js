/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {View} from '../View';

// node
import {HeaderSearchNode} from '../../node/header/HeaderSearchNode';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 検索フォーム
 */
export class ViewHeaderSearch extends View {
  /**
   * 検索フォーム + ロケーション遷移
   * @param {Element} element insert parent element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, option:Object = {} ) {
    super( element, option );
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * render 実行
   */
  start():void {
    this.render();
  }
  /**
   * HTMLElement を生成します
   */
  render():void {

    ReactDOM.render(
      <HeaderSearchNode />,
      this.element
    );

  }
}
