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
import {Content} from '../../app/const/Content';

// ga
import {GaData} from '../../ga/GaData';
import {Ga} from '../../ga/Ga';

// Sagen
const Sagen = self.Sagen;

// about videojs
// const Ads = self.Ads;
// const videojs = self.videojs;

// React
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
export class ComponentVideojsIma extends React.Component {
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
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, マウント後にコールされます
   *
   * videojs で動画プレイヤーを作成し
   * ga 送信します
   *
   * window.onscroll を監視し非表示になったら player を止めます
   */
  componentDidMount() {
    this.initPlayer();
  }
  /**
   * video tag id を生成します<br>
   * videojs が使用します
   * @return {string} video tag id, content_video_[記事iD]
   */
  videoId() {
    return `content_video_${this.props.articleId}`;
  }
  /**
   * 動画プレイヤーを作成し ga 送信 window.onscroll 監視を始ます
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
    const player = videojs(videoId);
    const option = {
      id: videoId,
      adTagUrl: adUrl
    };
    player.ima(option);

    player.ima.initializeAdDisplayContainer();
    player.ima.requestAds();
    /*var adContainer = document.getElementById('content_video_ima-ad-container');
     adContainer.setAttribute('style', 'z-index: -1; position: absolute;');*/
    player.one('click', function() {
      player.play();
    });

    // global property セット
    this.player = player;

    // bind play / ended for ga
    this.ga(player);
    // bind scroll
    window.addEventListener('scroll', this.onScroll.bind(this), false);
  }
  /**
   * window.onscroll event handler<br>
   * スクロール位置と video tag の位置をチェックし必要なら再生を止めます
   */
  onScroll() {
    const player = this.player;
    const video = this.videoElement;
    if (player === null || video === null) {
      return;
    }
    const videoHeight = parseInt(Content.HD_HEIGHT, 10);
    const rect = video.getBoundingClientRect();
    const elemTop = rect.top;
    const elemBottom = rect.bottom;

    const isVisible = (elemTop >= 0 - videoHeight / 2) && (elemBottom <= window.innerHeight + videoHeight / 2);
    if(!isVisible) {
      player.pause();
      player.ima.pauseAd();
    }
  }

  /**
   * ga tag 送信
   *
   * - player.play, player.ended を監視します
   * @param {videojs} player videojs object
   */
  ga(player) {
    const video = this.props.video;
    const url = this.mobile ? video.url.sd : video.url.hd;
    player.one('play', function() {
      let gaData = new GaData('ComponentVideojsIma.initPlayer', 'video', 'begin', url);
      Ga.add(gaData);
    });
    player.one('ended', function() {
      let gaData = new GaData('ComponentVideojsIma.initPlayer', 'video', 'complete', url);
      Ga.add(gaData);
    });
  }
  /**
   * スマホ用 video tag
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
        <div className="mainContainer">
          <video
            id={this.videoId()}
            className="video-js vjs-default-skin vjs-big-play-centered"
            poster={poster}
            width={`${width}px`}
            height={`${height}px`}
            ref={(component) => {
              this.videoElement = component;
            }}
            controls="controls"
          >
              <source
                src={url}
                type="application/x-mpegURL"
              />
          </video>
        </div>
      </div>
    );
  }
  /**
   * PC + Tablet video tag
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
      <div className="post-kv post-video-kv">
        <div className="mainContainer">
          <video
            id={this.videoId()}
            className="video-js vjs-default-skin vjs-big-play-centered"
            poster={poster}
            width={`${width}px`}
            height={`${height}px`}
            ref={(component) => {
              this.videoElement = component;
            }}
            controls="controls"
          >
            <source
              src={url}
              type="application/x-mpegURL"
            />
          </video>
        </div>
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
