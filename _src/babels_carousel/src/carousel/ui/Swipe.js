/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/26 - 19:57
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Controller from '../Controller';

import Touching from './Touching';

/**
 * {@link Touching} を使用し `touch` 関連イベントを監視します
 * 通知された情報を元に `drag`, `swipe` (prev / next) を行います
 */
export default class Swipe {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * target element を元に {@link Touching} instance を作成します
   * @param {Element} element drag / swipe target Element
   */
  constructor(element) {
    /**
     * drag / swipe target Element
     * @type {Element}
     */
    this.element = element;
    /**
     * caroucel controller
     * @type {Controller}
     */
    this.controller = Controller.factory();
    /**
     * touch event 管理
     * @type {Touching}
     */
    this.touching = new Touching(element);
    /**
     * 初期化フラッグ
     * @type {boolean}
     */
    this.started = false;
    /**
     * bind onStart - {@link Touching.DRAG_START} event handler
     * @type {function}
     */
    this.onStart = this.onStart.bind(this);
    /**
     * bind onEnd - {@link Touching.DRAG_END} event handler
     * @type {function}
     */
    this.onEnd = this.onEnd.bind(this);
    /**
     * bind onDragging - {@link Touching.DRAGGING} event handler
     * @type {function}
     */
    this.onDragging = this.onDragging.bind(this);
    /**
     * bind onCancel - {@link Touching.DRAG_CANCEL} event handler
     * @type {function}
     */
    this.onCancel = this.onCancel.bind(this);
    /**
     * bind onCancel - {@link Controller.BEGIN} event handler
     * @type {function}
     */
    this.onBegin = this.onBegin.bind(this);
    /**
     * bind onCancel - {@link Controller.COMPLETE} event handler
     * @type {function}
     */
    this.onComplete = this.onComplete.bind(this);
    /**
     * 稼働可能フラッグ
     * @type {boolean}
     */
    this.enable = true;
    /**
     * X 移動量を類先加算します
     * @type {number}
     */
    this.dragging = 0;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * `started` flag を使用し onetime 実行を保証します
   *
   * {@link Controller} event 監視を開始します
   * - Controller.BEGIN
   * - Controller.COMPLETE
   *
   * {@link Touching} event 監視を開始します
   * - Touching,DRAG_START
   */
  start() {
    console.log('Swipe.start', this.started, this.touching);
    if (this.started) {
      return;
    }
    this.started = true;
    // -------------------------
    // controller event
    const controller = this.controller;
    controller.on(Controller.BEGIN, this.onBegin);
    controller.on(Controller.COMPLETE, this.onComplete);
    // -------------------------
    // touching event
    const touching = this.touching;
    touching.on(Touching.DRAG_START, this.onStart);
    touching.start();
  }
  // ---------------------------------------------------
  // event handler
  // -------------------------
  // controller event
  /**
   * Controller.BEGIN event handler - enable flag `false` 設定します
   */
  onBegin() {
    this.enable = false;
  }
  /**
   * Controller.COMPLETE event handler - enable flag `true` 設定します
   */
  onComplete() {
    this.enable = true;
  }
  // -------------------------
  // touching event
  /**
   * 動的に bind する {@link Touching} event を unbind します
   * - Touching.DRAGGING
   * - Touching.DRAG_END
   * - Touching.DRAG_CANCEL
   */
  dispose() {
    // unbind event
    const touching = this.touching;
    touching.off(Touching.DRAGGING, this.onDragging);
    touching.off(Touching.DRAG_END, this.onEnd);
    touching.off(Touching.DRAG_CANCEL, this.onCancel);
  }
  /**
   * Touching.DRAG_START event handler
   *
   * touch 関連イベントを監視します
   * - Touching.DRAGGING
   * - Touching.DRAG_END
   * - Touching.DRAG_CANCEL
   *
   * {@link Controller.pause} を実行し `PAUSE` eevnt を発火させます
   */
  onStart() {
    console.log('Swipe.onStart', this.enable);
    if (!this.enable) {
      return;
    }
    // bind event
    const touching = this.touching;
    touching.on(Touching.DRAGGING, this.onDragging);
    touching.on(Touching.DRAG_END, this.onEnd);
    touching.on(Touching.DRAG_CANCEL, this.onCancel);
    // polling - pause
    this.controller.pause();
  }
  /**
   * Touching.DRAGGING event handler
   * - 移動量を events.between.x から取り出し `dragging` 変数へ加算します
   * - `drag` を実行し style 計算を行い drag させます
   * @param {Events|object} events dragging 情報
   */
  onDragging(events) {
    console.log('Swipe.onDragging', this.enable, events);
    // 移動量を累積する
    this.dragging += events.between.x;
    this.drag(this.dragging);
  }
  /**
   * Touching.DRAG_END event handler
   * - events.move false の時は {@link Swipe.onCancel} を実行し以降の処理を行いません
   * - `dispose` を実行します
   * - `reset` を実行します
   * - `left(0)` を実行します
   * - events.swipe.swipeLeft flag から {@link Controller}.[next|prev] を実行します
   * @param {Events|object} events dragging 情報
   */
  onEnd(events) {
    if (!events.swipe.move) {
      this.onCancel();
      return;
    }
    // swipe あり
    this.dispose();
    this.reset();
    this.left(0);
    console.log('');
    if (events.swipe.swipeLeft) {
      this.controller.next();
    } else {
      this.controller.prev();
    }
  }
  /**
   * Touching.DRAG_CANCEL event handler
   * - `dispose` を実行します
   * - `reset` を実行します
   * - `left(0)` を実行します
   * - {@link Controller.resume} を実行し `pause` した Polling を再開させます
   */
  onCancel() {
    this.dispose();
    this.reset();
    this.left(0);
    // polling - resume
    this.controller.resume();
  }
  // -------------------------
  // drag
  /**
   * 移動量累積を 0 にします
   */
  reset() {
    this.dragging = 0;
  }
  /**
   * left 移動を style を作成します - motion あり
   * @param {number} x X 移動量 - left 設定値
   */
  left(x) {
    // motion あり
    this.setState({ style: { left: `${x}px` } });
  }
  /**
   * left 移動を style を作成します - motion なし
   * @param {number} x X 移動量 - left 設定値
   */
  drag(x) {
    console.log('Swipe.drag ============= ', x);
    // motion なし
    const style = { left: `${x}px`, transitionDuration: '0s' };
    this.setState({ style });
  }
  /**
   * 以前のコード互換のために挟んでいます - object 引数を scalar 変換し `setStyle` 実行します
   * @param {string} style 設定する cssText
   */
  setState({ style }) {
    this.setStyle(style);
  }
  /**
   * 計算した css value を設定させます
   * @param {object} css {{property: value}}
   */
  setStyle(css) {
    let style = '';
    console.log('Swipe.setStyle ===============================');
    // {property: value} 形式 object から 'property: value;' string へ cast する
    Object.keys(css).map((prop) => {
      style += `${prop}: ${css[prop]};`;
    });
    console.log('Swipe.setStyle style', style);
    this.element.style.cssText = style;
    console.log('Swipe.setStyle ++++++++++++++++++++++++++++++++');
  }
}
