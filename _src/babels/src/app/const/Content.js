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

      throw new Error( 'MediaType is static Class. not use new MediaType().' );

    }

  }
  /**
   * コンテンツ幅
   * @return {Number} コンテンツ幅を返します 710
   */
  static get WIDTH():Number {
    // return 710;
    return 728;
  }
  /**
   * コンテンツ幅 に対応した 16:9 の高さ
   * @return {Number} コンテンツ幅 に対応した 16:9 の高さを返します
   */
  static get HD_HEIGHT():Number {
    return Math.ceil( Content.WIDTH * 9 / 16 );
  }

  /**
   * コンテンツ サイドバー幅
   * @return {number} コンテンツ サイドバー幅を返します 300
   */
  static get SIDEBAR_WIDTH():Number {
    return 300;
  }

  /**
   * SP コンテンツ幅
   * @return {number} SP コンテンツ幅 を返します
   */
  static get SP_WIDTH():Number {
    return 320;
  }
  /**
   * SP コンテンツ幅 に対応した 16:9 の高さ
   * @return {number} SP コンテンツ幅 に対応した 16:9 の高さを返します
   */
  static get SP_HD_HEIGHT():Number {
    return Math.ceil( Content.SP_WIDTH * 9 / 16 );
  }
}
