/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/05 - 17:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * redux.store.dispatch を bind した関数を提供します
 * - default は null です
 * - 処理冒頭で設定します
 */
export default class Creators {
  /**
   * actions.lives.live を redux.store.dispatch で bind します - {@link ViewLive}
   * @type {?function}
   */
  static lives = null;
}
