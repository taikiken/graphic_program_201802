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

export class ImagesDae {
  constructor( images:Object = {} ) {
    images = Safety.object( images );

    this._images = images;
  }

  get images():ImagesDae {
    return this._images;
  }
  get pc():string {
    this.images.pc;
  }
  get sp():string {
    this.images.sp;
  }
}
