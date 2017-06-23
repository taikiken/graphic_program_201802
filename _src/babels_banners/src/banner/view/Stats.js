/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 22:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import View from './View';

import ComponentStats from '../component/ComponentStats';

const ReactDOM = self.ReactDOM;

export default class Stats extends View {
  constructor(ajax, sp, element) {
    super(ajax, sp);
    this.element = element;
  }
  resolve(data) {
    if (data.bannerLists) {
      this.render(data.bannerLists);
    }
  }
  render(banners) {
    ReactDOM.render(
      <ComponentStats
        banners={banners}
        sp={this.sp}
      />,
      this.element
    );
  }
}
