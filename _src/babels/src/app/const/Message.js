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

      throw new Error( `Message is static Class. not use new Message().` );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * UNLOAD
   * @return {string} 入力内容が取消しされます
   */
  static get UNLOAD():string {
    return '入力内容が取消しされます！';
  }
  /**
   * DELETE
   * @return {string} このコメントを削除しますか
   */
  static get DELETE():string {
    return 'このコメントを削除しますか？';
  }
  /**
   * DEACTIVATE
   * @return {string} 退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります
   */
  static get DEACTIVATE():string {
    return '退会を行うと、登録済みの情報は全て閲覧する事が出来なくなります。';
  }
  /**
   * LOGOUT
   * @return {string} ログアウトしますか？
   */
  static get LOGOUT():string {
    return 'ログアウトしますか？';
  }
  /**
   * BOOKMARK_WILL
   * @return {string} ブックマークする
   */
  static get BOOKMARK_WILL():string {
    return 'ブックマークする';
  }
  /**
   * BOOKMARK_DID
   * @return {string} ブックマーク済
   */
  static get BOOKMARK_DID():string {
    return 'ブックマーク済';
  }
}
