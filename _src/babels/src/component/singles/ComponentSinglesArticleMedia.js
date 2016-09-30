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
const React = self.React;

export class ComponentSinglesArticleMedia extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      single: props.single
    };
  }
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
  static video(single) {
    const images = single.media.images;
    const poster = Safety.image(images.thumbnail, Empty.VIDEO_THUMBNAIL);
    const caption = single.media.video.caption || '';
    let figCaption = '';
    if (caption !== '') {
      figCaption = <figcaption className="caption" dangerouslySetInnerHTML={{__html: caption}} />;
    }

    return (
      <div className="post-kv post-video-kv">
        <figure className="post-single-figure video-container">
          <img src={Empty.VIDEO_THUMBNAIL} alt=""/>
          <img src={poster} alt="" className="post-single-image video-image"/>
          {figCaption}
          <span className="video-play-btn"><img src={Empty.VIDEO_THUMBNAIL} alt=""/></span>
        </figure>
      </div>
    );
  }
  static image(single) {
    return (
      <MediaImageNode
        images={single.media.images}
      />
    );
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
