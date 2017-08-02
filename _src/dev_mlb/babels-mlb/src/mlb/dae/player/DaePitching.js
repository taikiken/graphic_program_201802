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
 * [native code] - parseInt
 * @type {function}
 */
const parseInt = self.parseInt;

/**
 * 投球回数から出力用データを作成します
 *
 * 1. `-` 以外
 * 1. `.` で分解
 * 1. length 2
 * 1. 分子 0 以外 - 「0回 2/3」
 * 1. 分子 0 - 「0回」
 */
class DaePitchingInnings {
  /**
   * 投球回数から出力用データを作成します
   * @param {string} innings `0.0` な投球回数
   */
  constructor(innings) {
    const origin = Normalize.str(innings, '-');
    let title = '0回';
    // `-` 以外
    if (origin !== '-') {
      // `.` で分解します
      const splits = origin.split('.');
      // length 2
      if (splits.length === 2) {
        // 分子
        const numerator = parseInt(splits[1], 10);
        if (numerator) {
          // 分子 0 以外
          title = `${splits[0]}回 ${numerator}/3`;
        } else {
          // 分子 0
          title = `${splits[0]}回`;
        }
      }
    }
    /**
     * original innings
     * @type {string}
     */
    this.origin = innings;
    /**
     * 加工済み innings
     * @type {string}
     */
    this.title = title;
    /**
     * Normalize 済み innings
     * @type {string}
     */
    this.innings = origin;
  }
}

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
     * - undefined のこともある様子
     * @type {boolean}
     */
    this.has = !!info;
    // this.has = info !== null;
    /**
     * 防御率
     * @type {string}
     */
    this.average = Normalize.str(origin.average, '-');
    // /**
    //  * 投球イニング
    //  * @type {string}
    //  */
    // this.innings = Normalize.str(origin.innings, '-');
    /**
     * 投球イニング
     * @type {DaePitchingInnings}
     */
    this.innings = new DaePitchingInnings(origin.innings);
    /**
     * 投球数
     * @type {number}
     */
    this.pitched = Normalize.int(origin.pitched, 0);
    /**
     * ストライク数
     * @type {number}
     */
    this.strikes = Normalize.int(origin.strikes, 0);
    /**
     * 三振数
     * @type {number}
     */
    this.outs = Normalize.int(origin.strike_outs, 0);
    /**
     * 四死球
     * @type {number}
     */
    this.dead = Normalize.int(origin.walking_dead, 0);
    /**
     * 失点
     * @type {number}
     */
    this.ra = Normalize.int(origin.ra, 0);
    /**
     * 被打数
     * @type {number}
     */
    this.hits = Normalize.int(origin.hits, 0);
    // /**
    //  * ポジション分類 - レフトであれば「外野手」、一塁
    //  * @type {string}
    //  */
    // this.position = Normalize.str(origin.position);
  }
}
