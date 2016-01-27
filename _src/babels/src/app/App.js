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
'use strict';

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

      throw new Error( `App is static Class. not use new App().` );

    }

  }

  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * <p>**Api 接続先** を変更します</p>
   * ローカルテストモードにします<br>
   * localhost/api へ接続します<br>
   * 使用しないでください
   */
  static test():void {

    Env.test();
    Api.rebuild();

  }
  /**
   * <p>**Api 接続先** を変更します</p>
   * 開発モードにします<br>
   * local から <code>http://undotsushin.com</code> へ API リクエストを行います<br>
   * 開発中はこちらをお使いください
   */
  static develop():void {

    Env.develop();
    Api.rebuild();

  }
  /**
   * <p>**Api 接続先** を変更します</p>
   * 実行モードにします<br>
   * デフォルトです
   */
  static production():void {

    Env.production();
    Api.rebuild();

  }
}
