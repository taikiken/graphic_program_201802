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
'use strict';

import {View} from '../View';
import {Url} from '../../app/const/Url';

// React
let React = self.React;
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

    let SearchDom = React.createClass( {
      getInitialState: function() {
        return {
          keyword: ''
        };
      },
      render: function() {

        return (
          <form onSubmit={this.submitHandler}>
            <input type="text" placeholder="記事を探す" value={this.state.keyword} onChange={this.changeHandler} />
            <input type="submit"/>
          </form>
        );
      },
      changeHandler: function( event ) {
        this.setState( {keyword: event.target.value} );
      },
      submitHandler: function( event ) {
        event.preventDefault();

        if ( this.state.keyword === '' ) {
          throw new Error( 'not input keyword' );
        } else {

          location.href = Url.search( this.state.keyword );

        }
      }
    } );

    ReactDOM.render(
      <SearchDom />,
      this.element
    );

  }
}
