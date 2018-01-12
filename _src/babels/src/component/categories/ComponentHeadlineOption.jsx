/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/20 - 15:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../../view/View';

// view/headlines
import ComponentHeadlines from '../headlines/ComponentHeadlines';

// view/categories
import ComponentHeadlineAd from './ComponentHeadlineAd';

// React
/**
 * [library] - React
 */
const React = self.React;

/**
 * 記事一覧 headline を表示するための基本コンテナを作成します
 * @since 2016-09-20
 */
export default class ComponentHeadlineOption extends React.Component {
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  /**
   * propTypes
   * @return {{
   *  list: Array<RelatedDae>,
   *  callback: Function,
   *  home: boolean,
   *  ad: string,
   *  browser: string,
   *  category: CategoriesSlugDae
   * }} React props
   */
  static get propTypes() {
    return {
      // articles 配列を元にDomを作成する
      list: React.PropTypes.array.isRequired,
      callback: React.PropTypes.func.isRequired,
      home: React.PropTypes.bool.isRequired,
      ad: React.PropTypes.object.isRequired,
      browser: React.PropTypes.string.isRequired,
      // @type {CategoriesSlugDae}
      category: React.PropTypes.object.isRequired
    };
  }
  // // ---------------------------------------------------
  // //  CONSTRUCTOR
  // // ---------------------------------------------------
  // /**
  //  * プロパティを保存し必要な関数・変数を準備します
  //  * @param {Object} props プロパティ {@link ComponentHeadlineOption.propTypes}
  //  */
  // constructor(props) {
  //   super(props);
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
   * @return {?XML} `div.headline-section` 記事一覧 headline を表示するための基本コンテナを返します
   */
  render() {
    const list = this.props.list;
    if (list.length === 0) {
      return null;
    }

    return (
      <div className="headline-section">
        <div className="headline-outer">
          <div id="headline-container">
            <ComponentHeadlines
              list={list}
              callback={this.props.callback}
              home={this.props.home}
            />
          </div>
          {/*
          <ComponentHeadlineAd
            browser={this.props.browser}
            ad={this.props.ad}
            category={this.props.category}
          />
          */}
        </div>
      </div>
    );
  }
}
