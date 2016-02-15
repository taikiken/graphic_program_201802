/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

// UT
let UT = self.UT;

export class Header {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Header is static Class. not use new Header().` );

    }
  }
  static start():void {
    // header.user
    var headerUser = new UT.view.header.ViewHeaderUser( document.getElementById('user-profile-container') );
    headerUser.start();
  }
}
