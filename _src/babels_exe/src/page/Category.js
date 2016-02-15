/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Header} from './Header';
import {Sidebar} from './Sidebar';

let _symbol = Symbol();

// UT
let UT = self.UT;

export class Category {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Category is static Class. not use new Category().` );

    }
  }
  static start( slug:string, type:string = '' ):void {

    // header
    Header.start();

    // list
    let archive = new UT.view.ViewCategory( slug, document.getElementById('board-container'), document.getElementById('board-container-more') );
    archive.start();

    // sidebar
    Sidebar.start( slug );

    // title
    console.log( 'type', slug, type );

  }

}
