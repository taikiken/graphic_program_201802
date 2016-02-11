/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/10 - 21:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// view
import {View} from '../View';
import {SingleDae} from '../../dae/SingleDae';

import {Url} from '../../app/const/Url';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * detail 下部(tag)
 */
export class ViewSingleFooter extends View {
  /**
   * detail 下部(tag)
   * @param {Element} element single footer root element
   * @param {SingleDae} single 変換済み JSON data
   */
  constructor( element:Element, single:SingleDae ) {
    super( element );
    this._single = single;
    this._rendered = null;
  }
  /**
   * render 処理を開始します
   */
  start():void {
    this.render( this._single );
  }
  /**
   * render します
   * @param {SingleDae} singleDae JSON 変換済みデータ
   */
  render( singleDae:SingleDae ):void {

    let element = this.element;

    let FooterDom = React.createClass( {
      propTypes: {
        single: React.PropTypes.object.isRequired
      },
      getInitialState: function() {
        return {
          single: this.props.single
        };
      },
      render: function() {

        let single = this.state.single;
        let keywords = single.keywords;

        if ( keywords.hasKeyword ) {

          return (
            <div className="post-tags">
              <h2 className="post-tags-heading">TAGS</h2>
              <ul className="post-tags-list">
                {
                  keywords.keywords.map( function( keyword, i ) {

                    return (
                      <li key={'keyword-' + i} className="post-tags-item">
                        {/* link は 検索パターンにしています */}
                        <a href={Url.search( keyword )}>{keyword}</a>
                      </li>
                    );

                  } )
                }
              </ul>
            </div>
          );

        } else {

          return null;

        }

      },
      updateSingle: function( single ) {
        this.setState( { single: single } );
      }
    } );


    if ( this._rendered === null ) {

      this._rendered = ReactDOM.render(
        React.createElement( FooterDom, { single: singleDae } ),
        element
      );

    } else {

      this._rendered.updateSingle( singleDae );

    }

  }
}
