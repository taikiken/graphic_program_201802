/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/13 - 21:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import { AdDae } from '../theme/AdDae';

/**
 * headline.ad, ヘッドライン下部(6件目)の広告, アドジェネID<br>
 * pc は アドジェネID が一つです
 * @since 2016-09-13
 */
export class HeadlineAdDae extends AdDae {
  /**
   * headline.ad object を管理します
   * @param {Object} ad response.headline.ad
   */
  constructor(ad) {
    super(ad);
    /**
     * response.headline.ad.pc
     * @type {string}
     * @override
     * @protected
     */
    this._pc = this.ad.pc;
  }
}
