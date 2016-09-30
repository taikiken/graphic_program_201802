/**
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/08
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

// event
import {EventDispatcher} from '../event/EventDispatcher';

// util
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
     * @protected
     */
    this._element = element;
    /**
     * 減産数値
     * @type {Number}
     * @protected
     */
    this._offset = offset;
    /**
     * getBoundingClientRect を取得するために 引数 element から Offset instance を作成します
     * @type {Offset}
     * @protected
     */
    this._dom = new Offset( element );
    /**
     * bind 済み this.onScroll
     * @type {Function}
     * @protected
     */
    this._boundScroll = this.onScroll.bind( this );
    /**
     * Scroll instance
     * @type {Scroll}
     * @protected
     */
    this._scroll = Scroll.factory();
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * RISE event type
   * @returns {string} RISE event type を返します
   */
  static get RISE():string {
    return 'rise';
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 処理対象 element
   * @return {Element} 処理対象 element を返します
   * @since 2-16-09-30
   */
  get element() {
    return this._element;
  }
  /**
   * 減産数値
   * @return {Number} 減産数値を返します
   * @since 2-16-09-30
   */
  offset() {
    return this._offset;
  }
  /**
   * 処理対象 element を Offset instance 変換
   * @return {Offset} 処理対象 element を Offset instance を返します
   * @since 2-16-09-30
   */
  get dom() {
    return this._dom;
  }
  /**
   * bind 済み `this.onScroll`
   * @return {Function} bind 済み `this.onScroll` を返します
   * @since 2-16-09-30
   */
  get boundScroll() {
    return this._boundScroll;
  }
  /**
   * Scroll instance
   * @return {Scroll} Scroll instance を返します
   * @since 2-16-09-30
   */
  get scroll() {
    return this._scroll;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 監視を始めます
   */
  start():void {
    // console.log( '************************ Rise.start' );
    this.stop();
    this._scroll.on( Scroll.SCROLL, this._boundScroll );
    this._scroll.start();
  }
  /**
   * 監視を止めます
   */
  stop():void {
    // console.log( '------------------------ Rise.stop' );
    this._scroll.off( Scroll.SCROLL, this._boundScroll );
    // @since 2016-09-16
    // 全ての監視を止めてしまう, 破壊的なので止める
    // this._scroll.stop();
  }
  /**
   * Scroll.SCROLL event handler
   * @param {Object} events Scroll.SCROLL event object
   */
  onScroll( events:Object ):void {
    // window property
    // scrollTop
    const y = events.y;
    // const windowHeight = window.innerHeight;
    const windowHeight = events.height;
    const windowBottom = y + windowHeight - this._offset;
    // element property
    const offsetRect = this._dom.offset();
    const elementBottom = y + offsetRect.top + offsetRect.height;

    // element.bottom が contain しているかを調べます
    if ( windowBottom > elementBottom ) {
      this.dispatch( { type: Rise.RISE, window: windowBottom, element: elementBottom } );
    }
  }
}
