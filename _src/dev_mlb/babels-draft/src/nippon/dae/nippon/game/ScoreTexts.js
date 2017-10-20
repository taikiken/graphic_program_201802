/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:52
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../../util/Type';

// data
import ScoreText from './ScoreText';

/**
 * どちらかのチームが得点したら出現します<br>
 * JSON.response.gemeinfo.scoretext[]
 */
export default class ScoreTexts {
  /**
   * JSON.response.gemeinfo.scoretext[]
   * @param {Array<Object>} json JSON.response.gemeinfo.scoretext[]
   */
  constructor(json) {
    // let scoretext = json;
    // let has = true;
    // if (!Type.array(scoretext)) {
    //   scoretext = [];
    //   has = false;
    // }
    let has = Array.isArray(json);
    const origin = has ? json : [];
    if (origin.length === 0) {
      has = false;
    }
    /**
     * JSON.response.gemeinfo.scoretext[{}], 生データ
     * @type {Array<Object>}
     */
    this.origin = origin;
    const scores = origin.map(score => new ScoreText(score));
    /**
     * JSON.response.gemeinfo.scoretext[{}]
     * @type {Array<ScoreText>}
     */
    this.scoreTexts = scores;
    /**
     * alias scoreTexts, JSON.response.gemeinfo.scoretext[{}]
     * @type {Array<ScoreText>}
     */
    this.scores = scores;
    /**
     * 逆順
     * @type {Array.<ScoreText>}
     */
    this.reverse = scores.slice(0).reverse();
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
  }
}
