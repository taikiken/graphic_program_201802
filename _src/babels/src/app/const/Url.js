/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/11 - 13:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


const Browser = self.Sagen.Browser;

/**
 * request host(protocol + host)
 * - 実行ファイルから全ての処理に先んじて設定します
 * @private
 * @type {string}
 * @since 2018-04-19 - vk header
 */
let host = '';

/**
 * Page 遷移 URL
 * - 全て static です
 * - a tag href へハードコードされる URL 定義
 * - [参照](https://docs.google.com/spreadsheets/d/1raMO0x5aeG-bk45PK528ib9HUU-Q4DbHq56oxDQ1h7c/)
 * */
export class Url {
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * category slug を置き換えるための定義定数
   * @return {string} category/slug 置き換え文字定数
   */
  static get CATEGORY_SLUG() {
    return '__SLUG__';
  }
  /**
   * category slug を使用した url を置き換えるための定義定数
   * @return {string} category url base
   */
  static get CATEGORY() {
    return `/category/${Url.CATEGORY_SLUG}/`;
  }
  // ---------------------------------------------------
  /**
   * request host(protocol + host) 取得します
   * @returns {string} protocol + host
   * @since 2018-04-19 - vk header
   */
  static get host() {
    return host;
  }
  /**
   * request host(protocol + host) を設定します
   * - 実行ファイルから全ての処理に先んじて設定します
   * @param {string} hostname request host(protocol + host)
   * @since 2018-04-19 - vk header
   */
  static set host(hostname) {
    host = hostname;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * URL index
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {string} index url を返します
   */
  static index(vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    return `${Url.host}/`;
  }
  /**
   * category url
   * @param {string} [slug=all] category slug
   * @return {string} category url を返します
   */
  static category(slug = 'all') {
    return Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug);
  }
  /**
   * category ranking url
   * @param {string} [slug=all] category slug
   * @return {string} category ranking url を返します
   */
  static ranking(slug = 'all') {
    return `${Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug)}ranking/`;
  }
  /**
   * category video url
   * @param {string} [slug=all] category slug
   * @return {string} category video url を返します
   */
  static video(slug = 'all') {
    return `${Url.CATEGORY.replace(Url.CATEGORY_SLUG, slug)}video/`;
  }
  /**
   * 検索ページ url
   * @param {string} keyword 検索ワード
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {*|string} 検索ページ url を返します
   */
  static search(keyword, vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    return `${Url.host}/search/${keyword}`;
    // return `/search/${keyword}`;
  }
  /**
   * signup url
   * @param {string} [path=''] path option
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {string} signup url を返します
   */
  static signup(path = '', vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    const base = `${Url.host}/signup/`;
    switch ( path ) {
      case 'account':
        return `${base}account`;

      case 'interest':
        return `${base}interest`;

      case '':
        return base;

      default:
        // console.warn( `signup illegal value: ${path}, instead use default` );
        return base;
    }
  }
  /**
   * step Number から hash を取得します
   * @param {number} step wizard step Number, 現在位置
   * @return {string} location hash にセットする文字列を返します
   */
  static signupHash(step:Number = 1) {
    switch (step) {

      case 2:
        return 'account';

      case 3:
        return 'interest';

      case 1:
        return '';

      default:
        // console.warn( `signup illegal value: ${step}, instead use default` );
        return '';
    }
  }

  /**
   * location.hash から signup step Number を取得します
   * @param {string} [hash=''] location.hash #付き
   * @return {number} step Number
   */
  static signupStepByHash(hash = '') {
    switch (hash) {

      case '#account':
        return 2;

      case '#interest':
        return 3;

      case '#':
      case '':
        return 1;

      default:
        // console.warn( `signup illegal value: ${hash}, instead use default` );
        return 1;
    }
  }
  /**
   * login url
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {string} login url を返します
   */
  static login(vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    return `${Url.host}/login/`;
  }

