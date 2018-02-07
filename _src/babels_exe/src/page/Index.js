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


import Header from './Header';
import Sidebar from './Sidebar';
// let _symbol = Symbol();

// UT
/**
 * [library] - UT
 */
const UT = self.UT;
/**
 * [library] - UT.Dom
 * @type {Dom}
 */
const Dom = UT.app.Dom;

/**
 * <p>Home(index)</p>
 * 全て static です
 */
export default class Index {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Index is static Class. not use new Index().' );
  //
  //   }
  // }
  /**
   * home rendering 開始
   */
  static start() {
    // header
    Header.start();

    // ---------------------------------------------------------
    // pickup
    const pickupElement = Dom.pickup();
    if (pickupElement !== null) {
      const pickup = new UT.view.home.ViewPickup(pickupElement);
      pickup.home = true;
      pickup.start();
    }

    // ---------------------------------------------------------
    // headline
    const headlineElement = Dom.headline();
    if (headlineElement !== null) {
      const headline = new UT.view.home.ViewHeadline(headlineElement);
      headline.home = true;
      headline.start();
    }

    // ---------------------------------------------------------
    // news
    const boardElement = Dom.board();
    const moreElement = Dom.boardMore();
    if (boardElement !== null && moreElement !== null) {
      const archive = new UT.view.home.ViewNews(boardElement, moreElement);
      archive.home = true;
      archive.start();
    }

    // sidebar, slug なし(=all)
    Sidebar.start('all', true);
    // sidebar `all` のまま
    // > サイドバーは全件の意味で all から取得
    // https://aws-plus.backlog.jp/view/UNDO_SPBL-401#comment-1187834201
    // // UNDO_SPBL-401 【Web】一面リニューアル / 「TOP」でのカテゴリーAPIの問い合わせ先変更
    // Sidebar.start('top', true);
  }
}
