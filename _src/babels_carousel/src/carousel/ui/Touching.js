/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/26 - 20:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/util
import Vectors from '../../moku/util/Vectors';

// moku/events
import EventDispatcher from '../../moku/event/EventDispatcher';
import Events from '../../moku/event/Events';

// // controller
// import Controller from '../Controller';

/**
 * addEventListener 第三引数 - { passive: true } : false するためのブラウザテスト・フラッグ
 * # TouchEvent#Using with addEventListener() and preventDefault()
 * <pre>
 * It's important to note that in many cases, both touch and mouse events get sent (in order to let non-touch-specific code still interact with the user). If you use touch events, you should call preventDefault() to keep the mouse event from being sent as well.
 * The exception to this is Chrome, starting with version 56 (desktop, Chrome for android, and android webview), where the default value for touchstart and touchmove is true and calls to preventDefault() are not needed. To override this behavior, you simply set the passive option to false as shown in the example below. This change prevents the listener from blocking page rendering while a user is scrolling. A demo is available on the Google Developer site.
 * </pre>
 * @private
 * @type {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent
 * @see https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md
 * @see https://blog.jxck.io/entries/2016-06-09/passive-event-listeners.html
 */
let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get: function() {
      supportsPassive = true;
    }
  });
  window.addEventListener('test', null, opts);
} catch (e) {
  supportsPassive = false;
  // console.warn('passive test', e);
}
/**
 * addEventListener 第三引数 - { passive: true } : false
 * @private
 * @type {*}
 */
const event3rd = supportsPassive ? { passive: true } : false;

/**
 * touch device, 対象 Element の touch: start | move | end | cancel を管理します
 * - drag を実現する
 * - scroll 可能にする
 * - window.onblur で touchCancel 同等の処理を行う
 */
