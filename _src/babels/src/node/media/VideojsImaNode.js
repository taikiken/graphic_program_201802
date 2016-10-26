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

// ga
import {GaData} from '../../ga/GaData';
import {Ga} from '../../ga/Ga';

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
    if (navigator.userAgent.match(/iPhone/i)) {
          return (
                <div id="ima-sample-videoplayer">
                  <div id="ima-sample-placeholder"></div>
                </div>
              );
    } else {
          return(
            <div id="mainContainer">
                <video id="content_video" className="video-js vjs-default-skin vjs-big-play-centered" poster={poster}  width={`${width}px`} height={`${height}px`} ref="video" controls>
                  <source src={url} type="application/x-mpegURL"></source>
                </video>
            </div>
          );
    }
  },
  componentDidMount: function() {
    let vast = Sagen.Browser.Mobile.is() ? this.props.video.adUrl.sp : this.props.video.adUrl.pc;
    let adUrl = vast !== '' ? vast + Date.now() : '';

    /* Player initialized. */
    if (navigator.userAgent.match(/iPhone/i)) {
      var ads = new Ads(adUrl, this.props.video.url.sd, window.innerWidth, Math.ceil( window.innerWidth / 16 * 9 ),this.props.poster);

      ads.init();
      document.querySelector(".vjs-big-play-button").setAttribute('style', 'display:none !important');


      let videoElement = document.querySelector('#content_video_html5_api');
      this.videoElement = videoElement;
      videoElement.addEventListener( 'play', this.onPlay );
      videoElement.addEventListener( 'ended', this.onEnded );
      videoElement.addEventListener( 'pause', this.onPause );

    } else {

      let videoElement = ReactDOM.findDOMNode( this.refs.video );
      this.videoElement = videoElement;
      videoElement.addEventListener( 'play', this.onPlay );
      videoElement.addEventListener( 'ended', this.onEnded );
      videoElement.addEventListener( 'pause', this.onPause );

      let player = videojs('content_video');
      let option = {
        id: 'content_video',
        adTagUrl: adUrl
      };

      player.ima(option);
      player.on('play', function() {
        document.querySelector(".vjs-big-play-button").setAttribute('style', 'display:none !important');
      });
      /*player.on('pause', function() {
        document.getElementsByClassName("vjs-big-play-button")[0].setAttribute('style', 'display:block !important');
      });*/
      if(!Sagen.Browser.Mobile.is()){ //for PC: autoplay on load
        document.querySelector(".vjs-big-play-button").setAttribute('style', 'display:none !important;');
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();

        //pause video when player out view port
        var video=document.getElementById('content_video');
        var mainVideoIsPlaying=false;

        window.addEventListener('scroll', function () {
          let videoHeight =  parseInt(Content.HD_HEIGHT);
          var elemTop = video.getBoundingClientRect().top;
          var elemBottom = video.getBoundingClientRect().bottom;

          var isVisible = (elemTop >= 0-videoHeight/2) && (elemBottom <= window.innerHeight+videoHeight/2);
          if(!isVisible){
            player.pause();
            player.ima.pauseAd();
          }else{
            player.ima.resumeAd();
            /*if(mainVideoIsPlaying==false){
              player.play();
              mainVideoIsPlaying=true;
            }*/
          }
        }, false);

      } else { //for Mobile: click to play

        if (navigator.userAgent.match(/iPad/i)) {
          //document.querySelector(".vjs-big-play-button").setAttribute('style', 'display: !important;');
          let videoElement = document.querySelector('#content_video_html5_api');
          this.videoElement = videoElement;
          videoElement.addEventListener( 'play', this.onPlay );
          videoElement.addEventListener( 'ended', this.onEnded );
          videoElement.addEventListener( 'pause', this.onPause );

          player.ima.initializeAdDisplayContainer();
          player.ima.requestAds();
          var adContainer = document.getElementById('content_video_ima-ad-container');
          adContainer.setAttribute('style', 'z-index: -1; position: absolute;');
          player.one('click', function() {
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            player.play();
          });
        }else {
          player.one('click', function() {
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            player.play();
          });
        }
      }
    }
  },
  componentWillUnMount: function() {
    let videoElement = this.videoElement;
    videoElement.removeEventListener( 'ended', this.onEnded );
    videoElement.removeEventListener( 'pause', this.onPause );
  },
  onPlay: function( /* event */ ) {
    if ( !this.playing ) {
      this.playing = true;
      this.tracking( 'begin' );
    }
  },
  onEnded: function( /* event */ ) {
    if ( this.playing ) {
      this.playing = false;
      this.tracking( 'complete' );
    }
    this.setState( { showPlay: true } );
  },
  onPause: function( /* event */ ) {
    // console.log( 'onPause', event );
    // this.setState( { showPlay: true } );
  },
  tracking: function( action ) {
    let video = this.props.video;
    let url = Sagen.Browser.Mobile.is() ? video.url.sd : video.url.hd;
    let gaData = new GaData( 'VideojsImaNode.tracking', 'video', action, url );
    Ga.add( gaData );
  }
} );
