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
//
//
// let _symbol = Symbol();

/**
 * エラー文言,
 * form validation で使用します
 *
 * 全て static const で管理しています
 */
export class ErrorTxt {
  // /**
  //  * <p>エラーメッセージ</p>
  //  * <p>エラーメッセージを定義します</p>
  //  * <p>static class です, instance を作成しません</P>
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target:Symbol ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'ErrorTxt is static Class. not use new ErrorTxt().' );
  //
  //   }
  //
  // }
  // ---------------------------------------------------
  //  CONST 代わり
  // ---------------------------------------------------
  /**
   * BODY_EMPTY, コメントは必須項目です
   * @return {string} コメントは必須項目です
   */
  static get BODY_EMPTY() {
    return 'コメントは必須項目です。';
  }
  /**
   * EMAIL_EMPTY, メールアドレスは必須項目です
   * @return {string} メールアドレスは必須項目です
   */
  static get EMAIL_EMPTY() {
    return 'メールアドレスは必須項目です。';
  }
  /**
   * EMAIL_INVALID, 正しいメールアドレスを入力してください
   * @return {string} 正しいメールアドレスを入力してください。
   */
  static get EMAIL_INVALID() {
    return '正しいメールアドレスを入力してください。';
  }
  /**
   * PASSWORD_EMPTY, パスワードは必須項目です
   * @return {string} パスワードは必須項目です
   */
  static get PASSWORD_EMPTY() {
    return 'パスワードは必須項目です。';
  }
  /**
   * PASSWORD_SHORT, パスワードは8文字以上で入力してください
   * @return {string} パスワードは8文字以上で入力してください
   */
  static get PASSWORD_SHORT() {
    return 'パスワードは8文字以上で入力してください。';
  }
  /**
   * PASSWORD_INVALID, パスワードは半角英数字で入力してください
   * @return {string} パスワードは半角英数字で入力してください
   */
  static get PASSWORD_INVALID() {
    return 'パスワードは半角英数字で入力してください。';
  }
  /**
   * NAME_EMPTY, 名前は必須項目です
   * @return {string} 名前は必須項目です
   */
  static get NAME_EMPTY() {
    return '名前は必須項目です。';
  }
  /**
   * EMAIL_OR_PWD_EMPTY, メールアドレスかパスワードが入力されておりません
   * @return {string} メールアドレスかパスワードが入力されておりません
   */
  static get EMAIL_OR_PWD_EMPTY() {
    return 'メールアドレスかパスワードが入力されておりません。';
  }
  /**
   * INVALID_IMAGE, プロフィール写真に使用可能な画像は .png, .jpg, .gif です
   * @return {string} プロフィール写真に使用可能な画像は .png, .jpg, .gif です
   */
  static get INVALID_IMAGE() {
    return 'プロフィール写真に使用可能な画像は .png, .jpg, .gif です';
  }
  /**
   * NETWORK_ERROR, リクエストを受付できませんでした。お手数ですが時間を空けて再度送信をお願いします。
   * @returns {string} リクエストを受付できませんでした。お手数ですが時間を空けて再度送信をお願いします。
   */
  static get NETWORK_ERROR() {
    return 'リクエストを受付できませんでした。お手数ですが時間を空けて再度送信をお願いします。';
  }
}
