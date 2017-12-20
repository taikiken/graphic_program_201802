/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/21 - 19:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../../../view/View';

// view/categories
import { ComponentHeadlineAd } from '../../../component/categories/ComponentHeadlineAd';

// sp/view/headline
import SPComponentHeadlines from '../headline/SPComponentHeadlines';
import { RelatedDae } from '../../../dae/RelatedDae';
import { CategoriesSlugDae } from '../../../dae/categories/CategoriesSlugDae';
import SPComponentHeadlineArticleLast from '../headline/SPComponentHeadlineArticleLast';
import { ArticleDae } from '../../../dae/ArticleDae';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * SP: 記事一覧 headline を表示するための基本コンテナを作成します
 * @since 2016-09-20
 */
export default class SPComponentHeadlineOption extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * React.propTypes
   * @return {{
   *   list: Array.<RelatedDae>,
   *   callback: Function,
   *   home: boolean,
   *   ad: string,
   *   browser: string,
   *   category: CategoriesSlugDae
   * }} React props
   */
  static get propTypes() {
    return {
      // articles 配列を元にDomを作成する
      // list: React.PropTypes.array.isRequired,
      list: React.PropTypes.arrayOf(
        React.PropTypes.oneOfType([
          React.PropTypes.instanceOf(ArticleDae).isRequired,
          React.PropTypes.instanceOf(RelatedDae).isRequired,
        ]).isRequired,
      ).isRequired,
      callback: React.PropTypes.func.isRequired,
      home: React.PropTypes.bool.isRequired,
      ad: React.PropTypes.object.isRequired,
      browser: React.PropTypes.string.isRequired,
      // @type {CategoriesSlugDae}
      // category: React.PropTypes.object.isRequired
      category: React.PropTypes.instanceOf(CategoriesSlugDae).isRequired,
    };
  }
  // // ---------------------------------------------------
  // //  CONSTRUCTOR
  // // ---------------------------------------------------
  // /**
  //  * プロパティを保存し必要な関数・変数を準備します
  //  * @param {Object} props プロパティ {@link SPComponentHeadlineOption.propTypes}
  //  */
  // constructor(props) {
  //   super(props);
  //   console.log('SPComponentHeadlineOption', props);
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * マウント後に `View.DID_MOUNT` を callback へ通知します
   */
  componentDidMount() {
    this.props.callback(View.DID_MOUNT);
  }
  /**
   * 記事一覧 headline を表示するための基本コンテナを作成します
   * @return {?XML} 記事一覧 headline を表示するための基本コンテナを返します
   */
  render() {
    const { list, callback, home, browser, ad, category } = this.props;
    if (list.length === 0) {
      return null;
    }
    const last = list.length > 0 ? list.pop() : null;
    return (
      <div className="headline-section">
        <div className="headline-outer">
          <div id="headline-container">
            <SPComponentHeadlines
              list={list}
              callback={callback}
              home={home}
              archive={true}
            />
          </div>
          <ComponentHeadlineAd
            browser={browser}
            ad={ad}
            category={category}
          />
          <SPComponentHeadlineArticleLast
            dae={last}
            index={list.length + 1}
          />
        </div>
      </div>
    );
  }
}
