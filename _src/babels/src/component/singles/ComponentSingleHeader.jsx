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
import View from '../../view/View';

// node
// import { BookmarkNode } from '../../node/bookmark/BookmarkNode';

// component
// import ComponentCategoryLabelsLink from '../categories/ComponentCategoryLabelsLink';
import { SingleDae } from '../../dae/SingleDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事詳細::div.post-heading 以下上部コンテンツを出力します<br>
 * 汎用化のために `ViewSingleHeader` {@link ViewSingleHeader} から分離します
 * @since 2016-09-24
 */
export default class ComponentSingleHeader extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae, sign: boolean, callback: function}} React props
   */
  static get propTypes() {
    return {
      // single: React.PropTypes.object.isRequired,
      single: React.PropTypes.instanceOf(SingleDae).isRequired,
      sign: React.PropTypes.bool.isRequired,
      callback: React.PropTypes.func
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
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
     * }}
     * */
    this.state = {
      single: props.single,
      sign: props.sign,
      status: props.single.isBookmarked,
      bookmarked: props.single.isBookmarked ? 'bookmarked enable' : '',
      // loading: ''
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
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
  // /**
  //  * React state, single と sign を更新します
  //  * @param {SingleDae} single 記事詳細 JSON データ
  //  * @param {boolean} sign ユーザーがログイン済みかの真偽値
  //  * */
  // updateSingle(single, sign) {
  //   this.setState({ single, sign });
  // }
  /**
   * delegate - update props to setState
   * @param {{single: SingleDae, sign: boolean}} nextProps next React.props
   */
  componentWillReceiveProps(nextProps) {
    const { single, sign } = nextProps;
    this.setState({ single, sign });
  }
  /**
   * 記事提供元ロゴクリック event handler, ga 送信
   */
  logoClick() {
    const link = this.state.single.user.logo.link;
    Ga.click('provider-logo', 'provider_link', 'click', link, true);
  }
  /**
   * 記事提供元ロゴ表示
   * @param {LogoDae} logo 記事提供元情報
   * @return {?XML} 画像がある時のみタグを返します
   */
  logo(logo) {
    const img = logo.img;
    // ロゴがなかったら表示しない
    if (!img) {
      return null;
    }
    const link = logo.link;
    if (!link) {
      // リンク(url)がなかったらロゴだけ表示
      return (
        <i className="provider-logo">
          <img src={img} alt=""/>
        </i>
      );
    }
    // リンク付き出力
    // クリックで ga 送信するので `onClick` を仕込みます
    return (
      <a href={link} target="_blank" onClick={this.boundLogo}>
        <i className="provider-logo">
          <img src={img} alt=""/>
        </i>
      </a>
    );
  }
  /**
   * 記事詳細上部 `header` を出力します
   * @return {XML} 記事詳細上部 `header` を返します
   * */
  render() {
    const single = this.state.single;
    // console.log('ComponentSingleHeader.render', single);
    const user = single.user;
    // @type {string}
    const userName = user.userName;
    // @type {LogoDae}
    const logo = user.logo;
    // 提供元名称とロゴがなかったら表示しない
    if (!userName && !logo.img) {
      return null;
    }
    return (
      <div className="single-header-root">
        <div className={`post-heading post-heading-${single.id}`}>
          <h1>{single.title}</h1>
        </div>
        {/* <ComponentCategoryLabelsLink
          index={0}
          id={`single-label-${single.id}`}
          categories={single.categories.all}
          className="category-heading"
          anotherCategories={single.anotherCategories}
        /> */}
        <div className="post-data">
          <p className="post-text">
            <span className="post-date">{single.displayDate}</span>
            <span className="post-category">{single.categories.label}</span>
          </p>
          <p className="post-logo">{this.logo(logo)}</p>
          {/* div.f-right (bookmark: on / off) */}
          {/* <BookmarkNode
            sign={this.state.sign}
            isBookmarked={this.state.status}
            articleId={String(single.id)}
          /> */}
        </div>
      </div>
    );
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
