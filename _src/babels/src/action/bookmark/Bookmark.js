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

import {ActionAuthBehavior} from '../ActionAuthBehavior';
import {Api} from '../../net/Api';
import {Path} from '../../app/const/Path';
import {User} from '../../app/User';

/**
 * 記事のブックマーク登録 / 解除<br>
 * <code>/api/v1/articles/bookmark/{:article_id}</code>
 */
export class Bookmark extends ActionAuthBehavior {
  /**
   * 記事のブックマーク登録 / 解除 を行います
   * @param {Number|string} articleId article id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( articleId:Number, resolve:Function = null, reject:Function = null ) {

    // 登録
    let add = Api.bookmark( 'add' );
    // 解除
    let remove = Api.bookmark( 'delete' );

    // 登録用で super 実行
    super( User.token, add, null, resolve, reject );

    // global へ( super の後 )
    this._add = add;
    this._remove = remove;
    this._articleId = articleId;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    // 登録 / 解除 の URL は同じ
    return Path.article( this._url, this._articleId );
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * start は使えません, add / remove を使用します
   * @param {string} method request method
   */
  start( method:string = '' ):void {
    console.error( 'illegal operation, use start. instead add / delete.' );
  }
  /**
   * 記事のブックマーク登録
   */
  add():void {

    this._ajax.start( this.url, this._add.method, this.success.bind( this ), this.fail.bind( this ), this._resultClass, this._headers );

  }
  /**
   * 記事のブックマーク解除
   */
  remove():void {

    this._ajax.start( this.url, this._remove.method, this.success.bind( this ), this.fail.bind( this ), this._resultClass, this._headers );

  }
}
