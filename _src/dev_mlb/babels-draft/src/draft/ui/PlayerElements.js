/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/07 - 18:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // event
// import { default as EventDispatcher } from '../event/EventDispatcher';
// import { default as Events } from '../event/Events';

// imagesLoaded
import imagesLoaded from 'imagesloaded';

// moku/events
import EventDispatcher from '../../moku/event/EventDispatcher';
import Events from '../../moku/event/Events';


// ----------------------------------------
// PRIVATE
// ----------------------------------------
// /**
//  * players array を保存するための Symbol
//  * @type {Symbol}
//  * @private
//  */
// const playersSymbol = Symbol('player element list');
/**
 * new を許可しないための Symbol
 * @type {Symbol}
 * @private
 */
const singletonSymbol = Symbol('PlayerElements singleton symbol');
/**
 * singleton instance, nullable
 * @type {?PlayerElements}
 * @private
 * @static
 */
let instance = null;

/**
 * 選手一覧の画像読込完了を監視し、
 * 完了後に「max 高さ」と合わせて通知します<br>
 * singleton なので `factory` で instance を作成します
 *
 * ```
 * const playersElements = PlayerElements.factory();
 * ```
 */
export default class PlayerElements extends EventDispatcher {
  // ----------------------------------------
  // EVENT
  // ----------------------------------------
  // /**
  //  * init で指定されたコンテナ配下の画像読み込み完了時に発火します
  //  * @event LOAD
  //  * @return {string} playersElementLoad を返します
  //  */
  // static get LOAD() {
  //   return 'playersElementLoad';
  // }
  /**
   * init で指定されたコンテナ配下の画像読み込み完了時に発火します
   * LOAD - playersElementLoad
   * @type {string}
   */
  static LOAD = 'playersElementLoad';
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * PlayerElements instance を singleton を保証し作成します
   * @return {PlayerElements} PlayerElements instance を返します
   */
  static factory() {
    if (instance === null) {
      instance = new PlayerElements(singletonSymbol);
    }
    return instance;
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * singleton です
   * @param {Symbol} checkSymbol singleton を保証するための private instance
   * @return {PlayerElements} singleton instance を返します
   */
  constructor(checkSymbol) {
    // checkSymbol と singleton が等価かをチェックします
    if (checkSymbol !== singletonSymbol) {
      throw new Error('don\'t use new, instead use static factory method.');
    }
    if (instance !== null) {
      return instance;
    }
    // initialize
    super();
    // ------
    // @type {Array<Elements>} - 選手を格納している Elements instance を保存します
    // this[playersSymbol] = [];
    // instance = this;
    /**
     * 選手の Element の Elements instance を保存している配列取得します
     * @type {Array.<y<Elements>>}
     */
    this.players = [];
    /**
     * bind 済み onImages 関数<br>
     * imagesLoaded.always event handler<br>
     * 選手一覧画像読み込み完了時に発火します
     * @type {Function}
     */
    this.onImages = this.onImages.bind(this);
    /**
     * imagesLoaded instance を保存します
     * @type {?imagesLoaded}
     * @default null
     */
    this.images = null;
    /**
     * init one time flag
     * @type {boolean}
     * @default false
     */
    this.intialized = false;
    // instance を返します
    return this;
  }
  // // ----------------------------------------
  // // EVENT
  // // ----------------------------------------
  // /**
  //  * init で指定されたコンテナ配下の画像読み込み完了時に発火します
  //  * @event LOAD
  //  * @return {string} playersElementLoad を返します
  //  */
  // static get LOAD() {
  //   return 'playersElementLoad';
  // }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  // /**
  //  * 選手の Element の Elements instance を保存している配列取得します
  //  * @return {Array<Elements>} 選手の Element の Elements instance を保存している配列返します
  //  */
  // get players() {
  //   return this[playersSymbol];
  // }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * 初期処理 **必須**<br>
   * parent 配下の画像読み込みを監視する準備を行います
   * @param {Element} parent 選手の Element の親ノード
   * @return {PlayerElements} メソッドチェーン可能なように `this` を返します
   */
  init(parent) {
    if (this.intialized) {
      return this;
    }
    this.intialized = true;
    // @type {NodeList}
    const children = parent.childNodes;
    this.images = imagesLoaded(children);
    return this;
  }
  /**
   * 画像読み込み完了監視を始めます
   * @return {PlayerElements} メソッドチェーン可能なように `this` を返します
   */
  start() {
    this.images.on('always', this.onImages);
    return this;
  }
  /**
   * 選手の Element の Elements instance を追加します<br>
   * 画像読込完了後にコンテナの高さを測り高さを合わせるために通知します
   * @param {Elements} elements 選手の Element の Elements instance
   */
  add(elements) {
    this.players.push(elements);
  }
  /**
   * 画像読込完了 event handler<br>
   * `PlayersElement.LOAD` events instance に height プロパティを追加し発火します
   */
  onImages() {
    // unbind
    this.images.off('always', this.onImages);
    // 一番高い height を取得します
    const height = this.match();
    // create events instance
    const events = new Events(PlayerElements.LOAD, this, this);
    events.height = height;
    // console.log('PlayerElements.onImages', events);
    // fire
    this.dispatch(events);
  }
  /**
   * コンテナの高さを測り一番高い `height` を取得します
   * @return {number} 一番高い `height` を返します
   */
  match() {
    // @type {{Array<Elements>}
    // 走査開始
    const list = this.players.map(elements => elements.offset().height);
    // 降順
    list.sort();
    // max height を返します
    return list.pop();
  }
}
