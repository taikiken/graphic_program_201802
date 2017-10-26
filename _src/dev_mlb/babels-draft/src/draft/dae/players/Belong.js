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
 * a
 */

// // util
// import { default as Type } from '../../util/Type';

// moku/util
import Type from '../../../moku/util/Type';

// ui
import Players from './Players';

/**
 * 出身（所属）別 JSON data をポジション別データに分解します
 */
export default class Belong {
  /**
   * 出身（所属）別 JSON data
   * @param {string} identity 出身
   * @param {{
   *  pitcher: Array<Object>,
   *  catcher: Array<Object>,
   *  infielder: Array<Object>,
   *  outfielder: Array<Object>,
   *  etc: Array<Object>
   * }} jsonData 出身（所属）別 JSON data
   */
  constructor(identity, jsonData = {}) {
    let data = jsonData;
    if (Type.nil(data) || !Type.exist(data)) {
      data = {};
    }
    const pitcher = new Players(identity, 'pitcher', data.pitcher);
    const catcher = new Players(identity, 'catcher', data.catcher);
    const infielder = new Players(identity, 'infielder', data.infielder);
    const outfielder = new Players(identity, 'outfielder', data.outfielder);
    const etc = new Players(identity, 'etc', data.etc);
    /**
     * pitcher
     * @type {Players}
     */
    this.pitcher = pitcher;
    /**
     * catcher
     * @type {Players}
     */
    this.catcher = catcher;
    /**
     * infielder
     * @type {Players}
     */
    this.infielder = infielder;
    /**
     * outfielder
     * @type {Players}
     */
    this.outfielder = outfielder;
    /**
     * etc
     * @type {Players}
     */
    this.etc = etc;
    /**
     * 全てのデータを1つにまとめます
     * @type {Array.<Player>}
     */
    this.all = pitcher.players.concat(
      catcher.players,
      infielder.players,
      outfielder.players,
      etc.players);
  }
}
