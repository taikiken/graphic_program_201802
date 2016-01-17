/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 17:28
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Action} from '../Action';
import {Api} from '../../net/Api';

export class Bookmark extends Action {
  constructor( id:Number, resolve:Function = null, reject:Function = null ) {

    super( Api.bookmark(), resolve, reject );
    this._id = parseInt( id, 10 );

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  get id():Number {
    return this._id;
  }
  /**
   * url を作成します
   * @method url
   * @returns {string} 作成した url を返します
   */
  get url():string {
    return `${this._url}/${this.id}`;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * start は使えません, add / remove を使用します
   * @param {string} method request method
   */
  start( method:string = '' ):void {
    console.error( 'illegal operation, use start with method: ' + method );
  }

  add():void {

    this._ajax.start( this.url, 'POST', this.success.bind( this ), this.fail.bind( this ) );

  }

}
