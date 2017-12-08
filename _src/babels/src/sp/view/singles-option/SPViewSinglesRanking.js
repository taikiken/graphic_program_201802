/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/13 - 21:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view/sidebar
import ViewRanking from '../../../view/sidebar/ViewRanking';

// view
import View from '../../../view/View';
import SPComponentSinglesRanking from '../../component/singles-option/SPComponentSinglesRanking';

// React
// eslint-disable-next-line no-unused-vars
const React = self.React;
const ReactDOM = self.ReactDOM;

/**
 * 記事詳細の下に ranking を広告とともに carousel 表示します
 * 記事ページの最適化 #2381
 * @see https://github.com/undotsushin/undotsushin/issues/2381
 * @since 2017-09-13
 */
export default class SPViewSinglesRanking extends ViewRanking {
  /**
   * 記事詳細の下に ranking を広告とともに carousel 表示します
   * @param {Element} element div#widget-recommend-list-container
   * @param {string} slug category slug
   * @param {string} label category label - title に使用します
   */
  constructor(element, slug, label) {
    super(element, {}, slug, null);
    // ---
    /**
     * category label - title に使用します
     * @type {string}
     */
    this.label = label;
  }
  /**
   * {@link SPComponentSinglesRanking} 使用し出力します
   * @param {Array} articles `/api/v1/articles/category/baseball/ranking?offset=0&length=5` な JSON {{Array.<object>}}
   */
  render(articles) {
    // console.log('SPViewSinglesRanking.render', articles);
    // fire View.BEFORE_RENDER
    this.executeSafely(View.BEFORE_RENDER, articles, this.slug, this.label);
    // render
    ReactDOM.render(
      <SPComponentSinglesRanking
        list={articles}
        slug={this.slug}
        label={this.label}
      />,
      this.element,
    );
  }
}
