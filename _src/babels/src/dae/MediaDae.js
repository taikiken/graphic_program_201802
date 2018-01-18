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

// dae
import ImagesDae from './media/ImagesDae';
import {VideoDae} from './media/VideoDae';
// data
// import {Safety} from '../data/Safety';

/**
 * <p>article.media<br>
 * responce.media を images / video にわけます</p>
 */
export default class MediaDae {
  /**
   * article.media<br>
   * responce.media を images / video にわけます
   * @param {Object} [media={}] article.media
   */
  constructor(media = {}) {
    //
    // media = Safety.object( media );
    /**
     * article.media
     * @type {Object}
     */
    this.media = media;
    // /**
    //  * article.media.images の 1件づつ {@link ImagesDae} へ変換し格納します
    //  * @type {Array}
    //  * @protected
    //  */
    // this._list = [];
    let list = [];
    let images = null;

    // 記事詳細は media.images が最大5件になる
    // 最大5件は取り消されていた
    // JSON に配列が残っているので処理は残す
    if (!Array.isArray(media.images)) {
      // 1件, 配列では無い
      // /**
      //  * media.images, 配列では無いことがあったので...
      //  * @type {ImagesDae}
      //  * @protected
      //  */
      images = new ImagesDae(media.images);
      list.push(images);
    } else {
      //
      // for ( var image of media.images ) {
      //   this._list.push( new ImagesDae( image ) );
      // }
      list = media.images.map((image) => (new ImagesDae(image)));
    }
    /**
     * article.media.images
     * @type {?ImagesDae}
     */
    this.images = images;
    /**
     * 記事詳細 images リスト
     * @type {Array.<ImagesDae>}
     */
    this.list = list;
    /**
     * article.media.video
     * @type {VideoDae}
     */
    this.video = new VideoDae( media.video );

  }
  // // ---------------------------------------------------
  // //  GETTER / SETTER
  // // ---------------------------------------------------
  // /**
  //  * article.media
  //  * @return {Object|*} article.media を返します
  //  */
  // get media():Object {
  //   return this._media;
  // }
  // /**
  //  * article.media.images
  //  * @return {ImagesDae|*} article.media.images 存在しない時はundefined を返します
  //  */
  // get images():ImagesDae {
  //   return this._images;
  // }
  // /**
  //  * article.media.video
  //  * @return {VideoDae|*} article.media.video を返します
  //  */
  // get video():VideoDae {
  //   return this._video;
  // }
  // /**
  //  * 記事詳細 images 配列
  //  * @return {Array<ImagesDae>} 記事詳細 images 配列を返します, 存在しない時はundefined を返します
  //  */
  // get list():Array<ImagesDae> {
  //   return this._list;
  // }
}
