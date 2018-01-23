/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/21 - 19:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import Dom from '../../../app/Dom';

// view
import ViewCategoryOption from '../../../view/categories/ViewCategoryOption';

// sp/view/categories
import SPComponentHeadlineOption from '../../component/categories/SPComponentHeadlineOption';

// --------------------------------------------
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
 * カテゴリ記事一覧に「PICKUP」「HEADLINE」を表示オプション追加します
 *
 * {@link SPComponentHeadlineOption}
 * @since 2016-09-24
 */
export default class SPViewCategoryOption extends ViewCategoryOption {
  // /**
  //  * category slug を使用し API request を開始します
  //  * @param {string} [slug=all] category.slug
  //  */
  // constructor(slug = 'all') {
  //   super(slug);
  // }
  /**
   * 記事一覧に headline を表示します
   * @param {CategoriesSlugDae} category JSON
   */
  headline(category) {
    const element = Dom.headlineParent();
    if (element === null) {
      return;
    }
    // console.log('SPViewCategoryOption.headline', typeof SPComponentHeadlineOption);
    ReactDOM.render(
      <SPComponentHeadlineOption
        list={category.headline.articles}
        callback={this.boundSafety}
        home={false}
        // ad={category.headline.ad}
        ad={category.ad}
        browser="sp"
        category={category}
      />,
      element,
    );
  }
}


