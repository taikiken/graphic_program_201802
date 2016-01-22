/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 17:54
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ImagesDae} from './media/ImagesDae';
import {VideoDae} from './media/VideoDae';

/**
 * article.media
 */
export class MediaDae {
  /**
   *
   * @param {Object} [media={}] article.media
   */
  constructor( media:Object = {} ) {

    this._media = media;
    this._images = new ImagesDae( media.images );
    this._video = new VideoDae( media.video );

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Object|*} article.media
   */
  get media():Object {
    return this._media;
  }
  /**
   *
   * @return {ImagesDae|*} article.media.images
   */
  get images():ImagesDae {
    return this._images;
  }
  /**
   *
   * @return {VideoDae|*} article.media.video
   */
  get video():VideoDae {
    return this._video;
  }
}
