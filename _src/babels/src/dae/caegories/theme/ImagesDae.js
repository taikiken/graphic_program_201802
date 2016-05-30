/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../../data/Safety';

/**
 * response.theme.images
 *
 *  "images": {
 *    "pc": string,
 *    "sp": string
 *  }
 *
 * https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=229180023
 */
export class ImagesDae {
  /**
   * response.theme.images
   * @param {Object} [images={}] response.theme.images
   */
  constructor( images:Object = {} ) {
    images = Safety.object( images );

    this._images = images;
  }
  /**
   * response.theme.images
   * @return {Object|*} response.theme.images を返します
   */
  get images():ImagesDae {
    return this._images;
  }
  /**
   * response.theme.images.pc
   * @return {string} response.theme.images.pc を返します
   */
  get pc():string {
    return this.images.pc;
  }
  /**
   * response.theme.images.sp
   * @return {string} response.theme.images.sp を返します
   */
  get sp():string {
    return this.images.sp;
  }
}
