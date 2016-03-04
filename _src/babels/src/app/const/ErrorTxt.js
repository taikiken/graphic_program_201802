/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 14:34
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
 * <h3>エラーメッセージ</h3>
 * 全て static です
 */
export class ErrorTxt {
  /**
   * <h4>エラーメッセージ</h4>
   * <p>エラーメッセージを定義します</p>
   * <p>static class です, instance を作成しません</P>
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `ErrorMessage is static Class. not use new ErrorMessage().` );

    }

  }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * BODY_EMPTY コメント本文
   * @return {string} コメントは必須項目です
   */
  static get BODY_EMPTY():string {
    return 'コメントは必須項目です。';
  }
  /**
   * EMAIL_EMPTY
   * @return {string} メールアドレスは必須項目です
   */
  static get EMAIL_EMPTY():string {
    return 'メールアドレスは必須項目です。';
  }
  /**
   * EMAIL_INVALID
   * @return {string} 正しいメールアドレスを入力してください。
   */
  static get EMAIL_INVALID():string {
    return '正しいメールアドレスを入力してください。';
  }
  /**
   * PASSWORD_EMPTY
   * @return {string} パスワードは必須項目です
   */
  static get PASSWORD_EMPTY():string {
    return 'パスワードは必須項目です。';
  }
  /**
   * PASSWORD_SHORT
   * @return {string} パスワードは8文字以上で入力してください
   */
  static get PASSWORD_SHORT():string {
    return 'パスワードは8文字以上で入力してください。';
  }
  /**
   * PASSWORD_INVALID
   * @return {string} パスワードは半角英数字で入力してください
   */
  static get PASSWORD_INVALID():string {
    return 'パスワードは半角英数字で入力してください。';
  }
  /**
   * NAME_EMPTY
   * @return {string} 名前は必須項目です
   */
  static get NAME_EMPTY():string {
    return '名前は必須項目です。';
  }
}
