/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/03/29 - 17:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {EventDispatcher} from './EventDispatcher';

// Singleton を保証するための Symbol
const _symbol = Symbol('CarouselStatus singleton Symbol');
// Singleton instance
let _instance = null;

/**
 * カルーセル位置を通知するイベントシステム
 *
 * controller -> pager
 */
export class CarouselStatus extends EventDispatcher {
  /**
   * ログイン / ログアウト を通知する SingleTon
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {CarouselStatus} CarouselStatus インスタンスを返します
   */
  constructor(target) {
    if (_symbol !== target) {
      throw new Error('CarouselStatus is static Class. not use new UserStatus().');
    }
    if (_instance !== null) {
      return _instance;
    }
    // ------
    // do once
    super();
    _instance = this;

    return _instance;
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * carousel(slider) 位置を通知するイベントタイプ
   * @event POSITION
   * @return {string} carouselStatusPosition
   */
  static get POSITION() {
    return 'carouselStatusPosition';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * カルーセル位置を通知します
   * @param {number} index カルーセル位置添字 0 ~
   */
  position(index) {
    this.dispatch({ type: CarouselStatus.POSITION, index });
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {CarouselStatus} CarouselStatus instance を返します
   */
  static factory() {
    if (_instance === null) {
      _instance = new CarouselStatus( _symbol );
    }
    return _instance;
  }
}
