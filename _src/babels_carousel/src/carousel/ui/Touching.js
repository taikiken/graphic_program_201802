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
import EventDispatcher from '../moku/event/EventDispatcher';
import Events from '../../moku/event/Events';

// controller
import Controller from '../Controller';

export default class Touching extends EventDispatcher {
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  static get DRAG_START() {
    return 'controllerDragStart';
  }
  static get DRAGGING() {
    return 'controllerDragging';
  }
  static get DRAG_END() {
    return 'controllerDragEnd';
  }
  static get DRAG_CANACEL() {
    return 'controllerDragCancel';
  }
  // // prev
  // static get SWIPE_LEFT() {
  //   return 'controllerSwipeLeft';
  // }
  // // next
  // static get SWIPE_RIGHT() {
  //   return 'controllerSwipeRight';
  // }
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
  constructor(element, threshold = 10) {
    super();
    // properties
    this.element = element;
    this.threshold = threshold;
    this.controller = Controller.factory();
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onBlur = this.onBlur.bind(this);
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
    const dragging = new Events(Touching.DRAGGING, this, this);
    dragging.position = 0;
    dragging.between = 0;
    dragging.scrolling = false;
    // drag end
    const end = new Events(Controller.DRAG_END, this, this);
    end.swipe = {
      move: false,
      left: false,
      right: false,
    };
    this.draggEvents = {
      dragging,
      end,
      start: new Events(Controller.DRAG_START, this, this),
      cancel: new Events(Controller.DRAG_Canacel, this, this),
    };
    // this.swipeEvents = {
    //   left: new Events(Controller.SWIPE_LEFT, this, this),
    //   right: new Events(Controller.SWIPE_RIGHT, this, this),
    // };
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  init() {
    this.element.addEventListener('touchstart', this.onStart, false);
    window.addEventListener('blur', this.onBlur, false);
  }
  /**
   * bind した event を unbind します
   */
  dispose() {
    const body = this.body;
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
    //
    return vectors;
  }
  // ---------------------------------------------------
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
    const body = this.body;
    body.addEventListener('touchend', this.boundEnd, false);
    body.addEventListener('touchmove', this.boundMove, false);
    body.addEventListener('touchcancel', this.boundCancel, false);
    // controller 通知
    this.dragStart();
  }
  onMove(event) {
    const vectors = this.vectors;
    const movingArray = vectors.moving;
    // 現在 position
    const point = Touching.point(event);
    const position = new Vectors(point.x, point.y, Date.now());
    // 前回 position <- moving 配列最後
    const previous = movingArray[movingArray.length - 1];
    // scroll checked
    const scrolling = Touching.scrolling(position, previous, this.threshold);
    position.scrolling = scrolling;
    // 現在 position を配列後ろにセット
    movingArray.push(position);
    // 移動量
    const between = position.between(previous);
    // controller 通知
    this.dragging({ position, between, scrolling });
  }
  onEnd(event) {
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
    const move = Math.abs(between) >= 10;
    let swipeRight = false;
    let swipeLeft = false;
    if (move) {
      if (between > 0) {
        swipeRight = true;
      } else {
        swipeLeft = true;
      }
    }
    // controller 通知
    this.dragEnd({ position, between, scrolling, move, swipeRight, swipeLeft });
  }
  onCancel() {
    this.dispose();
    this.reset();
    this.dragCancel();
  }
  onBlur() {
    this.onCancel();
  }
  // ---------------------------------------------------
  // drag
  dragStart() {
    this.dispatch(this.draggEvents.start);
  }
  dragging({ position, between, scrolling, move, swipeRight, swipeLeft }) {
    const dragging = this.draggEvents.dragging;
    dragging.position = position;
    dragging.between = between;
    dragging.scrolling = scrolling;
    dragging.swipe = {
      move,
      swipeRight,
      swipeLeft,
    };
    this.dispatch(this.dragging);
  }
  dragEnd() {
    this.dispatch(this.draggEvents.end);
  }
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
