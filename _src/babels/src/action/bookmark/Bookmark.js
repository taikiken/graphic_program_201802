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

/**
 * 記事のブックマーク登録 / 解除<br>
 * <code>/api/v1/articles/bookmark/{:article_id}</code>
 */
export class Bookmark extends Action {
  /**
   * 記事のブックマーク登録 / 解除 を行います
   * @param {Number|string} id article id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( id:Number, resolve:Function = null, reject:Function = null ) {

    super( Api.bookmark(), resolve, reject );
    // 記事IDをparseIntはまずいと思う, 頭 0 が消えるから
    // this._id = parseInt( id, 10 );
    this._id = id;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Number|*} 記事 ID を返します
   */
  get id():Number {
    return this._id;
  }
  /**
   * url を作成します
   * @return {string} 作成した url を返します
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
  /**
   * 記事のブックマーク登録
   */
  add():void {

    this._ajax.start( this.url, 'POST', this.success.bind( this ), this.fail.bind( this ) );

  }
  /**
   * 記事のブックマーク解除
   */
  remove():void {

    this._ajax.start( this.url, 'DELETE', this.success.bind( this ), this.fail.bind( this ) );

  }

}
