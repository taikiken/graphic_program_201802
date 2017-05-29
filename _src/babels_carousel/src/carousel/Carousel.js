/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/05/24 - 20:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/tick
import Polling from '../moku/tick/Polling';

// controller
import Controller from './Controller';

/**
 * carousel animation をコントロールします
 * - 左右位置を真ん中にする
 * - polling(5s)
 * - {@link Controller}.NEXT|PREV|JUMP を watch します
 *
 * auto play を行う {@link Carousel.play} は {@link Carousel.start}, {@link Carousel.updateIndex} 2箇所で実行されます
 */
export default class Carousel {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * プロパティを初期化します
   * @param {number} width スライド幅 - sp / pc 幅違います（固定値）
   * @param {number} length スライド数
   * @param {Element} wrapper div#js-pickup-slider-wrapper - transform target
   */
  constructor(width, length, wrapper) {
    if (length === 2) {
      // 2 件の時は4件としてコード運用する - 循環アニメーション実現のため
      length = 4;
    }
    /**
     * 移動量設定値, PC / SP で異なります - 共用するため
     * - PC: 640(px)
     * - SP: 280(px)
     * @type {number}
     */
    this.left = width;
    /**
     * スライド数
     * @type {number}
     */
    this.length = length;
    /**
     * 最終スライド No.
     * @type {number}
     */
    this.last = length - 1;
    /**
     * div#js-pickup-slider-wrapper
     * @type {Element}
     */
    this.wrapper = wrapper;
    /**
     * start flag
     * @type {boolean}
     */
    this.started = false;
    /**
     * 表示スライド番号
     * @type {number}
     */
    this.position = 0;
    /**
     * 遅延移動 timer id
     * @type {number}
     */
    this.timer = 0;
    /**
     * carousel 管理イベント
     * @type {Controller}
     */
    this.controller = Controller.factory();
    /**
     * インターバル管理
     * @type {Polling}
     */
    this.polling = new Polling(1000 * 5);
    /**
     * bind.onUpdate
     * @type {function}
     */
    this.onUpdate = this.onUpdate.bind(this);
    /**
     * bind.onNext
     * @type {function}
     */
    this.onNext = this.onNext.bind(this);
    /**
     * bind.onPrev
     * @type {function}
     */
    this.onPrev = this.onPrev.bind(this);
    /**
     * bind.onJump
     * @type {function}
     */
    this.onJump = this.onJump.bind(this);
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 初期位置設定します - 左右位置を真ん中
   * `started` flag check
   */
  init() {
    // onetime check
    if (this.started) {
      return;
    }
    // 0 位置 transform
    const transform = this.translateX(this.position);
    // style 設定
    this.setStyle({ transform });
  }
  /**
   * carousel を開始します
   */
  start() {
    if (this.started) {
      return;
    }
    // slide を初期位置に動かす
    this.init();
    // flag on
    this.started = true;
    // controller event watch
    const controller = this.controller;
    controller.on(Controller.NEXT, this.onNext);
    controller.on(Controller.PREV, this.onPrev);
    controller.on(Controller.JUMP, this.onJump);
    // animation start
    // TODO: test mode - comment 外す
    // this.play();
  }
  // --------------------------
  /**
   * {@link Controller.NEXT} event handler
   */
  onNext() {
    this.next();
  }
  /**
   * {@link Controller.PREV} event handler
   */
  onPrev() {
    this.prev();
  }
  /**
   * {@link Controller.JUMP} event handler
   * @param {object|Events} events {{id: number}} スライドナンバーを通知します
   */
  onJump(events) {
    const index = events.index;
    // 現在表示と同じだったら何もしない
    if (this.position === index) {
      return;
    }
    // 移動処理を開始します
    this.jump(index);
  }
  // --------------------------
  /**
   * {@link Polling.UPDATE} event handler
   */
  onUpdate() {
    this.next();
  }
  /**
   * {@link Polling.UPDATE} 監視を開始します
   */
  play() {
    this.pause();
    const polling = this.polling;
    polling.on(Polling.UPDATE, this.onUpdate);
    polling.start();
  }
  /**
   * {@link Polling.UPDATE} 監視を停止します
   */
  pause() {
    const polling = this.polling;
    polling.off(Polling.UPDATE, this.onUpdate);
    polling.stop();
  }
  // --------------------------
  /**
   * [NEXT] 処理を開始します
   */
  next() {
    // count up します
    let index = this.position + 1;
    console.log('Carousel.next', this.position, index);
    // last を超えたら 0 に戻す
    if (index > this.last) {
      index = 0;
    }
    // event fire
    this.controller.next();
    // change slide
    this.jump(index);
  }
  /**
   * [PREV] 処理を開始します
   */
  prev() {
    // count down
    let index = this.position - 1;
    // 0 未満になったら last へ戻す
    if (index < 0) {
      index = this.last;
    }
    // event fire
    this.controller.prev();
    // change slide
    this.jump(index);
  }
  /**
   * 指定 index スライドに移動します
   * @param {number} index スライド番号
   */
  jump(index) {
    console.log('Carousel.jump index', index);
    // polling 一時停止
    this.pause();

    // @type {number}
    const last = this.last;
    // @type {number}
    const position = this.position;
    // delay 1fps
    const delay = 25;
    if (index <= 0) {
      // 先頭に戻る
      if (position === last) {
        // 現在がラストだったらアニメーションなしで移動させる
        this.setState({ index: -1000 });
        // 1fps 遅延させて animation 開始
        this.move(index, delay);
      } else {
        // 通常移動
        this.move(index);
      }
    } else if (index === last) {
      // 最終に戻る
      if (position === 0) {
        // 現在が先頭だったらアニメーションなしで移動させる
        this.setState({ index: -2000 });
        // 1fps 遅延させて animation 開始
        this.move(index, delay);
      } else {
        // 通常移動
        this.move(index);
      }
    } else {
      // 通常移動
      this.move(index);
    }
  }
  // --------------------------
  /**
   * スライド移動を行います -> `updateIndex`
   * @param {number} index スライド番号
   * @param {number} [delay=0] 遅延時間 - 1fps(25ms)相当を必要な時に渡します
   */
  move(index, delay = 0) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => (this.updateIndex(index)), delay);
  }
  /**
   * スライド変更処理を行います
   * @param {number} index スライド番号
   */
  updateIndex(index) {
    // 現在のスライドナンバーをアップデートします
    this.position = index;
    // state update でスライド移動を完了します
    this.setState({ index });
    // jump event
    this.controller.jump(index);
    // polling 再開
    // TODO: test mode - comment 外す
    // this.play();
  }
  // --------------------------
  /**
   * スライド番号から `transform` を使用し css value を計算させます
   * @param {number} index スライド番号
   */
  setState({ index }) {
    const css = this.transform(index);
    this.setStyle(css);
  }
  /**
   * 計算した css value を設定させます
   * @param {object} css {{property: value}}
   */
  setStyle(css) {
    let style = '';
    console.log('Carousel.setStyle ===============================');
    const cssKeys = Object.keys(css);
    let hasTransition = cssKeys.indexOf('transition');
    // {property: value} 形式 object から 'property: value;' string へ cast する
    Object.keys(css).map((prop) => {
      style += `${prop}: ${css[prop]};`;
    });
    console.log('Carousel.setStyle style', style);
    this.wrapper.style.cssText = style;
    console.log('Carousel.setStyle ++++++++++++++++++++++++++++++++');
    if (hasTransition) {
      const controller = this.controller;
      controller.begin();
      controller.delayComplete(0.5);
    }
  }
  // --------------------------
  /**
   * translateX CSS value を計算します - slide を動かします
   * @param {number} index 移動位置
   * @return {string} CSS transform value(translateX) を返します
   * @since 2017-03-28 JS control
   */
  translateX(index) {
    if (this.length <= 1) {
      return 'translateX(0)';
    }
    // duplicate | スライド | duplicate, なので left 方向へ負（マイナス）オフセットする
    return `translateX(${(-this.left * index) - (this.left * this.length)}px)`;
  }
  /**
   * CSS transform style を計算します
   * @param {number} index 移動位置
   * @return {Object} CSS transform + transition（必要であれば）を返します
   * @since 2017-03-28 JS control
   */
  transform(index = 0) {
    if (index === -1000) {
      return this.lastToFirst();
    } else if (index === -2000) {
      return this.firstToLast();
    }
    // CSS animation あり
    return {
      transform: this.translateX(index),
      transition: 'transform 0.5s linear'
    };
  }
  /**
   * 循環アニメーションするために CSS animation なしで移動させます<br>
   * CSS transform style を計算します - 最終から先頭へ移動するつなぎ
   * @return {{transform: string}} CSS transform(transition 無し)を返します
   * @since 2017-03-28 JS control
   */
  lastToFirst() {
    return {
      transform: this.translateX(-1)
    };
  }
  /**
   * 循環アニメーションするために CSS animation なしで移動させます<br>
   * CSS transform style を計算します - 先頭から最終へ移動するつなぎ
   * @return {{transform: string}} CSS transform(transition 無し)を返します
   * @since 2017-03-28 JS control
   */
  firstToLast() {
    return {
      transform: this.translateX(this.length)
    };
  }
}
