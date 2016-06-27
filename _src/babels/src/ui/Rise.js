/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */


import {EventDispatcher} from '../event/EventDispatcher';

import {Offset} from '../util/Offset';
import {Scroll} from '../util/Scroll';

/**
 * 対象 element bottom が window.bottom を超えたら Event を発生させます
 */
export class Rise extends EventDispatcher {
  /**
   * 対象 element bottom が window.bottom window.top に contain しているかを監視します
   * @param {Element} element 対象 element
   * @param {Number} [offset=0] 減産数値
   */
  constructor( element:Element, offset:Number = 0 ) {
    super();
    /**
     * 対象 element
     * @type {Element}
     * @private
     */
    this._element = element;
    /**
     * 減産数値
     * @type {Number}
     * @private
     */
    this._offset = offset;
    /**
     * getBoundingClientRect を取得するために 引数 element から Offset instance を作成します
     * @type {Offset}
     * @private
     */
    this._dom = new Offset( element );
    /**
     * bind 済み this.onScroll
     * @type {Function}
     * @private
     */
    this._boundScroll = this.onScroll.bind( this );
    /**
     * Scroll instance
     * @type {Scroll}
     * @private
     */
    this._scroll = Scroll.factory();
  }

  /**
   * RISE event type
   * @returns {string} RISE event type を返します
   */
  static get RISE():string {
    return 'rise';
  }
  /**
   * 監視を始めます
   */
  start():void {
    // console.log( '************************ Rise.start' );

    this._scroll.on( Scroll.SCROLL, this._boundScroll );
    this._scroll.start();
  }
  /**
   * 監視を止めます
   */
  stop():void {
    // console.log( '------------------------ Rise.stop' );

    this._scroll.off( Scroll.SCROLL, this._boundScroll );
    this._scroll.stop();
  }
  /**
   * Scroll.SCROLL event handler
   * @param {Object} event Scroll.SCROLL event object
   */
  onScroll( event:Object ):void {
    // window property
    // scrollTop
    let y = event.y;
    let windowHeight = window.innerHeight;
    let windowBottom = y + windowHeight - this._offset;
    // element property
    let offsetRect = this._dom.offset();
    let elementBottom = y + offsetRect.top + offsetRect.height;

    // element.bottom が contain しているかを調べます
    if ( windowBottom > elementBottom ) {
      this.dispatch( { type: Rise.RISE, window: windowBottom, element: elementBottom } );
    }
  }
}
