/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/19 - 16:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Content} from '../../app/const/Content';

// node
import {VideoPlayNode} from './VideoPlayNode';
import {VideoCaptionNode} from './VideoCaptionNode';

// Sagen
const Sagen = self.Sagen;

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// main video tag
/**
 * <p>記事詳細上部動画 HTML5 video</p>
 * @type {ReactClass}
 */
export let HTML5VideoNode = React.createClass( {
  propTypes: {
    // VideoDae
    video: React.PropTypes.object.isRequired,
    poster: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
    playImage: React.PropTypes.string.isRequired,
    showPlay: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      showPlay: true
    };
  },
  getInitialState: function() {
    this.videoElement = null;

    return {
      showPlay: this.props.showPlay,
      video: this.props.video
    };
  },
  render: function() {
    let video = this.props.video;
    let poster = this.props.poster;
    let caption = this.props.caption;
    let url = Sagen.Browser.Mobile.is() ? video.url.sd : video.url.hd;

    return (
      <div className="post-kv post-video-kv">
        <div className="video-container">
          <video poster={poster} width={Content.WIDTH} height={Content.HD_HEIGHT} preload="none" controls ref="video">
            <source src={url} type="video/mp4"/>
          </video>
          <VideoPlayNode
            playImage={this.props.playImage}
            callback={this.playClick}
            showPlay={this.state.showPlay}
          />
        </div>
        <VideoCaptionNode caption={caption} />
      </div>
    );
  },
  componentDidMount: function() {

    let videoElement = ReactDOM.findDOMNode( this.refs.video );
    this.videoElement = videoElement;
    videoElement.addEventListener( 'ended', this.onEnded, false );
    videoElement.addEventListener( 'pause', this.onPause, false );

  },
  componentWillUnMount: function() {
    let videoElement = this.videoElement;
    videoElement.removeEventListener( 'ended', this.onEnded );
    videoElement.removeEventListener( 'pause', this.onPause );
  },
  playClick: function( event ) {
    event.preventDefault();
    // console.log( 'playClick' );
    this.video.play();
    this.setState( { showPlay: false } );
  },
  onEnded: function( /* event */ ) {
    // console.log( 'onEnded', event );
    this.setState( { showPlay: true } );
  },
  onPause: function( /* event */ ) {
    // console.log( 'onPause', event );
    // this.setState( { showPlay: true } );
  }
} );
