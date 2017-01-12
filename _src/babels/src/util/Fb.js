/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/11/04 - 18:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * FB object を保存します
 * @type {?FB}
 */
let globalFB = null;

/**
 * FB 取得のための timer id
 * @type {number}
 */
let id = 0;

/**
 * Facebook like button<br>
 * 非同期設置ボタン
 * @since 2016-11-04
 */
export class Fb {
  /**
   * FB object を取得します
   * @return {?FB} FB object を返します
   */
  static get() {
    if (globalFB === null) {
      globalFB = self.FB;
    }
    return globalFB;
  }
  /**
   * `FB.init` を行います
   */
  static init() {
    // FB object 存在チェックを行います
    const FB = Fb.get();
    if (!FB) {
      // 見つかるまで繰り返し実行します
      setTimeout(Fb.init, 25);
      return;
    }
    // Facebook initialize
    FB.init({
      appId: '842032129256034',
      xfbml: true,
      version: 'v2.5',
    });
  }
  /**
   * 遅延し init を行います
   * @param {number} [time=1000] 遅延時間(ms)
   */
  static delay(time = 1000) {
    clearTimeout(id);
    id = setTimeout(Fb.init, time);
  }
}
