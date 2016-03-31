/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2016/03/31
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

import {Ad} from '../../../app/const/Ad';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

export let NewsAdNode = React.createClass( {
  propTypes: {
    index: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      rest: this.props.index % 3
    };
  },
  render: function() {

    if ( this.props.index > 0 && this.state.rest === 0 ) {
      return (
        <div className={`news-ad news-ad-${this.props.index}`} ref="news_ad"></div>
      );
    } else {
      return null;
    }
  },
  componentDidMount: function() {
    if ( this.props.index > 0 && this.state.rest !== 0 ) {
      return;
    }

    ReactDOM.findDOMNode( this.refs.news_ad ).appendChild( Ad.make( Ad.SP_NEWS ) );
  }
} );
