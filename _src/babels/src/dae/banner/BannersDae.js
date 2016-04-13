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

export class BannersDae {
  constructor( banner:Object ) {
    banner = Safety.object( banner );
    let pc = Safety.object( banner.pc );
    let sp = Safety.object( banner.sp );

    this._pc = new BannerDae(pc.text, pc.image, pc.link);
    this._sp = new BannerDae(sp.text, sp.image, sp.link);
    this._banner = banner;
  }

  /**
   * 
   * @return {Object|*}
   */
  get banner():Object {
    return this._banner;
  }

  get pc():BannerDae {
    return this._pc;
  }

  get sp():BannerDae {
    return this._sp;
  }
}
