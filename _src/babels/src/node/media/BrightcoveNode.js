/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/22 - 14:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Content} from '../../app/const/Content';
import {Empty} from '../../app/const/Empty';
import {Brightcove} from '../../app/const/Brightcove';

// node
import {VideoPlayNode} from './VideoPlayNode';
import {VideoCaptionNode} from './VideoCaptionNode';

// Sagen
const Sagen = self.Sagen;

// React
let React = self.React;
// let ReactDOM = self.ReactDOM;
/**
 * video コンテナを作成し Brightcove videojs で再生可能にします
 *
 *    ViewSingleVisual.render
 *      MediaNode
 *        MediaVideoNode
 *          BrightcoveNode
 *
 * @type {*|Function|ReactClass}
 */
export let BrightcoveNode = React.createClass( {
  propTypes: {
    // response.id (記事 Id)
    articleId: React.PropTypes.string.isRequired,
    // VideoDae
    video: React.PropTypes.object.isRequired,
    poster: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string.isRequired,
    playImage: React.PropTypes.string.isRequired,
    showPlay: React.PropTypes.bool,
    account: React.PropTypes.string,
    player: React.PropTypes.string,
    embed: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      showPlay: true,
      account: Brightcove.ACCOUNT,
      player: Brightcove.PLAYER,
      embed: Brightcove.EMBED
    };
  },
  getInitialState: function() {
    this.videoElement = null;
    this.id = `video-player-${this.props.articleId}`;
    // videojs return value
    this.player = null;
    // vast
    // this.hasVast = !!this.props.video.vast;
    this.phone = Sagen.Browser.Mobile.phone();

    return {
      showPlay: this.props.showPlay,
      video: this.props.video
    };
  },
  render: function() {
    let video = this.props.video;
    let caption = this.props.caption;
    // let videoStyle = {
    //   width: `${Content.WIDTH}px`,
    //   height: `${Content.HD_HEIGHT}px`
    // };
    let width = this.phone ? window.innerWidth : Content.WIDTH;
    let height = this.phone ? Math.ceil( width / 16 * 9 ) : Content.HD_HEIGHT;

    return (
      <div className="post-kv post-video-kv">
        <div className="video-container">
          <video
            id={this.id}
            data-account={this.props.account}
            data-player={this.props.player}
            data-embed={this.props.embed}
            className="video-js"
            width={`${width}px`}
            height={`${height}px`}
            controls
            ref="video">
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
    this.initBrightcove();
  },
  componentWillUnMount: function() {

  },
  // -------------------------------------------
  // clcik で再生開始
  playClick: function( event ) {
    event.preventDefault();

    let player = this.player;
    if ( !player ) {
      return;
    }
    this.setState( { showPlay: false } );

    player.play();
    // if ( !this.hasVast ) {
    //   player.controls( true );
    // }
  },
  // -------------------------------------------
  // brightcove player init
  initBrightcove: function() {
    // // global object videojs が存在する時は script tag があるはず
    // if ( !!self.videojs ) {
    //   // videojs 発見
    //   this.createPlayer();
    // } else {
    //   // script tag を append
    //   this.appendScript();
    // }

    // 非同期で script を読み込まない
    this.createPlayer();
  },
  // // script tag x 3 を head に appendChild します
  // appendScript: function() {
  //   // script tag が多分無い
  //   const host = Brightcove.HOST;
  //   const index = document.createElement( 'script' );
  //   // const ima3 = document.createElement( 'script' );
  //
  //   index.src = `${host}/${this.props.account}/${this.props.player}_default/index.min.js`;
  //   // ima3.src = `${host}/videojs-ima3/videojs.ima3.min.js`;
  //
  //   document.head.appendChild( index );
  //   // document.head.appendChild( ima3 );
  //
  //   this.appendIma3();
  // },
  // appendIma3: function() {
  //   const videojs = self.videojs;
  //
  //   // videojs global object 存在チェック
  //   // 存在を確認できるまで待機します
  //   if ( !videojs ) {
  //     setTimeout( this.appendIma3, 25 );
  //     return;
  //   }
  //   console.log( '****** appendIma3' );
  //   // script tag が多分無い
  //   const host = Brightcove.HOST;
  //   // const index = document.createElement( 'script' );
  //   const ima3 = document.createElement( 'script' );
  //
  //   // index.src = `${host}/${this.props.account}/${this.props.player}_default/index.min.js`;
  //   ima3.src = `${host}/videojs-ima3/videojs.ima3.min.js`;
  //
  //   // document.head.appendChild( index );
  //   document.head.appendChild( ima3 );
  //
  //   ima3.addEventListener( 'load', this.appendHls, false );
  // },
  // appendHls: function( event ) {
  //   event.target.removeEventListener( 'load', this.appendHls );
  //   const videojs = self.videojs;
  //   console.log( '****** appendHls' );
  //   // videojs global object 存在チェック
  //   // 存在を確認できるまで待機します
  //   if ( !videojs || !videojs.ima3 ) {
  //     setTimeout( this.appendHls, 25 );
  //     return;
  //   }
  //
  //   // script tag が多分無い
  //   const hls = document.createElement( 'script' );
  //   hls.src = '/assets/js/libs/hls/videojs-contrib-hls.min.js';
  //   document.head.appendChild( hls );
  //
  //   hls.addEventListener( 'load', this.createWait, false );
  // },
  // createWait: function( event ) {
  //   console.log( '****** createWait' );
  //   event.target.removeEventListener( 'load', this.createWait );
  //   setTimeout( this.createPlayer, 500 );
  // },
  // videojs で player instance を作成します
  createPlayer: function() {
    const videojs = self.videojs;
    console.log( '****** createPlayer' );
    // videojs global object 存在チェック
    // 存在を確認できるまで待機します
    if ( !videojs || !videojs.ima3 ) {
      setTimeout( this.createPlayer, 25 );
      return;
    }

    let video = this.props.video;
    let poster = this.props.poster;
    let url = Sagen.Browser.Mobile.is() ? video.url.sd : video.url.hd;
    let vast = video.vast;
    
    let ima3 = {
      adTechOrder: [
        'html5'
      ],
      postrollTimeout: Brightcove.POST_ROLL,
      prerollTimeout: Brightcove.PRE_ROLL,
      requestMode: Brightcove.MODE,
      timeout: Brightcove.TIMEOUT
    };

    // ToDo: test code
    // "AdError 1005: The provided ad type: skippablevideo is not supported."
    vast = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=';
    // vast = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=';
    // vast = 'http://web-jp.ad-v.jp/adam/inline?CE=0&cat=RAN.CBC.PC&format=cm&page=';
    if ( vast !== '' ) {
      ima3.serverUrl = vast + Date.now();
    }
    console.log( 'vast', vast, ima3 );
    let player = videojs( this.id );

    player.ready( () => {
      player.src( { type: Brightcove.TYPE, src: url } );
      player.poster( poster );
      player.ima3( ima3 );

      if ( !this.phone ) {
        player.controls( false );
      }
    } );

    if ( this.phone ) {
      player.width( '100%', false );
      // player.height( 'auto', false );
    }

    // player.ready( function() {
    //   player.src( { type: Brightcove.TYPE, src: url } );
    //   player.poster( poster );
    //   console.log( 'ready ima3', typeof player.ima3 );
    //   player.ima3( ima3 );
    //   player.controls( false );
    // } );

    // player.on('loadedmetadata', function() {
    //   // no event fire
    //   player.src( { type: Brightcove.TYPE, src: url } );
    //   player.poster( poster );
    //   console.log( 'ready ima3', typeof player.ima3 );
    //   player.ima3( ima3 );
    //   player.controls( false );
    // } );

    // http://docs.brightcove.com/en/perform/brightcove-player/guides/events.html

    // bind event handler
    player.on( 'adstart', this.adStart );
    player.on( 'adend', this.adEnd );

    player.on( 'play', this.onPlay );
    player.on( 'pause', this.onPause );
    player.on( 'ended', this.onEnd );

    this.player = player;
  },
  // -------------------------------------------
  // brightcove player event handlers
  adStart: function() {
    // 広告再生スタート controls 非表示
    this.player.controls( false );
  },
  adEnd: function() {
    // 広告再生終了 controls 表示
    this.player.controls( true );
  },
  onPlay: function() {
    this.player.controls( true );
  },
  onPause: function() {
    // this.setState( { showPlay: true } );
  },
  onEnd: function() {
    // this.setState( { showPlay: true } );
  }
} );
