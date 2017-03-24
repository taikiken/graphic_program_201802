/*!
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/02/24 - 18:24
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 * @@buildTime
 *
 */
'use strict';

/**
 * URL query をパースします
 */
class Queries {
  /**
   * URL query を受取パースします
   * @param {string} [queryString=location.search] パースする URL 文字列
   */
  constructor(queryString = window.location.search) {
    const [data, keys] = Queries.parse(queryString);
    const naked = Queries.naked(queryString);
    /**
     * query key を取得します
     * @returns {Array<string>} query key array
     */
    this.keys = () => keys;
    /**
     * key: value 形式を取得します
     * @returns {Object} URL query を key: value 形式で返します
     */
    this.data = () => data;
    /**
     * query 文字列を取得します
     * @returns {string} パースする query 文字列
     */
    this.queryString = () => queryString;
    /**
     * パースしやすいように正規化した query 文字列
     * @returns {string} `?` 以降文字 + `&amp;` を `&` へ置換えます
     */
    this.naked = () => naked;
  }
  // ----------------------------------------
  // METHOD
  // ----------------------------------------
  /**
   * key が存在するかを調べます
   * @param {string} keyName 調査対象 key 名称
   * @returns {boolean} true: 存在する
   */
  has(keyName) {
    return this.keys().indexOf(keyName) !== -1;
  }
  /**
   * key 値を取得します
   * @param {string} keyName 調査対象 key 名称
   * @returns {string|undefined} 見つかると文字列で返します, 見つからない時は undefined を返します
   */
  get(keyName) {
    return this.data()[keyName];
  }
  /**
   * key: value 形式を取得します
   * @returns {Object} URL query を key: value 形式で返します
   */
  getAll() {
    return this.data();
  }
  // ----------------------------------------
  // STATIC METHOD
  // ----------------------------------------
  /**
   * `&amp;` を `&` へ置換えます
   * @param {string} targetText 操作対象文字列
   * @returns {string} `&amp;` を `&` へ置換え返します
   */
  static amp(targetText) {
    return targetText.split('&amp;').join('&');
  }

  /**
   * 文字列先頭に `?` があればそれ以降の文字列を返し `Query.amp` を実行します
   * @param {string} targetText 操作対象文字列
   * @returns {string} query を正規化します
   */
  static naked(targetText) {
    const queryString = Queries.amp(targetText);
    return queryString.substr(0, 1) === '?' ? queryString.substring(1) : targetText;
  }
  /**
   * query を kye: value 形式にします
   * @param {string} targetText 操作対象文字列
   * @returns {[Object, Array]} data, keys を返します
   */
  static parse(targetText) {
    const query = Queries.naked(targetText);
    const pairs = query.split('&');
    const data = {};
    const keys = [];
    pairs.map((pair) => {
      let keyName = '';
      if (pair && pair.indexOf('=') !== -1) {
        const keyValue = pair.split('=');
        const key = keyValue.shift();
        data[key] = keyValue.shift();
        keyName = key;
        keys.push(key);
      }
      return keyName;
    });

    return [data, keys];
  }
  /**
   * 引数 targetText (query) から引数 keyName 値を取得します
   * @param {string} keyName key 名称
   * @param {string} targetText query
   * @returns {string|undefined} 見つかると文字列で返します, 見つからない時は undefined を返します
   */
  static get(keyName, targetText = window.location.search) {
    const [data] = Queries.parse(targetText);
    return data[keyName];
  }
  /**
   * URL query の key: value 形式を取得します
   * @param {string} targetText query
   * @returns {[Object, Array]} URL query を key: value 形式で返します
   */
  static getAll(targetText = window.location.search) {
    // const [data] = Queries.parse(targetText);
    return Queries.parse(targetText);
  }
}

/**
 * アプリバナーを端末OSに合わせ表示します
 */
class Banners {
  /**
   * バナーを端末OSに合わせ表示します
   * @param {string} id urk query.utm_medium value
   * @param {Element} root バナー親コンテナ
   * @param {Element} ios バナー iOS コンテナ
   * @param {Element} android バナー Android コンテナ
   */
  constructor(id, root, ios, android) {
    /**
     * バナー親コンテナ
     * @type {Element}
     */
    this.root = root;
    let banner = '';
    if (id === 'iOS') {
      banner = ios;
    } else if (id === 'Android') {
      banner = android;
    }
    /**
     * query.utm_medium value によって iOS / Android バナーコンテナをセットします
     * `iOS`, `Android` 以外の時は非表示にします
     * @type {string}
     */
    this.banner = banner;
  }
  /**
   * 親コンテナ、バナーコンテナが存在すれば表示します
   */
  show() {
    const root = this.root;
    const banner = this.banner;
    if (root && banner) {
      banner.style.cssText = '';
    }
  }
}

// // Element
// let container;
// let iosBanner;
// let androidBanner;
//
// const getElements = () => {
//   container = document.getElementById('js-banner__upper');
//   if (!container) {
//     return false;
//   }
//   // ios
//   iosBanner = document.getElementById('js-banner__upper__link-for-iOS');
//   if (!iosBanner) {
//     return false;
//   }
//   // androids
//   androidBanner = document.getElementById('js-banner__upper__link-for-Android');
//   if (!androidBanner) {
//     return false;
//   }
//   return true;
// };

/**
 * - iOSでアクセスした時、URLは
 * https://sportsbull.jp/picks/au?utm_source=au&utm_campaign=portal&utm_medium=iOS&utm_content=BULLSPICKS
 * - Androidでアクセスした時、URLは
 * https://sportsbull.jp/picks/au?utm_source=au&utm_campaign=portal&utm_medium=Android&utm_content=BULLSPICKS
 * @returns {string} utm_medium value, iOS|Android|
 */
const parseQuery = () => {
  const queries = Queries.getAll();
  if (!Array.isArray(queries) || queries.length < 2) {
    return '';
  }
  const correct = [
    'utm_campaign',
    'utm_content',
    'utm_medium',
    'utm_source',
  ];
  const obj = queries[0] || {};
  const fail = correct.some(key => !obj[key]);
  if (fail) {
    return '';
  }
  return obj.utm_medium;
};

// /**
//  * banner を表示します
//  * @param {string} id utm_medium value
//  */
// const showBanner = (id) => {
//   if (id === 'iOS') {
//     iosBanner.style.cssText = '';
//   } else if (id === 'Android') {
//     androidBanner.style.cssText = '';
//   }
// };
//
// // execute
// // 1. element check
// // 2. query check
// if (getElements()) {
//   // element 存在
//   const result = parseQuery();
//   // query parse result
//   if (result) {
//     // utm_medium が存在
//     showBanner(result);
//   }
// }

/**
 * バナーコンテナを取得し存在すればバナー表示管理クラス `Banners` instanceを作成します
 * @param {String} id query.utm_medium value
 * @param {string} elementId バナー親コンテナ ID
 */
const elements = (id, elementId) => {
  const container = document.getElementById(elementId);
  if (!container) {
    return;
  }
  // ios
  const ios = document.getElementById(`${elementId}__link-for-iOS`);
  if (!ios) {
    return;
  }
  // androids
  const android = document.getElementById(`${elementId}__link-for-Android`);
  if (!android) {
    return;
  }
  const banners = new Banners(id, container, ios, android);
  banners.show();
};

// query value を取得します
const utmMedium = parseQuery();
// query.utm_medium が存在すればバナーを表示します
if (utmMedium) {
  elements(utmMedium, 'js-banner__upper');
  elements(utmMedium, 'js-banner__app');
}
