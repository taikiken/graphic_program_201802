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
'use strict';

let _symbol = Symbol();
let _mode = 'production';

/**
 * <h3>local test / develop / production を管理します</h3>
 * 全て static<br>
 * 動作モードを設定します<br>
 * <pre>
 *    production: 実行モード
 *    develop: 開発モード（ローカルからのテスト）
 *    test: ローカルテストモード
 * </pre>
 */
export class Env {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Env is static Class. not use new Env().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {string} 現在のモードを返します
   */
  static get mode():string {

    return _mode;

  }

  /**
   * @readonly
   * @return {string} 文字列 production を返します
   */
  static get PRODUCTION():string {
    return 'production';
  }
  /**
   * @readonly
   * @return {string} 文字列 production を返します
   */
  static get DEVELOP():string {
    return 'develop';
  }
  /**
   * @readonly
   * @return {string} 文字列 test を返します
   */
  static get TEST():string {
    return 'test';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * ローカルテストモードにします
   */
  static test():void {

    _mode = Env.TEST;

  }
  /**
   * 開発モードにします
   */
  static develop():void {

    _mode = Env.DEVELOP;

  }
  /**
   * 実行モードにします
   */
  static production():void {

    _mode = Env.PRODUCTION;

  }
}
