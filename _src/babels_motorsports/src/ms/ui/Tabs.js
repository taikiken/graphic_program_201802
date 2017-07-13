/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/13 - 15:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// moku/dom
import Elements from '../../moku/dom/Elements';

// app
import Manager from '../app/Manager';

/**
 * [native code] - document
 * @type {HTMLDocument}
 */
const document = self.document;

/**
 * tab 表示切替機能を実装
 * ```
 * <a class="point_rank__nav--driver js-tab-link selected" href="#point_rank--driver">ドライバーランキング</a>
 * // target
 * <table id="point_rank--driver" class="point_rank__table mod-table selected">
 * </table>
 * ```
 * - a.href #id に対応するコンテナがターゲット
 * - active - `.selected` を付与する
 */
export default class Tabs {
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
   * 処理に必要なタグを収集します
   * a.js-tab-link
   * @param {string} [id=js-point_rank__nav__list] 処理親コンテナ ID
   * @returns {Array.<Element>} a.js-tab-link
   */
  static init(id = 'js-point_rank__nav__list') {
    // @type {Element} - 親コンテナ
    const ul = document.getElementById(id);
    // @type {?NodeList} - a.js-tab-link search
    const anchors = ul ? ul.getElementsByClassName('js-tab-link') : null;
    // 取得できない場合は空配列を返す
    return anchors && anchors.length ? Array.from(anchors) : [];
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * a.js-tab-link tag を取得し href から id を抽出し target container を取得する
   * @param {Element} anchor a.js-tab-link
   */
  constructor(anchor) {
    // @type {string} - href #後ろを取得
    const id = anchor.href.split('#').pop();
    // @type {Element} - a.href に対応する Element
    const target = document.getElementById(id);
    // ------
    /**
     * a.js-tab-link - Elements instance 変換済み
     * @type {Elements}
     */
    this.anchor = new Elements(anchor);
    /**
     * a.href に対応する Element - Elements instance 変換済み
     * @type {?Elements}
     */
    this.target = target ? new Elements(target) : null;
    /**
     * bind onClick - a.onclick event handler
     * @type {function}
     */
    this.onClick = this.onClick.bind(this);
    /**
     * bind onOpen - {@link Manager}.TAB_OPEN event handler
     * @type {function}
     */
    this.onOpen = this.onOpen.bind(this);
    /**
     * a.href から抽出した ID - 識別子として使用します
     * @type {id}
     */
    this.id = id;
    /**
     * global メッセージ通知機能 - tab open を通知するのに使用します
     * @type {Manager}
     */
    this.manaegr = Manager.factory();
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * target 存在をチェックし event を watch するかを決定します
   * @returns {boolean} event watch 開始 flag, true: 開始
   */
  start() {
    if (!this.target) {
      return false;
    }
    this.anchor.element.addEventListener('click', this.onClick, false);
    this.manaegr.on(Manager.TAB_OPEN, this.onOpen);
    return true;
  }
  /**
   * a.onclick event handler,
   * - a, target へ {@link Tabs.SELECTED} (`selected`) className を付与します
   * - {@link Manager}.tab へ id を通知します
   * @param {Event} event click Event
   */
  onClick(event) {
    event.preventDefault();
    this.target.classes.add(Tabs.SELECTED);
    this.anchor.classes.add(Tabs.SELECTED);
    this.manaegr.tab(this.id);
  }
  /**
   * Manager.TAB_OPEN event handler,
   * id を比較し異なる場合は a, target の {@link Tabs.SELECTED} (`selected`) className を削除します
   * @param {Events} events id 比較に利用します
   */
  onOpen(events) {
    if (events.id !== this.id) {
      this.target.classes.remove(Tabs.SELECTED);
      this.anchor.classes.remove(Tabs.SELECTED);
    }
  }
}
