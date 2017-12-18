/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/21 - 17:23
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// const _symbol = Symbol();
let _mode = 'production';

/**
 * <p>local test / develop / production を管理します</p>
 * <p>全て static<br>
 * 動作モードを設定します</p>
 * <pre>
 * production: 実行モード
 * develop: 開発モード（ローカルからのテスト）
 * test: ローカルテストモード
 * </pre>
 */
export class Env {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Env is static Class. not use new Env().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 現在のモード
   * @return {string} 現在のモードを返します
   */
  static get mode() {
    return _mode;
  }
  /**
   * PRODUCTION
   * @readonly
   * @return {string} 文字列 production を返します
   */
  static get PRODUCTION() {
    return 'production';
  }
  /**
   * DEVELOP
   * @readonly
   * @return {string} 文字列 production を返します
   */
  static get DEVELOP() {
    return 'develop';
  }
  /**
   * TEST
   * @readonly
   * @return {string} 文字列 test を返します
   */
  static get TEST() {
    return 'test';
  }
  /**
   * LOCAL
   * @readonly
   * @return {string} 文字列 local を返します
   */
  static get LOCAL() {
    return 'local';
  }

  // ---
  // dev / stg 追加
  /**
   * DEV, dev.undotsushin.com
   * @return {string} 文字列 dev を返します
   */
  static get DEV() {
    return 'dev';
  }
  /**
   * STG, stg.undotsushin.com
   * @return {string} 文字列 stg を返します
   */
  static get STG() {
    return 'stg';
  }
  /**
   * process.env.NODE_ENV を取得します
   * @returns {string} develop / production
   */
  static get NODE_ENV() {
    return '@@nodeEnv';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * ローカルテスト(vagrant)モードにします
   */
  static local() {
    _mode = Env.LOCAL;
  }
  /**
   * ローカルテストモードにします
   */
  static test() {
    _mode = Env.TEST;
  }
  /**
   * 開発モードにします
   */
  static develop() {
    _mode = Env.DEVELOP;
  }
  /**
   * 実行モードにします
   */
  static production() {
    _mode = Env.PRODUCTION;
  }
  /**
   * dev 環境にします
   */
  static dev() {
    _mode = Env.DEV;
  }
  /**
   * stg 環境にします
   */
  static stg() {
    _mode = Env.STG;
  }
}
