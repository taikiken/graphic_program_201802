/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/19 - 16:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// UT
/**
 * [library] - UT
 */
const UT = self.UT;
/**
 * [library] - UT.Dom
 * @type {Dom}
 */
const Dom = UT.app.Dom;

/**
 * お知らせを表示します
 * @since 2017-12-18
 */
export default class SPAnnounce {
  /**
   * category 情報から「お知らせ」を取得し表示します
   * @param {string} slug category slug
   * @param {*} option callback list
   */
  static start(slug, option = {}) {
    const element = Dom.announce();
    if (!element) {
      return;
    }
    const announce = new UT.view.ViewAnnounce(element, slug, true, option);
    announce.start();
  }
}
