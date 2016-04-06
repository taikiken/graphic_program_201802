/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 14:45
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {ActionAuthBehavior} from '../ActionAuthBehavior';
import {Api} from '../../net/Api';
import {Path} from '../../app/const/Path';
import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {ActionType} from '../../app/const/ActionType';

let _symbol = Symbol();

/**
 * コメント GOOD / BAD を行います
 */
export class CommentStar extends ActionAuthBehavior {
  /**
   * コメント GOOD / BAD を行います
   * @param {Symbol} target new でインスタンスを作成しないための private symbol
   * @param {Number} commentId コメント Id
   * @param {string} type good or bad
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( target:Symbol, commentId:Number, type:string, resolve:Function = null, reject:Function = null ) {
    if ( _symbol !== target ) {

      throw new Error( 'CommentStar is static Class. not use new CommentStar(). instead CommentStar.add, CommentStar.remove' );

    }
    // 正規化
    // type は good | bad
    // mode は add | delete
    if ( !Safety.normalize( type, [ ActionType.GOOD, ActionType.BAD ] ) ) {
      throw new Error( `type is not correct. ${type}` );
    }

    // 登録
    let add = Api.comment( `${type}:${ActionType.ADD}` );
    // 解除
    let remove = Api.comment( `${type}:${ActionType.DELETE}` );

    // 登録用で super 実行
    super( User.token, add, null, resolve, reject );

    // global へ( super の後 )
    this._add = add;
    this._remove = remove;
    this._commentId = commentId;
  }
  /**
   * コメントId
   * @return {string} コメントIdを返します
   */
  get commentId():Number {
    return this._commentId;
  }
  /**
   * コメントId を設定
   * @param {Number} id コメントId
   */
  set commentId( id:Number ):void {
    this._commentId = id;
  }
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return Path.comment( this._url, this.commentId );
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * start は使えません, add / remove を使用します
   * @param {string} method request method
   */
  start( method:string = '' ):void {
    console.error( 'illegal operation, use start. instead add / delete.' + method );
  }
  /**
   * コメント Good / Bad 登録
   */
  add():void {

    this._ajax.start( this.url, this._add.method, this.success.bind( this ), this.fail.bind( this ), this._resultClass, this._headers );

  }
  /**
   * コメント Good / Bad 解除
   */
  remove():void {

    this._ajax.start( this.url, this._remove.method, this.success.bind( this ), this.fail.bind( this ), this._resultClass, this._headers, this._data );

  }
  // ---------------------------------------------------
  //  static METHOD
  // ---------------------------------------------------
  /**
   * comment good instance 作成
   * @param {Number} commentId コメント Id
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {CommentStar} comment good instance を返します
   */
  static good( commentId:Number, resolve:Function = null, reject:Function = null ):CommentStar {
    return new CommentStar( _symbol, commentId, ActionType.GOOD, resolve, reject );
  }
  /**
   * comment bad instance 作成
   * @param {Number} commentId コメント Id
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {CommentStar} comment bad instance を返します
   */
  static bad( commentId:Number, resolve:Function = null, reject:Function = null ):CommentStar {
    return new CommentStar( _symbol, commentId, ActionType.BAD, resolve, reject );
  }

}
