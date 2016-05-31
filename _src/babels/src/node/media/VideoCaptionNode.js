/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/22 - 14:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
let React = self.React;

// video caption
/**
 * HTML5 video 下 caption を表示します
 * @type {*|Function|ReactClass}
 */
export let VideoCaptionNode = React.createClass( {
  propTypes: {
    caption: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      caption: ''
    };
  },
  render: function() {

    if ( this.props.caption === '' ) {
      return null;
    } else {
      return <div className="caption" dangerouslySetInnerHTML={{__html: this.props.caption}} />;
    }

  }
} );
