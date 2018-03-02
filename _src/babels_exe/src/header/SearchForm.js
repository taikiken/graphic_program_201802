/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:22
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
 * <p>header user information / signup 検索フォーム</p>
 * 全て static です
 */
export default class SearchForm {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SearchForm is static Class. not use new SearchForm().' );
  //
  //   }
  // }
  /**
   * search form rendering 開始
   */
  static start() {
    // header.user
    const searchElement = Dom.search();
    if (searchElement !== null) {
      const searchFrom = new UT.view.header.ViewHeaderSearch(searchElement);
      searchFrom.start();
    }

  }
}