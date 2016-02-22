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
'use strict';

import {EventDispatcher} from '../event/EventDispatcher';

export class Thumbnail extends EventDispatcher {
  constructor( file:File, load:Function = null, error:Function = null ) {
    super();

    this._file = file;
    this._load = load;
    this._error = error;
    this._reader = null;
    this._boundLoad = this.onLoad.bind( this );
    this._boundError = this.onError.bind( this );
  }
  static get LOAD():string {
    return 'thumbnailLoad';
  }
  static get ERROR():string {
    return 'thumbnailError';
  }

  make():void {
    if ( !Thumbnail.detect() ) {
      console.warn( 'not support browser' );
      return;
    }
    let file = this._file;

    if ( !file.type.match( /image.*/ ) ) {
      return;
    }

    let reader = new FileReader();
    this._reader = reader;
    reader.addEventListener( 'load', this._boundLoad, false );
    reader.addEventListener( 'error', this._boundError, false );
    reader.readAsDataURL( file );

  }

  dispose():void {
    let reader = this._reader;
    if ( reader !== null ) {
      reader.removeEventListener( 'load', this._boundLoad );
      reader.removeEventListener( 'error', this._boundError );
    }
  }

  onLoad( event:Event ):void {
    this.dispose();
    this.dispatch( {type: Thumbnail.LOAD, img: event.target.result, nativeEvent: event} );
  }
  onError( event:Event ):void {
    this.dispose();
    this.dispatch( {type: Thumbnail.ERROR, img: null, nativeEvent: event} );
  }

  static detect():boolean {
    return window.File && window.FileReader && window.FileList && window.Blob;
  }
}
