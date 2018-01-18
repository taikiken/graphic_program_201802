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
export default class Rise extends EventDispatcher {
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * RISE event type
   * @returns {string} RISE event type `rise` を返します
   */
  static get RISE() {
    return 'rise';
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 対象 element bottom が window.bottom window.top に contain しているかを監視します
   * @param {Element} element 対象 element
   * @param {Number} [offset=0] 減産数値
   */
  constructor(element, offset = 0) {
    super();
    /**
     * 対象 element
     * @type {Element}
     */
    this.element = element;
    /**
     * 減産数値
     * @type {Number}
     */
    this.offset = offset;
    /**
     * getBoundingClientRect を取得するために 引数 element から Offset instance を作成します
     * @type {Offset}
     */
    this.dom = new Offset(element);
    /**
     * bind 済み this.onScroll
     * @type {Function}
     */
    this.boundScroll = this.onScroll.bind(this);
    /**
     * Scroll 監視 instance
     * @type {Scroll|*}
     */
    this.scroll = Scroll.factory();
    /**
     * 遅延実行 timeout id
     * @type {number}
     * @since 2017-04-17
     */
    this.timer = 0;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  // /**
  //  * 処理対象 element
  //  * @return {Element} 処理対象 element を返します
  //  * @since 2-16-09-30
  //  */
  // get element() {
  //   return this._element;
  // }
  // /**
  //  * 減産数値
  //  * @return {Number} 減産数値を返します
  //  * @since 2-16-09-30
  //  */
  // offset() {
  //   return this._offset;
  // }
  // /**
  //  * 処理対象 element を Offset instance 変換
  //  * @return {Offset} 処理対象 element を Offset instance を返します
  //  * @since 2-16-09-30
  //  */
  // get dom() {
  //   return this._dom;
  // }
  // /**
  //  * bind 済み `this.onScroll`
  //  * @return {Function} bind 済み `this.onScroll` を返します
  //  * @since 2-16-09-30
  //  */
  // get boundScroll() {
  //   return this._boundScroll;
  // }
  // /**
  //  * Scroll 監視 instance
  //  * @return {Scroll|*} Scroll 監視 instance を返します
  //  * @since 2-16-09-30
  //  */
  // get scroll() {
  //   return this._scroll;
  // }
  // /**
  //  * Scroll 監視 instance を設定します
  //  * @param {Scroll|*} scroll Scroll 監視 instance
  //  */
  // set scroll(scroll) {
  //   this._scroll = scroll;
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 監視を始めます
   */
  start() {
    this.stop();
    // console.log( '************************ Rise.start' );
    this.scroll.on(Scroll.SCROLL, this.boundScroll);
    this.scroll.start();
  }
  /**
   * 監視を止めます
   */
  stop() {
    // console.log( '------------------------ Rise.stop' );
    this.scroll.off(Scroll.SCROLL, this.boundScroll);
    // @since 2016-09-16
    // 全ての監視を止めてしまう, 破壊的なので止める
    // this._scroll.stop();
  }
  /**
   * `start` を遅延実行します
   * @param {number} [seconds=0.5] 遅延実行秒数
   * @since 2017-04-17
   */
  delayStart(seconds = 0.5) {
    // console.log('$ise.delayStart', seconds);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.start();
    }, seconds * 1000);
  }
  /**
   * Scroll.SCROLL event handler
   * @param {Object} events Scroll.SCROLL event object
   */
  onScroll(events) {
    // window property
    // scrollTop
    const y = events.y;
    // const windowHeight = window.innerHeight;
    const windowHeight = events.height;
    const windowBottom = y + windowHeight - this.offset;
    // element property
    const offsetRect = this.dom.offset();
    const elementBottom = y + offsetRect.top + offsetRect.height;

    // console.log('Rise.onScroll', this.element, windowBottom, elementBottom);
    // element.bottom が contain しているかを調べます
    if (windowBottom > elementBottom) {
      this.dispatch({
        type: Rise.RISE,
        window: windowBottom,
        element: elementBottom,
        // @since 2016-10-28
        originalEvent: events,
        offset: offsetRect,
      });
    }
  }
}
