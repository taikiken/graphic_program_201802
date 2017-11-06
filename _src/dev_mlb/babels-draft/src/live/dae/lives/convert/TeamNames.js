/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/15 - 10:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// /**
//  * Info を配列管理する Symbol
//  * @type {Symbol}
//  * @private
//  */
// const infosSymbol = Symbol('info array Symbol');
// /**
//  * チーム名を配列管理する Symbol
//  * @type {Symbol}
//  * @private
//  */
// const namesSymbol = Symbol('names array Symbol');
// /**
//  * チームIDを配列管理する Symbol
//  * @type {Symbol}
//  * @private
//  */
// const idsSymbol = Symbol('ids array Symbol');
//
// /**
//  * team ID をキーに保存した Object を管理する Symbol
//  * @type {Symbol}
//  * @private
//  */
// const bySymbol = Symbol('team ID by Info');

/**
 * 12球団のチーム情報を管理します<br>
 * 並び順は1巡目の指名順です
 */
export default class TeamNames {
  /**
   * プロパティの配列初期化を行います
   */
  constructor() {
    // // @type {Array<Info>} - Info instance 配列
    // this[infosSymbol] = [];
    // // @type {Array<string>} - チーム名 配列
    // this[namesSymbol] = [];
    // // @type {Array<number>} - チームID 配列
    // this[idsSymbol] = [];
    // // @type {Object} - {{id(number): Info}}
    // this[bySymbol] = {};
    /**
     * Info instance 配列
     * @type {Array.<Info>}
     */
    this.informations = [];
    /**
     * チーム名 配列
     * @type {Array.<string>}
     */
    this.names = [];
    /**
     * チームID 配列
     * @type {Array.<number>}
     */
    this.ids = [];
    /**
     * チーム情報(Info)を team ID をキーに保存した Object
     * @type {{}}
     */
    this.byId = {};
  }
  // /**
  //  * Info instance 配列
  //  * @readonly
  //  * @return {Array<Info>} Info instance 配列
  //  */
  // get informations() {
  //   return this[infosSymbol];
  // }
  // /**
  //  * チーム名 配列
  //  * @readonly
  //  * @return {Array<string>} チーム名 配列
  //  */
  // get names() {
  //   return this[namesSymbol];
  // }
  // /**
  //  * チームID 配列
  //  * @readonly
  //  * @return {Array<number>} チームID 配列
  //  */
  // get ids() {
  //   return this[idsSymbol];
  // }
  // /**
  //  * チーム情報(Info)を team ID をキーに保存した Object
  //  * @readonly
  //  * @return {Object} チーム情報(Info)を team ID をキーに保存した Object
  //  */
  // get byId() {
  //   return this[bySymbol];
  // }
  /**
   * チーム情報を取得し, 名称・ID それぞれをオーダー順に配列にします
   * @param {Info} info Info instance
   */
  add(info) {
    this.informations.push(info);
    this.names.push(info.teamName);
    this.ids.push(info.teamId);
    this.byId[info.teamId] = info;
  }
  /**
   * チームIDを元にチーム情報を取得します
   * @param {number} id team ID
   * @return {Info} Info instance
   */
  id(id) {
    return this.byId[id];
  }
}
