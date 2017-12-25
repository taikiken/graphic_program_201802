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
// import {VideoPlayNode} from './VideoPlayNode';
// import {VideoCaptionNode} from './VideoCaptionNode';

// ga
import {GaData} from '../../ga/GaData';
import {Ga} from '../../ga/Ga';

// Sagen
/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

// React
/**
 * [library] - React
 */
const React = self.React;
// let ReactDOM = self.ReactDOM;

// main video tag
/**
 * 記事詳細上部動画 HTML5 video
 * @type {ReactClass}
 * @deprecated instead use {@link ComponentVideojsImaArticle}
 */
export let VideojsImaNode = React.createClass( {
  propTypes: {
    // VideoDae
    video: React.PropTypes.object.isRequired,
    poster: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
    playImage: React.PropTypes.string.isRequired,
    showPlay: React.PropTypes.bool,
  },
  getDefaultProps: function() {
    return {
      showPlay: true
    };
  },
  getInitialState: function() {
    /**
     * video element
     * @type {?Element}
     */
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
    // let video = this.props.video;
    // let poster = this.props.poster;
    const { video, poster } = this.props;
    // let caption = this.props.caption;
    const url = Sagen.Browser.Mobile.is() ? video.url.sd : video.url.hd;
    const width = this.phone ? window.innerWidth : Content.WIDTH;
    const height = this.phone ? Math.ceil(width / (16 * 9)) : Content.HD_HEIGHT;
    if (navigator.userAgent.match(/iPhone/i)) {
      return(
        <div className="post-kv post-video-kv">
          <div id="mainContainer">
            <video
              id="content_video"
              className="video-js vjs-default-skin vjs-big-play-centered"
              poster={poster} width={`${width}px`}
              height={`${height}px`}
              ref={(element) => (this.videoElement = element)}
              controls
            >
              <source src={url} type="application/x-mpegURL" />
            </video>
          </div>
        </div>
      );
    } else {
      return(
        <div id="mainContainer">
          <video
            id="content_video"
            className="video-js vjs-default-skin vjs-big-play-centered"
            poster={poster}
            width={`${width}px`}
            height={`${height}px`}
            ref={(element) => (this.videoElement = element)}
            controls
          >
            <source src={url} type="application/x-mpegURL" />
          </video>
        </div>
      );
    }
  },
  componentDidMount: function() {
    const vast = Sagen.Browser.Mobile.is() ? this.props.video.adUrl.sp : this.props.video.adUrl.pc;
    const adUrl = vast !== '' ? vast + Date.now() : '';
    const videojs = self.videojs;
    /* Player initialized. */
    if (navigator.userAgent.match(/iPhone/i)) {

      const videoId = 'content_video';
      const player = videojs(videoId, { preload: 'none' });
      const option = {
        id: videoId,
        adTagUrl: adUrl,
        nativeControlsForTouch: false,
        showControlsForJSAds: false,
      };
      player.ima(option);
      // player.ima.initializeAdDisplayContainer();
      // player.ima.requestAds();
      // -------
      // 2107-12-25 code ES2016 対応させる
      // document.querySelector('#' + videoId + '_ima-ad-container').setAttribute('style', 'z-index: 9 !important; position: absolute; display: block;');
      // document.querySelector('#' + videoId + '_ima-ad-container > div').setAttribute('style', 'display:none');
      const imaAdContainer = document.getElementById(`#${videoId}_ima-ad-container`);
      if (!imaAdContainer) {
        return;
      }
      const imaAdContainerDiv = imaAdContainer.querySelector('> div');
      if (!imaAdContainerDiv) {
        return;
      }
      imaAdContainer.setAttribute('style', 'z-index: 9 !important; position: absolute; display: block;');
      imaAdContainerDiv.setAttribute('style', 'display:none');
      // ------- [/end code ES2016 対応させる]
      player.one('click', function() {
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();

        player.play();
      });
      const url = this.props.video.url.sd;
      player.one('play', function() {
        const gaData = new GaData('SPComponentSinglesArticleMedia.tracking', 'video', 'begin', url);
        Ga.add(gaData);
      });
      player.one('ended', function() {
        const gaData = new GaData('SPComponentSinglesArticleMedia.tracking', 'video', 'complete', url);
        Ga.add(gaData);
      });
      const video = document.getElementById(videoId);

      window.addEventListener('scroll', function() {
        const videoWidth = window.innerWidth;
        const videoHeight = Math.ceil( videoWidth / 16 * 9 );
        const elemTop = video.getBoundingClientRect().top;
        const elemBottom = video.getBoundingClientRect().bottom;
        const isVisible = (elemTop >= -videoHeight) && (elemBottom <= window.innerHeight + videoHeight);
        // 2017-12-25 if empty block 修正する
        // if (isVisible) {
        //   // player.play();
        // }else {
        //   player.pause();
        //   player.ima.pauseAd();
        // }
        if (!isVisible) {
          player.pause();
          player.ima.pauseAd();
        }
        // -------- [end if empty block 修正する]
      }, false);
    } else {
      // let videoElement = ReactDOM.findDOMNode( this.refs.video );
      const videoElement = this.videoElement;
      if (!videoElement) {
        return;
      }
      // this.videoElement = videoElement;
      videoElement.addEventListener('play', this.onPlay, false);
      videoElement.addEventListener('ended', this.onEnded, false);
      videoElement.addEventListener('pause', this.onPause, false);
      const player = videojs('content_video', { preload: 'none' });
      const option = {
        id: 'content_video',
        adTagUrl: adUrl,
      };
      player.ima(option);
      document.querySelector('#content_video_ima-ad-container').setAttribute('style', 'z-index: 9 !important; position: absolute;');
      player.on('play', function() {
        document.querySelector('.vjs-big-play-button').setAttribute('style', 'display:none !important');
      });
      /*
      player.on('pause', function() {
        document.getElementsByClassName("vjs-big-play-button")[0].setAttribute('style', 'display:block !important');
      });
      */
      if (!Sagen.Browser.Mobile.is()) {
        // for PC: autoplay on load
        document.querySelector('.vjs-big-play-button').setAttribute('style', 'display:none !important;');
        player.ima.initializeAdDisplayContainer();
        player.ima.requestAds();
        player.play();
      } else {
        // for Mobile: click to play
        if (navigator.userAgent.match(/iPad/i)) {
          // document.querySelector(".vjs-big-play-button").setAttribute('style', 'display: !important;');
          // const videoElement = document.querySelector('#content_video_html5_api');
          const contentVideoHtml5Api = document.querySelector('#content_video_html5_api');
          this.videoElement = contentVideoHtml5Api;
          contentVideoHtml5Api.addEventListener('play', this.onPlay, false);
          contentVideoHtml5Api.addEventListener('ended', this.onEnded, false);
          contentVideoHtml5Api.addEventListener('pause', this.onPause, false);

          player.ima.initializeAdDisplayContainer();
          // player.ima.requestAds();
          player.one('click', function() {
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            const adContainer = document.getElementById('content_video_ima-ad-container');
            adContainer.setAttribute('style', 'z-index: -1; position: absolute;');
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
      // pause video when player out view port
      const video = document.getElementById('content_video');
      let playerVisited = false;
      window.addEventListener('scroll', function() {
        let videoHeight = 0;
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i)) {
          const videoWidth = window.innerWidth;
          videoHeight = Math.ceil(videoWidth / (16 * 9));
        }else{
          videoHeight = parseInt(Content.HD_HEIGHT, 10);
        }
        const elemTop = video.getBoundingClientRect().top;
        const elemBottom = video.getBoundingClientRect().bottom;
        const isVisible = (elemTop >= -videoHeight) && (elemBottom <= window.innerHeight + videoHeight);

        if (isVisible && playerVisited === false) {
          playerVisited = true;
        }
        if (!isVisible && playerVisited) {
          player.pause();
          player.ima.pauseAd();
        }
        // else{
        //   // player.ima.resumeAd();
        // }
      }, false);
    }
  },
  componentWillUnMount: function() {
    const videoElement = this.videoElement;
    videoElement.removeEventListener('ended', this.onEnded);
    videoElement.removeEventListener('pause', this.onPause);
  },
  onPlay: function(/* event */) {
    if ( !this.playing ) {
      this.playing = true;
      this.tracking('begin');
    }
  },
  onEnded: function(/* event */) {
    if ( this.playing ) {
      this.playing = false;
      this.tracking( 'complete' );
    }
    this.setState( { showPlay: true } );
  },
  onPause: function(/* event */) {
    // console.log( 'onPause', event );
    // this.setState( { showPlay: true } );
  },
  tracking: function(action) {
    const video = this.props.video;
    const url = Sagen.Browser.Mobile.is() ? video.url.sd : video.url.hd;
    const gaData = new GaData('VideojsImaNode.tracking', 'video', action, url);
    Ga.add(gaData);
  }
} );