  /**
   * logout url
   * @return {string} logout url を返します
   */
  static logout() {
    return '/logout/';
  }
  /**
   * SP 専用
   * - @see https://github.com/undotsushin/undotsushin/commit/6a99fb16401dd80f5ac1a5c9174b9b93a13408af
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {string} signup_login url を返します
   */
  static signupLogin(vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    return `${Url.host}/signup_login/`;
  }
  /**
   * reset_password url
   * @param {string} [path=''] path option
   * @return {*} reset_password url を返します
   */
  static password(path = '') {
    const base = '/reset_password/';

    switch (path) {
      case 'resetting':
        return `${base}resetting`;

      case '':
        return base;

      default:
        // console.warn( `password illegal value: ${path}, instead use default` );
        return base;
    }
  }
  /**
   * mypage url
   * @param {string} [path=''] path option
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {*} mypage url を返します
   */
  static mypage(path = '', vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    const base = `${Url.host}/mypage/`;

    switch (path) {
      case 'activities':
        return `${base}activities`;

      case '':
        return base;

      default:
        // console.warn( `mypage illegal value: ${path}, instead use default` );
        return base;
    }
  }
  /**
   * notifications url
   * @return {string} notifications url を返します
   */
  static notifications() {
    return '/notifications/';
  }
  /**
   * settings url
   * @param {string} [path=''] path option
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {*} settings url を返します
   */
  static settings(path = '', vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    const base = `${Url.host}/settings/`;
    // const base = '/settings/';

    switch (path) {
      case 'interest':
        return `${base}interest`;

      case 'social':
        return `${base}social`;

      case 'deactivate':
        return `${base}deactivate`;

      case '':
        return base;

      default:
        // console.warn( `settings illegal value: ${path}, instead use default` );
        return base;
    }
  }
  /**
   * about url
   * @param {string} [path=''] path option
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {*} about url を返します
   */
  static about(path = '', vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    const base = `${Url.host}/about/`;
    switch (path) {
      case 'company':
        return `${base}company`;

      case 'privacy':
        return `${base}privacy`;

      case 'terms':
        return `${base}terms`;

      case 'faq':
        return `${base}faq`;

      case 'ads':
        return `${base}ads`;

      case 'contact':
        return `${base}contact`;

      case '':
        return base;

      default:
        // console.warn( `settings illegal value: ${path}, instead use default` );
        return base;
    }
  }
  /**
   * アプリダウンロード URL を取得します
   * ```
   *   ダウンロード先URLは
   *   iOS : https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8
   *   Android : https://play.google.com/store/apps/details?id=com.undotsushin
   * ```
   * @see https://github.com/undotsushin/undotsushin/issues/1009
   * @return {?string} app banner URL
   */
  static appBanner() {
    if (Browser.iOS.is()) {
      return 'https://itunes.apple.com/jp/app/undotsushin/id1086719653?l=ja&ls=1&mt=8';
    } else if (Browser.Android.is()) {
      return 'https://play.google.com/store/apps/details?id=com.undotsushin';
    }
    return null;
  }
  /**
   * ref: #1023 Syn.extension, SP「関連記事」script tag
   * - React に script を埋め込むのが困難なため外部スクリプト化しインサートします
   * @return {string} Syn.extension JS path を返します
   * @since 2016-09-28
   */
  static synExtension() {
    return '/assets/js/syn.extension-recommend_articles.js';
  }
  /**
   * ref: #1023 Syn.extension, SP「関連記事」script tag
   * - `script` tag 下 `so_dmp.js` ロードパス
   * @return {string} script` tag 下 `so_dmp.js` パスを返します
   * @since 2016-09-28
   */
  static soDmp() {
    return '//i.socdm.com/s/so_dmp.js?service_id=un_sports';
  }
  /**
   * desktop/p.php line.288 ~ 299, JS で出力のために外部JS file へ
   * - React に script を埋め込むのが困難なため外部スクリプト化しインサートします
   * @param {boolean} [vk=false] VK（バーチャル甲子園）flag - since 2018-04-19
   * @return {string} `/assets/js/pc_popin-recommend.js` を返します
   * @since 2016-09-30
   */
  static popin(vk = false) {
    // vk - 絶対パスを返す
    if (!vk) {
      Url.host = '';
    }
    return `${Url.host}/assets/js/pc_popin-recommend.js`;
    // return '/assets/js/pc_popin-recommend.js';
  }
}
