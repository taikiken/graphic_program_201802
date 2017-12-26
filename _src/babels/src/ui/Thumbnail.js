/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/21 - 19:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {EventDispatcher} from '../event/EventDispatcher';
import {Safety} from '../data/Safety';
import {Exif} from '../util/Exif';

/**
 * ユーザーアイコン - アバター画像を管理します
 */
export default class Thumbnail extends EventDispatcher {
  // ---------------------------------------------------
  //  EVENT
  // ---------------------------------------------------
  /**
   * LOAD
   * @return {string} thumbnailLoad を返します
   */
  static get LOAD() {
    return 'thumbnailLoad';
  }
  /**
   * ERROR
   * @return {string} thumbnailError を返します
   */
  static get ERROR() {
    return 'thumbnailError';
  }
  // ---------------------------------------------------
  //  STATIC METHOD
  // ---------------------------------------------------
  /**
   * File API が使えるかを調べます
   * @return {boolean} File API 使用可否真偽値を返します
   */
  static detect() {
    return window.File && window.FileReader && window.FileList && window.Blob;
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * ユーザーアイコン管理準備を行います
   * @param {File} file 名前
   * @param {?Function} [load=null] アバター画像 load complete callback
   * @param {?Function} [error=mill] アバター画像 load error callback - email, twitter 連携はない
   */
  constructor(file, load = null, error = null) {
    super();
    /**
     * file 名前
     * @type {File}
     */
    this.file = file;
    /**
     * load アバター画像
     * @type {Function}
     */
    this.load = load;
    /**
     * email, twitter 連携はない
     * @type {Function}
     */
    this.error = error;
    /**
     * `FileReader` instance
     * @type {?FileReader}
     */
    this.reader = null;
    /**
     * bind 済み this.onLoad
     * @type {Function}
     */
    this.boundLoad = this.onLoad.bind( this );
    /**
     * bind 済み this.onError
     * @type {Function}
     * @private
     */
    this.boundError = this.onError.bind( this );

    /**
     * Image instance
     * @type {?Image}
     * @private
     */
    this.img = null;
    /**
     * bind 済み this.imageLoad
     * @type {Function}
     * @private
     */
    this.imgLoad = this.imageLoad.bind( this );
    /**
     * bind 済み this.imageError
     * @type {Function}
     * @private
     */
    this.imgError = this.imageError.bind( this );
    /**
     * 画像サムネイルを作るための event.target.result
     * @type {string}
     * @private
     */
    this.result = '';
    /**
     * exif を見て回転させるために使用する exif
     * @type {Exif}
     * @private
     */
    this.exif = Exif.factory();
    /**
     * 画像幅
     * @type {number}
     * @private
     * @default 0
     */
    this.width = 0;
    /**
     * 画像高
     * @type {number}
     * @private
     * @default 0
     */
    this.height = 0;
    /**
     * 回転
     * @type {number}
     * @private
     * @default -1
     */
    this.orientation = -1;
    /**
     * 非同期処理の完了フラッグ
     * @type {number}
     * @private
     */
    this.count = 0;
    /**
     * Image.onload Event
     * @type {?Event}
     * @private
     */
    this.event = null;
    /**
     * bind 済み this.exifLoad
     * @type {Function}
     * @private
     */
    this.exifLoad = this.exifLoad.bind( this );
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * サムネイルを作ります
   * - `FileReader` support 必須です
   */
  make() {
    if (!Thumbnail.detect()) {
      // console.warn( 'not support browser' );
      return;
    }
    const file = this.file;

    if (!file.type.match(/image.*/)) {
      return;
    }

    this.result = '';
    this.count = 0;
    this.width = 0;
    this.height = 0;
    this.orientation = -1;
    this.event = null;

    const reader = new FileReader();
    this.reader = reader;
    reader.addEventListener('load', this.boundLoad, false);
    reader.addEventListener('error', this.boundError, false);
    reader.readAsDataURL(file);

    // orientation 調べるために exif 調査
    const exif = this.exif;
    exif.off(Exif.EXIF_ORIENTATION, this.exifLoad);
    exif.on(Exif.EXIF_ORIENTATION, this.exifLoad);
    exif.orientation(file);
    // console.log( 'Thumb start' );
  }
  /**
   * event handler を unbind します
   */
  dispose() {
    const reader = this.reader;
    if (reader !== null) {
      reader.removeEventListener('load', this.boundLoad);
      reader.removeEventListener('error', this.boundError);
    }

    const img = this.img;
    if (img !== null) {
      img.removeEventListener('load', this.imgLoad);
      img.removeEventListener('error', this.imgError);
    }

    this.exif.off(Exif.EXIF_ORIENTATION, this.exifLoad);
  }
  /**
   * load event handler
   * @param {Event} event load event instance
   */
  onLoad(event) {
    // this.dispose();
    const result = event.target.result;
    if (!Safety.isBase64(result)) {
      // jpg, png, gif でない時はエラーにする
      this.onError(event);
      return;
    }

    this.result = result;
    // image size check
    const img = new Image();
    this.img = img;
    img.addEventListener('load', this.imgLoad, false);
    img.addEventListener('error', this.imgError, false);
    img.src = result;
    // with / height を調べるために img instance を作成する
    // this.dispatch( {type: Thumbnail.LOAD, img: event.target.result, nativeEvent: event} );
  }
  /**
   * error event handler
   * @param {Event} event error event instance
   */
  onError(event) {
    this.dispose();
    this.dispatch({ type: Thumbnail.ERROR, img: null, nativeEvent: event, width: 0, height: 0, orientation: this.orientation });
  }
  /**
   * Image.onload event handler
   * サムネイルの幅・高さを調べるために Image instance を作成し
   * load 後に size を測ります
   * @param {Event} event Image.onload event
   */
  imageLoad(event) {
    // this.dispose();
    this.width = event.target.width;
    this.height = event.target.height;
    this.event = event;
    // console.log( 'imageLoad', event );

    this.done();
    // this.dispatch( {type: Thumbnail.LOAD, img: this.result, nativeEvent: event, width: event.target.width, height: event.target.height} );
  }
  /**
   * Image.onerror event handlers
   * @param {Event} event Image.onerror event
   */
  imageError(event) {
    this.dispose();
    this.dispatch({ type: Thumbnail.ERROR, img: null, nativeEvent: event, width: 0, height: 0, orientation: this.orientation });
  }
  /**
   * Exif.EXIF_ORIENTATION event  handler
   * Exif 解析終了
   * @param {Object} event Exif.EXIF_ORIENTATION event object
   */
  exifLoad(event) {
    this.orientation = event.orientation;
    // console.log( 'exifLoad', event );
    this.done();
  }
  /**
   * image.onload, exif.onload のどちらも完了したら
   * Thumbnail.LOAD event を発火させる
   */
  done() {
    ++this.count;
    if ( this.count < 2 ) {
      return;
    }
    this.dispose();
    this.dispatch({ type: Thumbnail.LOAD, img: this.result, nativeEvent: this.event, width: this.width, height: this.height, orientation: this.orientation });
  }
}
