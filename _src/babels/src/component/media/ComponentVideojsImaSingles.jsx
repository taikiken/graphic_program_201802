/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/12 - 21:34
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
/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * VideojsImag を移植し記事詳細に使用します
 *
 * iret 様作成コードを手動マージしました
 *
 * VideojsImaNod {@link VideojsImaNode}
 * @see https://github.com/undotsushin/undotsushin/compare/iret/player_phase2
 * @see https://github.com/undotsushin/undotsushin/blame/iret/player_phase2/_src/babels/src/component/singles/ComponentSinglesArticleMedia.js
 * @see https://github.com/undotsushin/undotsushin/blame/iret/player_phase2/_src/babels/src/sp/component/singles/SPComponentSinglesArticleMedia.js
 *
 * @since  2016-11-13
 */
export default class ComponentVideojsImaSingles extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * - articleId - 記事ID
   * - video {VideoDae}
   * - poster {string} poster image
   * - caption {string} video caption
   * - playImage {string} play button image path
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
      // // - 出現位置, -1 はページ先頭
      // index: React.PropTypes.number,
      // // play button を表示するか否かのフラッグ
      // showPlay: React.PropTypes.bool
    };
  }
  // static get defaultProps() {
  //   return {
  //     // index: -1,
  //     showPlay: true
  //   };
  // }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentVideojsImaSingles.propTypes}
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
    /**
     * bind onScroll
     * @type {function}
     */
    this.onScroll = this.onScroll.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後にコールされます
   * - videojs で動画プレイヤーを作成します `initPlayer` 実行
   * - ga 送信します
   *
   * window.onscroll を監視し非表示になったら player を止めます
   */
  componentDidMount() {
    this.initPlayer();
  }
  /**
   * video tag id を生成します
   * - videojs が使用します
   * @return {string} video tag id, `content_video_[記事iD]`
   */
  videoId() {
    return `content_video_${this.props.articleId}`;
  }
  /**
   * 動画プレイヤー初期処理を行います
   * - 動画プレイヤーを作成します
   * - ga 送信します
   * - window.onscroll 監視を始ます
   */
  initPlayer() {
    const videojs = self.videojs;
    if (!videojs) {
      // ロード遅延, videojs が enable になるまで待機します
      setTimeout(() => {
        this.initPlayer();
      }, 25);
      return;
    }
    const vast = this.props.video.adUrl.pc;
    // cache 対策
    const adUrl = vast !== '' ? vast + Date.now() : '';
    const videoId = this.videoId();
    const player = videojs(videoId, { preload: 'none' });
    const option = {
      id: videoId,
      adTagUrl: adUrl
    };
    player.ima(option);

    // videojsが生成する動画に `playsinline` つける
    document.getElementById(videoId + '_html5_api').setAttribute('playsinline', 'playsinline');

    // player.ima.initializeAdDisplayContainer();
    // player.ima.requestAds();

    // if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i)) {
    //   document.querySelector('#' + videoId + '_ima-ad-container').setAttribute('style', 'z-index: 9 !important; position: absolute; display: block;');
    // }
    // if (navigator.userAgent.match(/iPhone/i)) {
    //   document.querySelector('#' + videoId + '_ima-ad-container > div').setAttribute('style', 'display:none');
    // }

    // l.155 ~ 160 を少し変更しました
    // 最適化を図れればと考えました
    // 問題があれば元に戻してください
    const iphone = !!navigator.userAgent.match(/iPhone/i);
    const android = !!navigator.userAgent.match(/Android/i);
    const adContainer = document.getElementById(`${videoId}_ima-ad-container`);
    if (iphone || android) {
      adContainer.setAttribute('style', 'z-index: 9 !important; position: absolute; display: block;');
    }
    if (iphone) {
      adContainer.querySelector('div').setAttribute('style', 'display:none');
    }

    /*
     var adContainer = document.getElementById('content_video_ima-ad-container');
     adContainer.setAttribute('style', 'z-index: -1; position: absolute;');
     */
    player.one('click', function() {
      // ---
      // https://github.com/undotsushin/undotsushin/issues/1366
      // 記事詳細マルチプレイヤー・動画再生時に広告リクエスト
      player.ima.initializeAdDisplayContainer();
      player.ima.requestAds();
      adContainer.querySelector('div').style.display = 'block';
      // ---
      player.play();
    });
    // > Google IMAが最新版で対応し、不要になった - Safari 11 mute 処理とる
    // @see https://github.com/undotsushin/undotsushin/issues/2503#issuecomment-338888297
    // @since 2017-10-24
    // // @see https://github.com/undotsushin/undotsushin/issues/2503
    // // @since 2017-09-22
    // if (!this.mobile && adUrl && this.safari11) {
    //   this.forSafari(player);
    // }

    // global property セット
    this.player = player;

    // bind play / ended for ga
    this.ga(player);
    // bind scroll
    window.removeEventListener('scroll', this.onScroll);
    window.addEventListener('scroll', this.onScroll, false);
  }
  /**
   * `player.muted(false)` します
   * @param {*} player videojs object
   * @see https://github.com/undotsushin/undotsushin/issues/2503
   * @since 2017-09-22
   */
  forSafariMute(player) {
    clearTimeout(this.muteId);
    // try / catch
    try{
      player.muted(false);
    } catch(e) {
      console.warn('ComponentVideojsImaSingles.forSafariMute: l250', e);
      player.play();
    }
  }
  /**
   * Safari 11 ad 対策
   * - [videojs event type](https://github.com/videojs/videojs-contrib-ads/issues/108)
   * @param {*} player videojs object
   * @see https://github.com/undotsushin/undotsushin/issues/2503
   * @since 2017-09-22
   */
  forSafari(player) {
    player.muted(true);
    player.on('play', () => {
      // console.log('safari 11 play');
      this.muteId = setTimeout(() => (this.forSafariMute(player)), 1000 * 5);
    });
    // @see https://github.com/videojs/videojs-contrib-ads/issues/108
    // player.on(['adstart', 'adended', 'adend'], () => (this.forSafariMute(player)));
    player.on('adstart', () => (clearTimeout(this.muteId)));
    player.on(['adended', 'adend'], () => (this.forSafariMute(player)));
  }
  /**
   * window.onscroll event handler
   * - スクロール位置と video tag の位置をチェックし必要なら再生を止めます
   */
  onScroll() {
    const player = this.player;
    const video = this.videoElement;
    if (player === null || video === null) {
      return;
    }
    const videoWidth = this.phone ? window.innerWidth : 0;
    const videoHeight = this.phone ? Math.ceil(videoWidth / 16 * 9) : parseInt(Content.HD_HEIGHT, 10);
    const rect = video.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;
    const isVisible = (elemTop >= 0 - videoHeight) && (elemBottom <= window.innerHeight + videoHeight);
    if (!isVisible) {
      player.pause();
      player.ima.pauseAd();
    }
  }
  /**
   * ga tag 送信
   * - player.play, player.ended を監視します
   * @param {videojs} player videojs object
   */
  ga(player) {
    const video = this.props.video;
    const url = this.mobile ? video.url.sd : video.url.hd;
    // bind
    player.one('play', function() {
      let gaData = new GaData('ComponentVideojsImaSingles.initPlayer', 'video', 'begin', url);
      Ga.add(gaData);
    });
    player.one('ended', function() {
      let gaData = new GaData('ComponentVideojsImaSingles.initPlayer', 'video', 'complete', url);
      Ga.add(gaData);
    });
  }
  /**
   * スマホ用 video tag
   *
   * ライブラリが出力 video tag を破壊するので ref を親エレメント div.mainContainer に移動しました on 2016-12-22
   * @return {XML} スマホ用 video tag
   */
  renderMobile() {
    const video = this.props.video;
    const poster = this.props.poster;
    // const caption = this.props.caption;
    const url = video.url.sd;
    const width = window.innerWidth;
    const height = Math.ceil( width / 16 * 9 );

    return (
      <div className="post-kv post-video-kv">
        <div
          className="mainContainer"
          ref={(component) => {
            this.videoElement = component;
          }}
        >
          <video
            id={this.videoId()}
            className="video-js vjs-default-skin vjs-big-play-centered"
            poster={poster}
            width={`${width}px`}
            height={`${height}px`}
            controls="controls"
            playsInline="playsInline"
            ref={(node) => (node.setAttribute('webkit-playsinline', 'webkit-playsinline'))}
          >
              <source
                src={url}
                type="application/x-mpegURL"
              />
          </video>
        </div>
        {/*
        // トルツメ - UNDO_SPBL-206 【フロント】記事プレイヤー下のヘルプ文言を削除する
        <a href="https://sportsbull.jp/p/197106/" style={{fontSize: '11px', paddingTop: '10px'}}>最新版 Safari における動画再生不具合について</a>
        */}
      </div>
    );
  }
  /**
   * PC + Tablet video tag
   *
   * ライブラリが出力 video tag を破壊するので ref を親エレメント div.mainContainer に移動しました on 2016-12-22
   * @return {XML} PC + Tablet video tag
   */
  renderDesktop() {
    const video = this.props.video;
    const poster = this.props.poster;
    // const caption = this.props.caption;
    const url = this.mobile ? video.url.sd : video.url.hd;
    const width = Content.WIDTH;
    const height = Content.HD_HEIGHT;
    return (
      <div className="for-safari-memo-201709">
        <div className="post-kv post-video-kv">
          <div
            className="mainContainer"
            ref={(component) => {
              this.videoElement = component;
            }}
          >
            <video
              id={this.videoId()}
              className="video-js vjs-default-skin vjs-big-play-centered"
              poster={poster}
              width={`${width}px`}
              height={`${height}px`}
              controls="controls"
            >
              <source
                src={url}
                type="application/x-mpegURL"
              />
            </video>
          </div>
        </div>
        {/*
        // トルツメ - UNDO_SPBL-206 【フロント】記事プレイヤー下のヘルプ文言を削除する
        <a href="https://sportsbull.jp/p/197106/" style={{fontSize: '12px', paddingTop: '10px'}}>最新版 Safari における動画再生不具合について</a>
        */}
      </div>
    );
  }

  /**
   * video tag を出力します
   * @return {XML} video tag
   */
  render() {
    if (this.phone) {
      return this.renderMobile();
    } else {
      return this.renderDesktop();
    }
  }
}
