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

/**
 * [React] - React
 * @private
 */
// eslint-disable-next-line no-unused-vars
const React = self.React;
/**
 * [React] - ReactDOM
 * @private
 * @type {ReactDOM}
 */
const ReactDOM = self.ReactDOM;

/**
 * `/stats` - バナー一覧出力
 * {@link ComponentStats} をマウントします
 */
export default class Stats extends View {
  /**
   * マウント Element を取得し処理を行います
   * @param {Ajax} ajax Ajax instance
   * @param {boolean} sp true: SP - component 出力時に使用します
   * @param {Element} element component をマウントする element
   */
  constructor(ajax, sp, element) {
    super(ajax, sp);
    /**
     * component をマウントする element
     * @type {Element}
     */
    this.element = element;
  }
  /**
   * {@link Ajax} promise success handler - 継承クラスで override します
   * @param {object} data JSON data
   */
  resolve(data) {
    if (data.bannerLists) {
      this.render(data.bannerLists);
    }
  }
  /**
   * {@link ComponentStats} をマウントします
   * @param {*} banners 出力にしようする JSON 由来データ
   */
  render(banners) {
    console.log('Stats.render banners', banners);
    ReactDOM.render(
      <ComponentStats
        banners={banners}
        sp={this.sp}
      />,
      this.element
    );
  }
}
