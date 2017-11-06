/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/14 - 16:45
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
// import { default as Nominate } from './Nominate';

// app
import Text from '../../../draft/app/draft/Text';

// dae
import UrlsDae from '../../../draft/dae/players/UrlsDae';

/**
 * 選手情報<br>
 * JSON.response.team.draft.[roaster|development].player
 *
 * JSON選手情報データへ、別項目になっている指名球団情報と指名情報を追加します
 */
export default class Player {
  /**
   * 選手情報
   * @param {Object} json JSON.response.team.draft.[roaster|development].player
   * @param {Info} info 選手に指名球団情報を付与します
   * @param {Nominate} nominate 選手に指名情報を付与します
   */
  constructor(json, info, nominate) {
    const origin = json || {};
    // if (Type.nil(player) || !Type.exist(player)) {
    //   player = {};
    // }
    /**
     * 選手情報, JSON 生データ
     * @type {Object}
     */
    this.origin = origin;
    /**
     * 指名情報
     * @type {Nominate}
     */
    this.nominate = nominate;
    /**
     * 指名球団情報
     * @type {Info}
     */
    this.info = info;
    /**
     * 選手記事リンク
     * @type {UrlsDae}
     * @since 2017-10-13
     */
    this.urls = new UrlsDae(origin.urls, origin.id, origin.name);
  }
  /**
   * 選手ID
   * @return {string} 選手ID
   */
  get id() {
    return this.origin.id;
  }
  /**
   * 選手名, 苗字名前
   * @return {string} 選手名
   */
  get name() {
    return this.origin.name;
  }
  /**
   * 選手画像, URL or ""
   * @return {string} 選手画像
   */
  get img() {
    return this.origin.img;
  }
  /**
   * 選手画像, URL or ""
   * @return {string} 選手画像
   */
  get thumbnail() {
    return this.origin.thumbnail;
  }
  /**
   * ポジション, （投手|捕手|内野手|外野手）
   * @return {string} player.position
   */
  get position() {
    return this.origin.position;
  }
  /**
   * position, CSS class friendly
   * @return {string} position, CSS class friendly
   */
  get positionSlug() {
    return Text.position(this.position);
  }
  /**
   * 年齢, [0-9]歳 or ""
   * @return {string} 年齢 を返します
   */
  get age() {
    return this.origin.age;
  }
  /**
   * 身長, [0-9]cm or ""
   * @returns {string} 身長 を返します
   */
  get height() {
    return this.origin.height;
  }
  /**
   * 体重, [0-9]kg or ""
   * @returns {string} 体重 を返します
   */
  get weight() {
    return this.origin.weight;
  }
  /**
   * 投打, (右|左|両)投げ(右|左|両)打ち
   * @returns {string} 都道府県 を返します
   */
  get pitchingAndBatting() {
    return this.origin.pitchingAndBatting;
  }
  /**
   * 所属チーム, 最終出身校、最終在籍チームのみ
   * @return {string} 所属チーム
   */
  get team() {
    return this.origin.team;
  }
  /**
   * 出身区分, （高校生|大学生|社会人|独立リーグ）
   * @return {string} player.teamDivision
   */
  get teamDivision() {
    return this.origin.teamDivision;
  }
  /**
   * CSS class friendly identity
   * @return {string} CSS class friendly identity
   */
  get divisionSlug() {
    return Text.division(this.teamDivision);
  }
  /**
   * alias `divisionSlug`<br>
   * CSS class friendly identity
   * @return {string} CSS class friendly identity
   */
  get identity() {
    return this.divisionSlug;
  }
  /**
   * 経歴, 過去に在籍したチームすべてー区切り
   * @returns {string} 経歴 を返します
   */
  get profile() {
    return this.origin.profile;
  }
  /**
   * コメント, 日本語70文字前後
   * @returns {string} コメント を返します
   */
  get comment() {
    return this.origin.comment;
  }
}
