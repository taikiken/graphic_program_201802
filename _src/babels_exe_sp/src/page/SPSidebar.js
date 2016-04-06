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


let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <h3>Sidebar ranking / video 表示</h3>
 * 全て static です
 */
export class SPSidebar {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'SPSidebar is static Class. not use new SPSidebar().' );

    }
  }
  /**
   * sidebar ranking / video rendering 開始
   * @param {string} [slug=all] category slug
   */
  static start( slug:string = 'all' ):void {
    // ranking
    let rankingElement = Dom.ranking();
    if ( rankingElement !== null ) {
      let ranking = new UT.view.sidebar.ViewRanking( rankingElement, null, slug );
      ranking.start();
    }

    // video
    let videoElement = Dom.video();
    if ( videoElement !== null ) {
      let videos = new UT.view.sidebar.ViewVideos( videoElement, null, slug );
      videos.start();
    }

  }
}
