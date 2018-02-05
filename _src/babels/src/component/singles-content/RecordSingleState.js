/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/04/18 - 16:28
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 記事詳細状態を保存します
 * @private
 * @static
 * @type {{}}
 */
const storage = {};

/**
 * 記事詳細状態を保持・返却します
 * @since 2017-04-17
 */
export default class RecordSingleState {
  /**
   * 状態を保存します
   * @param {String|Number} id ユニークID
   * @param {*} state 保存対象データ
   */
  static store(id, state) {
    storage[id] = state;
  }
  /**
   * 状態を返却します
   * @param {String|Number} id ユニークID
   * @returns {*} 保存データを返します、存在しない時は `undefined` を返します
   */
  static restore(id) {
    return storage[id];
  }
}
