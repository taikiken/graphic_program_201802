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

export default class Swipe {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  constructor(element) {
    this.element = element;
    this.controller = Controller.factory();
    this.touching = new Touching(element);
    this.started = false;
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onDragging = this.onDragging.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onBegin = this.onBegin.bind(this);
    this.onComplete = this.onComplete.bind(this);
    this.enable = true;
    this.dragging = 0;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  start() {
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
    this.touching.on(Touching.DRAG_START, this.onStart);
  }
  // ---------------------------------------------------
  // event handler
  // -------------------------
  // controller event
  onBegin() {
    this.enable = false;
  }
  onComplete() {
    this.enable = true;
  }
  // -------------------------
  // touching event
  dispose() {
    // unbind event
    const touching = this.touching;
    touching.off(Touching.DRAGGING, this.onDragging);
    touching.off(Touching.DRAG_END, this.onEnd);
    touching.off(Touching.DRAG_CANACEL, this.onCancel);
  }
  onStart() {
    if (!this.enable) {
      return;
    }
    // bind event
    const touching = this.touching;
    touching.on(Touching.DRAGGING, this.onDragging);
    touching.on(Touching.DRAG_END, this.onEnd);
    touching.on(Touching.DRAG_CANACEL, this.onCancel);
    // polling - pause
    this.controller.pause();
  }
  onDragging(events) {
    if (!this.enable) {
      return true;
    }
    // scroll している判定
    if (events.scrolling) {
      return true;
    }
    // 移動量を累積する
    this.dragging += events.between.x;
    this.drag(this.dragging);
    return false;
  }
  onEnd(events) {
    if (!events.swipe.move) {
      this.onCancel();
      return;
    }
    // swipe あり
    this.dispose();
    this.reset();
    this.left(0);
    if (events.swipe.swipeLeft) {
      this.controller.next();
    } else {
      this.controller.prev();
    }
  }
  onCancel() {
    this.dispose();
    this.reset();
    this.left(0);
    // polling - resume
    this.controller.resume();
  }
  // -------------------------
  // drag
  reset() {
    this.dragging = 0;
  }
  swipe(direction) {}
  left(x) {
    // motion あり
    this.setState({ style: { left: `${x}px` } });
  }
  drag(x) {
    // motion なし
    const style = { left: `${x}px`, transitionDuration: '0s' };
    this.setState({ style });
  }
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
