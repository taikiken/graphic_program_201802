/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 14:53
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// data
import { Safety } from '../../data/Safety';

/**
 * 記事詳細 readmore 「続きを読む」フラッグ管理
 * @see http://dev.undotsushin.com/p/51872/?debug
 * @since 2016-09-25
 */
export class ReadmoreDae {
  constructor(readmore) {
    readmore = Safety.object(readmore);
    /**
     * 「続きを読む」JSON.response.readmore
     * @type {Object}
     * @private
     */
    this._readmore = readmore;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  get readmore():Object {
    return this._readmore;
  }
  /**
   * 続きを読む判定用フラグ
   * <pre>
   * 続きを読む判定用フラグ
   * - trueの場合は本文全文表示しない
   * - 概要文のみ表示して、「続きを読む」で外部サイトに遷移
   * </pre>
   * @return {boolean} 続きを読む判定用フラグを返します
   */
  get isReadmore():boolean {
    return !!this.readmore.is_readmore;
  }
  /**
   * 続きを読むの遷移先URL
    * @return {string} 続きを読むの遷移先URLを返します
   */
  get url():string {
    return this.readmore.url;
  }
}
