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
import { ViewRecommend } from '../../../view/sidebar/ViewRecommend';

// view
import { View } from '../../../view/View';

// sp/component
import SPComponentSinglesRecommend from '../../component/singles-option/SPComponentSinglesRecommend';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

export default class SPViewSinglesRecommend extends ViewRecommend {
  constructor(element, categories) {
    super(element, {}, 'all', null);
    this.categories = categories;
  }
  render(articles) {
    this.executeSafely(View.BEFORE_RENDER, articles, this.slug);
    ReactDOM.render(
      <SPComponentSinglesRecommend
        list={articles}
        categories={this.categories}
      />,
      this.element,
    );
  }
}
