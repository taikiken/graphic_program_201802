/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/04/13 - 12:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * ga 送信データ
 */
export class GaData {
  /**
   * ga 送信データ
   * @see https://developers.google.com/analytics/devguides/collection/analyticsjs/events?hl=ja#implementation
   * @param {string} method 発生場所（関数名）
   * @param {string} [eventCategory=''] 必須 通常は接点に使用されたオブジェクト（例: Video）
   * @param {string} [eventAction=''] 必須 接点の種類（例: play）
   * @param {string} [eventLabel=''] オプション イベントの分類に便利です（例: Fall Campaign）
   * @param {number} [eventValue=0] オプション イベントに関連する数値（例: 42）
   * @param {boolean} [eventInteraction=false] オプション イベントをインタラクション以外のイベントとして送信できます。その場合、nonInteraction フィールドを true に指定します（send コマンドの fieldsObject を使用）
   * @param {string} [hitType=event] 必須 hitType value
   * @param {?string} [page=null] オプション 記事詳細無限スクロール時に in view 記事の ID 送信に使用します
   */
  constructor(method, eventCategory = '', eventAction = '', eventLabel = '', eventValue = 0, eventInteraction = false, hitType = 'event', page = null) {
    // Object.assign( this, {method, eventCategory, eventAction, eventLabel, eventValue, eventInteraction} );
    /**
     * 発生場所（関数名）
     * @type {string}
     */
    this.method = method;
    /**
     * 必須 通常は接点に使用されたオブジェクト（例: Video）
     * @type {string}
     */
    this.eventCategory = eventCategory;
    /**
     * 必須 接点の種類（例: play）
     * @type {string}
     */
    this.eventAction = eventAction;
    /**
     * オプション イベントの分類に便利です（例: Fall Campaign）
     * @type {string}
     */
    this.eventLabel = eventLabel;
    /**
     * オプション イベントの分類に便利です（例: Fall Campaign）
     * @type {number}
     */
    this.eventValue = eventValue;
    /**
     * オプション イベントをインタラクション以外のイベントとして送信できます。その場合、nonInteraction フィールドを true に指定します（send コマンドの fieldsObject を使用）
     * @type {boolean}
     */
    this.eventInteraction = eventInteraction;
    /**
     * 必須 hitType value
     * @type {string}
     * @default 'event'
     * @since 2016-10-05
     */
    this.hitType = hitType;
    /**
     * オプション 記事詳細無限スクロール時に in view 記事の ID 送信に使用します
     * - `/p/6789/`
     *
     * @type {?string}
     * @since 2016-10-05
     */
    this.page = page;
    /**
     * 記事タイトル
     * @type {string}
     * @since 2016-11-15
     * @see https://github.com/undotsushin/undotsushin/issues/1334#issuecomment-260300279
     */
    this.title = '';
  }
  /**
   * 記事 ID を `/p/__ARTICLE_ID__/` な形式に変換し `page` プロパティに保存します
   * @param {number} id 記事 ID
   * @param {string} title 記事タイトル
   * @return {string} `/p/__ARTICLE_ID__/` 変換後文字列を返します
   */
  setPage(id, title) {
    const page = `/p/${id}/`;
    this.page = page;
    this.title = title;
    return page;
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * nonInteraction フィールドを true に指定した Object を取得します
   * @return {{nonInteraction: boolean}} nonInteraction フィールドを true に指定した Object を返します
   */
  static nonInteraction() {
    return { nonInteraction: true };
  }
}
