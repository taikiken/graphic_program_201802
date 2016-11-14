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
export class ComponentVideojsImaFirst extends React.Component {
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
      playImage: React.PropTypes.string.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentVideojsImaFirst.propTypes}
   */
  constructor(props) {
    super(props);
    /**
     * video tag
     * @type {?Element}
     */
    this.videoElement = null;
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
  }
  /**
   * マウント後に表示プレイヤーの初期化を行います
   */
  componentDidMount() {
    this.preparePlayer();
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
    const player = videojs('content_video');
    const option = {
      id: 'content_video',
      adTagUrl: adUrl
    };
    player.ima(option);
    player.on('play', function() {
      document.querySelector('.vjs-big-play-button')
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
    console.log('may be android', this.mobile, this.ipad);
    // may be android
    player.one('click', function() {
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
    });
  }

  /**
   * desktop プレイヤー初期化（自動再生）
   */
  pcInitPlayer() {
    console.log('pcInitPlayer');
    const player = this.player;
    document.querySelector('.vjs-big-play-button')
      .setAttribute('style', 'display:none !important;');
    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();
    player.play();
  }
  /**
   * iPhone プレイヤー初期化
   */
  iPhoneInitPlayer() {
    console.log('iPhoneInitPlayer');
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
    document.querySelector('.vjs-big-play-button')
      .setAttribute('style', 'display:none !important');

    const videoElement = document.getElementById('content_video_html5_api');
    this.videoElement = videoElement;
    this.bindEvent(videoElement);
  }
  /**
   * iPad プリヤー初期化
   */
  iPadInitPlayer() {
    console.log('iPadInitPlayer');
    const player = this.player;
    const videoElement = document.getElementById('content_video_html5_api');
    this.videoElement = videoElement;
    this.bindEvent(videoElement);

    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();
    const adContainer = document.getElementById('content_video_ima-ad-container');
    adContainer.setAttribute('style', 'z-index: -1; position: absolute;');
    player.one('click', function() {
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
    });
  }
  hitOut() {
    this.pause();
  }
  pause() {
    const player = this.player;
    player.pause();
    player.ima.pauseAd();
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
    const gaData = new GaData('ComponentVideojsImaFirst.tracking', 'video', action, url);
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
        <div id="ima-sample-videoplayer">
          <div id="ima-sample-placeholder" />
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
      <div id="mainContainer">
        <video
          id="content_video"
          className="video-js vjs-default-skin"
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
    );
  }
}
