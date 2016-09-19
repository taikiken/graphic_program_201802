/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/28 - 16:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// data
import {Safety} from '../../data/Safety';

// dae/theme
import {ThemeDae} from '../theme/ThemeDae';
import {AdDae} from '../theme/AdDae';
import {BannersDae} from '../banner/BannersDae';
import {BannerDae} from '../banner/BannerDae';

// dae/categories
import { PickupDae } from './PickupDae';
import { HeadlineDae } from './HeadlineDae';


/**
 * <p>特定のカテゴリー情報を取得する<br>
 * ※主に企画モノの記事一覧ページを生成するにあたり利用する</p>
 *
 * `/api/v1/category/[:category_slug]`
 */
export class CategoriesSlugDae {
  /**
   * `/api/v1/category/[:category_slug]`
   * <p>JSON.response を管理します</p>
   * @param {Object} response JSON.response
   */
  constructor( response:Object = {} ) {
    response = Safety.object( response );
    /**
     * response.theme
     * @type {ThemeDae}
     * @protected
     */
    this._theme = new ThemeDae( response.theme );
    // let banner = Safety.object( response.banner );
    // this._banner = {
    //   pc: new BannerDae( banner.pc ),
    //   sp: new BannerDae( banner.sp )
    // };
    /**
     * response.banner
     * @type {BannersDae}
     * @protected
     */
    this._banner = new BannersDae( response.banner );
    /**
     * response.ad
     * @type {AdDae}
     * @protected
     */
    this._ad = new AdDae( response.ad );
    /**
     * JSON.response
     * @type {Object}
     * @protected
     */
    this._response = response;

    /**
     * JSON.response.pickup
     * @since 2016-09-13
     * @type {PickupDae}
     * @protected
     */
    this._pickup = new PickupDae(response.pickup);
    /**
     * JSON.response.headline
     * @since 2016-09-17
     * @type {HeadlineDae}
     * @protected
     */
    this._headline = new HeadlineDae(response.headline);
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * JSON.response
   * @return {Object} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  // from SlugDae
  /**
   * category.id
   * @return {Number} category Id を返します
   */
  get id():Number {
    return this.response.id;
  }
  /**
   * category.label
   * @return {string} category label を返します
   */
  get label():string {
    return this.response.label;
  }
  /**
   * category.slug
   * @return {string} category slug を返します
   */
  get slug():string {
    return this.response.slug;
  }
  /**
   * category.url
   * @return {string} category url を返します
   */
  get url():string {
    return this.response.url;
  }
  /**
   * category.title_img
   * <pre>
   * そのカテゴリータイトルに付与する画像
   * ex. Facebook 話題の投稿の powered by。
   * - PC版のみ利用あり
   * </pre>
   * @return {string} category title_img を返します
   */
  get titleImage():string {
    return this.response.title_img;
  }
  /**
   * response.title_img
   * @return {string} response.title_img を返します
   */
  get title():string {
    return this.response.title;
  }
  /**
   * response.description
   * @return {string} response.description を返します
   */
  get description():string {
    return this.response.description;
  }
  /**
   * response.theme
   * @return {ThemeDae} response.theme を ThemeDae instance にし返します
   */
  get theme():ThemeDae {
    return this._theme;
  }
  /**
   * response.banner
   * @return {{pc: BannerDae, sp: BannerDae}} response.banner を object にし返します
   */
  get banner():BannerDae {
    return this._banner;
  }
  /**
   * response.ad
   * @return {AdDae} response.ad を AdDae instance にして返します
   */
  get ad():AdDae {
    return this._ad;
  }
  /**
   * response.is_show_filter
   * <pre>
   * iOS/Android/スマホ版の一覧で新着/人気順/動画のフィルタナビを表示するかしないかのフラグ
   * - true  : 表示する
   * - false : 表示しない
   * </pre>
   * @since 2016-06-06
   * @return {Boolean} iOS/Android/スマホ版の一覧で新着/人気順/動画のフィルタナビを表示するかしないかのフラグ（真偽値）を返します
   */
  get isShowFilter():Boolean {
    return this.response.is_show_filter;
  }
  // --------------------
  /**
   * 「記事カテゴリー情報」 response.pickup
   * <pre>
   * カテゴリー一覧のピックアップスライド
   * - 表示レイアウト・内容は一面のピックアップと同じ
   * - PC版はスライド
   * - スマホ/アプリは冒頭1件を固定表示(スライドしない)
   * </pre>
   *
   * ```
   * pickup {
   *  articles: []<Object>
   * }
   * ```
   * @since 2016-09-13
   * @return {PickupDae} response.pickup PickupDae instance にして返します
   */
  get pickup():PickupDae {
    return this._pickup;
  }
  /**
   * 「記事カテゴリー情報」response.headline
   * @since 2016-09-17
   * @return {HeadlineDae} response.headline を HeadlineDae instance にして返します
   */
  get headline():HeadlineDae {
    return this._headline;
  }
  /**
   * "title_img"のリンク先
   * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
   * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=848283478
   * @since 2016-09-17
   * @return {string} "title_img"のリンク先 を返します
   */
  get titleImgLink():string {
    return this.response.title_img_link;
  }
}
