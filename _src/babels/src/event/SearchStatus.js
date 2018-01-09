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
/* eslint constructor-super: 0 */

import {EventDispatcher} from './EventDispatcher';

/**
 * {@link SearchStatus} inner symbol
 * @type {symbol}
 */
const searchStatusSymbol = Symbol('SearchStatus symbol');
/**
 * {@link SearchStatus} singleton instance
 * @type {?SearchStatus}
 */
let singletonInstance = null;

/**
 * sp search form open / close するための custom Event
 */
export class SearchStatus extends EventDispatcher {
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * OPEN
   * @return {string} logoutOpen を返します
   */
  static get OPEN() {
    return 'searchOpen';
  }
  /**
   * CLOSE
   * @return {string} logoutClose を返します
   */
  static get CLOSE() {
    return 'searchClose';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {SearchStatus} SearchStatus instance を返します
   */
  static factory() {
    if (singletonInstance === null) {
      singletonInstance = new SearchStatus(searchStatusSymbol);
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 検索 form の表示・非表示を行います
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {SearchStatus} SearchStatus instance を返します
   */
  constructor(target) {
    if (searchStatusSymbol !== target) {
      throw new Error( 'SearchStatus is static Class. not use new SearchStatus(). instead SearchStatus.factory()' );
    }
    if (singletonInstance === null) {
      super();
      singletonInstance = this;
    }
    return singletonInstance;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * OPEN event kick
   */
  open() {
    this.dispatch({ type: SearchStatus.OPEN });
  }
  /**
   * CLOSE event kick
   */
  close() {
    this.dispatch({ type: SearchStatus.CLOSE });
  }
}
