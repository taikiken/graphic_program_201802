/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/04 - 23:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import ViewArchiveMasonryInfinite from './ViewArchiveMasonryInfinite';
import { User } from '../app/User';
import Area from '../action/area/Area';
import AreaAuth from '../action/area/AreaAuth';
import Pref from '../action/area/Pref';
import PrefAuth from '../action/area/PrefAuth';
import { ComponentCategoryOption } from '../component/categories/ComponentCategoryOption';

/**
 * 地域一覧 - Ajax request + JSON 後表示します
 * {@link ViewCategory} の地域版
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * @since 2017-09-04
 */
export default class ViewArea extends ViewArchiveMasonryInfinite {
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * 地域 - 都道府県 Action instance を作成します
   * @param {string} area 地域名称
   * @param {?function} done 成功コールバッック
   * @param {?function} fail 失敗コールバック
   * @returns {Pref|PrefAuth} Action instance
   */
  static actionPref(area, done, fail) {
    return User.sign ?
      new Pref(area, done, fail) :
      new PrefAuth(area, done, fail);
  }
  /**
   * 地域 Action instance を作成します
   * @param {string} area 地域名称
   * @param {?function} done 成功コールバッック
   * @param {?function} fail 失敗コールバック
   * @returns {Area|AreaAuth} Action instance
   */
  static actionArea(area, done, fail) {
    return User.sign ?
      new Area(area, done, fail) :
      new AreaAuth(area, done, fail);
  }
  // ----------------------------------------
  // CONSTRUCTOR
  // ----------------------------------------
  /**
   * 地域一覧
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {string} area 地域名称
   * @param {boolean} pref 都道府県フラッグ
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, moreElement, area = '', pref = false, option = {}) {
    super(element, moreElement, null, option, true);
    // ---
    const done = this.done.bind(this);
    const fail = this.fail.bind(this);
    /**
     * Action instance を設定します
     * !type {Pref|PrefAuth|Area|AreaAuth}
     */
    this.action = pref ?
      ViewArea.actionPref(area, done, fail) :
      ViewArea.actionArea(area, done, fail);
    /**
     * 地域名称
     * @type {string}
     */
    this.area = area;
    /**
     * 都道府県フラッグ
     * @type {boolean}
     */
    this.pref = pref;
    // @since 2016-09-20
    // 記事一覧に pickup, headline を表示させる
    const categoryOption = new ComponentCategoryOption('area');
    categoryOption.start();
  }
}
