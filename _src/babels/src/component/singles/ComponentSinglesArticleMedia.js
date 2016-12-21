/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/30 - 19:58
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { MediaType } from '../../app/const/MediaType';
import {VideoType} from '../../app/const/VideoType';
import { Empty } from '../../app/const/Empty';
import {Content} from '../../app/const/Content';

// node
import { MediaImageNode } from '../../node/single/MediaImageNode';

// data
import { Safety } from '../../data/Safety';

// ga
import {GaData} from '../../ga/GaData';
import {Ga} from '../../ga/Ga';

// React
const React = self.React;

/**
 * 記事詳細・次の記事一覧のメインビジュアル<br>
 * 動画が次々再生されてウザイので img 置き換えた
 * @since 2016-09-30
 */
/* global videojs */
export class ComponentSinglesArticleMedia extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentSinglesArticle.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{single: SingleDae}}
     */
    this.state = {
      single: props.single
    };
  }
  /**
   * メインビジュアルを出力します
   * @return {?XML} video / image を返します
   */
  render() {
    const single = this.state.single;
    if (!single) {
      return null;
    }

    const mediaVideoType = single.media.video.player;
    const mediaType = single.mediaType;
    if (mediaType === MediaType.VIDEO) {
      switch ( mediaVideoType ) {
        case VideoType.BRIGHTCOVE:
          return ComponentSinglesArticleMedia.video(single);

        case VideoType.VIDEOJSIMA:
          return ComponentSinglesArticleMedia.video(single);

        case VideoType.YOUTUBE:
          return ComponentSinglesArticleMedia.youtube(single.media);

        case VideoType.FACEBOOK:
          return ComponentSinglesArticleMedia.facebook(single.media);

        default:
          return null;

      }
    }
    return ComponentSinglesArticleMedia.image(single);



    /* if (mediaType === MediaType.VIDEO) {
      return ComponentSinglesArticleMedia.video(single);
    }

    return ComponentSinglesArticleMedia.image(single);*/
  }
  /**
   * state.sign 情報を更新し再描画します
   * @param {boolean} sign state.sign
   */
  updateSign(sign) {
    this.setState({ sign });
  }
  /**
   * 表示の元になる情報を更新せず表示系を更新します
   * @ToDo 不要かも
   */
  reload() {
    this.updateSingle(this.state.single);
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * media_type: `video` の出力
   * @param {SingleDae} single 記事データ
   * @return {XML} div.post-kv を返します
   */
  static video(single) {
    const images = single.media.images;
    var poster = Safety.image(images.original, '');
    if (poster === '') {
      poster = Safety.image(images.thumbnail, Empty.VIDEO_THUMBNAIL);
    }
    var videoId = 'content_video_' + single.id;
    var videoContainer = 'mainContainer_' + single.id;

    let width = Content.WIDTH;
    let height = Content.HD_HEIGHT;

    return(
        <div className="post-kv post-video-kv">
        <div id={videoContainer}>
          <video id={videoId} className="video-js vjs-default-skin vjs-big-play-centered" poster={poster} width={`${width}px`} height={`${height}px`} ref="video" controls>
            <source src={single.media.video.url.hd} type="application/x-mpegURL"></source>
          </video>
          </div>
        </div>
    );
  }


  componentDidMount() {
    var single = this.state.single;
    if (single.mediaType === MediaType.VIDEO) {
      let vast = single.media.media.video.ad_url.pc;
      let adUrl = vast !== '' ? vast + Date.now() : '';
      let videoId = 'content_video_' + single.id;
      let player = videojs(videoId, { preload: 'none' });
      let option = {
        id: videoId,
        adTagUrl: adUrl
      };
      player.ima(option);

      player.ima.initializeAdDisplayContainer();

      player.one('click', function() {
        player.ima.requestAds();
        player.play();
      });

      let url = single.media.video.url.hd;
      player.one('play', function() {
        let gaData = new GaData('ComponentSinglesArticleMedia.tracking', 'video', 'begin', url);
        Ga.add(gaData);
      });
      player.one('ended', function() {
        let gaData = new GaData('ComponentSinglesArticleMedia.tracking', 'video', 'complete', url);
        Ga.add(gaData);
      });

      var video = document.getElementById(videoId);

      window.addEventListener('scroll', function() {
        var videoHeight = parseInt(Content.HD_HEIGHT, 10);
        var elemTop = video.getBoundingClientRect().top;
        var elemBottom = video.getBoundingClientRect().bottom;

        var isVisible = (elemTop >= 0 - videoHeight) && (elemBottom <= window.innerHeight + videoHeight);
        if (isVisible) {
          // player.play();
        } else {
          player.pause();
          player.ima.pauseAd();
        }

      }, false);
    }

  }

  static youtube( media ) {
    var video = media.video;

    return (
      <div className="post-kv">
        <iframe
          src = {`https://www.youtube.com/embed/${video.youtube}?rel=0&amp;showinfo=0&amp;wmode=transparent`}
          width = {Content.WIDTH}
          height = {Content.HD_HEIGHT}
          frameBorder = "0"
          allowFullScreen
        >
        </iframe>
      </div>
    );
  }

  static facebook( media ) {
    var video = media.video;
    return (
      <div className="post-kv">
        <div className="fb-video"
          data-href = {video.facebook}
          data-allowfullscreen="true"
          data-width={Content.WIDTH}
        >
        </div>
      </div>
    );
  }


  /**
   * media_type: `image` の出力 `MediaImageNode` を使用します {@link MediaImageNode}
   * @param {SingleDae} single 記事データ
   * @return {XML} MediaImageNode を返します
   */
  static image(single) {
    return (
      <MediaImageNode
        images={single.media.images}
      />
    );
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired
    };
  }
}
