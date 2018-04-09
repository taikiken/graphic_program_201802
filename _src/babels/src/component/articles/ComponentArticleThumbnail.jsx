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
// import { Message } from '../../app/const/Message';
import { MediaType } from '../../app/const/MediaType';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * [library] - Sagen
 */
const Sagen = self.Sagen;

/**
 * 記事一覧・サムネイル
 * @since 2016-09-16
 */
export default class ComponentArticleThumbnail extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  mediaType: string,
   *  thumbnail: string,
   *  title: string,
   *  recommend: boolean,
   *  small: boolean,
   * }} React props
   */
  static get propTypes() {
    return {
      mediaType: React.PropTypes.string.isRequired,
      thumbnail: React.PropTypes.string.isRequired,
      title: React.PropTypes.string.isRequired,
      recommend: React.PropTypes.bool.isRequired,
      // masonry: React.PropTypes.bool,
      // action: React.PropTypes.object,
      small: React.PropTypes.bool
    };
  }
  /**
   * React props defaultProps
   *
   * ```
   * return {
   *   small: false
   * };
   * ```
   * @return {{small: boolean}} defaultProps React props
   */
  static get defaultProps() {
    return {
      // masonry: false,
      // action: {},
      small: false
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * default property を保存し必要な関数・変数を準備します
   * @param {Object} props React props プロパティー {@link ComponentArticleThumbnail.propTypes}
   */
  constructor(props) {
    super(props);
    // /**
    //  * 可変要素
    //  * @type {{mediaType: string, thumbnail: string, title: string}}
    //  */
    // this.state = {
    //   mediaType: props.mediaType,
    //   thumbnail: props.thumbnail,
    //   title: props.title
    // };
    this.sp = Sagen.Browser.Mobile.phone();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * media type - image: thumbnail
   * @returns {XML} `figure.post-thumb`
   */
  img() {
    const { mediaType, thumbnail } = this.props;
    // https://github.com/undotsushin/undotsushin/issues/468
    // const imgStyle = {
    //   'background': `url(${thumbnail}) center center / cover no-repeat`
    // };
    // return (
    //   <figure className={`post-thumb post-thumb-${mediaType}`} style={imgStyle}>
    //     <img className="image-hd" src={Empty.VIDEO_THUMBNAIL} alt=""/>
    //   </figure>
    // );
    return (
      <figure className={`post-thumb post-thumb-${mediaType}`}>
        <img src={thumbnail} alt=""/>
      </figure>
    );
  }
  /**
   * video play icon - desktop / mobile で差替える
   * @param {boolean} small small flag
   * @returns {string} video play icon path
   */
  playIcon(small) {
    if (this.sp) {
      return small ? Empty.VIDEO_PLAY_SP_SMALL : Empty.VIDEO_PLAY_SP;
    }
    return small ? Empty.VIDEO_PLAY_SMALL : Empty.VIDEO_PLAY;
  }
  /**
   * media type - video: thumbnail
   * @returns {XML} `figure.post-thumb`
   */
  video() {
    const { small, mediaType, title, thumbnail } = this.props;
    // type: video
    // const icon = small ? Empty.VIDEO_PLAY_SMALL : Empty.VIDEO_PLAY;
    // @since 2018-01-15
    // design 変更に伴い figure内にspanを追加
    const icon = this.playIcon(small);
    return (
      <figure className={`post-thumb post-thumb-${mediaType}`}>
        <span>
          <img className="video-thumbnail" src={thumbnail} alt={title}/>
          <img className="post-thumb-overlay-movie type-movie" src={icon} alt="" />
        </span>
      </figure>
    );
  }
  /**
   * figure.post-thumb を作成します
   * @return {?XML} figure.post-thumb を返します
   */
  render() {
    const { mediaType } = this.props;
    // @since 2016-12-26
    // design 変更に伴い {recommend} がカテゴリ表記箇所へ移動のため削除
    // let recommend = null;
    // if (this.props.recommend) {
    //   recommend = <i className="post-label_recommend">{Message.LABEL_RECOMMEND}</i>;
    // }

    // // media type で thumbnail 切替
    // if (mediaType === MediaType.IMAGE) {
    //   // type: image
    //
    //   // https://github.com/undotsushin/undotsushin/issues/468
    //   const imgStyle = {
    //     'background': `url(${this.props.thumbnail}) center center / cover no-repeat`
    //   };
    //
    //   return (
    //     <figure className={`post-thumb post-thumb-${mediaType}`} style={imgStyle}>
    //       <img className="image-hd" src={Empty.VIDEO_THUMBNAIL} alt=""/>
    //       {/* recommend */}
    //     </figure>
    //   );
    // } else if (mediaType === MediaType.VIDEO) {
    //   // type: video
    //   const icon = this.props.small ? Empty.VIDEO_PLAY_SMALL : Empty.VIDEO_PLAY;
    //   return (
    //     <figure className={`post-thumb post-thumb-${mediaType}`}>
    //       <img className="video-thumbnail" src={this.props.thumbnail} alt={this.props.title}/>
    //       <img className="post-thumb-overlay-movie type-movie" src={icon} alt="" />
    //       {/* recommend */}
    //     </figure>
    //   );
    // } else {
    //   // 該当なし
    //   return null;
    // }
    // media type で thumbnail 切替
    // since 2017-12-18 switch-case 変更
    // console.log('ComponentArticleThumbnail.render', this.props);
    switch (mediaType) {
      case MediaType.IMAGE: {
        // image
        return this.img();
      }
      case MediaType.VIDEO: {
        // video
        return this.video();
      }
      default: {
        // 該当なし
        return null;
      }
    }
  }
}
