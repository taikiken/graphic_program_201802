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

import {Env} from './Env';
import {Api} from '../net/Api';

let _symbol = Symbol();

/**
 * <h3>application 共通項目を管理します</h3>
 * 全て static です
 */
export class App {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( 'App is static Class. not use new App().' );

    }

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * <p>**Api 接続先** を変更します</p>
   * ローカルテスト(vagrant)モードにします<br>
   * <code>http://192.168.33.50/</code> へ接続します</p>
   */
  static local():void {

    Env.local();
    Api.rebuild();

  }
  /**
   * <p>**Api 接続先** を変更します</p>
   * ローカルテストモードにします<br>
   * <code>http://undotsushin.local/</code> へ接続します<br>
   * 使用しないでください</p>
   */
  static test():void {

    Env.test();
    Api.rebuild();

  }
  /**
   * <p>**Api 接続先** を変更します</p>
   * 開発モードにします<br>
   * local から <code>http://undotsushin.com</code> へ API リクエストを行います<br>
   * 開発中はこちらをお使いください</p>
   * @param {string} [root=''] リクエスト・ドメイン
   */
  static develop( root:string = '' ):void {

    Env.develop();
    Api.rebuild( root );

  }
  /**
   * <p>**Api 接続先** を変更します</p>
   * 実行モードにします<br>
   * デフォルトです</p>
   */
  static production():void {

    Env.production();
    Api.rebuild();

  }
  /**
   * <p>**Api 接続先** を変更します</p>
   * 実行モードにします<br>
   * デフォルトです</p>
   */
  static dev():void {

    Env.dev();
    Api.rebuild();

  }
  /**
   * <p>**Api 接続先** を変更します</p>
   * 実行モードにします<br>
   * デフォルトです</p>
   */
  static stg():void {

    Env.stg();
    Api.rebuild();

  }
}
