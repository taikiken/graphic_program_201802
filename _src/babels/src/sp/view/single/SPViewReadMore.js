/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/14 - 15:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../../../view/View';

// app
import {Message} from '../../../app/const/Message';

// sagen
let Sagen = self.Sagen;

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 「続きを読む」 ボタン制御
 */
export class SPViewReadMore extends View {
  /**
   * SP 記事詳細 「続きを読む」 ボタン制御
   * @param {Element} element single header root element
   * @param {Element} button single header root element
   */
  constructor( element:Element, button:Element ) {
    super( element );
    this._button = button;
  }
  /**
   * render 処理を開始します
   */
  start():void {
    this.render();
  }
  /**
   * render します
   */
  render():void {

    let ReadMoreDom = React.createClass( {
      propTypes: {
        dom: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        return {
          show: true
        };
      },
      render: function() {
        if ( this.state.show ) {
          return (
            <a className="post-content-btn-readMore" href="#" onClick={this.clickHandler}>{Message.READ_MORE}</a>
          );
        } else {
          return null;
        }
      },
      /*
      componentDidMount: function() {

      },
      componentWilUnMount: function() {

      },
      */
      clickHandler( event:Event ):void {
        event.preventDefault();
        this.props.dom.removeClass( 'excerpt' );
        this.setState( { show: false } );
      }
    } );

    ReactDOM.render(
      <ReadMoreDom
        dom={new Sagen.Dom( this.element )}
      />,
      this._button
    );

  }
}
