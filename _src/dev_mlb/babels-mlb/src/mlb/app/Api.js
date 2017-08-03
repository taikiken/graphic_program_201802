/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/07/18 - 18:04
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import S3 from './S3';

/**
 * JSON パスを管理します
 */
export default class Api {
  // ---------------------------------------------------
  //  master
  // ---------------------------------------------------
  /**
   * ゲーム種類一覧 JSON パスを取得します
   * @returns {string} ゲーム種類一覧 JSON パスを返します
   */
  static type() {
    return `${S3.host()}/master/game_type.json?t=${Date.now()}`;
  }
  /**
   * チーム一覧 JSON パスを取得します
   * @returns {string} チーム一覧 JSON パスを返します
   */
  static teams() {
    return `${S3.host()}/master/team/list.json?t=${Date.now()}`;
  }
  // ---------------------------------------------------
  //  master/schedule
  // ---------------------------------------------------
  /**
   * 年別試合スケジュール JSON
   * @param {number} year YYYY 4桁年 - 該当年
   * @returns {string} 年別試合スケジュール JSON パスを返します
   */
  static calendar(year) {
    return `${S3.host()}/master/schedule/${year}.json?t=${Date.now()}`;
  }
  /**
   * 該当日付 試合スケジュール JSON
   * @param {number} year YYYY 4桁年 - 該当年
   * @param {number} month m 1 ~ 2桁月 - 該当月
   * @param {number} day d 1 ~ 2桁日 - 該当日
   * @returns {string} 該当日付 試合スケジュール JSON パスを返します
   */
  static schedule(year, month, day) {
    return `${S3.host()}/master/schedule/${year}/${month}/${day}.json?t=${Date.now()}`;
  }
  // ---------------------------------------------------
  //  games
  // ---------------------------------------------------
  /**
   * チーム情報json - 指定した試合のチームの選手情報を返却します
   * 選手の情報はスターティングメンバーの配列とリザーブメンバーの配列にそれぞれ分かれています。
   * 試合情報画面（試合中/後）で使用される想定です。
   * @param {number} year YYYY 4桁年 - 該当年
   * @param {number} id ゲーム ID
   * @returns {string} チーム情報json パスを返します
   */
  static team(year, id) {
    return `${S3.host()}/games/${year}/${id}/team_info.json?t=${Date.now()}`;
  }
  /**
   * 選手情報json
   * @param {number} year YYYY 4桁年 - 該当年
   * @param {number} id ゲーム ID
   * @returns {string} 選手情報json パスを返します
   */
  static member(year, id) {
    return `${S3.host()}/games/${year}/${id}/member_info.json?t=${Date.now()}`;
  }
  /**
   * 試合情報json
   * @param {number} year YYYY 4桁年 - 該当年
   * @param {number} id ゲーム ID
   * @returns {string} 試合情報json パスを返します
   */
  static game(year, id) {
    return `${S3.host()}/games/${year}/${id}/game_info.json?t=${Date.now()}`;
  }
  /**
   * イニング情報json
   * @param {number} year YYYY 4桁年 - 該当年
   * @param {number} id ゲーム ID
   * @returns {string} イニング情報json パスを返します
   */
  static innings(year, id) {
    return `${S3.host()}/games/${year}/${id}/innings.json?t=${Date.now()}`;
  }
}
