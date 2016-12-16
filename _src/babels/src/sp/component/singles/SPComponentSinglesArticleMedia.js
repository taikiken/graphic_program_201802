/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/05 - 18:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { MediaType } from '../../../app/const/MediaType';
import { Empty } from '../../../app/const/Empty';

// node
import { MediaImageNode } from '../../../node/single/MediaImageNode';

// data
import { Safety } from '../../../data/Safety';

// React
const React = self.React;

/**
 * 記事詳細・次の記事一覧のメインビジュアル<br>
 * 動画が表示されない(VideojsImaNode {@link VideojsImaNode})ので画像サムネイルに置換えます
 *
 * @see https://github.com/undotsushin/undotsushin/issues/1158
 * @since 2016-10-05
 */
export class SPComponentSinglesArticleMedia extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link SPComponentSinglesArticleMedia.propTypes}
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

    const mediaType = single.mediaType;

    if (mediaType === MediaType.VIDEO) {
      return SPComponentSinglesArticleMedia.video(single);
    }

    return SPComponentSinglesArticleMedia.image(single);
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


  componentDidMount() {
    var single = this.state.single;
    if (single.mediaType === MediaType.VIDEO) {
      let vast = single.media.media.video.ad_url.sp;
      let adUrl = vast !== '' ? vast + Date.now() : '';

      /*if (navigator.userAgent.match(/iPhone/i)) {
        var ads = new Ads(adUrl, single.media.video.url.sd, window.innerWidth, Math.ceil(window.innerWidth / 16 * 9), single.media.images.original);
        ads.init();
      }*/

      let videoId='content_video_'+single.id;
      let player = videojs(videoId,{preload:"none"});
      let option = {
        id: videoId,
        adTagUrl: adUrl
      };
      player.ima(option);


      if (navigator.userAgent.match(/iPhone/i)) {
        document.querySelector('#'+videoId+'_ima-ad-container').setAttribute('style', 'z-index: 9 !important; position: absolute;');
        var adContainer = document.querySelector('#'+videoId+'_ima-ad-container > div');
        adContainer.setAttribute('style', 'display:none');
      }


      if (navigator.userAgent.match(/Android/i)) {
        var adContainer = document.getElementById(videoId+'_ima-ad-container');
        adContainer.setAttribute('style', 'z-index: 99 !important; position: absolute;');
      }


        player.one('click', function() {
            player.ima.initializeAdDisplayContainer();
            player.ima.requestAds();
            player.play();
        });


      let url = single.media.video.url.sd;
      player.one('play', function() {
        let gaData = new GaData('SPComponentSinglesArticleMedia.tracking', 'video', 'begin', url);
        Ga.add(gaData);

      });
      player.one('ended', function() {
        let gaData = new GaData('SPComponentSinglesArticleMedia.tracking', 'video', 'complete', url);
        Ga.add(gaData);
      });

      var video=document.getElementById(videoId);

      window.addEventListener('scroll', function () {
        let videoWidth = window.innerWidth;
        let videoHeight = Math.ceil( videoWidth / 16 * 9 );

        var elemTop = video.getBoundingClientRect().top;
        var elemBottom = video.getBoundingClientRect().bottom;

        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i)) {
          var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight+videoHeight/2);
        }else{
          var isVisible = (elemTop >= 0-videoHeight/2) && (elemBottom <= window.innerHeight+videoHeight/2);
        }
        if(isVisible){
          //player.play();
        }else {
          player.pause();
          player.ima.pauseAd();
        }
      }, false);
    }

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
    let poster = Safety.image(images.original, '');
    if (poster === '') {
      poster = Safety.image(images.thumbnail, Empty.VIDEO_THUMBNAIL);
    }
    const caption = single.media.video.caption || '';
    let figCaption = '';
    if (caption !== '') {
      figCaption = <figcaption className="caption" dangerouslySetInnerHTML={{__html: caption}} />;
    }

    let videoId='content_video_'+single.id;
    let videoContainer='mainContainer_'+single.id;
    let width = window.innerWidth;
    let height = Math.ceil( width / 16 * 9 );

    return(
        <div className="post-kv post-video-kv">
          <div id={videoContainer}>
            <video id={videoId} className="video-js vjs-default-skin vjs-big-play-centered" poster={poster}  width={`${width}px`} height={`${height}px`} ref="video"  controls>
              <source src={single.media.video.url.sd} type="application/x-mpegURL"></source>
            </video>
          </div>
        </div>
    );

    /*return (
      <div className="post-kv post-video-kv">
        <figure className="post-single-figure video-container">
          <div className="video-thumbnail-container">
            <img src={Empty.VIDEO_THUMBNAIL} alt=""/>
            <img src={poster} alt="" className="post-single-image video-image"/>
            <span className="video-play-btn"><a href={single.url}><img src={Empty.VIDEO_THUMBNAIL} alt=""/></a></span>
          </div>
          {figCaption}
        </figure>
      </div>
    );*/
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

