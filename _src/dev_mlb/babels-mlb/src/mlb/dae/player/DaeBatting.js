/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 14:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// dae
import Normalize from '../../util/Normalize';

/**
 * 打撃成績
 */
export default class DaeBatting {
  /**
   * 打撃成績
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    // console.log('DaeBatting', origin);
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * data が null で無い - 存在 flag
     * @type {boolean}
     */
    this.has = info !== null;
    /**
     * 打率・防御率?
     * @type {string}
     */
    this.average = Normalize.str(origin.average, '-');
    /**
     * 打点数
     * @type {number}
     */
    this.runs = Normalize.int(origin.runs);
    /**
     * 盗塁数
     * @type {number}
     */
    this.stolen = Normalize.int(origin.stolen_bases);
    /**
     * 安打数
     * @type {number}
     */
    this.hits = Normalize.int(origin.hits);
    /**
     * 打席数
     * @type {number}
     */
    this.bats = Normalize.int(origin.bats);
  }
}
