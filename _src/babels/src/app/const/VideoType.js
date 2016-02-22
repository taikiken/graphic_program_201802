/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 17:40
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
 * <h3>動画タイプ</h3>
 * 全て static です
 */
export class VideoType {
  /**
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `VideoType is static Class. not use new VideoType().` );

    }

  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * BRIGHTCOVE, mp4ファイル
   * @return {string} brightcove を返します
   */
  static get BRIGHTCOVE():string {
    return 'brightcove';
  }
  /**
   * YOUTUBE, Youtube ID
   * @return {string} youtube を返します
   */
  static get YOUTUBE():string {
    return 'youtube';
  }
  /**
   * FACEBOOK, facebook 動画URL
   * @return {string} facebook を返します
   */
  static get FACEBOOK():string {
    return 'facebook';
  }
}
