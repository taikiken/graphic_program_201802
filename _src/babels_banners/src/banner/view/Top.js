/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/06/23 - 22:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import View from './View';

import ComponentTop from '../component/ComponentTop';

const ReactDOM = self.ReactDOM;

export default class Top extends View {
  constructor(ajax, sp, element) {
    super(ajax, sp);
    this.element = element;
  }
  resolve(data) {
    if (data.topBanners) {
      this.render(data.topBanners);
    }
  }
  render(banners) {
    ReactDOM.render(
      <ComponentTop
        banners={banners}
        sp={this.sp}
      />,
      this.element
    );
  }
}
