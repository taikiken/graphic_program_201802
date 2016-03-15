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
'use strict';

let _symbol = Symbol();

// UT
let UT = self.UT;
let Dom = UT.app.Dom;

export class Settings {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `Settings is static Class. not use new Settings().` );

    }
  }
  /**
   * 基本情報設定
   */
  static account():void {
    let settings = Dom.settings();

    if ( settings !== null ) {
      let setting = new UT.view.settings.ViewSettingsIndex( settings );
      setting.start();
    }
  }
  /**
   * パーソナライズ設定
   */
  static interest():void {
    let settings = Dom.settings();

    if ( settings !== null ) {
      let setting = new UT.view.settings.ViewSettingsInterest( settings );
      setting.start();
    }
  }
  /**
   * 退会
   */
  static deactivate():void {
    let settings = Dom.settings();
    let modal = Dom.modal();
    if ( settings !== null && modal !== null ) {
      let deactivate = new UT.view.signup.ViewDeactivate( settings, modal );
      deactivate.start();
    }
  }
}
