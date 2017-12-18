/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/18 - 15:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
 * `response.information`.[pc|sp|ios|android] データの正規化を行います
 * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-150
 * @since 2017-12-18
 */
export class InformationNormalize {
  /**
   * インフォメーションの種類
   * - notice  : お知らせ
   * - warning : 警告系
   * - img     : 画像
   ※ img の場合は、img + link の要素を表示する(imgは中央よせ)
   * @param {string} [type=notice] インフォメーションの種類
   * @returns {string} notice|warning|img いずれかを返します
   */
  static type(type = 'notice') {
    switch (type) {
      case 'notice' :
      case 'warning':
      case 'img': {
        return type;
      }
      default : {
        return 'notice';
      }
    }
  }

  /**
   * 文字色 16進数を保証します
   * @param {string} color hex color string
   * @param {string} [type=notice] インフォメーションの種類
   * @returns {string} hex type: img 以外 hex color を保証します
   */
  static textColor(color, type = 'notice') {
    if (type === 'img') {
      return color;
    }
    const firstWord = color.substr(0, 1);
    if (firstWord === '#') {
      return color;
    }
    return '#333333';
  }

  /**
   * 背景色 16進数を保証します
   * @param {string} color hex color string
   * @param {string} [type=notice] インフォメーションの種類
   * @returns {string} hex type: img 以外 hex color を保証します
   */
  static bgColor(color, type = 'notice') {
    if (type === 'img') {
      return color;
    }
    const firstWord = color.substr(0, 1);
    if (firstWord === '#') {
      return color;
    }
    if (type === 'warning') {
      return '#ffcccc';
    }
    // notice
    return '#ffffff';
  }
}

/**
 * ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
 *
 * `response.information`.[pc|sp|ios|android] 個別データを管理します
 * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-150
 * @since 2017-12-18
 */
export class InformationDataDae {
  /**
   * `response.information`.[pc|sp|ios|android] 個別データを保存します
   * @param {*} information `response.information`.[pc|sp|ios|android] 個別データ
   */
  constructor(information = {}) {
    /**
     * `response.information`.[pc|sp|ios|android] 個別データ original
     * @type {*}
     */
    this.origin = information;
    // @type {string}
    const type = InformationNormalize.type(information.type);
    /**
     * response.information.[pc|sp|ios|android].type
     * インフォメーションの種類
     * - notice  : お知らせ
     * - warning : 警告系
     * - img     : 画像
     ※ img の場合は、img + link の要素を表示する(imgは中央よせ)
     * @type {string}
     */
    this.type = type;
    /**
     * responce.information.text - お知らせ
     * @type {string}
     */
    this.text = information.text || '';
    /**
     * テキストの色 ( #あり16進数 )
     * - notice / warning ともに `#333333`
     * @type {string}
     */
    this.textColor = InformationNormalize.textColor(information.text_color, type);
    /**
     * 背景色 ( #あり16進数 )
     * - notice : #ffffff
     * - warning : #ffcccc
     * @type {string}
     */
    this.backgorundColor = InformationNormalize.bgColor(information.background_color, type);
    /**
     * テキスト横に付与するアイコン
     * アイコンなしの場合もあり
     * @type {string}
     */
    this.icon = information.icon || '';
    /**
     * type:img の場合の表示画像
     * レンダリング時は w:100% / height: auto で配置
     * @type {string}
     */
    this.img = information.img || '';
    /**
     * お知らせのリンク先
     * ない場合もあり
     * @type {string}
     */
    this.link = information.link || '';
  }
}

/**
 * ref: UNDO_SPBL-150 【課題管理】一面リニューアル / ユーザーへのお知らせ表示
 * - カテゴリー情報
 * - 記事詳細
 * ```
 * "information": {
 *      "pc": {
 *        "type": "notice",
 *        "text": "全体おしらせ",
 *        "text_color": "#333333",
 *        "background_color": "#ffffff",
 *        "icon": "https://dev.sportsbull.jp/information/icon/3x/information__icon__notice.png",
 *        "img": "",
 *        "link": "https://dev.sportsbull.jp?platform=pc"
 *      },
 *      "sp": {},
 *      "ios": {},
 *      "android": {},
 * }
 * ```
 * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-150
 * @since 2017-12-18
 */
export default class InformationDae {
  /**
   * 記事詳細・カテゴリー情報 - `information`
   * @param {*} information JSON `response.information`
   */
  constructor(information = {}) {
    /**
     * JSON `response.information` original
     * @type {*}
     */
    this.origin = information;
    /**
     * `response.information.pc`
     * @type {InformationDataDae}
     */
    this.pc = new InformationDataDae(information.pc);
    /**
     * `response.information.sp`
     * @type {InformationDataDae}
     */
    this.sp = new InformationDataDae(information.sp);
    /**
     * `response.information.ios`
     * @type {InformationDataDae}
     */
    this.ios = new InformationDataDae(information.ios);
    /**
     * `response.information.android`
     * @type {InformationDataDae}
     */
    this.android = new InformationDataDae(information.android);
  }
}
