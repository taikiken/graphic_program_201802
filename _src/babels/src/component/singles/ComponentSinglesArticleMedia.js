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

// node
import { MediaImageNode } from '../../node/single/MediaImageNode';

// data
import { Safety } from '../../data/Safety';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * @TODO future remove - not use
 * 記事詳細・次の記事一覧のメインビジュアル
 * - 動画が次々再生されてウザイので img 置き換えた
 * @since 2016-09-30
 */
export class ComponentSinglesArticleMedia extends React.Component {
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

    return (
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
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
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
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
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
   * - 不要かも
   */
  reload() {
    this.updateSingle(this.state.single);
  }
}
