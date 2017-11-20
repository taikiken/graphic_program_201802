/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/20 - 15:49
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
 * <p>ユーザー登録, signup wizard</p>
 * 全て static です
 */
export class Signup {
  // /**
  //  * signup wizard (3 step) singleton class です
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Signup is static Class. not use new Signup().' );
  //
  //   }
  // }
  /**
   * rendering 開始
   */
  static start():void {
    const signupElement = Dom.signup();
    // console.log('Signup.start', signupElement);
    if ( signupElement !== null ) {
      const signup = new UT.view.signup.SignupWizard(signupElement);
      signup.start();
    }
  }
}
