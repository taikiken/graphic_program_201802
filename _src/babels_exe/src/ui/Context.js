/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/16 - 13:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// const _symbol = Symbol();

/**
 * img tag 上での right click を禁止します
 */
export default class Context {
  // /**
  //  * right click を禁止 singleton class です
  //  * @static
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //     throw new Error( 'Context is static Class. not use new Single().' );
  //   }
  // }
  /**
   * document.body で contextmenu を listener します
   */
  static disable() {
    document.body.addEventListener( 'contextmenu', Context.onContext, false );
    document.body.addEventListener( 'mousedown', Context.onContext, false );
    document.body.addEventListener( 'selectstart', Context.onContext, false );
  }
  /**
   * <p>document.body contextmenu event handler</p>
   * <p>event.target || event.currentTarget が img tag の時に<br>
   * <code>event.preventDefault()</code>, <code>event.stopPropagation()</code> を行います</p>
   * @param {Event} event document.body contextmenu event
   */
  static onContext(event) {
    if ( event.target.nodeName.toLowerCase() === 'img' || event.currentTarget.nodeName.toLowerCase() === 'img' ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
