/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 18:04
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
 * <h3>コンテンツ属性(attribute)</h3>
 * 全て static です
 */
export class Content {
  /**
   * コンテンツ属性
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `MediaType is static Class. not use new MediaType().` );

    }

  }
  /**
   * コンテンツ幅
   * @return {Number} コンテンツ幅を返します
   */
  static get WIDTH():Number {
    return 710;
  }
  /**
   * コンテンツ幅 に対応した 16:9 の高さ
   * @return {Number} コンテンツ幅 に対応した 16:9 の高さを返します
   */
  static get HD_HEIGHT():Number {
    return Math.ceil( Content.WIDTH * 9 / 16 );
  }
}
