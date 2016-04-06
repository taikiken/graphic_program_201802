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


let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <h3>header user information / signup</h3>
 * 全て static です
 */
export class Header {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'Header is static Class. not use new Header().' );

    }
  }
  /**
   * header rendering 開始
   */
  static start():void {
    // header.user
    let element = Dom.profile();
    if ( element !== null ) {
      let headerUser = new UT.view.header.ViewHeaderUser( element );
      headerUser.start();

      let modalElement = Dom.logoutModal();
      if ( modalElement !== null ) {
        let modal = new UT.view.modal.ViewLogoutModal( modalElement );
        modal.start();
      }
    }

  }
}
