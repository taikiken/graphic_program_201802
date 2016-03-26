/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 22:54
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
 * Flushモーダル
 */
export class SPFlush {
  /**
   * Flush modal
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SPFlush is static Class. not use new SPFlush().` );

    }
  }
  /**
   * comment delete confirm modal 準備
   */
  static start():void {
    let element = Dom.flushModal();
    if ( element !== null ) {
      let flush = new UT.view.modal.ViewFlushModal( element );
      flush.start();
    }
  }
}
