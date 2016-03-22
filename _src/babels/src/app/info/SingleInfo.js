/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 19:01
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {SingleDae} from '../../dae/SingleDae';

let _symbol = Symbol();
let _single;

/**
 * <h3>記事詳細情報</h3>
 * 全てstaticです<br>
 * **Singleton**
 * <p>
 * SingleDae を保持します。
 * </p>
 */
export class SingleInfo {
  /**
   * 記事詳細情報
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `Article is static Class. not use new Article().` );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 現在表示の記事詳細情報
   * @return {SingleDae} 現在表示の記事詳細情報 SingleDae instance を返します
   */
  static get dae():SingleDae {
    return _single;
  }

  /**
   * 現在表示の記事詳細情報 を設定します
   * @param {SingleDae} article 現在表示の記事詳細情報 SingleDae instance
   */
  static set dae( article:SingleDae ):void {
    _single = article;
  }
}
