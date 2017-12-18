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


// let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <p>Sidebar ranking / video 表示</p>
 * 全て static です
 */
export default class SPSidebar {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPSidebar is static Class. not use new SPSidebar().' );
  //
  //   }
  // }
  /**
   * sidebar ranking / video rendering 開始
   * @param {string} [slug=all] category slug
   */
  static start(slug = 'all') {
    // ranking
    const rankingElement = Dom.ranking();
    if (rankingElement !== null) {
      const ranking = new UT.view.sidebar.ViewRanking(rankingElement, null, slug);
      ranking.start();
    }
    // video
    const videoElement = Dom.video();
    if (videoElement !== null) {
      const videos = new UT.view.sidebar.ViewVideos(videoElement, null, slug);
      videos.start();
    }
  }
}