export default class Touching extends EventDispatcher {
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  /**
   * touchStart event type
   * @event DRAG_START
   * @returns {string} touchingDragStart
   */
  static get DRAG_START() {
    return 'touchingDragStart';
  }
  /**
   * touchMove event type
   * @event DRAGGING
   * @returns {string} touchingDragging
   */
  static get DRAGGING() {
    return 'touchingDragging';
  }
  /**
   * touchEnd event type
   * @event DRAG_END
   * @returns {string} touchingDragEnd
   */
  static get DRAG_END() {
    return 'touchingDragEnd';
  }
  /**
   * touchCancel event type
   * @event DRAG_CANCEL
   * @returns {string} touchingCancel
   */
  static get DRAG_CANCEL() {
    return 'touchingCancel';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * MouseEvent|TouchEvent から pageX / pageY 座標を取得します
   * @param {MouseEvent|TouchEvent} event down / move / up event object
   * @return {{x: number, y: number}} pageX / pageY 座標を返します
   */
  static point(event) {
    const x = event.pageX;
    const y = event.pageY;
    if (!!x && !!y) {
      return { x, y };
    }
    // event.pageX / pageY がない時は TouchEvent の changedTouches から取得します
    // touch event
    // @type {TouchList}
    const touches = event.changedTouches;
    // touches が取得できない時は 0 をセットし返します
    if (!touches) {
      return { x: 0, y: 0 };
    }
    // changedTouches list の先頭データを取り出し pageX / pageY を取得します
    // @type {Touch}
    const touch = touches[0];
    return { x: touch.pageX, y: touch.pageY };
  }
  /**
   * y 方向移動が threshold 以内か判定します
   * @param {Vectors} pointA スタートポイント(Vectors)
   * @param {Vectors} pointB エンドポイント(Vectors)
   * @param {number} threshold 閾値
   * @return {boolean} true の時は閾値以上なのでスクロール判定になります
   */
  static scrolling(pointA, pointB, threshold) {
    const y = pointA.betweenY(pointB);
    // 正数値にし閾値と比較
    return Math.abs(y) >= threshold;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * touch event 管理を行います
   * @param {Element} element touch target Element
   * @param {number} [threshold=10] 閾値 Y 方向
   * @param {number} [marginal=10] 閾値 X 方向
   */
  constructor(element, threshold = 10, marginal = 10) {
    super();
    // properties
    /**
     * touch target Element
     * @type {Element}
     */
    this.element = element;
    /**
     * 閾値 Y 方向
     * @type {number}
     */
    this.threshold = threshold;
    /**
     * 閾値 X 方向
     * @type {number}
     */
    this.marginal = marginal;
    /**
     * bind onStart - event handler: touchstart
     * @type {function}
     */
    this.onStart = this.onStart.bind(this);
    /**
     * bind onMove - event handler: touchmove
     * @type {function}
     */
    this.onMove = this.onMove.bind(this);
    /**
     * bind onEnd - event handler: touchend
     * @type {function}
     */
    this.onEnd = this.onEnd.bind(this);
    /**
     * bind onCancel - event handler: touchcancel
     * @type {function}
     */
    this.onCancel = this.onCancel.bind(this);
    /**
     * bind onBlur - event handler: window.onblur
     * @type {function}
     */
    this.onBlur = this.onBlur.bind(this);
    /**
     * [native code] - document.body
     * @type {Element}
     */
    this.body = document.body;
    /**
     * 位置管理を行う Vectors instance を管理します
     * @type {{start: Vectors, end: Vectors, moving: Array.<Vectors>}}
     */
    this.vectors = {
      start: new Vectors(),
      end: new Vectors(),
      moving: [].slice(0)
    };
    // dragging event
    const dragging = new Events(Touching.DRAGGING, this, this);
    dragging.position = new Vectors();
    dragging.between = new Vectors();
    dragging.scrolling = false;
    // drag end
    const end = new Events(Touching.DRAG_END, this, this);
    end.swipe = {
      move: false,
      left: false,
      right: false,
    };
    /**
     * touch 関連イベント {@link Events} instance
     * - dragging: {{position: Vectors, between: Vectors, scrolling: boolean}}
     * - end: {{swipe: {move: boolean, left: boolean: right: boolean}}}
     * @type {{dragging: Events, end: Events, start: Events, cancel: Events}}
     */
    this.draggEvents = {
      dragging,
      end,
      start: new Events(Touching.DRAG_START, this, this),
      cancel: new Events(Touching.DRAG_CANCEL, this, this),
    };
    // this.swipeEvents = {
    //   left: new Events(Controller.SWIPE_LEFT, this, this),
    //   right: new Events(Controller.SWIPE_RIGHT, this, this),
    // };
    /**
     * start flag
     * @type {boolean}
     */
    this.started = false;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * event watch 開始します - onetime 保証のために `started` flag を使用します
   * - touchstart
   * - blur
   */
  start() {
    // console.log('Touching.start', this.started);
    if (this.started) {
      return;
    }
    this.started = true;
    this.element.addEventListener('touchstart', this.onStart, event3rd);
    window.addEventListener('blur', this.onBlur, false);
  }
  /**
   * bind した event を unbind します
   * - touchend
   * - touchmove
   * - touchcancel
   */
  dispose() {
    const body = this.body;
    body.removeEventListener('touchend', this.onEnd);
    body.removeEventListener('touchmove', this.onMove);
    body.removeEventListener('touchcancel', this.onCancel);
  }
  /**
   * 移動監視に使用した vectors instance を全て reset します
   * - vectors property
   *   - start {Vectors}
   *   - end {Vectors}
   *   - moving {Array.<number>}
   * @return {{start: Vectors, end: Vectors, moving: Array.<Vectors>}}
   * reset 後の vectors instance を返します
   */
  reset() {
    const vectors = this.vectors;
    vectors.start.reset();
    vectors.end.reset();
    vectors.moving = [].slice(0);
    //
    return vectors;
  }
  // ---------------------------------------------------
  /**
   * touchstart event handler
   *
   * - `reset` を実行し移動量変数を初期化します
   * - touch 関連イベント監視を始めます
   *   - touchend
   *   - touchmove
   *   - touchcancel
   * - 現在座標を `event` から取り出し `vectors.start` `vectors.moving` へセットします
   * - `dragStart` を実行し `DRAG_START` event を発火します
   * @param {TouchEvent} event touchstart Event
   */
  onStart(event) {
    // console.log('Touching.onStart', event);
    // event unbind <- 二重 bind にならないように
    this.dispose();
    // vectors を初期化
    this.reset();
    // 現在 position を保存
    const vectors = this.vectors;
    const point = Touching.point(event);
    vectors.start.update(point.x, point.y);
    vectors.moving.push(vectors.start);
    // キャンセル event 監視を開始
    const body = this.body;
    body.addEventListener('touchend', this.onEnd, event3rd);
    body.addEventListener('touchmove', this.onMove, event3rd);
    body.addEventListener('touchcancel', this.onCancel, event3rd);
    // controller 通知
    this.dragStart();
  }
  /**
   * touchmove event handler
   * - 現在座標を `event` から取り出し `vectors.start` `vectors.moving` へセットします
   * - 移動距離を前回値から計算します
   * - `dragging` を実行し `DRAGGING` event を発火します
   *   - position {{x: number, y: number}} - 現在位置
   *   - between {number} - X 移動距離(px)
   *   - scrolling {boolean} - スクロール閾値 `threshold` を超えて Y 方向に動いたか?
   * @param {TouchEvent} event touchmove Event
   */
  onMove(event) {
    // console.log('Touching.onMove', event);
    const vectors = this.vectors;
    const movingArray = vectors.moving;
    // 現在 position
    const point = Touching.point(event);
    const position = new Vectors(point.x, point.y, Date.now());
    // 前回 position <- moving 配列最後
    const length = movingArray.length;
    const previous = length > 0 ? movingArray[length - 1] : new Vectors();
    // scroll checked
    const scrolling = Touching.scrolling(position, previous, this.threshold);
    position.scrolling = scrolling;
    // 現在 position を配列後ろにセット
    movingArray.push(position);
    // 移動量
    const between = position.between(previous);
    // event 通知
    this.dragging(position, between, scrolling);
  }
  /**
   * touchend event handler
   * - 現在座標を `event` から取り出し `vectors.start` `vectors.moving` へセットします
   * - 移動距離を前回値から計算します
   * - `dragEnd` を実行し `DRAG_END` event を発火します
   *   - position {{x: number, y: number}} - 現在位置
   *   - between {number} - X 移動距離(px)
   *   - scrolling {boolean} - スクロール閾値 `threshold` を超えて Y 方向に動いたか?
   *   - move {boolean} - X 方向閾値 `marginal` を超えて移動したか
   *   - swipeRight {boolean} - move: true の時に方向をセットする right
   *   - swipeLeft {boolean} - move: true の時に方向をセットする left
   * @param {TouchEvent} event touchend Event
   */
  onEnd(event) {
    // console.log('Touching.onEnd', event);
    // console.log('Touching.onEnd', event);
    const vectors = this.vectors;
    // 現在 position
    const point = Touching.point(event);
    const position = new Vectors(point.x, point.y, Date.now());
    // 前回 position を touchstart 位置としチェックします
    const previous = vectors.start;
    const scrolling = Touching.scrolling(position, previous, this.threshold);
    position.scrolling = scrolling;
    // 移動量
    const between = position.between(previous);
    const move = Math.abs(between.x) >= this.marginal;
    // swipe
    let swipeRight = false;
    let swipeLeft = false;
    if (move) {
      if (between.x > 0) {
        swipeRight = true;
      } else {
        swipeLeft = true;
      }
    }
    // event 通知
    this.dragEnd(position, between, scrolling, move, swipeRight, swipeLeft);
  }
  /**
   * touchcancel event handler
   * - {@link Touching.dispose} を実行します
   * - {@link Touching.reset} を実行します
   * - {@link Touching.dragCancel} を実行します
   */
  onCancel() {
    // console.log('Touching.onCancel');
    this.dispose();
    this.reset();
    this.dragCancel();
  }
  /**
   * window.onblur event handler
   * - {@link Touching.onCancel} を実行します
   */
  onBlur() {
    this.onCancel();
  }
  // ---------------------------------------------------
  // drag
  /**
   * touchstart event handler `onStart` から呼び出されます
   * - DRAG_START event を発火します
   */
  dragStart() {
    // console.log('Touching.dragStart -----------------', this.draggEvents.start);
    this.dispatch(this.draggEvents.start);
  }
  /**
   * touchmove event handler `onMove` から呼び出されます
   * - DRAGGING event を発火します
   * @param {{x: number, y: number}} position 座標情報
   * @param {Vectors} between 移動量
   * @param {boolean} scrolling Y 方向閾値を超えたフラッグ
   */
  dragging(position, between, scrolling) {
    const dragging = this.draggEvents.dragging;
    dragging.position = position;
    dragging.between = between;
    dragging.scrolling = scrolling;
    // dragging.swipe = {
    //   move,
    //   swipeRight,
    //   swipeLeft,
    // };
    this.dispatch(dragging);
  }
  /**
   * touchend event handler `onEnd` から呼び出されます
   * - DRAG_END event を発火します
   * @param {{x: number, y: number}} position 座標情報
   * @param {Vectors} between 移動量
   * @param {boolean} scrolling Y 方向閾値を超えたフラッグ
   * @param {boolean} move X 方向閾値を超えたフラッグ
   * @param {boolean} swipeRight - direction: right
   * @param {boolean} swipeLeft - direction: left
   */
  dragEnd(position, between, scrolling, move, swipeRight, swipeLeft) {
    // console.log('Touching.dragEnd -----------------', this.draggEvents.end);
    const dragging = this.draggEvents.end;
    dragging.position = position;
    dragging.between = between;
    dragging.scrolling = scrolling;
    dragging.swipe = {
      move,
      swipeRight,
      swipeLeft,
    };
    this.dispatch(this.draggEvents.end);
  }
  /**
   * window.onblur, touchcancel で呼び出されます
   * - DRAG_CANCEL event を発火します
   */
  dragCancel() {
    this.dispatch(this.draggEvents.cancel);
  }
  // swipeLeft() {
  //   this.dispatch(this.swipeEvents.left);
  // }
  // swipeRight() {
  //   this.dispatch(this.swipeEvents.right);
  // }
}
