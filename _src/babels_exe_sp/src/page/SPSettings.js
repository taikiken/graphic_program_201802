/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 22:25
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
 * ユーザー設定
 */
export default class SPSettings {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPSettings is static Class. not use new SPSettings().' );
  //
  //   }
  // }
  /**
   * 基本情報設定
   */
  static account() {
    const settings = Dom.settings();
    if (settings !== null) {
      const setting = new UT.view.settings.ViewSettingsIndex(settings);
      setting.start();
    }
  }
  /**
   * パーソナライズ設定
   */
  static interest() {
    const settings = Dom.settings();
    if (settings !== null) {
      const setting = new UT.view.settings.ViewSettingsInterest(settings);
      setting.start();
    }
  }
  /**
   * 退会
   */
  static deactivate() {
    const settings = Dom.settings();
    const modal = Dom.deactivateModal();
    if (settings !== null && modal !== null) {
      const deactivate = new UT.view.signup.ViewDeactivate(settings, modal);
      deactivate.start();
    }
  }
}
