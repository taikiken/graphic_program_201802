/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/16 - 15:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { EventDispatcher } from '../event/EventDispatcher';

// data
import { Safety } from '../data/Safety';

// util
import { Vectors } from '../util/Vectors';

// private
const boundStart = Symbol();
const boundMove = Symbol();
const boundEnd = Symbol();
const boundCancel = Symbol();
const boundBlur = Symbol();

/**
 * Touch event を監視し y方向移動が `threshold` 以内の時に `TOUCH` event を発火します
 */
export class Touching extends EventDispatcher {
  /**
   * 処理対象 element などを保存します
   * @param {Element} element 処理対象 Element
   * @param {boolean} [movingCancel=false] touchmove 中に `preventDefault` を行う
   * @param {number} [threshold=10] y 方向閾値
   */
  constructor(element, movingCancel = false, threshold = 10) {
    super();

    /**
     * 処理対象 Element
     * @type {Element}
     */
    this.element = element;
    /**
     * touchmove 中に `preventDefault` を行うかのフラッグ
     * @type {boolean}
     * @default false
     */
    this.movingCancel = movingCancel;
    /**
     * y 方向閾値, default: 10px
     * @type {number}
     * @default 10
     */
    this.threshold = threshold;
    /**
     * bind 済み `onStart`
     * @type {Function}
     */
    this[boundStart] = this.onStart.bind(this);
    /**
     * bind 済み `onMove`
     * @type {Function}
     */
    this[boundMove] = this.onMove.bind(this);
    /**
     * bind 済み `onEnd`
     * @type {Function}
     */
    this[boundEnd] = this.onEnd.bind(this);
    /**
     * bind 済み `onCancel`
     * @type {Function}
     */
    this[boundCancel] = this.onCancel.bind(this);
    /**
     * bind 済み `onBlur`
     * @type {Function}
     */
    this[boundBlur] = this.onBlur.bind(this);
    /**
     * 位置管理を行う Vectors instance を管理します
     * @type {{start: Vectors, end: Vectors, moving: Array.<Vectors>}}
     */
    this.vectors = {
      start: new Vectors(),
      end: new Vectors(),
      moving: [].slice(0)
    };
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * touchstart event type
   * @event START
   * @return {string} touchingStart を返します
   */
  static get START() {
    return 'touchingStart';
  }
  /**
   * touchend event type
   * @event END
   * @return {string} touchingEnd を返します
   */
  static get END() {
    return 'touchingEnd';
  }
  /**
   * touchmove event type
   * @event MOVE
   * @return {string} touchingMove を返します
   */
  static get MOVE() {
    return 'touchingMove';
  }
  /**
   * touch(click) event type
   * @event TOUCH
   * @return {string} touchingTouch を返します
   */
  static get TOUCH() {
    return 'touchingTouch';
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * bind 済み `onStart` 関数を取得します
   * @return {function} bind 済み `onStart` 関数返します
   */
  get boundStart() {
    return this[boundStart];
  }
  /**
   * bind 済み `onMove` 関数を取得します
   * @return {function} bind 済み `onMove` 関数返します
   */
  get boundMove() {
    return this[boundMove];
  }
  /**
   * bind 済み `onEnd` 関数を取得します
   * @return {function} bind 済み `onEnd` 関数返します
   */
  get boundEnd() {
    return this[boundEnd];
  }
  /**
   * bind 済み `onCancel` 関数を取得します
   * @return {function} bind 済み `onCancel` 関数返します
   */
  get boundCancel() {
    return this[boundCancel];
  }
  /**
   * bind 済み `onBlur` 関数を取得します
   * @return {function} bind 済み `onBlur` 関数返します
   */
  get boundBlur() {
    return this[boundBlur];
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 初期処理<br>
   * element への `touchstart` と<br>
   * window.blur event をそれぞれ bind します
   */
  init() {
    this.element.addEventListener('touchstart', this.boundStart, false);
    window.addEventListener('blur', this.boundBlur, false);
  }
  /**
   * touchstart event handler
   * @param {Event} event touchstart event
   */
  onStart(event) {
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
    const body = document.body;
    body.addEventListener('touchend', this.boundEnd, false);
    body.addEventListener('touchmove', this.boundMove, false);
    body.addEventListener('touchcancel', this.boundCancel, false);

    // Touching.START 発火
    this.dispatch({
      type: Touching.START,
      originalEvent: event,
      position: vectors.start
    });
  }
  /**
   * touchmove event handler
   * @param {Event} event touchmove event
   */
  onMove(event) {
    const vectors = this.vectors;
    const movingArray = vectors.moving;

    // 現在 position
    const point = Touching.point(event);
    const position = new Vectors(point.x, point.y, Date.now());

    // 前回 position <- moving 配列最後
    const previous = movingArray[movingArray.length - 1];
    const moving = Touching.moving(position, previous, this.threshold);
    position.moving = moving;
    movingArray.push(position);

    // global cancel と 閾値チェックで `preventDefault` を実行し scroll を止める
    if (this.movingCancel && moving) {
      event.preventDefault();
    }

    // 移動量
    const between = position.between(previous);

    // Touching.MOVE 発火
    this.dispatch({
      position,
      moving,
      between,
      type: Touching.MOVE,
      originalEVent: event
    });
  }
  /**
   * touchend event handler
   * @param {Event} event touchend event
   */
  onEnd(event) {
    const vectors = this.vectors;

    // 現在 position
    const point = Touching.point(event);
    const position = new Vectors(point.x, point.y, Date.now());

    // 前回 position <- start
    const previous = vectors.start;
    const moving = Touching.moving(position, previous, this.threshold);
    position.moving = moving;

    if (moving) {
      event.preventDefault();
    }

    // 移動量
    const between = position.between(previous);

    // Touching.END 発火
    this.dispatch({
      position,
      moving,
      between,
      type: Touching.END,
      originalEVent: event
    });

    // Touching.Touch 発火
    this.dispatch({
      position,
      moving,
      between,
      type: Touching.TOUCH,
      originalEVent: event
    });
  }
  /**
   * touchcancel event handler<br>
   * 処理をキャンセルします
   */
  onCancel() {
    this.dispose();
    this.reset();
  }
  /**
   * window.blur event handler<br>
   * 処理をキャンセルします
   */
  onBlur() {
    this.dispose();
    this.reset();
  }
  /**
   * bind した event を unbind します
   */
  dispose() {
    const body = document.body;

    body.removeEventListener('touchend', this.boundEnd);
    body.removeEventListener('touchmove', this.boundMove);
    body.removeEventListener('touchcancel', this.boundCancel);
  }
  /**
   * 移動監視に使用した vectors instance を全て reset します
   * @return {{start: Vectors, end: Vectors, moving: Array.<Vectors>}}
   * reset 後の vectors instance を返します
   */
  reset() {
    const vectors = this.vectors;
    vectors.start.reset();
    vectors.end.reset();
    vectors.moving = [].slice(0);

    return vectors;
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * y 方向移動が threshold 以内か判定します
   * @param {Vectors} pointA スタートポイント(Vectors)
   * @param {Vectors} pointB エンドポイント(Vectors)
   * @param {number} threshold 閾値
   * @return {boolean} true の時は閾値以内なので `preventDefault` 実行が可能です
   */
  static moving(pointA, pointB, threshold) {
    const y = pointA.betweenY(pointB);
    return Math.abs(y) <= threshold;
  }
  /**
   * MouseEvent|TouchEvent から pageX / pageY 座標を取得します
   * @param {MouseEvent|TouchEvent} event down / move / up event object
   * @return {{x: number, y: number}} pageX / pageY 座標を返します
   */
  static point(event) {
    const x = event.pageX;
    const y = event.pageY;

    // event.pageX / pageY があればそのまま値を返します
    if (Safety.exist(x) && Safety.exist(y)) {
      return { x, y };
    }

    // event.pageX / pageY がない時は TouchEvent の changedTouches から取得します
    // touch event
    // @type {TouchList}
    const touches = event.changedTouches;
    // touches が取得できない時は 0 をセットし返します
    if (!Safety.exist(touches)) {
      return { x: 0, y: 0 };
    }

    // changedTouches list の先頭データを取り出し pageX / pageY を取得します
    // @type {Touch}
    const touch = touches[0];
    return { x: touch.pageX, y: touch.pageY };
  }
}
