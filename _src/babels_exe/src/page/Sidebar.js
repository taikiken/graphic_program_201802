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

import {Dom} from '../dom/Dom';

let _symbol = Symbol();

// UT
let UT = self.UT;

/**
 * <h3>Sidebar ranking / video 表示</h3>
 * 全て static です
 */
export class Sidebar {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Sidebar is static Class. not use new Sidebar().` );

    }
  }
  /**
   * sidebar ranking / video rendering 開始
   * @param {string} [slug=all] category slug
   */
  static start( slug:string = 'all' ):void {
    // ranking
    let ranking = new UT.view.sidebar.ViewRanking( Dom.ranking(), null, slug );
    ranking.start();

    // video
    var videos = new UT.view.sidebar.ViewVideos( Dom.video(), null, slug );
    videos.start();
  }
}
