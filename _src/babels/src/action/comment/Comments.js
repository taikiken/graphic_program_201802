/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 19:41
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {OffsetAuth} from '../OffsetAuth';
import {Api} from '../../net/Api';
import {User} from '../../app/User';
import {Path} from '../../app/const/Path';
import {CommentsType} from '../../app/const/CommentsType';
import {Safety} from '../../data/Safety';

let _symbol = Symbol();

/**
 * <h3>コメント一覧<h3>
 */
export class Comments extends OffsetAuth {
  /**
   * コメント一覧<br>
   * 記事ID, token を使いコメント一覧を取得します<br>
   * query に offset, length があります
   *
   * @param {Symbol} target Factory pattern のために使用
   * @param {number} id コメントを取得する記事ID
   * @param {string} [type=''] 取得コメント種類, ''|normal|official|self
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( target:Symbol, id:Number, type:string = '', resolve:Function = null, reject:Function = null ) {
    if ( _symbol !== target ) {

      throw new Error( `not use new Comments(). instead Comments.all() or Comments.normal() or Comments.official() or Comments.mine()` );

    }

    type = Safety.string( type, '' );

    super( User.token, Api.comment( type ), resolve, reject );
    this._id = id;
  }
  // reload 追加
  /**
   * 再読み込み
   */
  reload():void {
    this._reload = true;
    let url = `${Path.article( this._url, this.id )}?offset=0&length=${this.offset}`;
    this._ajax.start( url, this.method, this._boundSuccess, this._boundFail, this._resultClass, this._headers );

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 記事ID
   * @return {Number|*} 記事IDを返します
   */
  get id():Number {
    return this._id;
  }
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return `${Path.article( this._url, this.id )}?offset=${this.offset}&length=${this.length}`;
  }
  /**
   * @param {string} type 取得コメント種類
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static type( type:string, id:Number, resolve:Function = null, reject:Function = null ):Comments {

    switch ( type ) {

      case CommentsType.SELF :
        return Comments.mine( id, resolve, reject );

      case CommentsType.NORMAL :
        return Comments.normal( id, resolve, reject );

      case CommentsType.OFFICIAL :
        return Comments.official( id, resolve, reject );

      case CommentsType.ALL :
        return Comments.all( id, resolve, reject );

      default :
        console.warn( `Comments type illegal action: ${type}, instead use default` );
        return Comments.all( id, resolve, reject );

    }

  }
  /**
   * コメント一覧, 自分のコメント
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static mine( id:Number, resolve:Function = null, reject:Function = null ):Comments {
    return new Comments( _symbol, id, CommentsType.SELF, resolve, reject );
  }
  /**
   * コメント一覧, 通常ユーザーのコメント
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static normal( id:Number, resolve:Function = null, reject:Function = null ):Comments {
    return new Comments( _symbol, id, CommentsType.NORMAL, resolve, reject );
  }
  /**
   * コメント一覧,公式ユーザーのコメント
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static official( id:Number, resolve:Function = null, reject:Function = null ):Comments {
    return new Comments( _symbol, id, CommentsType.OFFICIAL, resolve, reject );
  }
  /**
   * コメント一覧, 全てのコメント
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static all( id:Number, resolve:Function = null, reject:Function = null ):Comments {
    return new Comments( _symbol, id, CommentsType.ALL, resolve, reject );
  }
}
