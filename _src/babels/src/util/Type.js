/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/10/05 - 17:15
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 型チェックを行います
 * @static
 * @since 2016-11-16
 */
export class Type {
  /**
   * 引数(target)が関数かを調べます
   * @param {Function|*} target 調査対象
   * @return {boolean} 引数(target)が関数かを調べ結果を返します、true: 関数
   */
  static method(target) {
    return typeof target === 'function';
  }
  /**
   * 引数(target)を `!!` で調べます
   * @param {*} target 調査対象
   * @return {boolean} 引数(target)を `!!` で調べ結果を返します
   */
  static exist(target) {
    return !!target;
  }
  /**
   * 引数(target)が number かを調べます
   * @param {*} target 調査対象
   * @returns {boolean} 引数(target)が number かを調べ結果を返します、true: number
   */
  static number(target) {
    // return typeof target === 'number';
    // jQuery 2.x
    return !Type.array(target) && ((target - parseFloat(target)) + 1) >= 0;
  }
  /**
   * 引数(target)が int かを調べます
   * @param {*} target 調査対象
   * @return {boolean} 引数(target)が int かを調べ結果を返します、true: int
   */
  static int(target) {
    return Number.isInteger(target);
  }
  /**
   * 引数(target)が string かを調べます
   * @param {*} target 調査対象
   * @returns {boolean} 引数(target)が string かを調べ結果を返します、true: string
   */
  static string(target) {
    return typeof target === 'string';
  }
  /**
   * 引数(target)を `Array.isArray` で配列かを調べます
   * @param {*} target 調査対象
   * @returns {boolean} 引数(target)が 配列 かを調べ結果を返します、true: 配列
   */
  static array(target) {
    return Array.isArray(target);
  }
  /**
   * 引数(target)が null かを調べます
   * @param {*} target 調査対象
   * @return {boolean} 引数(target)が null かを調べ結果を返します、true: null
   */
  static nil(target) {
    return target === null;
  }
  /**
   * Object型 引数 `object` は String型 引数 `key` を [key] として存在するかを調べます
   * @param {Object} target 調査対象
   * @param {string} key Object.key 名称
   * @return {boolean} 存在する時は true を返します
   */
  static hasKey(target, key) {
    return Object.keys(target).indexOf(key) !== -1;
  }
  /**
   * target が undefined かを調べます
   * @param {*} target 調査対象
   * @return {boolean} true: undefined
   * @since 2016-10-25
   */
  static undef(target) {
    return typeof target === 'undefined';
  }
  /**
   * ファイル名から拡張子を取得します
   * @param {string} fileName 取得したいファイル名称
   * @returns {string} ファイル名の拡張子を返します
   */
  static getExtension(fileName) {
    // http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
    const split = fileName.split('.');

    if (split.length === 1 || (split[0] === '' && split.length === 2)) {
      // console.warn(`not correct file name. ${fileName}`);
      return '';
    }

    return split.pop().toLowerCase();
  }
  // ----------------------------------------------------------
  // 画像パスが正規かチェックする
  /**
   * 使用可能なbase64 file かを調べます
   * @param {string} fileName 調査対象ファイル名
   * @return {boolean} jpeg / png の時に true を返します
   */
  static base64(fileName) {
    if (!Type.exist(fileName)) {
      return false;
    }
    return fileName.indexOf('data:image/jpeg;base64') !== -1 ||
      fileName.indexOf('data:image/png;base64') !== -1 ||
      fileName.indexOf('data:image/jpg;base64') !== -1 ||
      fileName.indexOf('data:image/gif;base64') !== -1;
  }
  /**
   * 拡張子から画像ファイルかを調べます
   * @param {string} fileName 調査対象ファイル名
   * @returns {Boolean} 'jpg', 'png', 'jpeg', 'gif' のいづれかに該当するかの真偽値を返します
   */
  static img(fileName) {
    if (!Type.exist(fileName)) {
      return false;
    }
    // base64
    if (Type.base64(fileName)) {
      return true;
    }
    // 拡張子チェック
    return ['jpg', 'png', 'jpeg', 'gif'].indexOf(Type.getExtension(fileName)) !== -1;
  }
}
