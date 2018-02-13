/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:39
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
 * <p>header user information / signup</p>
 * 全て static です
 */
export default class SPHeader {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPHeader is static Class. not use new SPHeader().' );
  //
  //   }
  // }
  /**
   * header rendering 開始
   */
  static start() {
    // header.user
    const element = Dom.profile();
    if (element !== null) {
      const headerUser = new UT.sp.view.header.SPViewHeaderUser(element);
      headerUser.start();
    }
  }
}
