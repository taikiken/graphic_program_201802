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


let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

/**
 * <h3>signup wizard</h3>
 * 全て static です
 */
export class SPSignup {
  /**
   * signup wizard (3 step) singleton class です
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( 'SPSignup is static Class. not use new SPSignup().' );

    }
  }
  /**
   * rendering 開始
   */
  static start():void {
    let signupElement = Dom.signup();
    if ( signupElement !== null ) {
      let signup = new UT.view.signup.SignupWizard( signupElement );
      signup.start();
    }
  }
}
