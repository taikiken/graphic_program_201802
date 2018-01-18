/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/11 - 16:43
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
//
//
// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

/**
 * Syn. menu + open / close UI
 */
export default class SPSyn {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPSyn is static Class. not use new SPSyn().' );
  //
  //   }
  // }
  /**
   * side menu + Syn.
   */
  static start():void {
    const element = Dom.service();
    const button = Dom.serviceOpener();
    const menu = Dom.serviceMenu();
    const modal = Dom.modal();
    // element 存在チェック追加する - 2017-10-21
    if (!element || !button || !menu || !modal) {
      return;
    }

    const syn = new UT.sp.view.SPViewSyn( element, button, menu, modal );
    syn.start();
  }
}
