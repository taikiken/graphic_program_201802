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
 * <h2>ユーザーアイコン</h2>
 */
export class Thumbnail extends EventDispatcher {
  /**
   * ユーザーアイコン
   * @param {File} file 名前
   * @param {Function} load アバター画像
   * @param {Function} [error=mill] email, twitter 連携はない
   */
  constructor( file:File, load:Function = null, error:Function = null ) {
    super();

    this._file = file;
    this._load = load;
    this._error = error;
    this._reader = null;
    this._boundLoad = this.onLoad.bind( this );
    this._boundError = this.onError.bind( this );

    this._img = null;
    this._imgLoad = this.imageLoad.bind( this );
    this._imgError = this.imageError.bind( this );
    this._result = '';
    this._exif = Exif.factory();
    this._width = 0;
    this._height = 0;
    this._orientation = -1;
    this._count = 0;
    this._event = null;
    this._exifLoad = this.exifLoad.bind( this );
  }
  // ---------------------------------------------------
  //  Event
  // ---------------------------------------------------
  /**
   * LOAD
   * @return {string} thumbnailLoad を返します
   */
  static get LOAD():string {
    return 'thumbnailLoad';
  }
  /**
   * ERROR
   * @return {string} thumbnailError を返します
   */
  static get ERROR():string {
    return 'thumbnailError';
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * サムネイルを作ります
   */
  make():void {
    if ( !Thumbnail.detect() ) {
      // console.warn( 'not support browser' );
      return;
    }
    let file = this._file;

    if ( !file.type.match( /image.*/ ) ) {
      return;
    }

    this._result = '';
    this._count = 0;
    this._width = 0;
    this._height = 0;
    this._orientation = -1;
    this._event = null;

    let reader = new FileReader();
    this._reader = reader;
    reader.addEventListener( 'load', this._boundLoad, false );
    reader.addEventListener( 'error', this._boundError, false );
    reader.readAsDataURL( file );

    // orientation 調べるために exif 調査
    let exif = this._exif;
    exif.on( Exif.EXIF_ORIENTATION, this._exifLoad );
    exif.orientation( file );
    // console.log( 'Thumb start' );

  }
  /**
   * event handler を unbind します
   */
  dispose():void {
    let reader = this._reader;
    if ( reader !== null ) {
      reader.removeEventListener( 'load', this._boundLoad );
      reader.removeEventListener( 'error', this._boundError );
    }

    let img = this._img;
    if ( img !== null ) {
      this._img.removeEventListener( 'load', this._imgLoad );
      this._img.removeEventListener( 'error', this._imgError );
    }

    this._exif.off( Exif.EXIF_ORIENTATION, this._exifLoad );
  }
  /**
   * load event handler
   * @param {Event} event load event instance
   */
  onLoad( event:Event ):void {
    // this.dispose();

    let result = event.target.result;
    if ( !Safety.isBase64( result ) ) {
      // jpg, png, gif でない時はエラーにする
      this.onError( event );
      return;
    }

    this._result = result;
    // image size check
    let img = new Image();
    this._img = img;
    img.addEventListener( 'load', this._imgLoad, false );
    img.addEventListener( 'error', this._imgError, false );
    img.src = result;

    // with / height を調べるために img instance を作成する
    // this.dispatch( {type: Thumbnail.LOAD, img: event.target.result, nativeEvent: event} );

  }
  /**
   * error event handler
   * @param {Event} event error event instance
   */
  onError( event:Event ):void {
    this.dispose();
    this.dispatch( {type: Thumbnail.ERROR, img: null, nativeEvent: event, width: 0, height: 0, orientation: this._orientation} );
  }

  /**
   * Image.onload event handler
   * サムネイルの幅・高さを調べるために Image instance を作成し
   * load 後に size を測ります
   * @param {Event} event Image.onload event
   */
  imageLoad( event:Event ):void {
    // this.dispose();
    this._width = event.target.width;
    this._height = event.target.height;
    this._event = event;
    // console.log( 'imageLoad', event );

    this.done();
    // this.dispatch( {type: Thumbnail.LOAD, img: this._result, nativeEvent: event, width: event.target.width, height: event.target.height} );
  }

  /**
   * Image.onerror event handlers
   * @param {Event} event Image.onerror event
   */
  imageError( event:Event ):void {
    this.dispose();
    this.dispatch( {type: Thumbnail.ERROR, img: null, nativeEvent: event, width: 0, height: 0, orientation: this._orientation} );
  }

  /**
   * Exif.EXIF_ORIENTATION event  handler
   * Exif 解析終了
   * @param {Object} event Exif.EXIF_ORIENTATION event object
   */
  exifLoad( event:Object ):void {
    this._orientation = event.orientation;
    // console.log( 'exifLoad', event );

    this.done();
  }
  /**
   * image.onload, exif.onload のどちらも完了したら
   * Thumbnail.LOAD event を発火させる
   */
  done():void {
    ++this._count;
    if ( this._count < 2 ) {
      return;
    }
    this.dispose();
    this.dispatch( {type: Thumbnail.LOAD, img: this._result, nativeEvent: this._event, width: this._width, height: this._height, orientation: this._orientation} );
  }
  // ---------------------------------------------------
  //  STATIC
  // ---------------------------------------------------
  /**
   * File API が使えるかを調べます
   * @return {Boolean} File API 使用可否真偽値を返します
   */
  static detect():Boolean {
    return window.File && window.FileReader && window.FileList && window.Blob;
  }
}
