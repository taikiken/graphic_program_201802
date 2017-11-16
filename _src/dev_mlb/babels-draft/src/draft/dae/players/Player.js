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
 * b
 */

// // util
// import { default as Type } from '../../util/Type';

// moku/util
import Type from '../../../moku/util/Type';
import UrlsDae from './UrlsDae';

/**
 * JSON 選手データ
 */
export default class Player {
  /**
   * 選手データを保存します
   * @param {string} identity 出身
   * @param {string} position ポジション
   * @param {Object} playerData JSON 選手データ
   */
  constructor(identity, position, playerData = {}) {
    let player = playerData;
    if (Type.nil(player) || !Type.exist(player)) {
      player = {};
    }
    /**
     * サニタイズ済み JSON
     *  .[highschool/university/works/independent]
     *  .[pitcher/catcher/infielder/outfielder/etc]
     *  .[選手]
     * @type {{}}
     */
    this.player = player;
    /**
     * ポジション
     * @type {string}
     */
    this.position = position;
    /**
     * 出身
     * @type {string}
     */
    this.identity = identity;
    /**
     * BGの選手紹介記事ページURL（複数の場合アリ）、ない場合は空配列
     * @type {UrlsDae}
     * @since 2017-10-13
     */
    this.urls = new UrlsDae(player.urls, player.id, player.name);
  }
  /**
   * 管理ID
   * @return {string} 管理ID
   */
  get id() {
    return this.player.id;
  }
  /**
   * 選手名
   * @return {string} 選手名
   */
  get name() {
    return this.player.name;
  }
  /**
   * 選手画像
   * @return {string} 選手画像
   */
  get img() {
    return this.player.img;
  }
  /**
   * 選手画像
   * @return {string} 選手画像
   */
  get thumbnail() {
    return this.player.thumbnail;
  }
  /**
   * 所属チーム
   * @return {string} 所属チーム
   */
  get team() {
    return this.player.team;
  }
  /**
   * 経歴, 過去に在籍したチームすべてー区切り
   * @returns {string} 経歴 を返します
   */
  get profile() {
    return this.player.profile;
  }
  /**
   * 都道府県
   * @returns {string} 都道府県 を返します
   */
  get pref() {
    return this.player.pref;
  }
  /**
   * 身長
   * @returns {string} 身長 を返します
   */
  get height() {
    return this.player.height;
  }
  /**
   * 体重
   * @returns {string} 体重 を返します
   */
  get weight() {
    return this.player.weight;
  }
  /**
   * 投打
   * @returns {string} 都道府県 を返します
   */
  get pitchingAndBatting() {
    return this.player.pitchingAndBatting;
  }
  /**
   * コメント
   * @returns {string} コメント を返します
   */
  get comment() {
    return this.player.comment;
  }
  /**
   * 年齢
   * @return {string} 年齢 を返します
   */
  get age() {
    return this.player.age;
  }
  // /**
  //  * 経歴
  //  * @return {string} 経歴 を返します
  //  */
  // get career() {
  //   return this.player.career;
  // }
}
