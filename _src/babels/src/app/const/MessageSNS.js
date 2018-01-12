/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/25 - 18:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * SNS 関連メッセージを管理します
 * @since 2016-09-15
 */
export class MessageSNS {
  /**
   * FACEBOOK
   * @return {string} facebook を返します
   */
  static get FACEBOOK() {
    return 'facebook';
  }
  /**
   * TWEET
   * @return {string} ツイート を返します
   */
  static get TWEET() {
    return 'ツイート';
  }
  /**
   * GOOGLE_PLUS
   * @return {string} Google+ を返します
   */
  static get GOOGLE_PLUS() {
    return 'Google+';
  }
  /**
   * SEND_LINE
   * @return {string} LINEへ送る を返します
   */
  static get SEND_LINE() {
    return 'LINEへ送る';
  }
  /**
   * VIA, twitter url `&via=` に使用します
   * @return {string} sportsbull_jp を返します
   */
  static get VIA() {
    return 'sportsbull_jp';
  }
  /**
   * FB_IMG_ALT, like image alt tag value
   * @return {string} SPORTS BULLをいいねして最新ニュースをチェック！ を返します
   */
  static get FB_IMG_ALT() {
    return 'SPORTS BULLをいいねして最新ニュースをチェック！';
  }
}
