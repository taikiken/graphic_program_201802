/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:57
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
 * article.media.images
 */
export class ImagesDae {
  /**
   * article.media.images 画像情報を保存します
   * @param {Object} [images={}] article.media.images
   */
  constructor( images:Object = {} ) {
    images = Safety.object( images );
    this._images = images;
  }
  /**
   * article.media.images
   * @return {Object|*} article.media.images
   */
  get images():Object {
    return this._images;
  }
  /**
   * キャプション
   * @return {string} article.media.images.caption
   */
  get caption():string {
    return this.images.caption;
  }
  /**
   * スライド用
   * @return {string} article.media.images.large
   */
  get large():string {
    return this.images.large;
  }
  /**
   * 記事一覧用 - 横長 or 16:9
   * @return {string} article.media.images.medium
   */
  get medium():string {
    return this.images.medium;
  }
  /**
   * 1 x 1 small
   * @return {string} article.media.images.thumbnail
   */
  get thumbnail():string {
    return this.images.thumbnail;
  }
  /**
   * 詳細用元比率画像
   * @return {string} article.media.images.original
   */
  get original():string {
    return this.images.original;
  }
}
