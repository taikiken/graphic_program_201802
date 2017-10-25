/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/06 - 13:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 実行モードを表します, Env.PRODUCTION / Env.DEVELOPMENT / Env.LOCAL_DEV
 * @private
 * @static
 * @type {string}
 * @default production(Env.PRODUCTION)
 */
let mode = 'production';
/**
 * サーバーが local かを表します, Env.ONLINE / Env.LOCAL
 * @private
 * @static
 * @type {string}
 * @default online(Env.ONLINE)
 */
let server = 'online';

/**
 * 閲覧に使用されている端末がスマホかを表します
 * @private
 * @static
 * @type {boolean}
 * @default false
 */
let sp = false;

/**
 * iOS flag
 * @private
 * @static
 * @type {boolean}
 * @default  false
 * @since 2016-10-31
 */
let ios = false;
/**
 * Android flag
 * @private
 * @static
 * @type {boolean}
 * @default  false
 * @since 2016-10-31
 */
let android = false;

/**
 * 速報 JSON 取得間隔秒
 * @private
 * @static
 * @type {number}
 * @default 5
 */
let flashInterval = 60;

// /**
//  * 日本シリーズ JSON 取得間隔秒
//  * @private
//  * @static
//  * @type {number}
//  * @default 30
//  */
// let nipponInterval = 60;
//
// /**
//  * 日本シリーズ JSON ID
//  * @private
//  * @static
//  * @type {string}
//  * @default 2016101602
//  */
// let nipponId = '2016101602';

/**
 * 環境設定を管理します
 *
 * モード
 * - 実行モード
 * - 開発モード
 *
 * サーバー
 * - オンライン
 * - ローカル
 */
export default class Env {
  /**
   * output flag
   * @default false
   * @type {boolean}
   */
  static noRecords = false;
  // ---------------------------------------------------
  //  STATIC CONST
  // ---------------------------------------------------
  /**
   * 環境: 実行モード
   * @const PRODUCTION
   * @return {string} production を返します
   */
  static get PRODUCTION() {
    return 'production';
  }
  /**
   * 環境: 開発モード, Ajax 接続先をオンラインサーバーにする
   * @const DEVELOPMENT
   * @return {string} development を返します
   */
  static get DEVELOPMENT() {
    return 'development';
  }
  /**
   * 環境: ロカール開発モード, Ajax 接続先をローカルサーバーにする
   * @const DEVELOPMENT
   * @return {string} development を返します
   */
  static get LOCAL_DEV() {
    return 'localDev';
  }
  // ---
  /**
   * サーバー: オンライン
   * @const ONLINE
   * @return {string} online を返します
   */
  static get ONLINE() {
    return 'online';
  }
  /**
   * サーバー: ローカル
   * @const ONLINE
   * @return {string} local を返します
   */
  static get LOCAL() {
    return 'local';
  }
  // ---------------------------------------------------
  //  STATIC GETTER / SETTER
  // ---------------------------------------------------
  // ---[mode]
  /**
   * 現在のモードを取得します
   * @return {string} 現在のモードを返します Env.PRODUCTION / Env.DEVELOPMENT / Env.LOCAL_DEV
   */
  static get mode() {
    return mode;
  }
  /**
   * モードを設定します
   * @param {string} kind 設定モード
   */
  static set mode(kind) {
    mode = kind;
  }
  // ---[server]
  /**
   * 起動サーバー状態を取得します
   * @return {string} 起動サーバー状態を返します Env.ONLINE / Env.LOCAL
   */
  static get server() {
    return server;
  }

  // ---[sp]
  /**
   * スマホかを取得します
   * @return {boolean} スマホの時は true が返ります
   */
  static get sp() {
    return sp;
  }
  /**
   * スマホかを設定します
   * @param {boolean} type スマホかの真偽値
   */
  static set sp(type) {
    sp = type;
  }
  // ---[ios / android]
  /**
   * iOS flag を取得します
   * @return {boolean} true: iOS
   * @since 2016-10-31
   */
  static get ios() {
    return ios;
  }
  /**
   * iOS flag を設定します
   * @param {boolean} type iOS flag
   * @since 2016-10-31
   */
  static set ios(type) {
    ios = type;
  }
  /**
   * android flag を取得します
   * @return {boolean} true: android
   * @since 2016-10-31
   */
  static get android() {
    return android;
  }
  /**
   * android flag を設定します
   * @param {boolean} type android flag
   * @since 2016-10-31
   */
  static set android(type) {
    android = type;
  }
  // ---[flashInterval]
  /**
   * ドラフト速報 JSON 取得間隔(second)
   * @return {number} ドラフト速報 JSON 取得間隔(second)
   */
  static get flashInterval() {
    return flashInterval;
  }
  /**
   * ドラフト速報 JSON 取得間隔(second) を設定します
   * @param {number} interval ドラフト速報 JSON 取得間隔(second)
   */
  static set flashInterval(interval) {
    flashInterval = interval;
  }
  // // ---------------------------------------------------
  // //  STATIC METHOD
  // // ---[nipponInterval]
  // /**
  //  * 日本シリーズ JSON 取得間隔秒
  //  * @return {number} 日本シリーズ JSON 取得間隔秒
  //  */
  // static get nipponInterval() {
  //   return nipponInterval;
  // }
  // /**
  //  * 日本シリーズ JSON 取得間隔秒 を設定します
  //  * @param {number} interval 日本シリーズ JSON 取得間隔秒
  //  */
  // static set nipponInterval(interval) {
  //   nipponInterval = interval;
  // }
  // // ---[nipponId]
  // /**
  //  * 日本シリーズ ID
  //  * @return {string} 日本シリーズ JSON ID
  //  */
  // static get nipponId() {
  //   return nipponId;
  // }
  // /**
  //  * 日本シリーズ JSON ID を設定します
  //  * @param {string} id 日本シリーズ JSON ID
  //  */
  // static set nipponId(id) {
  //   nipponId = id;
  // }
  // ---------------------------------------------------
  /**
   * モードを開発モードにします
   * @return {string} 設定したモードを返します
   */
  static dev() {
    mode = Env.DEVELOPMENT;
    return mode;
  }
  /**
   * モードを実行モードにします
   * @return {string} 設定したモードを返します
   */
  static production() {
    mode = Env.PRODUCTION;
    return mode;
  }
  /**
   * サーバーをローカルにします
   * @return {string} 設定したサーバーを返します
   */
  static local() {
    server = Env.LOCAL;
    return server;
  }
  /**
   * サーバーをオンラインにします
   * @return {string} 設定したサーバーを返します
   */
  static online() {
    server = Env.ONLINE;
    return server;
  }
  /**
   * process.env.NODE_ENV
   * @returns {string} production | development
   */
  static node() {
    return '@@nodeEnv';
  }
  /**
   * NODE_ENV=production かどうかを取得します
   * @return {boolean} true: NODE_ENV=production
   */
  static pro() {
    return Env.node() === 'production';
  }
}

