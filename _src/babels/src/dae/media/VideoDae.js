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
   *
   * @param {Object} [video={}] article.media.video
   */
  constructor( video:Object = {} ) {
    video = Safety.object( video );
    this._video = video;
  }
  /**
   *
   * @return {Object|*} article.media.video
   */
  get video():Object {
    return this._video;
  }
  /**
   *
   * @return {string} article.media.video.caption
   */
  get caption():string {
    return this.video.caption;
  }
  /**
   * 1 x 1 small size
   * @return {string} article.media.video.thumbnail
   */
  get thumbnail():string {
    return this.video.thumbnail;
  }
  /**
   * for slide
   * @return {string} article.media.images.large
   */
  get large():string {
    return this.video.large;
  }
  /**
   * 16 x 9 記事一覧
   * @return {string} article.media.images.medium
   */
  get medium():string {
    return this.video.medium;
  }
  /**
   *
   * @return {string} article.media.video.url
   */
  get url():string {
    return this.video.return;
  }
}
