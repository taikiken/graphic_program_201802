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
import { Empty } from '../../app/const/Empty';
import {Content} from '../../app/const/Content';

// node
import { MediaImageNode } from '../../node/single/MediaImageNode';

// data
import { Safety } from '../../data/Safety';

// React
const React = self.React;

/**
 * 記事詳細・次の記事一覧のメインビジュアル<br>
 * 動画が次々再生されてウザイので img 置き換えた
 * @since 2016-09-30
 */
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

    const mediaType = single.mediaType;

    if (mediaType === MediaType.VIDEO) {
      return ComponentSinglesArticleMedia.video(single);
    }

    return ComponentSinglesArticleMedia.image(single);
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
    // console.log('single');
    // console.log(single.media);
    // console.log(single.media.images.large);
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

    let width =  Content.WIDTH;
    let height =  Content.HD_HEIGHT;

    return(
        <div className="post-kv post-video-kv">
        <div id={videoContainer}>
          <video id={videoId} className="video-js vjs-default-skin vjs-big-play-centered" poster={poster}  width={`${width}px`} height={`${height}px`} ref="video" controls>
              <source src={single.media.video.url.hd} type="application/x-mpegURL"></source>
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


  componentDidMount() {
    var single = this.state.single;
    if (single.mediaType === MediaType.VIDEO) {
      let vast = single.media.media.video.ad_url.pc;
      console.log(single.media.media.video.ad_url.pc);
      let adUrl = vast !== '' ? vast + Date.now() : '';
      let videoId='content_video_'+single.id;
      let player = videojs(videoId);
      let option = {
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


      var video=document.getElementById(videoId);


      var visibleY = function(el){
        var rect = el.getBoundingClientRect(), top = rect.top, height = rect.height,
            el = el.parentNode;
        do {
          rect = el.getBoundingClientRect();
          if (top <= rect.bottom === false) return false;
          // Check if the element is out of view due to a container scrolling
          if ((top + height) <= rect.top) return false
          el = el.parentNode;
        } while (el != document.body);
        // Check its within the document viewport
        return top <= document.documentElement.clientHeight;
      };



      var update = function(){
        if(visibleY(video)){
          //player.play();
        }else{
          player.pause();
          //console.log('PAUSE '+videoId);
        }

        /*document.getElementById('console').innerHTML = visibleY(document.getElementById('element2'))
            ? "Inner element is visible" : "Inner element is not visible";*/
      };



      window.addEventListener('scroll', function () {
          update();
      });



      /*var lastScrollTop = 0;
      window.addEventListener('scroll', function () {
        /!*var st = window.pageYOffset || document.documentElement.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st > lastScrollTop){
          // downscroll code

        } else {
          //scroll up code
        }
        lastScrollTop = st;*!/

        var elemTop = video.getBoundingClientRect().top;
        var elemBottom = video.getBoundingClientRect().bottom;
        var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
        if(isVisible){
          //player.play();
        }else {
          player.pause();
        }
      }, false);*/
      //window.addEventListener('resize', ComponentSinglesArticleMedia.checkScroll(video,player), false);


    }

  }

  /**
   * media_type: `image` の出力 `MediaImageNode` を使用します {@link MediaImageNode}
   * @param {SingleDae} single 記事データ
   * @return {XML} MediaImageNode を返します
   */
  static checkScroll(el,player) {
    console.log('croll');

    var rect = el.getBoundingClientRect();
    //document.write(rect);
    if(rect.bottom < 0 || rect.top > window.innerHeight){
      //player.pause();
      console.log('PAUSE');
      console.log(el);
    }else {
      //player.play();
    }

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
