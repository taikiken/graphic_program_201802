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
 * <p>ユーザー登録, signup-wow wizard</p>
 * 全て static です
 * @since 2017-11-06
 */
export default class SignupWow {
  /**
   * rendering 開始
   */
  static start():void {
    const signupElement = Dom.signup();
    if ( signupElement !== null ) {
      // Wowma flag true で実行する
      const signup = new UT.view.signup.SignupWizard(signupElement, {}, true);
      signup.start();
    }
  }
}
