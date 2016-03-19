/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/05 - 22:40
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from './View';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 記事タイトル 表示
 * **使用しない**
 * PHP template で出力
 */
export class ViewTitle extends View {
  /**
   * 記事タイトルを表示します
   * @param {string} label 表示タイトル文字
   * @param {Element} element insert parent element
   * @param {Object} [option={}] optional event handler
   */
  constructor( label:string, element:Element, option:Object = {} ) {
    super( element, option );
    this._label = label;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * title 文字
   * @return {string|*} title 文字を返します
   */
  get label():string {
    return this._label;
  }
  /**
   * title 文字を設定します
   * @param {string} label title 文字
   */
  set label( label:string ):void {
    this._label = label;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * HTMLElement を生成します
   */
  render():void {

    let TitleDom = React.createClass( {
      propType: {
        label: React.PropTypes.string.isRequired
      },
      render: function() {

        return (
          <div className="category-heading">
            <h1>{this.props.label}</h1>
          </div>
        );

      }
    } );

    ReactDOM.render(
      <TitleDom label={this.label} />,
      this.element
    );

  }

}
