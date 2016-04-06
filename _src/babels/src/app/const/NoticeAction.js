/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 23:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


let _symbol = Symbol();
let _message = {
  comment: '返信',
  reply: '返信',
  good: 'Good',
  bad: 'Bad',
  notice: '通知'
};
/**
 * <h3>お知らせ定型文</h3>
 */
export class NoticeAction {
  /**
   * お知らせ定型文
   * static class です, instance を作成しません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( 'NoticeAction is static Class. not use new NoticeAction().' );

    }

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * action に対応するメッセージ
   * - reply : 返信された
   * - good : goodされた
   * - bad : badされた
   * - notice : ニュース的通知
   *
   * @param {string} action アクティビティの種類
   * @return {string} action に対応するメッセージ を返します
   */
  static message( action:string ):string {
    return _message[ action ];
  }
}
