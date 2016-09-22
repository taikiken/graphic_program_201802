/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/16 - 23:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Empty } from '../../app/const/Empty';
import { Message } from '../../app/const/Message';
import { MediaType } from '../../app/const/MediaType';

// React
const React = self.React;

/**
 * 記事一覧・サムネイル
 * @since 2016-09-16
 */
export class ViewArticleThumbnail extends React.Component {
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ViewArticleThumbnail.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * 可変要素
     * @type {{mediaType: string, thumbnail: string, title: string}}
     */
    this.state = {
      mediaType: props.mediaType,
      thumbnail: props.thumbnail,
      title: props.title
    };
  }
  /**
   * figure.post-thumb を作成します
   * @return {?XML} figure.post-thumb を返します
   */
  render() {
    const mediaType = this.props.mediaType;
    let recommend = null;
    if (this.props.recommend) {
      recommend = <i className="post-label_recommend">{Message.LABEL_RECOMMEND}</i>;
    }

    // media type で thumbnail 切替
    if (mediaType === MediaType.IMAGE) {
      // type: image

      // https://github.com/undotsushin/undotsushin/issues/468
      const imgStyle = {
        'background': `url(${this.props.thumbnail}) center center / cover no-repeat`
      };

      return (
        <figure className={`post-thumb post-thumb-${mediaType}`} style={imgStyle}>
          <img className="image-hd" src={Empty.VIDEO_THUMBNAIL} alt=""/>
          {recommend}
        </figure>
      );
    } else if (mediaType === MediaType.VIDEO) {
      // type: video
      return (
        <figure className={`post-thumb post-thumb-${mediaType}`}>
          <img className="video-thumbnail" src={this.props.thumbnail} alt={this.props.title}/>
          <img className="post-thumb-overlay-movie type-movie" src={Empty.VIDEO_PLAY} alt="" />
          {recommend}
        </figure>
      );
    } else {
      // 該当なし
      return null;
    }
  }
}

/**
 * プロパティー
 * @type {{
 *  mediaType: string,
 *  thumbnail: string,
 *  title: string,
 *  masonry: boolean,
 *  action: Object,
 *  recommend: boolean
 * }}
 */
ViewArticleThumbnail.propTypes = {
  mediaType: React.PropTypes.string.isRequired,
  thumbnail: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  recommend: React.PropTypes.bool.isRequired,
  masonry: React.PropTypes.bool,
  action: React.PropTypes.object
};
