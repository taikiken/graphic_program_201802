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
export let VideojsImaNode = React.createClass( {
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
    let width = this.phone ? window.innerWidth : Content.WIDTH;
    let height = this.phone ? Math.ceil( width / 16 * 9 ) : Content.HD_HEIGHT;
    return (
      <div id="mainContainer">
          <video id="content_video" className="video-js vjs-default-skin" poster={poster}  width={`${width}px`} height={`${height}px`} ref="video" controls>
            <source src={url} type="application/x-mpegURL"></source>
          </video>
      </div>
    );
  },
  componentDidMount: function() {
    let videoElement = ReactDOM.findDOMNode( this.refs.video );
    this.videoElement = videoElement;
    videoElement.addEventListener( 'ended', this.onEnded, false );
    videoElement.addEventListener( 'pause', this.onPause, false );
    let vast = Sagen.Browser.Mobile.is() ? this.props.video.adUrl.sp : this.props.video.adUrl.pc;
    let adUrl = vast !== '' ? vast + Date.now() : '';

    /* Player initialized. */
    let player = videojs('content_video',{
      nativeControlsForTouch:false
    });

    let option = {
      id: 'content_video',
      adTagUrl: adUrl,
      nativeControlsForTouch:false
    };
    player.ima(option);

    /*if (navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i)) {
      document.querySelector(".ima-ad-container>div").setAttribute('style', 'display: none; position: absolute;');
    }*/

    /*player.on("play", function(){  //function to play the video again//
      document.querySelector(".ima-ad-container>div").setAttribute('style', 'position: absolute;');
    });*/

    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();

    if(!Sagen.Browser.Mobile.is()){ //for PC: autoplay on load
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
    } else { //for Mobile: click to play
      player.one('click', function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
      });
    }
  },
  componentWillUnMount: function() {
    let videoElement = this.videoElement;
    videoElement.removeEventListener( 'ended', this.onEnded );
    videoElement.removeEventListener( 'pause', this.onPause );
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
