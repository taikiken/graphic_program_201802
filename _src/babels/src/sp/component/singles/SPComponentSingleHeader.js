/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/24 - 23:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../../../view/View';

// component
import ComponentCategoryLabelsLink from '../../../component/categories/ComponentCategoryLabelsLink';

// node
import { BookmarkNode } from '../../../node/bookmark/BookmarkNode';

// React
const React = self.React;

/**
 * 記事詳細::div.post-heading 以下上部コンテンツを出力します<br>
 * 汎用化のために `SPViewSingleHeader` {@link SPViewSingleHeader} から分離します
 * @since 2016-09-24
 */
export class SPComponentSingleHeader extends React.Component {
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
    this.props.callback(View.WILL_MOUNT);
  }
  /**
   * delegate, マウント後に呼び出され、 `View.DID_MOUNT` を発火します
   * */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
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
      <div className="sp-single-header">
        <div className={`post-heading post-heading-${single.id}`}>
          <h1>{single.title}</h1>
        </div>
        <div className="post-data">
          <div className="f-left">
            <p className="post-author">{single.user.userName}</p>
            {/*
            <p className="post-category">
              <CategoryLabelNodeLink
                categories={single.categories.all}
                id={`single-label-${single.id}`}
                index={1}
              />
            </p>
           */}
            <ComponentCategoryLabelsLink
              index={1}
              id={`single-label-${single.id}`}
              categories={single.categories.all}
              anotherCategories={single.anotherCategories}
            />
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
      callback: React.PropTypes.func.isRequired
    };
  }
}

// /**
//  * プロパティ
//  * @type {{single: SingleDae, sign: boolean, callback: function}}
//  */
// SPComponentSingleHeader.propTypes = {
//   single: React.PropTypes.object.isRequired,
//   sign: React.PropTypes.bool.isRequired,
//   callback: React.PropTypes.func.isRequired
// };
