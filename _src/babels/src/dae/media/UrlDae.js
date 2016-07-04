/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/05/20 - 15:22
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

import {Safety} from '../../data/Safety';

/**
 * article.media.video.url
 * 管理します
 */
export class UrlDae {
  /**
   * article.media.video.url object
   * @param {Object|string} [url={}] article.media.video.url
   */
  constructor( url:Object = {} ) {
    // 2016-06-10
    // url:string, url:object どちらにも耐えられるように設計します
    // url:string で表示データが設定されることはないです
    // for brightcove
    if ( typeof url === 'undefined' || url === null ) {
      url = '';
    } else if ( typeof url === 'object' ) {
      // Object
      url = Safety.object( url );
    } else {
      url = String( url );
    }
    /**
     * article.media.video.url
     * @type {Object}
     * @protected
     */
    this._url = url;
  }
  /**
   * article.media.video.url
   * @return {Object|*} article.media.video.url を返します
   */
  get url():Object {
    return this._url;
  }
  /**
   * スマホ用動画URL - 拡張子は`.m3u8` のHLS動画です *ブラウザ版では再生するための追加のライブラリが必要
   * @return {string} article.media.video.url.sd を返します
   */
  get sd():string {
    return Safety.string( this.url.sd, '' );
  }
  /**
   * デスクトップ用動画URL - 拡張子は`.m3u8` のHLS動画です *ブラウザ版では再生するための追加のライブラリが必要
   * @return {string} article.media.video.url.hd を返します
   */
  get hd():string {
    return Safety.string( this.url.hd, '' );
  }
}
