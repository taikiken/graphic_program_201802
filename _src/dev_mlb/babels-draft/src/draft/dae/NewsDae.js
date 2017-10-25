/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/10/04 - 20:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Tag from './news/Tag';

/**
 * 関連ニュース
 * - {@link Tag}
 *   - {link Category}
 */
export default class NewsDae {
  /**
   * 関連ニュース
   * @param {Array} json 関連ニュース JSON data
   */
  constructor(json) {
    const origin = Array.isArray(json) ? json : [];
    /**
     * 関連ニュース オリジナル JSON
     * @type {Array}
     */
    this.origin = origin;
    /**
     * 関連ニュース・リスト
     * @type {Array.<Tag>}
     */
    this.list = origin.map(data => new Tag(data));
  }
}
