/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/09 - 17:31
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// /**
//  * Ajax コードステータス: English
//  * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
//  * @private
//  */
// const en = {
//   200: 'OK',
//   201: 'Created',
//   202: 'Accepted',
//   204: 'No Content',
//
//   400: 'Bad Request',
//   401: 'Unauthorized',
//   403: 'Forbidden',
//   404: 'Not Found',
//   405: 'Method Not Allowed',
//   409: 'Conflict',
//   415: 'Unsupported Media Type',
//   429: 'Too Many Requests',
//   500: 'Internal Server Error',
//   502: 'Service Unavailable'
// };
// /**
//  * Ajax コードステータス: Japanese
//  * @type {{200: string, 201: string, 202: string, 204: string, 400: string, 401: string, 403: string, 404: string, 405: string, 409: string, 415: string, 429: string, 500: string, 502: string}}
//  * @private
//  */
// const jp = {
//   200: '成功',
//   201: '新しいリソースを作成した',
//   202: 'リクエストを受け付けた',
//   204: '内容なし',
//
//   400: 'エラー',
//   401: '認証エラー',
//   403: 'アクセス禁止',
//   404: 'リソースが存在しない',
//   405: 'メソッドが間違っている',
//   409: 'リソースが競合している',
//   415: '指定されたメディアタイプがサポートされていない',
//   429: 'リクエストの回数制限に引っかかる',
//   500: 'サーバ側の問題',
//   502: '一時的にサービス出来ない'
// };

// let _symbol = Symbol();

/**
 * Ajax status code message - code No. 対応メッセージを管理します
 */
export class CodesStatus {
  /**
   * Ajax コードステータス: English
   * @return {{'200': string, '201': string, '202': string, '204': string, '400': string, '401': string, '403': string, '404': string, '405': string, '409': string, '415': string, '429': string, '500': string, '502': string}}
   * Ajax コードステータス: English リスト
   */
  static get en() {
    return {
      200: 'OK',
      201: 'Created',
      202: 'Accepted',
      204: 'No Content',

      400: 'Bad Request',
      401: 'Unauthorized',
      403: 'Forbidden',
      404: 'Not Found',
      405: 'Method Not Allowed',
      409: 'Conflict',
      415: 'Unsupported Media Type',
      429: 'Too Many Requests',
      500: 'Internal Server Error',
      502: 'Service Unavailable'
    };
  }

  /**
   * Ajax コードステータス: Japanese
   * @return {{'200': string, '201': string, '202': string, '204': string, '400': string, '401': string, '403': string, '404': string, '405': string, '409': string, '415': string, '429': string, '500': string, '502': string}}
   * Ajax コードステータス: Japanese リスト
   */
  static get jp() {
    return {
      200: '成功',
      201: '新しいリソースを作成した',
      202: 'リクエストを受け付けた',
      204: '内容なし',

      400: 'エラー',
      401: '認証エラー',
      403: 'アクセス禁止',
      404: 'リソースが存在しない',
      405: 'メソッドが間違っている',
      409: 'リソースが競合している',
      415: '指定されたメディアタイプがサポートされていない',
      429: 'リクエストの回数制限に引っかかる',
      500: 'サーバ側の問題',
      502: '一時的にサービス出来ない'
    };
  }
}

/**
 * API Response Code を管理します
 * - ステータスコード・メッセージを日本語と英語で保存しています
 */
export default class Codes {
  // /**
  //  * ステータスコード・メッセージを日本語と英語で保存しています
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'Codes is static Class. not use new Codes().' );
  //
  //   }
  //
  // }
  /**
   * status codeからリクエストの成功・失敗を判断します
   * - status code が >= 200 < 300 の間が成功です。
   * @param {number} statusCode サーバーからのレスポンスコード int型
   * @return {boolean} statusCodeが成功したか(true)失敗(false)を調べ返します
   */
  static status(statusCode) {
    return statusCode >= 200 && statusCode < 300;
  }
  /**
   * status codeの意味（メッセージ）を調べます
   * @param {number} code サーバーからのresponse status code
   * @return {{jP: string, en: string}} status codeの意味を返します {en: string|*, jp: string|*}
   */
  static message(code) {
    return {
      en: Codes.en(code),
      jp: Codes.jp(code)
    };
  }
  /**
   * code から 日本語メッセージを調べます
   * @param {number} code status code
   * @return {*} 日本語メッセージを返します
   */
  static jp(code) {
    return CodesStatus.jp[code];
  }

  /**
   * code から 英語メッセージを調べます
   * @param {number} code status code
   * @return {*} 英語メッセージを返します
   */
  static en(code) {
    return CodesStatus.en[code];
  }
}
