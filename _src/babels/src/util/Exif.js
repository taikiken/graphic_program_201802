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

      throw new Error( `Exif is static Class. not use new Exif(). instead Exif.factory()` );

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

  orientation( file:File ):Number {
    let reader = new FileReader();
    this._reader = reader;
    reader.addEventListener( 'load', this._boundLoad, false );
    reader.addEventListener( 'error', this._boundError, false );
    let part;
    let end = 64 * 1024;
    // Blob.slice
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice
    if (file.slice) {
      part = file.slice(0, end);
    } else if (file.webkitSlice) {
      part = file.webkitSlice(0, end);
    } else if (file.mozSlice) {
      part = file.mozSlice(0, end);
    } else {
      part = file;
    }
    
    reader.readAsArrayBuffer(part);
  }

  onLoad( event:Event ):void {
    this.dispose();
    let orientation = Exif.parse( event.target.result );
    this.dispatch({type:Exif.EXIF_ORIENTATION, orientation: orientation});
    /*
    -2: not jpeg
    -1: not defined
    */
  }

  onError():void {
    this.dispose();
    this.dispatch({type:Exif.EXIF_ORIENTATION, orientation: -1});
  }

  dispose():void {
    this._reader.removeEventListener( 'load', this._boundLoad );
    this._reader.removeEventListener( 'error', this._boundError );
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  static get EXIF_ORIENTATION():string {
    return 'exifOrientation';
  }
  // ---------------------------------------------------
  //  static method
  // ---------------------------------------------------
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
