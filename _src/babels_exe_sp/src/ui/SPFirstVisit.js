/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/29 - 22:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

/**
 * 最初の1回表示
 */
export default class SPFirstVisit {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Bookmarks is static Class. not use new Bookmarks().' );
  //
  //   }
  // }
  /**
   * rendering 開始
   */
  static start() {
    const element = Dom.modal();
    if (element !== null) {
      // list
      const first = new UT.sp.view.SPViewFirstVisit( element );
      first.start();
    }
  }
}
