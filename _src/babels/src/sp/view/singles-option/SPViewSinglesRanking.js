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
import { ViewRanking } from '../../../view/sidebar/ViewRanking';

// view
import { View } from '../../../view/View';
import SPComponentSinglesRanking from '../../component/singles-option/SPComponentSinglesRanking';

// React
const React = self.React;
const ReactDOM = self.ReactDOM;

export default class SPViewSinglesRanking extends ViewRanking {
  constructor(element, slug, label) {
    super(element, {}, slug, null);
    this.label = label;
  }
  render(articles) {
    console.log('SPViewSinglesRanking.render', articles);
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
