/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/08 - 19:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// UT
const UT = self.UT;
const Dom = UT.app.Dom;

/**
 * アプリバナーを表示します
 */
export default class SPAppBanner {
  /**
   * アプリバーナーレンダリングを開始します
   */
  static start() {
    const element = Dom.appBanner();
    if (element !== null) {
      UT.sp.view.SPViewAppBanner.init(element, true);
    }
  }
}
