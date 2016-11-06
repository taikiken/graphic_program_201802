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
   */
  constructor(element, noMotion = false) {
    super();
    /**
     * snap 対象 element
     * @type {Element}
     */
    this.element = element;
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
    this.threshold = 120;
    /**
     * snap scroll 可能かの flag<br>
     * [topへ戻る] button が押されると true に設定し snap 行動を抑制します
     * @type {boolean}
     */
    this.returnHome = true;
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
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * 初期処理, event 監視
   */
  init() {
    // page top click listener
    // page top animation 中に snap しないようにします
    const topButton = TopButton.factory();
    topButton.on(TopButton.START, this.buttonStart.bind(this));
    topButton.on(TopButton.COMPLETE, this.buttonComplete.bind(this));

    // hit listener
    const hit = new Hit(this.element);
    hit.on(Hit.COLLISION, this.onHit.bind(this));
    hit.on(Hit.NO_COLLISION, this.noHit.bind(this));
    hit.start();
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
    if (scrollEvents.moving <= 0) {
      // scroll down
      this.scrollDown(events);
    } else {
      // scroll up
      this.scrollUp(events);
    }
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
    if (top <= this.threshold) {
      // magnetic move
      console.log('scrollDown +++++++++', top, this.element);
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
    // 判定開始
    // @type {ClientRect} - div.loaded-post ClientRect
    const offset = events.rect;
    const scrollEvents = events.events;
    const y = scrollEvents.y;
    const top = offset.top;
    // 閾値チェック
    if (Math.abs(top) <= this.threshold) {
      // magnetic move
      console.log('scrollUp ------', top, this.element);
      this.snap(y + top);
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
    console.log('***magnet************************', top, this.scrolling);
    // scroll animation 開始(snap)
    if (!this.returnHome) {
      this.scrolling = true;
      Scroll.motion(top, 0.16, 0, false, this.boundComplete);
      // スクロール操作を不能にします
      Scroll.disable();
    }
  }
  /**
   * scroll animation 完了 callback<br>
   * `scrolling` を off にし、スクロール操作を可能にします
   */
  scrollComplete() {
    this.scrolling = false;
    // 遅延させ回復させます
    Scroll.enable(750);
    console.log('----------------- scrollComplete', this.scrolling);
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
