/**
 * license inazumatv.com
 * author (at)taikiken / http://inazumatv.com
 * date 2016/03/27
 *
 * Copyright (c) 2011-2015 inazumatv.com, inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
import {EventDispatcher} from '../event/EventDispatcher';

let _symbol = Symbol();
let _instance = null;
/**
 * Exif orientation check
 * (stackoverflow)[http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side]
 */
export class Exif extends EventDispatcher {
  /**
   * <h3>Singleton</h3>
   * <p>Exif orientation check</p>
   * @param {Symbol} target Singleton を実現するための private symbol
   * @return {LogoutStatus} LogoutStatus instance を返します
   */
  constructor( target:Symbol ) {
    if ( _symbol !== target ) {

      throw new Error( 'Exif is static Class. not use new Exif(). instead Exif.factory()' );

    }

    if ( _instance === null ) {
      super();
      _instance = this;
      this._reader = null;
      this._boundLoad = this.onLoad.bind( this );
      this._boundError = this.onError.bind( this );
    }

    return _instance;
  }
  /**
   * FileReader.readAsArrayBuffer で 引数(file) load 後に exif orientation を調べる
   * @param {Blob} file 調査対象ファイル
   */
  orientation( file:Blob ):Number {
    let reader = new FileReader();
    this._reader = reader;
    reader.addEventListener( 'load', this._boundLoad, false );
    reader.addEventListener( 'error', this._boundError, false );
    let part;
    let end = 64 * 1024;
    // Blob.slice
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice
    if (typeof file.slice === 'function') {
      // normal
      part = file.slice(0, end);
    } else if (typeof file.webkitSlice === 'function') {
      // webkit
      part = file.webkitSlice(0, end);
    } else if (typeof file.mozSlice === 'function') {
      // moz(firefox)
      part = file.mozSlice(0, end);
    } else {
      part = file;
    }

    reader.readAsArrayBuffer(part);
  }

