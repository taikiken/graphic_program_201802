/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/28 - 16:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import { Message } from '../../../app/const/Message';

// sp/node
import { SPMediaNode } from '../../node/single/SPMediaNode';

// node
import { BookmarkNode } from '../../../node/bookmark/BookmarkNode';

// component
import { ComponentCategoryLabelsLink } from '../../../component/categories/ComponentCategoryLabelsLink';


// React
const React = self.React;

export class SPComponentSinglesArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      single: props.single,
      sign: props.sign
    };
  }
  render() {
    const single = this.state.single;

    if (!single) {
      return null;
    }

    return (
      <div className="loaded-post">
        {/* div.post-kv */}
        <div className="single-visual-container" ref="visualElement">
          <SPMediaNode
            articleId={String(single.id)}
            mediaType={single.mediaType}
            media={single.media}
            isShowImage={single.isShowImage}
          />
        </div>
        <div className="post-detail">
          {/* title */}
          <div className={`post-heading post-heading-${single.id}`}>
            <h1>{single.title}</h1>
          </div>
          {/* コンテンツ情報 */}
          <div className="post-data">
            <p className="post-author">{single.user.userName}</p>

            <ComponentCategoryLabelsLink
              index={this.props.index}
              id={`single-label-${single.id}`}
              categories={single.categories.all}
            />

            <p className="post-date">{single.displayDate}</p>
            <BookmarkNode
              sign={this.state.sign}
              isBookmarked={single.isBookmarked}
              articleId={String(single.id)}
            />
          </div>
          {/* 本文 */}
          <div className="post-content excerpt">
            <p>{single.description}</p>
          </div>
          {/* link */}
          <div className="post-content-read-more">
            <a href={single.url} className="post-content-btn-readMore">{Message.READ_MORE}</a>
          </div>
        </div>
      </div>
    );
  }
  updateSingle(single) {
    this.setState({ single });
  }
  updateSign(sign) {
    this.setState({ sign });
  }
  reload() {
    this.updateSingle(this.state.single);
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{dom: Sagen.Dom}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      index: React.PropTypes.number.isRequired
    };
  }
}
