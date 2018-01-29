/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/24 - 23:17
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../../view/View';

// app
import { Url } from '../../app/const/Url';
import { Message } from '../../app/const/Message';

// // node
// import { BannerNode } from '../../node/single/BannerNode';

// view
import Banner from '../../view/Banner';
import { SingleDae } from '../../dae/SingleDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事詳細下部を出力します
 * - 汎用化のために `ViewSingleFooter` {@link ViewSingleFooter} から分離します
 *
 * 記事詳細下部, TAG 部分の出力 `div.post-footer`
 * - Banner {@link Banner} の出力を行います
 * @since 2016-09-24
 */
export default class ComponentSingleFooter extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{single: SingleDae, callback: Function}} React props
   */
  static get propTypes() {
    return {
      // single: React.PropTypes.object.isRequired,
      single: React.PropTypes.instanceOf(SingleDae).isRequired,
      callback: React.PropTypes.func.isRequired
    };
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを保存し必要な関数・変数を準備します
   * @param {Object} props プロパティ {@link ComponentSingleFooter.propTypes}
   */
  constructor(props) {
    super(props);

    /**
     * React state
     * @type {{single: SingleDae}}
     * */
    this.state = {
      single: props.single
    };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * delegate, mount 後に呼び出され `View.DID_MOUNT` を発火します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
  // /**
  //  * 記事詳細下部を更新します
  //  * @param {SingleDae} single 更新する SingleDae instance
  //  * */
  // updateSingle(single) {
  //   this.setState({ single });
  // }
  /**
   * delegate - update props to setState
   * @param {{single: SingleDae}} nextProps next React.props
   */
  componentWillReceiveProps(nextProps) {
    const { single } = nextProps;
    this.setState({ single });
  }
  /**
   * `div.post-footer` を出力します
   * @return {XML} `div.post-footer` を返します
   * */
  render() {
    const single = this.state.single;
    const keywords = single.keywords;
    // const userBanner = single.user.banner.pc;
    // let banner = single.banner.pc;
    // // banner データを決定します
    // if (!banner.image && !!userBanner.image) {
    //   banner = userBanner;
    // }
    const component = Banner.pc(single);

    // keywords がない時は banner だけを出力します
    if (!keywords.hasKeyword) {
      if (component === null) {
        return null;
      }

      return (
        <div className="post-footer">
          {component}
        </div>
      );
    }

    // keywords + banner を出力します
    return (
      <div className="post-footer">
        {component}
        {/* TAGS */}
        <div className="post-tags">
          <h2 className="post-tags-heading">タグ</h2>
          <ul className="post-tags-list">
            {
              keywords.keywords.map((keyword, i) => {
                return (
                  <li
                    key={`keyword-${i}`}
                    className="post-tags-item"
                  >
                    {/* link は 検索パターンにしています */}
                    <a href={Url.search(keyword)}>{keyword}</a>
                  </li>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
