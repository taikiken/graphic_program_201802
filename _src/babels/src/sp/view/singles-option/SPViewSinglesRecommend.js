/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/13 - 15:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view/sidebar
// import ViewRecommend from '../../../view/sidebar/ViewRecommend';
// import ViewRanking from '../../../view/sidebar/ViewRanking';
import ViewVideos from '../../../view/sidebar/ViewVideos';

// view
import View from '../../../view/View';

// sp/component
import SPComponentSinglesRecommend from '../../component/singles-option/SPComponentSinglesRecommend';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * 記事詳細の下に recommend を広告とともに表示します
 * [記事ページの最適化 #2381](https://github.com/undotsushin/undotsushin/issues/2381),
 * [recommend 記事がない -> 仕様変更](https://github.com/undotsushin/undotsushin/issues/2381#issuecomment-332086508),
 * @since 2017-09-13
 */
// export default class SPViewSinglesRecommend extends ViewRecommend {
// recommend 記事がない -> 仕様変更 - https://github.com/undotsushin/undotsushin/issues/2381#issuecomment-332086508
// 読み込むJSONはおすすめ動画読み込んでいただいてもよろしいでしょうか？
export default class SPViewSinglesRecommend extends ViewVideos {
  /**
   * 記事詳細の下に recommend を表示するために準備を開始します
   * @param {Element} element div#widget-recommend-list-container
   * @param {string} slug category slug
   */
  constructor(element, slug) {
    // super(element, {}, slug, null);
    super(element, {}, slug, 5);
  }
  /**
   * {@link SPComponentSinglesRecommend} 使用し出力します
   * @param {Array} articles `/api/v1/articles/category/baseball/recommend?offset=0&length=5` な JSON {{Array.<object>}}
   */
  render(articles) {
    // console.log('SPViewSinglesRecommend.render', articles);
    // fire View.BEFORE_RENDER
    this.executeSafely(View.BEFORE_RENDER, articles, this.slug);
    // render
    ReactDOM.render(
      <SPComponentSinglesRecommend
        list={articles}
        slug={this.slug}
      />,
      this.element,
    );
  }
}
