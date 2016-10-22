/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/22 - 14:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// event
import { EventDispatcher } from '../event/EventDispatcher';

// metas
import { Metas } from './singles/Metas';

/**
 * singleton instance のためのチェック用 Symbol
 * @type {Symbol}
 * @private
 */
const _symbol = Symbol('SingleManager singleton instance');
/**
 * SingleManager instance
 * @type {?SingleManager}
 * @private
 * @static
 */
let _instance = null;

/**
 * singleton: 記事詳細・次の記事一覧 History API 使用を管理します
 */
export class SingleManager extends EventDispatcher {
  /**
   * 記事詳細・次の記事一覧 History API 使用を管理します
   * @param {Symbol} target singleton を実現するための private symbol
   * @return {SingleManager} singleton SingleManager instance を返します
   */
  constructor(target) {
    if (_symbol !== target) {
      throw new Error( 'SingleManager is static Class. not use new SingleManager().' );
    }
    if (_instance !== null) {
      return _instance;
    }
    super();
    const head = document.getElementsByTagName('head')[0];
    const metas = new Metas(head);

    metas.push(new Metas(head));
    /**
     * head tag
     * @type {Element}
     */
    this.head = head;
    /**
     * Metas instance
     * @type {Metas}
     */
    this.metas = metas;
    /**
     * 置換え対象タグ情報を管理します
     * @type {Array<Metas>}
     */
    this.values = [
      metas.current(),
    ];
    _instance = this;
    return _instance;
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * instance を生成します
   * @return {SingleManager} SingleManager instance を返します
   */
  static factory():SingleManager {
    if (_instance === null) {
      _instance = new SingleManager( _symbol );
    }
    return _instance;
  }
}

