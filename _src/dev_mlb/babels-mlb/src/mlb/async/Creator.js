/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/21 - 19:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * redux.store.dispatch を bind した関数群を管理します
 */
export default class Creator {
  /**
   * actions.calendar を redux.store.dispatch で bind します - {@link View}
   * @type {?function}
   */
  static calendar = null;
  /**
   * actions.schedule を redux.store.dispatch で bind します - {@link View}
   * @type {?function}
   */
  static schedule = null;
  static games = null;
}
