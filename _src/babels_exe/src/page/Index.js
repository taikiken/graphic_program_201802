/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:37
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

export class Index {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Index is static Class. not use new Index().` );

    }
  }
  static start():void {

    // header
    Header.start();

    // ---------------------------------------------------------
    // pickup
    let pickup = new UT.view.home.ViewPickup( document.getElementById('pickup-container') );
    pickup.start();

    // ---------------------------------------------------------
    // headline
    let headline = new UT.view.home.ViewHeadline( document.getElementById('headline-container') );
    headline.start();

    // ---------------------------------------------------------
    // news
    let archiveAction = UT.app.User.sign ? UT.action.home.NewsAuth : UT.action.home.News;
    let archive = new UT.view.ViewArchiveMasonryInfinite( document.getElementById('board-container'), document.getElementById('board-container-more'), archiveAction );
    archive.start();

    // sidebar, slug なし(=all)
    Sidebar.start();

  }
}
