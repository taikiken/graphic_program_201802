/**
 * @license inazumatv.com
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/08
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * c
 */

// // util
// import { default as Type } from '../../util/Type';

// moku/util
import Type from '../../../moku/util/Type';

// data
import Player from './Player';

/**
 * ポジション別選手データを管理します
 */
export default class Players {
  /**
   * ポジション別選手データを洗浄し Player instance にします
   * @param {string} identity 出身
   * @param {string} positionTxt ポジション Classes.PITCHER... {@link Classes}
   * @param {Array<Object>} [positionsList=[]] ポジション別選手データ配列
   */
  constructor(identity, positionTxt, positionsList = []) {
    let positions = positionsList;
    if (!Type.array(positions)) {
      positions = [];
    }
    /**
     * ポジション別選手データを保存します
     * @type {Array<Player>}
     */
    this.players = positions.map(position => new Player(identity, positionTxt, position));
  }
}

