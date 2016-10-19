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
          <video id={videoId} className="video-js vjs-default-skin" poster={poster}  width={`${width}px`} height={`${height}px`} ref="video" controls>
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
      let videoId='content_video_'+single.id;
      let player = videojs(videoId);
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
