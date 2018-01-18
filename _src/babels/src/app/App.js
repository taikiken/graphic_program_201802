/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 13:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import Env from './Env';
import {Api} from '../net/Api';

// let _symbol = Symbol();

/**
 * Application 共通項目を管理します
 * - 全て static です
 */
export default class App {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'App is static Class. not use new App().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * **Api 接続先** を変更します
   * - ローカルテスト(vagrant)モードにします
   * - `http://192.168.33.50/` へ接続します
   * @deprecated 2017-12-22 - `192.168.33.50` 接続できない
   */
  static local() {
    Env.local();
    Api.rebuild();
  }
  /**
   * **Api 接続先** を変更します
   * - ローカルテストモードにします
   * `http://undotsushin.local/` へ接続します<br>
   * 使用しないでください</p>
   */
  static test() {
    Env.test();
    Api.rebuild();
  }
  /**
   * **Api 接続先** を変更します
   * - 開発モードにします
   * - local から `http://undotsushin.com` へ API リクエストを行います
   * 開発中はこちらをお使いください
   * @param {string} [root=''] リクエスト・ドメイン
   */
  static develop(root = '' ) {
    Env.develop();
    Api.rebuild(root);
  }
  /**
   * **Api 接続先** を変更します
   * - 実行（本番）モードにします
   * デフォルトです
   */
  static production() {
    Env.production();
    Api.rebuild();
  }
  /**
   * **Api 接続先** を変更します
   * - {@link Env}.dev モードにします
   */
  static dev() {
    Env.dev();
    Api.rebuild();
  }
  /**
   * **Api 接続先** を変更します
   * - {@link Env}.stg モードにします
   */
  static stg() {
    Env.stg();
    Api.rebuild();
  }
}
