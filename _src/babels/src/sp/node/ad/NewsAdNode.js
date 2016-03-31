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
    index: React.PropTypes.number.isRequired,
    length: React.PropTypes.number.isRequired,
    uniqueId: React.PropTypes.string.isRequired,
    enable: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      enable: false
    };
  },
  getInitialState: function() {
    this.ok = false;
    // 4番目に表示 => 3番目(index: 2)の後
    return {
      third: this.props.index === 2
    };
  },
  render: function() {

    if ( this.props.enable && ( this.state.third || (this.props.index < 2 && this.props.index === this.props.length) ) ) {
      this.ok = true;
      return (
        <div className={`news-ad news-ad-${this.props.index}`} ref="news_ad"></div>
      );
    } else {

      return null;
    }
  },
  componentDidMount: function() {
    if ( this.ok ) {
      // console.log( 'ok', this.props.uniqueId, this.props.index, this.props.length );
      ReactDOM.findDOMNode( this.refs.news_ad ).appendChild( Ad.make( Ad.SP_NEWS, this.props.uniqueId ) );
    }
  }
} );
