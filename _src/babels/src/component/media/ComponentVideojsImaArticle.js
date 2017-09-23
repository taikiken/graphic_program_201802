/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/14 - 17:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Content } from '../../app/const/Content';

// ui
import { Hit } from '../../ui/Hit';

// ga
import { GaData } from '../../ga/GaData';
import { Ga } from '../../ga/Ga';

// Sagen
const Sagen = self.Sagen;

// React
const React = self.React;

/**
 * alias VideojsImaNode
 *
 * 記事詳細・先頭の動画
 *
 * 画面から見切れたら動画再生を止める
 * @since 2016-11-14
 */
export class ComponentVideojsImaArticle extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   * articleId: string,
   * video: VideoDae,
   * poster: string,
   * caption: string,
   * playImage: string
   * }} React props
   */
  static get propTypes() {
    return {
      // @type {string} - 記事ID
      articleId: React.PropTypes.string.isRequired,
      // @type {VideoDae}
      video: React.PropTypes.object.isRequired,
      // - poster image
      poster: React.PropTypes.string.isRequired,
      // - video caption
      caption: React.PropTypes.string.isRequired,
      // - play button image path
      playImage: React.PropTypes.string.isRequired,
      // @type {number} - 表示順, -1: 先頭
      index: React.PropTypes.number.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentVideojsImaArticle.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * video tag
     * @type {?Element}
     */
    this.videoElement = null;
    /**
     * div.mainContainer
     * @type {?Element}
     */
    this.mainContainer = null;
    /**
     * only phone
     * @type {boolean}
     */
    this.phone = Sagen.Browser.Mobile.phone();
    /**
     * phone and tablet
     * @type {boolean}
     */
    this.mobile = Sagen.Browser.Mobile.is();
    /**
     * videojs object, player 作成後にセットされます
     * @type {?videojs}
     */
    this.player = null;
    /**
     * iPhone & iPod & iPad
     * @type {boolean}
     */
    this.iphone = Sagen.Browser.iOS.iPhone();
    /**
     * iPad
     * @type {boolean}
     */
    this.ipad = Sagen.Browser.iOS.iPad();
    /**
     * 再生中フラッグ
     * @type {boolean}
     */
    this.playing = false;
    /**
     * Hit instance
     * @type {?Hit}
     */
    this.hit = null;
    /**
     * bound hitOut, Hit.NO_COLLISION event handler
     * @type {function}
     */
    this.boundOut = this.hitOut.bind(this);
    /**
     * bound hitOut, Hit.COLLISION event handler
     * @type {function}
     */
    this.boundIn = this.hitIn.bind(this);
    /**
     * Safari 11 flag
     * @type {boolean}
     * @see https://github.com/undotsushin/undotsushin/issues/2503
     * @since 2017-09-22
     */
    this.safari11 = Sagen.Browser.Safari.is() && Sagen.Browser.Safari.version() >= 11;
    /**
     * Safari 11 mute 実行 timer id
     * @type {number}
     * @see https://github.com/undotsushin/undotsushin/issues/2503
     * @since 2017-09-22
     */
    this.muteId = 0;
  }
  /**
   * マウント後に表示プレイヤーの初期化を行います<br>
   * Hit.NO_COLLISION event を bind し監視を開始します
   */
  componentDidMount() {
    this.preparePlayer();
    let hit = this.hit;
    // console.log('componentDidMount', hit, this.videoElement);
    if (hit === null && this.videoElement !== null) {
      hit = new Hit(this.videoElement);
      this.hit = hit;
      hit.on(Hit.NO_COLLISION, this.boundOut);
      hit.start();
    }
  }
  /**
   * videojs の存在チェックを行い各OSタイプの初期化を行います
   */
  preparePlayer() {
    const videojs = self.videojs;
    if (!videojs) {
      setTimeout(() => {
        this.preparePlayer();
      }, 25);
      return;
    }
    // player 初期化処理へ
    this.initPlayer();
  }
  /**
   * 各OSタイプの初期化を行います
   */
  initPlayer() {
    const videojs = self.videojs;
    // const Ads = self.Ads;
    if (this.iphone) {
      this.iPhoneInitPlayer();
      return;
    }
    // not iPhone
    const vast = this.mobile ? this.props.video.adUrl.sp : this.props.video.adUrl.pc;
    const adUrl = vast !== '' ? vast + Date.now() : '';
    const videoElement = this.videoElement;
    this.bindEvent(videoElement);
    const player = videojs('content_video', { preload: 'none' });
    const option = {
      id: 'content_video',
      adTagUrl: adUrl
    };
    player.ima(option);
    player.on('play', () => {
      // document.querySelector('.vjs-big-play-button')
      this.mainContainer.querySelector('.vjs-big-play-button')
        .setAttribute('style', 'display:none !important');
    });
    // set global
    this.player = player;
    // PC / iPad / Android
    if (!this.mobile) {
      // PC
      this.pcInitPlayer();
      return;
    } else if (this.ipad) {
      // iPad
      this.iPadInitPlayer();
      return;
    }
    // console.log('may be android', this.mobile, this.ipad);
    // may be android
    player.one('click', function() {
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
    });
    // // console.log('ComponentVideojsImaArticle this.safari11', this.safari11);
    // // @see https://github.com/undotsushin/undotsushin/issues/2503
    // // @since 2017-09-22
    // if (this.safari11) {
    //   // console.log('ComponentVideojsImaArticle Safari 11 init', this.props.articleId);
    //   player.muted(true);
    //   // player.setAttribute('muted', 'muted');
    //   //
    //   // player.on(['adstart', 'adend', 'play'], function() {
    //   player.on(['adstart', 'adended', 'adend'], function() {
    //     // console.log('playse adstart');
    //     try{
    //       // console.log('ComponentVideojsImaArticle playse adstart try');
    //       player.muted(false);
    //     } catch(e) {
    //       console.warn(e);
    //       player.play();
    //     }
    //   });
    // }
    // @see https://github.com/undotsushin/undotsushin/issues/2503
    // @since 2017-09-22
    if (!this.mobile && adUrl && this.safari11) {
      this.forSafari(player);
    }
  }
  /**
   * `player.muted(false)` します
   * @param {*} player videojs object
   * @see https://github.com/undotsushin/undotsushin/issues/2503
   * @since 2017-09-22
   */
  forSafariMute(player) {
    clearTimeout(this.muteId);
    try{
      player.muted(false);
    } catch(e) {
      console.warn(e);
      player.play();
    }
  }
  /**
   * Safari 11 ad 対策
   * [videojs event type](https://github.com/videojs/videojs-contrib-ads/issues/108)
   * @param {*} player videojs object
   * @see https://github.com/undotsushin/undotsushin/issues/2503
   * @since 2017-09-22
   */
  forSafari(player) {
    player.muted(true);
    player.on('play', () => {
      console.log('safari 11 play');
      this.muteId = setTimeout(() => (this.forSafariMute(player)), 1000 * 5);
    });
    // @see https://github.com/videojs/videojs-contrib-ads/issues/108
    // player.on(['adstart', 'adended', 'adend'], () => (this.forSafariMute(player)));
    player.on('adstart', () => (clearTimeout(this.muteId)));
    player.on(['adended', 'adend'], () => (this.forSafariMute(player)));
  }
  /**
   * desktop プレイヤー初期化（自動再生）
   */
  pcInitPlayer() {
    // console.log('pcInitPlayer', this.props.articleId);
    const player = this.player;
    // document.querySelector('.vjs-big-play-button')
    this.mainContainer.querySelector('.vjs-big-play-button')
      .setAttribute('style', 'display:none !important;');
    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();
    player.play();
  }
  /**
   * iPad プレイヤー初期化
   */
  iPadInitPlayer() {
    // console.log('iPadInitPlayer', this.props.articleId);
    const player = this.player;
    // const videoElement = document.getElementById('content_video_html5_api');
    // const videoElement = this.videoElement;
    // this.videoElement = videoElement;
    // this.bindEvent(videoElement);

    player.one('play', function() {
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
    });
    player.on('click', function() {
      if(player.paused()) {
        player.play();
      } else {
        player.pause();
      }
    });
  }
  /**
   * iPhone プレイヤー初期化
   */
  iPhoneInitPlayer() {
    // console.log('iPhoneInitPlayer');
    // const videojs = self.videojs;
    const Ads = self.Ads;
    if (!Ads) {
      setTimeout(() => {
        this.iPadInitPlayer();
      }, 25);
    }
    const vast = this.props.video.adUrl.sp;
    const adUrl = vast !== '' ? vast + Date.now() : '';

    const ads = new Ads(
      adUrl,
      this.props.video.url.sd,
      window.innerWidth,
      Math.ceil( window.innerWidth / 16 * 9 ),
      this.props.poster
    );

    ads.init();
    // document.querySelector('.vjs-big-play-button')
    this.mainContainer.querySelector('.vjs-big-play-button')
      .setAttribute('style', 'display:none !important');

    // const videoElement = document.getElementById('content_video_html5_api');
    const videoElement = this.videoElement;
    // this.videoElement = videoElement;
    this.bindEvent(videoElement);
  }
  /**
   * 動画コンテナが画面外に出た
   *
   * - Hit.NO_COLLISION unbind
   * - Hit.COLLISION bind
   * - `player.pause()`, `player.ima.pauseAd()`
   */
  hitOut() {
    // console.log('hitOut');
    const hit = this.hit;
    hit.off(Hit.NO_COLLISION, this.boundOut);
    hit.on(Hit.COLLISION, this.boundIn);
    this.pause();
  }

  /**
   * 動画コンテナが画面内に表示された
   *
   * - Hit.COLLISION unbind
   * - Hit.NO_COLLISION bind
   */
  hitIn() {
    // console.log('hitIn');
    const hit = this.hit;
    hit.off(Hit.COLLISION, this.boundIn);
    hit.on(Hit.NO_COLLISION, this.boundOut);
  }
  /**
   * 動画プレイヤーを一時停止にします
   */
  pause() {
    const player = this.player;
    // console.log('pause', player);
    if (player) {
      player.pause();
      player.ima.pauseAd();
    }
  }
  /**
   * play / ended event を bind し ga tag 送信を行います
   * @param {Element} videoElement video tag
   */
  bindEvent(videoElement) {
    videoElement.addEventListener('play', this.onPlay.bind(this), false);
    videoElement.addEventListener('ended', this.onEnded.bind(this), false);
    // videoElement.addEventListener('pause', this.onPause.bind(this), false);
  }
  /**
   * 再生開始
   */
  onPlay() {
    if (!this.playing) {
      this.playing = true;
      this.tracking('begin');
    }
  }
  /**
   * 再生終了
   */
  onEnded() {
    if (this.playing) {
      this.playing = false;
      this.tracking('complete');
    }
  }
  // onPause() {
  //
  // }
  /**
   * ga tag を送信します
   * @param {string} action begin / complete
   */
  tracking(action) {
    const video = this.props.video;
    const url = this.mobile ? video.url.sd : video.url.hd;
    const gaData = new GaData('ComponentVideojsImaArticle.tracking', 'video', action, url);
    Ga.add( gaData );
  }
  /**
   * video tag とそのラップタグを作成します
   * @return {XML} video tag とそのラップタグ
   */
  render() {
    // ios
    if (this.iphone) {
      return (
        <div className="for-safari-memo-201709">
          <div id="ima-sample-videoplayer">
            <div id="ima-sample-placeholder" />
          </div>
          <a href="https://sportsbull.jp/p/197106/" style={{fontSize: '12px', paddingTop: '10px'}}>最新版 Safari における動画再生不具合について</a>
        </div>
      );
    }
    // not ios
    const video = this.props.video;
    const poster = this.props.poster;
    // const caption = this.props.caption;
    const url = this.mobile ? video.url.sd : video.url.hd;
    const width = this.phone ? window.innerWidth : Content.WIDTH;
    const height = this.phone ? Math.ceil(width / 16 * 9) : Content.HD_HEIGHT;
    // not ios
    return (
      <div className="for-safari-memo-201709">
        <div
          id="mainContainer"
          ref={(component) => {
            this.mainContainer = component;
          }}
        >
          <video
            id="content_video"
            className="video-js vjs-default-skin vjs-big-play-centered"
            poster={poster}
            width={`${width}px`}
            height={`${height}px`}
            ref={(component) => {
              this.videoElement = component;
            }}
            controls="controls"
          >
            <source src={url} type="application/x-mpegURL" />
          </video>
        </div>
        <a href="https://sportsbull.jp/p/197106/" style={{fontSize: '12px', paddingTop: '10px'}}>最新版 Safari における動画再生不具合について</a>
      </div>
    );
  }
}
