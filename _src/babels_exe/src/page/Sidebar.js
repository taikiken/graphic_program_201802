/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:44
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

export class Sidebar {
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Sidebar is static Class. not use new Sidebar().` );

    }
  }
  static start( slug:string = 'all' ):void {
    // ranking
    let ranking = new UT.view.sidebar.ViewRanking( document.getElementById( 'widget-ranking-container' ), null, slug );
    ranking.start();

    // video
    var videos = new UT.view.sidebar.ViewVideos( document.getElementById( 'widget-recommend-container' ), null, slug );
    videos.start();
  }
}
