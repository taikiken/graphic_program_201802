/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/19 - 14:56
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
 * 投手成績
 */
export default class DaePitching {
  /**
   * 投手成績
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
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
     * 防御率
     * @type {string}
     */
    this.average = Normalize.str(origin.average, '-');
    /**
     * 投球イニング
     * @type {number}
     */
    this.innings = Normalize.int(origin.innings);
    /**
     * 投球数
     * @type {number}
     */
    this.pitched = Normalize.int(origin.pitched);
    /**
     * ストライク数
     * @type {number}
     */
    this.strikes = Normalize.int(origin.strikes);
    /**
     * 三振数
     * @type {number}
     */
    this.outs = Normalize.int(origin.strike_outs);
    /**
     * 四死球
     * @type {number}
     */
    this.dead = Normalize.int(origin.walking_dead);
    /**
     * 失点
     * @type {number}
     */
    this.ra = Normalize.int(origin.ra);
    /**
     * 被打数
     * @type {number}
     */
    this.hits = Normalize.int(origin.hits);
    /**
     * ポジション分類 - レフトであれば「外野手」、一塁
     * @type {string}
     */
    this.position = Normalize.str(origin.position);
  }
}
