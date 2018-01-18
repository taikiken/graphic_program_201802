/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/22 - 14:25
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// React
/**
 * [library] - React
 */
const React = self.React;

// play button
/**
 * HTML5 video play button
 * - click で動画を再生し button 非表示にします
 * @type {ReactClass}
 */
export const VideoPlayNode = React.createClass( {
  propTypes: {
    playImage: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired,
    showPlay: React.PropTypes.bool.isRequired,
    phone: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      show: this.props.showPlay
    };
  },
  render: function() {
    // SP 表示しない
    if (this.props.phone) {
      return null;
    }

    // SP 以外 showPlay property check
    if ( this.props.showPlay ) {
      return (
        <a href="#" onClick={this.props.callback} className="post-video-start">
          <img className="post-thumb-overlay-movie type-movie" src={this.props.playImage} alt="" />
        </a>
      );
    } else {
      return null;
    }

  }
} );
