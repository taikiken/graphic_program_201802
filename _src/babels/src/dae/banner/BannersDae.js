/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/13 - 17:10
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {BannerDae} from './BannerDae';

import {Safety} from '../../data/Safety';

/**
 * response.user.banner データ<br>
 * あるいは response.banner
 */
export class BannersDae {
  /**
   * @param {Object} banner response.user.banner あるいは response.banner
   */
  constructor( banner:Object = {} ) {
    banner = Safety.object( banner );
    let pc = Safety.object( banner.pc );
    let sp = Safety.object( banner.sp );
    /**
     * banner.pc
     * @type {BannerDae}
     * @protected
     */
    this._pc = new BannerDae(pc.text, pc.image, pc.link);
    /**
     * banner.sp
     * @type {BannerDae}
     * @protected
     */
    this._sp = new BannerDae(sp.text, sp.image, sp.link);
    /**
     * response.user.banner あるいは response.banner
     * @type {Object}
     * @protected
     */
    this._banner = banner;
  }
  /**
   * response.user.banner
   * @return {Object|*} response.user.banner を返します
   */
  get banner():Object {
    return this._banner;
  }
  /**
   * response.user.banner.pc
   * @return {BannerDae} response.user.banner.pc を BannerDae instance で返します
   */
  get pc():BannerDae {
    return this._pc;
  }
  /**
   * response.user.banner.sp
   * @return {BannerDae} response.user.banner.sp を BannerDae instance で返します
   */
  get sp():BannerDae {
    return this._sp;
  }
}
