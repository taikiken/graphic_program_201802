/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 17:46
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
 * <h3>記事メディアタイプ</h3>
 * 全て static です
 */
export class MediaType {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `MediaType is static Class. not use new MediaType().` );

    }

  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * IMAGE 画像記事
   * @return {string} image を返します
   */
  static get IMAGE():string {
    return 'image';
  }
  /**
   * VIDEO 動画記事
   * @return {string} video を返します
   */
  static get VIDEO():string {
    return 'video';
  }
}
