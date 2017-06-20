/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/29 - 14:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { EventDispatcher } from '../event/EventDispatcher';

// ui
import { Hit } from '../ui/Hit';

// @since 2016-10-28
import { Scroll } from '../util/Scroll';
import { TopButton } from '../ui/button/TopButton';

// util
import { Elements } from '../util/Elements';

/**
 * snap scroll を実現します
 * @since 2016-10-29
 */
export class Snap extends EventDispatcher {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * hit instance を作成し event handler を設定します
   * @param {Element} element 対象 element
   * @param {boolean} [noMotion=false] scroll animation を行わず `scroll up` だけを監視する
   * @param {Page} [page={}] element page instance
   * @param {boolean} [sp=false] SP 端末フラッグ - since 2017-06-19
   */
  constructor(element, noMotion = false, page = {}, sp = false) {
    super();
    /**
     * snap 対象 element
     * @type {Element}
     */
    this.element = element;
    /**
     * element を Elements instance にします
     * @type {Elements}
     */
    this.elements = new Elements(element);
    /**
     * scroll 中 flag
     * @type {boolean}
     * @default false
     * @since 2016-10-28
     */
    this.scrolling = false;
    /**
     * bound scrollComplete, scroll animation complete event handler<br>
     * `scrolling` flag を off(false) にします
     * @type {function}
     * @since 2016-10-28
     */
    this.boundComplete = this.scrollComplete.bind(this);
    /**
     * 近接閾値<br>
     * 閾値以下（接近）になるとスナップします
     * @type {number}
     * @since 2016-10-28
     */
    this.threshold = 240;
    /**
     * snap scroll 可能かの flag<br>
     * [topへ戻る] button が押されると true に設定し snap 行動を抑制します
     * @type {boolean}
     */
    this.returnHome = false;
    /**
     * scroll animation を行わない
     * @type {boolean}
     */
    this.noMotion = noMotion;
    /**
     * snap 済みフラッグ
     * @type {boolean}
     */
    this.magnetic = false;
    /**
     * Page instance
     * @type {Page}
     */
    this.page = page;
    // -------------------------------
    // --- --- ---
    // below 2017-04-17 - 「続きを読む」iframe 対応
    /**
     * bound buttonStart - TopButton.START event handler
     * @type {Function}
     * @since 2017-04-17
     */
    this.boundButtonStart = this.buttonStart.bind(this);
    /**
     * bound buttonComplete - TopButton.COMPLETE event handler
     * @type {Function}
     * @since 2017-04-17
     */
    this.boundButtonComplete = this.buttonComplete.bind(this);
    /**
     * bound onHit - Hit.COLLISION event handler
     * @type {Function}
     * @since 2017-04-17
     */
    this.boundHit = this.onHit.bind(this);
    /**
     * bound onHit - Hit.NO_COLLISION event handler
     * @type {Function}
     * @since 2017-04-17
     */
    this.boundNoHit = this.noHit.bind(this);
    /**
     * TopButton instance
     * @type {?TopButton}
     * @since 2017-04-17
     */
    this.topButton = null;
    /**
     * Hit instance
     * @type {?Hit}
     * @since 2017-04-17
     */
    this.hit = null;
    /**
     * SP 端末 flag - snap offset を付与有無判定に使用します
     * @type {boolean}
     * @since 2017-06-19
     */
    this.sp = sp;
  }
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * snap 通知イベント
   * @event SNAPPED
   * @return {string} snapSnapped
   */
  static get SNAPPED() {
    return 'snapSnapped';
  }
  /**
   * scroll up 中に hit したことを通知するイベント
   * @return {string} snapBeatUp
   */
  static get BEAT_UP() {
    return 'snapBeatUp';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * @deprecated instead use `this.start` - 2017-04-17
   * 初期処理, event 監視
   */
  init() {
    // // page top click listener
    // // page top animation 中に snap しないようにします
    // const topButton = TopButton.factory();
    // topButton.on(TopButton.START, this.buttonStart.bind(this));
    // topButton.on(TopButton.COMPLETE, this.buttonComplete.bind(this));
    //
    // // hit listener
    // const hit = new Hit(this.element);
    // hit.on(Hit.COLLISION, this.onHit.bind(this));
    // hit.on(Hit.NO_COLLISION, this.noHit.bind(this));
    // hit.start();
    this.start();
  }
  /**
   * 監視を始めます
   * @since 2017-04-17
   */
  start() {
    // page top click listener
    // page top animation 中に snap しないようにします
    const topButton = TopButton.factory();
    this.topButton = topButton;
    topButton.on(TopButton.START, this.boundButtonStart);
    topButton.on(TopButton.COMPLETE, this.boundButtonComplete);

    // hit listener
    const hit = new Hit(this.element);
    this.hit = hit;
    hit.on(Hit.COLLISION, this.boundHit);
    hit.on(Hit.NO_COLLISION, this.boundNoHit);
    hit.start();
  }
  /**
   * 監視を止めます
   * @since 2017-04-17
   */
  stop() {
    const topButton = this.topButton;
    topButton.off(TopButton.START, this.boundButtonStart);
    topButton.off(TopButton.COMPLETE, this.boundButtonComplete);
    const hit = this.hit;
    hit.off(Hit.COLLISION, this.boundHit);
    hit.off(Hit.NO_COLLISION, this.boundNoHit);
    hit.stop();
  }
  /**
   * Hit.COLLISION event handler<br>
   * ウインドウ内にコンテナが表示された時に通知されます
   * @param {{
   *  rect: ClientRect,
   *  events: object,
   *  type: string
   * }} events Hit events
   */
  onHit(events) {
    const scrollEvents = events.events;
    const moving = scrollEvents.moving;
    const distance = scrollEvents.distance;
    if (Math.abs(distance) < this.threshold) {
      return;
    }
    if (moving <= 0) {
      // scroll down
      this.scrollDown(events);
    } else {
      // scroll up
      this.scrollUp(events);
    }
    // ここで再チェックする
    this.beat(events);
  }
  /**
   * Hit.NO_COLLISION event handler<br>
   * `magnetic` flag を false にします
   */
  noHit() {
    this.magnetic = false;
  }
  /**
   * scroll down 中のスナップスクロール判定を行います<br>
   * Hit.COLLISION event handler 内から呼び出されます
   * @param {Object} events Hit.COLLISION event object
   */
  scrollDown(events) {
    // noMotion true は scroll up だけ監視する
    if (this.noMotion) {
      return;
    }
    // スナップ済みの場合は off になるまで処理しない
    if (this.magnetic) {
      return;
    }
    // ---
    // 判定開始
    // @type {ClientRect} - div.loaded-post ClientRect
    const offset = events.rect;
    const scrollEvents = events.events;
    // @type {number} - scrollY
    const y = scrollEvents.y;
    // @type {number} - div.loaded-post ClientRect.top
    // window left_top 時に `0`
    const top = offset.top;
    // 閾値チェック
    if (top <= this.threshold && top > 0) {
      // magnetic move
      // console.log('scrollDown +++++++++', top, this.element);
      this.snap(y + top);
    }
  }
  /**
   * scroll up 中のスナップスクロール判定を行います<br>
   * Hit.COLLISION event handler 内から呼び出されます
   * @param {Object} events Hit.COLLISION event object
   */
  scrollUp(events) {
    // スナップ済みの場合は off になるまで処理しない
    if (this.magnetic) {
      return;
    }
    // ---
    // // scroll up 時に snap より先に replaceState するためのチェックを行います
    // this.beat(events);
    // ---
    // 判定開始
    // @type {ClientRect} - div.loaded-post ClientRect
    const offset = events.rect;
    // const scrollEvents = events.events;
    // const y = scrollEvents.y;
    const top = offset.top;
    // 閾値チェック
    if (Math.abs(top) <= this.threshold && top > 0) {
      // magnetic move
      // console.log('scrollUp ------', top, this.element);
      // this.snap(y + top);
      // event fire
      this.dispatch({ type: Snap.SNAPPED, target: this });
    }
  }
  /**
   * scroll up 時に element が画面の半分以上を占めているかを判定し<br>
   * Snap.BEAT_UP event を発火させます
   * @param {Object} events Hit event object
   */
  beat(events) {
    const offset = events.rect;
    // const top = offset.top;
    const bottom = offset.bottom;
    // // window
    const scrollEvents = events.events;
    const height = scrollEvents.height;
    // @since 2016-11-17 0.25(1/4)に変えてみる
    // const wall = height * 0.25;
    const wall = height * 0.01;
    // element.top が window.height の半分未満になったら
    // scroll up の時は hit 時にイベントを発火させる
    if (bottom <= height && bottom > wall) {
      this.dispatch({ type: Snap.BEAT_UP, target: this });
    }
  }
  /**
   * snap scroll を開始し、スクロール操作を不能にします
   * @param {number} top 目標値
   */
  snap(top) {
    // scroll 中の時は処理しない
    if (this.scrolling) {
      return;
    }
    if (typeof this.page.url === 'function' && this.page.url() === location.pathname) {
      return;
    }
    // event fire
    this.dispatch({ type: Snap.SNAPPED, target: this });
    // flag on
    this.magnetic = true;
    // ---------------------------
    // scroll animation を行わない option
    if (this.noMotion) {
      return;
    }
    // ---------------------------
    // scroll animation
    // console.log('***magnet************************', top, this.scrollOffset(), this.scrolling, this.returnHome);
    // scroll animation 開始(snap)
    if (!this.returnHome) {
      this.scrolling = true;
      Scroll.motion(top - this.scrollOffset(), 0.16, 0, false, this.boundComplete);
      // スクロール操作を不能にします
      Scroll.disable();
    }
  }
  /**
   * top 位置に + するオフセット値
   *
   * sp 構造が変更され offset 80 必要になる - on 2017-06-19,
   * header-sticky: height - loaded-post: border-top する
   * ```
   * .header-sticky { height: 100px; }
   * .loaded-post { border-top: 20px; }
   * ```
   * @return {number} top 位置に + するオフセット値 - SP: 80 | PC: 0
   * @since 2017-06-19 - hotfix
   * @see https://github.com/undotsushin/undotsushin/issues/2078
   */
  scrollOffset() {
    // return 0;
    // sp 構造が変更され offset 80 必要になる - on 2017-06-19
    return this.sp ? 80 : 0;
  }
  /**
   * scroll animation 完了 callback<br>
   * `scrolling` を off にし、スクロール操作を可能にします
   */
  scrollComplete() {
    // this.moving = 0;
    this.scrolling = false;
    // 遅延させ回復させます
    Scroll.enable(750);
    // console.log('----------------- scrollComplete', this.scrolling);
  }
  // --------------------------------------------------
  // return top animation
  /**
   * return top animation start event handler
   */
  buttonStart() {
    this.returnHome = true;
  }
  /**
   * return top animation complete event handler
   */
  buttonComplete() {
    this.returnHome = false;
  }
}
