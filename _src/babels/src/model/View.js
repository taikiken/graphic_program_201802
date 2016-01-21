/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 16:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

'use strict';

let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * React.createClass と ReactDOM.render DOM 生成を行う
 */
export class View {
  /**
   * 表示に使用します
   * @param {Element} rootElement renter root element
   * @param {ReactClass} reactClass React.createClass instance
   */
  constructor( rootElement:Element, reactClass:ReactClass ) {

    this._element = rootElement;
    this._react = reactClass;

  }

  /**
   * element へ Dom を生成します
   * @param {Object} [option={}] props option
   * @return {ReactComponent} ReactDOM.render 戻り値を返します
   */
  render( option:Object = {} ):ReactComponent {

    return ReactDOM.render(
      React.createElement( this._react, option ),
      this._element
    );

  }
}
