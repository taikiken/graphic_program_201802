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
   * responce.media を images / video にわけます
   * @param {Object} [media={}] article.media
   */
  constructor( media:Object = {} ) {

    this._media = media;
    // 記事詳細は media.images が最大5件になる
    if ( !Array.isArray( media.images ) ) {
      // 1件, 配列では無い
      this._images = new ImagesDae( media.images );

    } else {

      this._list = [];
      for ( var image of media.images ) {
        this._list.push( new ImagesDae( image ) );
      }

    }

    this._video = new VideoDae( media.video );

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} article.media
   */
  get media():Object {
    return this._media;
  }
  /**
   * @return {ImagesDae|*} article.media.images 存在しない時はundefined を返します
   */
  get images():ImagesDae {
    return this._images;
  }
  /**
   * @return {VideoDae|*} article.media.video
   */
  get video():VideoDae {
    return this._video;
  }
  /**
   * @return {Array<ImagesDae>} 記事詳細 images 配列を返します, 存在しない時はundefined を返します
   */
  get list():Array<ImagesDae> {
    return this._list;
  }
}
