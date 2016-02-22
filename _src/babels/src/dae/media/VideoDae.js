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
'use strict';

import {Safety} from '../../data/Safety';

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
    this._video = video;
  }
  /**
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
   * 動画パス
   * @return {string} article.media.video.url を返します
   */
  get url():string {
    return this.video.url;
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
}
