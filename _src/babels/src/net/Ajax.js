/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 16:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

export class Ajax {

  constructor() {

    this._can = true;

  }

  start( url ) {

    if ( !this.can ) {

      return;

    }

    this.disable();



  }

  enable() {
    this._can = true;
  }
  disable() {
    this._can = false;
  }

  get can() {
    return this._can;
  }
}
