/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../data/Safety';
import {UrlDae} from './UrlDae';

/**
 * article.media.video
 */
export class VideoDae {
  /**
   * article.media.video 動画情報を保存します
   * @param {Object} [video={}] article.media.video
   */
  constructor( video:Object = {} ) {
    video = Safety.object( video );
    /**
     * article.media.video object
     * @type {Object}
     * @private
     */
    this._video = video;
    /**
     * article.media.video.url を UrlDae instance で管理します
     * @type {UrlDae}
     * @private
     */
    this._url = new UrlDae( video.url );
  }
  /**
   * article.media.video
   * @return {Object|*} article.media.video
   */
  get video():Object {
    return this._video;
  }
  /**
   * video caption
   * @return {string} article.media.video.caption を返します
   */
  get caption():string {
    return this.video.caption;
  }
  /**
   * 動画パス, article.media.video.url を UrlDae instance へ変換したデータを取得します
   * @return {UrlDae} article.media.video.url を UrlDae instance へ変換したデータを返します
   */
  get url():UrlDae {
    return this._url;
  }
  /**
   * YouTube video id
   * @return {string} YouTube video id article.media.video.youtube を返します
   */
  get youtube():string {
    return this.video.youtube;
  }
  /**
   * Facebook 動画URL
   * @return {string} Facebook article.media.video.facebook 動画URL を返します
   */
  get facebook():string {
    return this.video.facebook;
  }
  /**
   * 動画タイプ
   * @return {string} article.media.video.type 動画タイプ を返します
   */
  get type():string {
    return this.video.type;
  }
  /**
   * 動画タイプ？ 古い JSON に残っているので追加する(2016-02-22)
   * @return {string} 多分動画タイプ...
   */
  get player():string {
    return this.video.player;
  }
  // add 2016-05-20
  /**
   * https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=2055838625
   * 動画タイプが `brightcove` の場合で、動画広告ある場合は表示する動画広告の内容が記載されたVASTのパスが設定されます
   * 空の場合は広告なしということです。
   *
   *  http://web-jp.ad-v.jp/adam/inline?CE=0&cat=RAN.CBC.PC&format=cm&page=
   *
   * @return {string} 動画広告用VASTタグのパス
   */
  get vast():string {
    return Safety.string( this.video.vast, '' );
  }
}
