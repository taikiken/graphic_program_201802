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
 * ユーザー情報 設定画面上
 */
export class UserProfile {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'UserProfile is static Class. not use new UserProfile().' );

    }
  }
  /**
   * rendering 開始
   */
  static start():void {
    let element = Dom.userProfile();
    if ( element !== null ) {
      let profile = new UT.view.mypage.ViewUserProfile( element );
      profile.start();
    }
  }
}
