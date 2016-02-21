/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/21 - 12:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

/**
 * <h3>表示文章定義</h3>
 * 全て static です
 */
export class Message {
  /**
   * <h4>表示文章定義</h4>
   * <p>error, 注意などの文章を定義します</p>
   * <p>static class です, instance を作成しません</P>
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `Path is static Class. not use new Path().` );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  static get UNLOAD():string {
    return '新規登録がキャンセルされます！';
  }
}
