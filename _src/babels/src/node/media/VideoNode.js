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
import {Empty} from '../../app/const/Empty';
import {Safety} from '../../data/Safety';

import {MediaDae} from '../../dae/MediaDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

// video caption
let VideoCaption = React.createClass( {
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

// play button
let VideoPlay = React.createClass( {
  propTypes: {
    playImage: React.PropTypes.string.isRequired,
    callback: React.PropTypes.func.isRequired,
    showPlay: React.PropTypes.bool.isRequired
  },
  getInitialState: function() {
    return {
      show: this.props.showPlay
    };
  },
  render: function() {

    if ( this.props.showPlay ) {
      return (
        <a href="#" onClick={this.props.callback}>
          <img className="post-thumb-overlay-movie type-movie" src={this.props.playImage} />
        </a>
      );
    } else {
      return null;
    }

  }
} );

// main video tag
export let VideoNode = React.createClass( {
  propTypes: {
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
    this.video = null;

    return {
      showPlay: this.props.showPlay,
      media: this.props.media
    };
  },
  render: function() {
    let video = this.props.video;
    let poster = this.props.poster;
    let caption = this.props.caption;

    return (
      <div className="post-kv post-video-kv">
        <div className="video-container">
          <video poster={poster} width="710" height="400" preload="none" controls ref="video">
            <source src={video.url} type="video/mp4"/>
          </video>
          <VideoPlay
            playImage={this.props.playImage}
            callback={this.playClick}
            showPlay={this.state.showPlay}
          />
        </div>
        <VideoCaption caption={caption} />
      </div>
    );
  },
  componentDidMount: function() {

    let video = ReactDOM.findDOMNode( this.refs.video );
    this.video = video;
    video.addEventListener( 'ended', this.onEnded, false );
    video.addEventListener( 'pause', this.onPause, false );

  },
  componentWillUnMount: function() {
    let video = this.video;
    video.removeEventListener( 'ended', this.onEnded );
    video.removeEventListener( 'pause', this.onPause );
  },
  playClick: function( event ) {
    event.preventDefault();
    console.log( 'playClick' );
    this.video.play();
    this.setState( { showPlay: false } );
  },
  onEnded: function( event ) {
    console.log( 'onEnded', event );
    this.setState( { showPlay: true } );
  },
  onPause: function( event ) {
    console.log( 'onPause', event );
    this.setState( { showPlay: true } );
  }
} );