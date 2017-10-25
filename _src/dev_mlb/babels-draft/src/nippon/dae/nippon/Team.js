/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/17 - 20:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// // util
// import { default as Type } from '../../util/Type';

// data
import TeamInfo from './team/TeamInfo';
import Starter from './team/Starter';
import Score from './team/Score';
import Homers from './team/Homers';
import Battery from './team/Battery';
import Bench from './team/Bench';

/**
 * チーム情報
 * JSON.response.team[].{}
 */
export default class Team {
  /**
   * チーム情報
   * @param {Object} json JSON.response.team[].{}
   */
  constructor(json) {
    // let team = json;
    // let has = true;
    // if (Type.nil(team) || !Type.exist(team)) {
    //   team = {};
    //   has = false;
    // }
    const has = !!json;
    const origin = has ? json : {};
    /**
     * データ有無
     * @type {boolean}
     */
    this.has = has;
    /**
     * JSON.response.team[] 生データ
     * @type {object}
     */
    this.origin = origin;
    const teaminfo = new TeamInfo(origin.teaminfo);
    /**
     * チーム情報・基本情報
     * @type {TeamInfo}
     */
    this.teaminfo = teaminfo;
    /**
     * チーム情報・基本情報, alias teaminfo
     * @type {TeamInfo}
     */
    this.info = teaminfo;
    // @type {Starter}
    const starter = new Starter(origin.startingmember);
    /**
     * 先発メンバー, alias startingmember
     * @type {Starter}
     */
    this.starter = starter;
    /**
     * 先発メンバー
     * @type {Starter}
     */
    this.startingmember = starter;
    // bench warmer
    const warmer = new Bench(origin.benchmember);
    /**
     * 控え選手
     * @type {Bench}
     */
    this.benchmember = warmer;
    /**
     * alias benchmember, 控え選手
     * @type {Bench}
     */
    this.warmer = warmer;
    /**
     * alias benchmember, 控え選手
     * @type {Bench}
     */
    this.bench = warmer;
    /**
     * スコア情報
     * @type {Score}
     */
    this.score = new Score(origin.score);
    // homerun
    const homers = new Homers(origin.homerun);
    /**
     * 本塁打, alias homerun
     * @type {Homers}
     */
    this.homers = homers;
    /**
     * 本塁打
     * @type {Homers}
     */
    this.homerun = homers;
    // battery
    /**
     * バッテリー情報
     * @type {Battery}
     */
    this.battery = new Battery(origin.battery);
  }
  // ----------------------------------------
  // GETTER / SETTER
  // ----------------------------------------
  /**
   * ホームorビジター
   * @return {number} 0=ビジター、1=ホーム
   */
  get homevisitor() {
    return this.origin.homevisitor;
  }
  // ---
  /**
   * ホームorビジター
   * @return {boolean} true: ホーム
   */
  get home() {
    return this.homevisitor === 1;
  }
  /**
   * ホームorビジター
   * @return {boolean} true: ビジター
   */
  get visitor() {
    return this.homevisitor === 0;
  }
}
