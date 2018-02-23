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


/**
 * 提供元のロゴ表示部分を /_src/babels/src/component/singles-content/ComponentSingleProvider.jsx から移植
 * @since 2018-01-15
 */


// view
import View from '../../../view/View';

// component
// import ComponentCategoryLabelsLink from '../../../component/categories/ComponentCategoryLabelsLink';

// node
// import { BookmarkNode } from '../../../node/bookmark/BookmarkNode';

// ga
import { Ga } from '../../../ga/Ga';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事詳細::div.post-heading 以下上部コンテンツを出力します
 * - 汎用化のために `SPViewSingleHeader` {@link SPViewSingleHeader} から分離します
 * @since 2016-09-24
 */
export default class SPComponentSingleHeader extends React.Component {
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
    /**
     * bound logoClick
     * @type {function}
     */
    this.boundLogo = this.logoClick.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
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
    // @type {UserDae} - 記事オーナー情報
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
      <div className="sp-single-header">
        <div className={`post-heading post-heading-${single.id}`}>
          <h1>{single.title}</h1>
        </div>
        <div className="post-data">
          <p className="post-text">
            <span className="post-date">{single.displayDate}</span>
            <span className="post-category">{single.categories.label}</span>
          </p>
          <p className="post-logo">{this.logo(logo)}</p>
          {/*
            design 変更に伴い
            post-date以外をコメントアウト
            @since 2018-01-15

            <div className="f-left">
            <p className="post-author">{single.user.userName}</p>

            <p className="post-category">
              <CategoryLabelNodeLink
                categories={single.categories.all}
                id={`single-label-${single.id}`}
                index={1}
              />
            </p>

            <ComponentCategoryLabelsLink
              index={1}
              id={`single-label-${single.id}`}
              categories={single.categories.all}
              anotherCategories={single.anotherCategories}
            />
            </div>
          */}
          {/* div.f-right (bookmark: on / off) */}
          {/*
            design 変更に伴い
            post-date以外をコメントアウト
            @since 2018-01-31
            <BookmarkNode
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
// SPComponentSingleHeader.propTypes = {
//   single: React.PropTypes.object.isRequired,
//   sign: React.PropTypes.bool.isRequired,
//   callback: React.PropTypes.func.isRequired
// };
