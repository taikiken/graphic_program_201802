/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 15:10
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
 * マイページ
 */
export class SPUserProfile {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'SPUserProfile is static Class. not use new SPUserProfile().' );

    }
  }
  /**
   * rendering 開始
   */
  static start():void {
    let element = Dom.userProfile();
    if ( element !== null ) {
      let profile = new UT.sp.view.mypage.SPViewUserProfile( element );
      profile.start();
    }
  }
  /**
   * sp mypage profile start
   */
  static ext():void {
    let element = Dom.userProfileEx();
    if ( element !== null ) {
      let profile = new UT.view.mypage.ViewUserProfile( element );
      profile.start();
    }
  }
}
