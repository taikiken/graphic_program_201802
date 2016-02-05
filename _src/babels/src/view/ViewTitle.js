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

export class ViewTitle extends View {
  constructor( slug:string, label:string, element:Element, option:Object = {} ) {
    super( element, option );

    this._label = label;
    this._slug = slug;
  }
  get label():string {
    return this._label;
  }
  get slug():string {
    return this._slug;
  }
  render():void {

    let TitleDom = React.createClass( {
      propType: {
        label: React.PropTypes.string.isRequired,
        slug: React.PropTypes.string.isRequired
      },
      render: function() {

        let label = this.props.label;
        let slug = this.props.slug;

        return (
          <h1 className="page-title"><a href={'/category/' + slug + '/'}>{label}</a></h1>
        );

      }
    } );

    ReactDOM.render(
      <TitleDom
        label={this.label}
        slug={this.slug} />,
      this.element
    );

  }

}
