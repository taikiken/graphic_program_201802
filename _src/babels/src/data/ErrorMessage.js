/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 0:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from './Safety';

export class ErrorMessage {
  constructor( error:boolean = false, message:string = '' ) {
    this._error = error;
    this._message = message;
  }
  get error():boolean {
    return this._error;
  }
  set error( error:boolean ):void {
    this._error = !!error;
  }
  get message():string {
    return this._message;
  }
  set message( message:string ):void {
    this._message = Safety.string( message, '' );
  }

  reset():void {
    this.error = false;
    this.message = '';
  }
}
