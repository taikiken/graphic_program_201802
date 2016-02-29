/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 15:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Dom} from '../dom/Dom';

let _symbol = Symbol();

export class Activities {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Activities is static Class. not use new Activities().` );

    }
  }
  static start():void {

  }
}
