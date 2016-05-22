/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/22 - 16:09
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

let _symbol = Symbol();

/**
 * brightcove videojs 設定初期値を管理します
 */
export class Brightcove {
  /**
   * brightcove videojs 設定初期値
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {
    if ( _symbol !== target ) {
      throw new Error( 'Brightcove is static Class. not use new Brightcove().' );
    }
  }
  
  // static get HOST():string {
  //   return '//players.brightcove.net';
  // }
  /**
   * data-account に使用します
   * @return {string} data-account 値を返します
   * @default 3948005094001
   */
  static get ACCOUNT():string {
    return '3948005094001';
  }
  /**
   * data-player に使用します
   * @return {string} data-player 値を返します
   * @default rJL6q0az
   */
  static get PLAYER():string {
    return 'rJL6q0az';
  }
  /**
   * data-embed に使用します
   * @return {string} data-embed 値を返します
   * @default default
   */
  static get EMBED():string {
    return 'default';
  }
  /**
   * videojs instance 作成に使用します
   * src.type 値です
   * @return {string} src.type 値を返します
   * @default application/x-mpegURL
   */
  static get TYPE():string {
    return 'application/x-mpegURL';
  }
  /**
   * videojs instance 作成に使用します
   * requestMode 値です
   * @return {string} requestMode 値を返します
   * @default onload
   */
  static get MODE():string {
    return 'onload';
  }
  /**
   * videojs instance 作成に使用します
   * postrollTimeout 値です
   * @return {number} postrollTimeout 値を返します
   * @default 2000
   */
  static get POST_ROLL():number {
    return 2000;
  }
  /**
   * videojs instance 作成に使用します
   * prerollTimeout 値です
   * @return {number} prerollTimeout 値を返します
   * @default 1000
   */
  static get PRE_ROLL():number {
    return 1000;
  }
  /**
   * videojs instance 作成に使用します
   * timeout 値です
   * @return {number} timeout 値を返します
   * @default 5000
   */
  static get TIMEOUT():number {
    return 5000;
  }
}
