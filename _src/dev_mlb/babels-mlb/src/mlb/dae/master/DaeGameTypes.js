/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 15:42
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
 * ゲーム種類情報を管理します
 * ```
 * {
 *  "id": 3,
 *  "name": "World Series"
 * }
 * ```
 */
class DaeTypes {
  /**
   * ゲーム種類情報
   * @param {{id: number, name: string}} info ゲーム情報
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * ゲーム種別 ID
     * @type {number}
     */
    this.id = Normalize.int(origin.id);
    /**
     * ゲーム種類名称
     * @type {string}
     */
    this.type = Normalize.str(origin.name);
    this.key = Normalize.str(origin.key_name);
  }
}

/**
 * ゲーム種類マスタ - game_type.json
 */
export default class DaeGameTypes {
  /**
   * ゲーム種類マスタ
   * @param {object} info JSON
   */
  constructor(info) {
    const origin = Normalize.obj(info);
    const list = Object.values(origin).map(kind => new DaeTypes(kind));
    const types = {};
    list.map((type) => {
      types[type.id] = type.type;
      return type;
    });
    /**
     * original JSON
     * @type {Object}
     */
    this.origin = origin;
    /**
     * id を key にしたゲーム種類 object
     * @type {object}
     */
    this.types = types;
    /**
     * DaeTypes list - ゲーム種類
     * @type {Array.<DaeTypes>}
     */
    this.list = list;
  }
  // TODO: filter 可能なように他のJSONとの名窯変換機能
}
