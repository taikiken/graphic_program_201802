/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';

export class AdDae {

  constructor( ad:Object = {} ) {
    ad = Safety.object( ad );

    this._pc = new AdPcDae( ad.pc );
    this._ad = ad;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.ad
   * @return {Object|*} JSON response.ad を返します
   */
  get ad():Object {
    return this._ad;
  }

  get ios():string {
    return this.ad.ios;
  }
  get android():string {
    return this.ad.android;
  }
  get sp():string {
    return this.ad.sp;
  }

}
