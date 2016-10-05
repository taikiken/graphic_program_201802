/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/24 - 18:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import { View } from '../../view/View';

// node
import { BookmarkNode } from '../../node/bookmark/BookmarkNode';

// component
import { ComponentCategoryLabelsLink } from '../categories/ComponentCategoryLabelsLink';

// React
const React = self.React;

/**
 * 記事詳細::div.post-heading 以下上部コンテンツを出力します<br>
 * 汎用化のために `ViewSingleHeader` {@link ViewSingleHeader} から分離します
 * @since 2016-09-24
 */
export class ComponentSingleHeader extends React.Component {
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSingleHeader.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React status
     * @type {{
     *  single: SingleDae,
     *  sign: boolean,
     *  status: boolean,
     *  bookmarked: string,
     *  loading: string
     * }}
     * */
    this.state = {
      single: props.single,
      sign: props.sign,
      status: props.single.isBookmarked,
      bookmarked: props.single.isBookmarked ? 'bookmarked enable' : '',
      loading: ''
    };
  }
  /**
   * delegate, マウント前に呼び出され、 `View.WILL_MOUNT` を発火します
   * */
  componentWillMount() {
    const safety = this.props.callback;
    if (!!safety) {
      safety(View.WILL_MOUNT);
    }
  }
  /**
   * delegate, マウント後に呼び出され、 `View.DID_MOUNT` を発火します
   * */
  componentDidMount() {
    const safety = this.props.callback;
    if (!!safety) {
      safety(View.DID_MOUNT);
    }
  }
  /**
   * React state, single と sign を更新します
   * @param {SingleDae} single 記事詳細 JSON データ
   * @param {boolean} sign ユーザーがログイン済みかの真偽値
   * */
  updateSingle(single, sign) {
    this.setState({ single, sign });
  }
  /**
   * 記事詳細上部 `header` を出力します
   * @return {XML} 記事詳細上部 `header` を返します
   * */
  render() {
    const single = this.state.single;
    return (
      <div className="single-header-root">
        <div className={`post-heading post-heading-${single.id}`}>
          <h1>{single.title}</h1>
        </div>
        <ComponentCategoryLabelsLink
          index={0}
          id={`single-label-${single.id}`}
          categories={single.categories.all}
          className="category-heading"
        />
        <div className="post-data">
          <div className="f-left">
            <p className="post-author">{single.user.userName}</p>
            <p className="post-date">{single.displayDate}</p>
          </div>
          {/* div.f-right (bookmark: on / off) */}
          <BookmarkNode
            sign={this.state.sign}
            isBookmarked={this.state.status}
            articleId={String(single.id)}
          />
        </div>
      </div>
    );
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae, sign: boolean, callback: function}} React props
   */
  static get propTypes() {
    return {
      single: React.PropTypes.object.isRequired,
      sign: React.PropTypes.bool.isRequired,
      callback: React.PropTypes.func
    };
  }
}

// /**
//  * プロパティ
//  * @type {{single: SingleDae, sign: boolean, callback: function}}
//  */
// ComponentSingleHeader.propTypes = {
//   single: React.PropTypes.object.isRequired,
//   sign: React.PropTypes.bool.isRequired,
//   callback: React.PropTypes.func.isRequired
// };
