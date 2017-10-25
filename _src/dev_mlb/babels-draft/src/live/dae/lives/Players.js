/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 17:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

// data/flash
import Player from './Player';
import Nominate from './Nominate';


/**
 * 指名情報・選手情報
 *
 * - nominate 指名情報
 * - player 選手情報
 */
export default class Players {
  /**
   * 指名情報
   * @param {Object} playersData draftData JSON.response.team.draft.[roaster|development].{}
   * @param {Info} info 選手に指名球団情報を付与します
   */
  constructor(playersData, info) {
    const origin = playersData || {};
    // if (Type.nil(players) || !Type.exist(players)) {
    //   players = {};
    // }
    const nominate = new Nominate(origin.nominate);
    /**
     * {{nominate: Object, player: Object}} JSON 生データ
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 指名情報
     * @type {Nominate}
     */
    this.nominate = nominate;
    /**
     * 選手情報
     * @type {Player}
     */
    this.player = new Player(origin.player, info, nominate);
  }
}
