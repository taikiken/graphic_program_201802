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

export class ComponentVideojsImaFirst extends React.Component {
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
   * @param {Object} props React props プロパティー {@link ComponentVideojsIma.propTypes}
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

    this.playing = false;
  }
  componentDidMount() {
    this.preparePlayer();
  }
  preparePlayer() {
    const videojs = self.videojs;
    const Ads = self.Ads;
    if (!videojs || !Ads) {
      setTimeout(() => {
        this.preparePlayer();
      }, 25);
      return;
    }
    this.initPlayer();
  }
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
    // may be android
    player.one('click', function() {
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      player.play();
    });
  }
  pcInitPlayer() {
    const player = this.player;
    document.querySelector('.vjs-big-play-button')
      .setAttribute('style', 'display:none !important;');
    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();
    player.play();
  }
  iPhoneInitPlayer() {
    // const videojs = self.videojs;
    const Ads = self.Ads;
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
  iPadInitPlayer() {
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

  }
  bindEvent(videoElement) {
    videoElement.addEventListener('play', this.onPlay);
    videoElement.addEventListener('ended', this.onEnded);
    // videoElement.addEventListener('pause', this.onPause);
  }
  onPlay() {
    if (!this.playing) {
      this.playing = true;
      this.tracking('begin');
    }
  }
  onEnded() {
    if ( this.playing ) {
      this.playing = false;
      this.tracking('complete');
    }
  }
  // onPause() {
  //
  // }
  tracking(action) {
    const video = this.props.video;
    const url = this.mobile ? video.url.sd : video.url.hd;
    const gaData = new GaData('ComponentVideojsImaFirst.tracking', 'video', action, url);
    Ga.add( gaData );
  }
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
