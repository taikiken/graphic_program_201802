/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/13 - 15:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/dom
import Elements from '../../moku/dom/Elements';

/**
 * [native code] - document
 * @type {HTMLDocument}
 */
const document = self.document;

/**
 * accordion 機能を実装します
 * ```
 * <!--[button]-->
 * <dl class="race_info__accordion--trigger">
 *  <dt>オーストラリアGP</dt>
 *  <dd>3月24日-26日</dd>
 * </dl>
 * <!--[target]-->
 * <div class="race_info__accordion--body"></div>
 * ```
 * - dl.race_info__accordion--trigger - click button
 * - div.race_info__accordion--body - open target
 * - active - `.selected` を付与する
 */
export default class Accordions {
  // ----------------------------------------
  // STATIC CONST
  // ----------------------------------------
  /**
   * activate 時に付与する className - selected
   * @const SELECTED
   * @returns {string} activate 時に付与する className - selected を返します
   */
  static get SELECTED() {
    return 'selected';
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * 親コンテナから trigger / body を走査します
   * @param {Element|Document} parent 親コンテナ - #js-race_info
   * @returns {{triggers: Array.<Element>, bodies: Array.<Element>}}
   * 親コンテナから trigger / body を取得し配列変換済みし返します
   */
  static search(parent) {
    const triggers = parent.getElementsByClassName('race_info__accordion--trigger');
    const bodies = parent.getElementsByClassName('race_info__accordion--body');
    return {
      triggers: triggers && triggers.length ? Array.from(triggers) : [],
      bodies: bodies && bodies.length ? Array.from(bodies) : [],
    };
  }
  /**
   * 親コンテナ ID から対象コンテナを取得します
   * @param {string} [id=js-race_info] 親コンテナ ID
   * @returns {{triggers: Array.<Element>, bodies: Array.<Element>}}
   * 親コンテナから trigger / body を取得し配列変換済みし返します
   */
  static init(id = 'js-race_info') {
    const parent = document.getElementById(id);
    const { triggers, bodies } = parent ? Accordions.search(parent) : { triggers: [], bodies: [] };
    return {
      triggers,
      bodies,
    };
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * button / target を取得し Accordion 実装します
   * @param {Element} trigger dl.race_info__accordion--trigger
   * @param {Element} body div.race_info__accordion--body
   */
  constructor(trigger, body) {
    /**
     * dl.race_info__accordion--trigger
     * @type {Elements}
     */
    this.trigger = new Elements(trigger);
    /**
     * div.race_info__accordion--body
     * @type {Elements}
     */
    this.body = new Elements(body);
    /**
     * bind onClick - trigger.onclick event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * trigger へ click event を watch します
   */
  start() {
    this.trigger.element.addEventListener('click', this.onClick, false);
  }
  /**
   * trigger.onclick event handler,
   * {@link Accordions.SELECTED} `selected` className がある時は close,
   * 無い時は open します
   * @param {Event} event click event
   */
  onClick(event) {
    event.preventDefault();
    if (this.trigger.classes.has(Accordions.SELECTED)) {
      this.close();
    } else {
      this.open();
    }
  }
  /**
   * accordion 開ききます,
   * {@link Accordions.SELECTED} (`selected`) className を付与します
   */
  open() {
    this.trigger.classes.add(Accordions.SELECTED);
    this.body.classes.add(Accordions.SELECTED);
  }
  /**
   * accordion 閉じます
   * {@link Accordions.SELECTED} (`selected`) className を削除します
   */
  close() {
    this.trigger.classes.remove(Accordions.SELECTED);
    this.body.classes.remove(Accordions.SELECTED);
  }
}
