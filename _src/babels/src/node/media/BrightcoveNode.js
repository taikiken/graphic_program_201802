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

// ga
import {GaData} from '../../ga/GaData';
import {Ga} from '../../ga/Ga';

// Sagen
const Sagen = self.Sagen;

// React
let React = self.React;
// let ReactDOM = self.ReactDOM;
/**
 * <p>video コンテナを作成し Brightcove videojs で再生可能にします<p>
 *
 * <pre>
 *    ViewSingleVisual.render
 *      MediaNode
 *        MediaVideoNode
 *          BrightcoveNode
 * </pre>
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
      // player: Brightcove.PLAYER,
      player: 'HkfUPcduf',
      embed: Brightcove.EMBED
    };
  },
  getInitialState: function() {
    // this.videoElement = null;
    /**
     * videojs が tag を生成させる基点 Element の id<br>
     * video-player-ARTICLE_ID
     *
     * @protected
     * @type {string}
     */
    this.id = `video-player-${this.props.articleId}`;
    /**
     * videojs return value, videojs instance
     * @protected
     * @type {null|videojs}
     */
    this.player = null;
    /**
     * スマホかを表す真偽値
     * @protected
     * @type {Boolean}
     */
    this.phone = Sagen.Browser.Mobile.phone();
    /**
     * 動画再生中かを表す真偽値
     * @protected
     * @type {boolean}
     */
    this.playing = false;
    /**
     * 動画パス
     * @protected
     * @type {string}
     */
    this.url = '';

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

    let guide = () => {
      if ( this.phone ) {
        return <img className="phone-video-guide" src={Empty.VIDEO_THUMBNAIL} alt=""/>;
      } else {
        return null;
      }
    };

    return (
      <div className={`post-kv post-video-kv${this.phone ? ' phone-post-kv' : ''}`}>
        <div className="video-container">
          {guide()}
          <video
            id={this.id}
            data-account={this.props.account}
            data-player={this.props.player}
            data-embed={this.props.embed}
            className="video-js"
            width={`${width}px`}
            height={`${height}px`}
            controls
            ref="video"
          />
          <VideoPlayNode
            playImage={this.props.playImage}
            callback={this.playClick}
            showPlay={this.state.showPlay}
            phone={this.phone}
          />
        </div>
        <VideoCaptionNode caption={caption} />
      </div>
    );
  },
  componentDidMount: function() {
    this.initBrightcove();
  },
  // componentWillUnMount: function() {
  //
  // },
  // -------------------------------------------
  // click で再生開始
  playClick: function( event ) {
    event.preventDefault();

    let player = this.player;
    if ( !player ) {
      return;
    }

    this.setState( { showPlay: false } );

    player.play();
    // 再生開始でコントロール表示
    player.controls( true );
  },
  // -------------------------------------------
  // brightcove player init
  initBrightcove: function() {
    // 非同期で script を読み込まない
    // 全ての機能が使えなくなるので...
    // テンプレートへ記載します
    this.createPlayer();
  },
  // videojs で player instance を作成します
  createPlayer: function() {
    const videojs = self.videojs;

    // videojs global object 存在チェック
    // 存在を確認できるまで待機します
    if ( !videojs || !videojs.ima3 ) {
      setTimeout( this.createPlayer, 25 );
      return;
    }

    let video = this.props.video;
    let poster = this.props.poster;
    let url = Sagen.Browser.Mobile.is() ? video.url.sd : video.url.hd;
    this.url = url;

    // let vast = video.vast;

    // 動画プレイヤー / VASTをPC/SP&APPで分ける #822
    // https://github.com/undotsushin/undotsushin/issues/822
    // @since 2016-06-20
    let vast = this.phone ? video.adUrl.sp : video.adUrl.pc;

    let ima3 = {
      adTechOrder: [
        'html5',
        'flash'
      ],
      // 2000
      postrollTimeout: Brightcove.POST_ROLL,
      // 1000
      prerollTimeout: Brightcove.PRE_ROLL,
      // onload
      requestMode: Brightcove.MODE,
      // 5000
      timeout: Brightcove.TIMEOUT
    };

    // AD test code
    // "AdError 1005: The provided ad type: skippablevideo is not supported."
    // vast = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=';
    // vast = 'https://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&cust_params=deployment%3Ddevsite%26sample_ct%3Dskippablelinear&correlator=';
    // vast = 'http://web-jp.ad-v.jp/adam/inline?CE=0&cat=RAN.CBC.PC&format=cm&page=';
    ima3.serverUrl = vast !== '' ? vast + Date.now() : '';
    // ima3.serverUrl = 'http://pubads.g.doubleclick.net/gampad/ads?sz=640x480&iu=%2F15018773%2Feverything2&ciu_szs=300x250%2C468x60%2C728x90&impl=s&gdfp_req=1&env=vp&output=xml_vast2&unviewed_position_start=1&url=dummy&correlator=' + Date.now() + '[timestamp]&cmsid=133&vid=10XWSh7W4so&ad_rule=1';

    console.log( 'vast', ima3.serverUrl );
    // if ( vast !== '' ) {
    //   ima3.serverUrl = vast + Date.now();
    // }

    let player = videojs( this.id );

    player.ready( () => {
      player.src( { type: Brightcove.TYPE, src: url } );
      player.poster( poster );

      // vast が存在する時のみ ima3 を追加する
      if ( vast !== '' ) {
        player.ima3( ima3 );
      }

      // コントロールを常に表示する
      // https://github.com/undotsushin/undotsushin/issues/616#issuecomment-229638787
      // 初めは非表示
      // https://github.com/undotsushin/undotsushin/issues/616#issuecomment-229847018
      if ( !this.phone ) {
        player.controls( false );
      }

      // http://docs.brightcove.com/en/perform/brightcove-player/guides/events.html

      // #903 - ready内でbindする
      // bind event handler
      player.on( 'adstart', this.adStart );
      player.on( 'adend', this.adEnd );

      player.on( 'play', this.onPlay );
      // GA / CRAZY系コンテンツ用トラッキングを追加 - バナー & 動画 / Web版 #842
      // 再生・終了でトラッキングする必要が出たので有効にします
      // @from 2016-06-22
      player.on( 'pause', this.onPause );
      player.on( 'ended', this.onEnd );

    } );

    if ( this.phone ) {
      player.width( '100%', false );
      player.height( 'auto', false );
      // https://github.com/undotsushin/undotsushin/issues/885#issuecomment-230741785
      // 出力エラーは無視する
      player.enableTouchActivity();
    }

    this.player = player;
  },
  // -------------------------------------------
  // brightcove player event handlers
  adStart: function() {
    // // 広告再生スタート controls 非表示
    if ( this.phone ) {
      this.player.controls( false );
    }
    // console.log( 'adStart' );
  },
  adEnd: function() {
    // // 広告再生終了 controls 表示
    this.player.controls( true );
    // console.log( 'adEnd' );
  },
  onPlay: function() {
    // console.log( 'onPlay' );
    if ( !this.playing ) {
      this.playing = true;
      this.tracking( 'begin' );
    }
    // console.log( 'onPlay' );
  },
  onPause: function() {
    // this.setState( { showPlay: true } );
    // console.log( 'onPause' );
  },
  onEnd: function() {
    // this.setState( { showPlay: true } );
    // console.log( 'onEnd' );
    if ( this.playing ) {
      this.playing = false;
      this.tracking( 'complete' );
    }
  },
  // @since 2016-06-22
  // GA / CRAZY系コンテンツ用トラッキングを追加 - バナー & 動画 / Web版 #842
  tracking: function( action:string ) {
    let gaData = new GaData( 'BrightcoveNode.tracking', 'video', action, this.url );
    Ga.add( gaData );
  }
} );
