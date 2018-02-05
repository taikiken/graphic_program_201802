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


import SPHeader from './SPHeader';
import SPAnnounce from './SPAnnounce';
// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

/**
 * Home(index)
 * - 全て static です
 */
export default class SPIndex {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPIndex is static Class. not use new SPIndex().' );
  //
  //   }
  // }
  /**
   * home headline - ad id 取得のために announce API 取得後に実行します
   * @param {*} dae CategorySlugDae
   * @since 2018-01-12
   */
  static afterAnnounce(dae) {
    // console.log('SPIndex.afterAnnounce', dae);
    // ---------------------------------------------------------
    // headline
    const headlineElement = Dom.headline();
    if (headlineElement !== null) {
      const headline = new UT.sp.view.home.SPViewHeadLine(headlineElement, {}, dae.ad);
      headline.start();
    }
  }
  /**
   * home rendering 開始
   */
  static start() {
    // announce
    const option = {};
    option[UT.view.View.BEFORE_RENDER] = SPIndex.afterAnnounce;
    // SPAnnounce.start('all', option);
    // UNDO_SPBL-401 【Web】一面リニューアル / 「TOP」でのカテゴリーAPIの問い合わせ先変更
    SPAnnounce.start('top', option);
    // header
    SPHeader.start();

    // ---------------------------------------------------------
    // pickup
    // @since 2016-09-15
    const pickupElement = Dom.pickup();
    if (pickupElement !== null) {
      const pickup = new UT.view.home.ViewPickup(pickupElement);
      pickup.start();
    }

    // // ---------------------------------------------------------
    // // headline
    // const headlineElement = Dom.headline();
    // if (headlineElement !== null) {
    //   let headline = new UT.sp.view.home.SPViewHeadLine(headlineElement);
    //   headline.start();
    // }

    // ---------------------------------------------------------
    // news
    const boardElement = Dom.board();
    const moreElement = Dom.boardMore();
    if (boardElement !== null && moreElement !== null) {
      const archive = new UT.sp.view.home.SPViewNews(boardElement, moreElement);
      archive.start();
    }
  }
}
