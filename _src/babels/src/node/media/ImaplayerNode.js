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
export let ImaplayerNode = React.createClass( {
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
    /**
     * スマホかを表す真偽値
     * @protected
     * @type {Boolean}
     */
    this.phone = Sagen.Browser.Mobile.phone();

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
    console.log('render');
    console.log(video.url);
    let width = this.phone ? window.innerWidth : Content.WIDTH;
    let height = this.phone ? Math.ceil( width / 16 * 9 ) : Content.HD_HEIGHT;
    return (
      <div id="mainContainer">
        <div id="content">
          <video poster={poster} width={`${width}px`} height={`${height}px`} preload="none" className="video-js vjs-default-skin" controls ref="video" data-setup="{}" autoplay id="content_video">
            <source src={url} type="application/x-mpegURL"/>
          </video>
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    let videoElement = ReactDOM.findDOMNode( this.refs.video );
    this.videoElement = videoElement;
    videoElement.addEventListener( 'ended', this.onEnded, false );
    videoElement.addEventListener( 'pause', this.onPause, false );
    var player = videojs('content_video');
    let vast = Sagen.Browser.Mobile.is() ? this.props.video.adUrl.sp : this.props.video.adUrl.pc;
    let adUrl = vast !== '' ? vast + Date.now() : '';
    console.log('componentDidMount'+adUrl);
    let option = {
      id: 'content_video',
      adTagUrl: adUrl
    };
    player.ima(option);
    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();

    var startEvent = 'click';
      if(Sagen.Browser.Mobile.is()){
        startEvent = 'touchend';
      }

    player.one(startEvent, function() {
      alert('');
      // player.ima.initializeAdDisplayContainer();
      // player.ima.requestAds();
      player.play();
    });

    if(!Sagen.Browser.Mobile.is()){
      player.play();
    }
  },
  componentWillUnMount: function() {
    let videoElement = this.videoElement;
    videoElement.removeEventListener( 'ended', this.onEnded );
    videoElement.removeEventListener( 'pause', this.onPause );
    var player = videojs('content_video');
    let vast = Sagen.owser.Mobile.is() ? this.props.video.adUrl.sp : this.props.video.adUrl.pc;

    let adUrl = vast !== '' ? vast + Date.now() : '';
    let option = {
      id: 'content_video',
      adTagUrl: adUrl
    };
    player.ima(option);
    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();

    player.one(startEvent, function() {
      //player.ima.initializeAdDisplayContainer();
      //player.ima.requestAds();
      player.play();
    });

    if(!Sagen.Browser.Mobile.is()){
      player.play();
    }
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
