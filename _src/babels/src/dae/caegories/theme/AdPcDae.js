/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';

export class AdPcDae {

  constructor( pc ) {
    pc = Safety.object( pc );
    this._pc = pc;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response.ad
   * @return {Object|*} JSON response.ad を返します
   */
  get pc():Object {
    return this._pc;
  }
  get sidebarTop():string {
    return this.pc['sidebar-top'];
  }
  get sidebarBottom():string {
    return this.pc['sidebar-bottom'];
  }
}