  /**
   * reader.readAsArrayBuffer onload event handler
   * @param {Event} event reader.readAsArrayBuffer onload event
   */
  onLoad( event:Event ):void {
    this.dispose();
    let orientation = Exif.parse( event.target.result );
    this.dispatch({type: Exif.EXIF_ORIENTATION, orientation: orientation});
    /*
    -2: not jpeg
    -1: not defined
    */
  }
  /**
   * reader.readAsArrayBuffer onerror event handler
   * orientation -1(defined) を返します
   */
  onError():void {
    this.dispose();
    this.dispatch({type: Exif.EXIF_ORIENTATION, orientation: -1});
  }
  /**
   * event handler を unbind します
   */
  dispose():void {
    this._reader.removeEventListener( 'load', this._boundLoad );
    this._reader.removeEventListener( 'error', this._boundError );
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * EXIF_ORIENTATION
   * 解析終了時のイベント
   * @return {string} exifOrientation を返します
   */
  static get EXIF_ORIENTATION():string {
    return 'exifOrientation';
  }

  // ---------------------------------------------------
  // orientation 定数
  /**
   * NO_JPG
   * .jpg / .jpeg ではありません
   * @return {number} -2 を返します
   */
  static get NO_JPG():Number {
    return -2;
  }
  /**
   * DEFINED
   * 見つかりませんでした
   * @return {number} -2 を返します
   */
  static get DEFINED():Number {
    return -1;
  }

  // ----------------
  // 正対
  /**
   * alias CW_0
   * CW clockwise 0
   * ノーマル（正対）
   * @return {number} 0 を返します
   */
  static get CW():Number {
    return 0;
  }
  /**
   * CW_0 clockwise 0
   * ノーマル（正対）
   * @return {number} 0 を返します
   */
  static get CW_0():Number {
    return 0;
  }
  /**
   * CW_90 clockwise 90
   * 90度回転
   * @return {number} 8 を返します
   */
  static get CW_90():Number {
    return 8;
  }
  /**
   * CW_180 clockwise 180
   * 180度回転
   * @return {number} 8 を返します
   */
  static get CW_180():Number {
    return 3;
  }
  /**
   * CW_270 clockwise 270
   * 270度回転
   * @return {number} 8 を返します
   */
  static get CW_270():Number {
    return 6;
  }

  // ----------------
  // 反転
  /**
   * alias UPSIDE_CW_0
   * UPSIDE_CW clockwise 0
   * 反転・ノーマル（正対）
   * @return {number} 2 を返します
   */
  static get UPSIDE_CW():Number {
    return 2;
  }
  /**
   * UPSIDE_CW_0 clockwise 0
   * 反転・ノーマル（正対）
   * @return {number} 2 を返します
   */
  static get UPSIDE_CW_0():Number {
    return 2;
  }
  /**
   * UPSIDE_CW_90 clockwise 90
   * 反転・90度回転
   * @return {number} 7 を返します
   */
  static get UPSIDE_CW_90():Number {
    return 7;
  }
  /**
   * UPSIDE_CW_180 clockwise 180
   * 反転・180度回転
   * @return {number} 4 を返します
   */
  static get UPSIDE_CW_180():Number {
    return 4;
  }
  /**
   * UPSIDE_CW_270 clockwise 270
   * 反転・270度回転
   * @return {number} 5 を返します
   */
  static get UPSIDE_CW_270():Number {
    return 5;
  }

  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
  /**
   * reader.readAsArrayBuffer の event.target.result を使い exif orientation 解析を始めます
   * @param {*} result reader.readAsArrayBuffer の event.target.result
   * @return {number} 解析結果を返します
   */
  static parse( result ):Number {
    let view = new DataView( result );
    if ( view.getUint16(0, false) !== 0xFFD8 ) {
      // not jpg
      return -2;
    }

    let length = view.byteLength;
    let offset = 2;

    while ( offset < length ) {
      let marker = view.getUint16( offset, false );
      offset += 2;

      if ( marker === 0xFFE1 ) {
        if ( view.getUint32( offset += 2, false ) !== 0x45786966 ) {
          return -1;
        }

        let little = view.getUint16( offset += 6, false ) === 0x4949;
        offset += view.getUint32(offset + 4, little);

        let tags = view.getUint16(offset, little);
        offset += 2;

        for ( let i = 0; i < tags; i++ ) {
          if ( view.getUint16(offset + (i * 12), little) === 0x0112 ) {
            return view.getUint16(offset + (i * 12) + 8, little);
          }
        }// for

      } else if ( (marker & 0xFF00) !== 0xFF00 ) {
        break;
      } else {
        offset += view.getUint16(offset, false);
      }
    }
    return -1;
  }
  /**
   * instance を生成します
   * @return {Exif} Exif instance を返します
   */
  static factory():Exif {

    if ( _instance === null ) {

      _instance = new Exif( _symbol );

    }

    return _instance;
  }
}

/*
http://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side

function getOrientation(file, callback) {
  var reader = new FileReader();
  reader.onload = function(e) {

    var view = new DataView(e.target.result);
    if (view.getUint16(0, false) != 0xFFD8) return callback(-2);
    var length = view.byteLength, offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xFFE1) {
        if (view.getUint32(offset += 2, false) != 0x45786966) return callback(-1);
        var little = view.getUint16(offset += 6, false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + (i * 12), little) == 0x0112)
            return callback(view.getUint16(offset + (i * 12) + 8, little));
      }
      else if ((marker & 0xFF00) != 0xFF00) break;
      else offset += view.getUint16(offset, false);
    }
    return callback(-1);
  };
  reader.readAsArrayBuffer(file.slice(0, 64 * 1024));
}

// usage:
var input = document.getElementById('input');
input.onchange = function(e) {
  getOrientation(input.files[0], function(orientation) {
    alert('orientation: ' + orientation);
  });
}
*/
