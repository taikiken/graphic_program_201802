/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/08 - 21:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {EventDispatcher} from './EventDispatcher';

let _symbol = Symbol();
let _instance = null;

/**
 * sp search form open / close
 */
export class SearchStatus extends EventDispatcher {
  /**
   * <h3>Singleton</h3>
   * <p>Logout modal</p>
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {SearchStatus} SearchStatus instance を返します
   */
  constructor( target ) {
    if ( _symbol !== target ) {

      throw new Error( `SearchStatus is static Class. not use new SearchStatus(). instead SearchStatus.factory()` );

    }

    if ( _instance === null ) {
      super();
      _instance = this;
    }

    return _instance;
  }

  /**
   * OPEN event kick
   */
  open():void {
    this.dispatch( { type: SearchStatus.OPEN } );
  }
  /**
   * CLOSE event kick
   */
  close():void {
    this.dispatch( { type: SearchStatus.CLOSE } );
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * OPEN
   * @return {string} logoutOpen を返します
   */
  static get OPEN():string {
    return 'searchOpen';
  }
  /**
   * CLOSE
   * @return {string} logoutClose を返します
   */
  static get CLOSE():string {
    return 'searchClose';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {SearchStatus} SearchStatus instance を返します
   */
  static factory():SearchStatus {

    if ( _instance === null ) {

      _instance = new SearchStatus( _symbol );

    }

    return _instance;
  }
}