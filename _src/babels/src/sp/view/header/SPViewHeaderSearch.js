/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 22:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// parent
import {ViewHeaderSearch} from '../../../view/header/ViewHeaderSearch';

// app
import {Message} from '../../../app/const/Message';

// event
import {SearchStatus} from '../../../event/SearchStatus';

// node
import {HeaderSearchNode} from '../../../node/header/HeaderSearchNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP 検索フォーム
 */
export class SPViewHeaderSearch extends ViewHeaderSearch {
  /**
   * 検索フォーム + ロケーション遷移
   * @param {Element} element insert parent element
   * @param {Element} buttonElement opener button
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, buttonElement:Element, option:Object = {} ) {
    super( element, option );
    this._button = buttonElement;
  }
  /**
   * HTMLElement を生成します
   */
  render():void {

    // search form
    ReactDOM.render(
      <HeaderSearchNode
        listen={true}
      />,
      this.element
    );

    // search form opener
    let ButtonDom = React.createClass( {
      render: function() {
        return (
          <a className="head-search-opener" href="#" onClick={this.clickHandler}>{Message.OPENER_SEARCH}</a>
        );
      },
      componentDidMount: function() {
        this.open = false;
        this.status = SearchStatus.factory();
      },
      clickHandler: function( event:Event ):void {
        event.preventDefault();

        if ( this.open ) {
          // open -> close
          this.open = false;
          this.status.close();
        } else {
          // close -> open
          this.open = true;
          this.status.open();
        }
      }
    } );

    ReactDOM.render(
      <ButtonDom/>,
      this._button
    );
  }
}
