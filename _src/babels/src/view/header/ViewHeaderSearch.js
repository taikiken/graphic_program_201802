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
/*
// app
import {Url} from '../../app/const/Url';

// data
import {ErrorMessage} from '../../data/ErrorMessage';
*/
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

    /*
    let SearchDom = React.createClass( {
      getInitialState: function() {
        this.errors = {
          keyword: new ErrorMessage()
        };

        return {
          keyword: '',
          error: false
        };
      },
      render: function() {

        let errorClass = ( keyName:string ) => {
          return this.errors[ keyName ].error ? 'error' : '';
        };

        return (
          <div className={'head-search form-parts ' + errorClass('keyword')}>
            <form onSubmit={this.submitHandler}>
              <input type="text" placeholder="記事を探す" value={this.state.keyword} onChange={this.changeHandler} />
              <input type="submit"/>
            </form>
          </div>
        );
      },
      changeHandler: function( event ) {
        this.setState( {keyword: event.target.value} );
      },
      submitHandler: function( event ) {
        event.preventDefault();
        this.reset();

        if ( this.state.keyword === '' ) {
          this.errors.keyword.message = '***';
          this.setState( { error: true } );
        } else {

          location.href = Url.search( this.state.keyword );

        }
      },
      reset: function() {
        this.errors.keyword.reset();
        this.setState( { error: false } );
      }
    } );
    */

    ReactDOM.render(
      <HeaderSearchNode />,
      this.element
    );

  }
}
