/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:28
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';

export class BannerDae {
  constructor( banner:Object = {} ) {
    banner = Safety.object( banner );

    this._banner = banner;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.banner.[pc, sp]
   * @return {Object|*} JSON.response.banner.[pc, sp] を返します
   */
  get banner():Object {
    return this._banner;
  }
  get text():string {
    
  }
  get image():string {
    
  }
  get link():string {
    
  }
}
