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

import {OffsetAuth} from '../OffsetAuth';

// app
import {User} from '../../app/User';
import {Path} from '../../app/const/Path';
import {CommentsType} from '../../app/const/CommentsType';
import {Length} from '../../app/const/Length';

// net
import {Api} from '../../net/Api';

// data
import {Safety} from '../../data/Safety';

/**
 * {@link Comments} inner Symbol
 * @type {Symbol}
 */
const commentsSymbol = Symbol('Comments symbol');

/**
 * コメント一覧を取得します
 * - 記事ID, token を使いコメント一覧を取得します
 */
export class Comments extends OffsetAuth {
  // ---------------------------------------------------
  //  static METHOD
  // ---------------------------------------------------
  /**
   * 引数 **type** に合わせ Comments instance を作成します
   * @param {string} type 取得コメント種類, CommentsType.SELF|CommentsType.NORMAL|CommentsType.OFFICIAL|CommentsType.ALL が指定可能値です
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static type(type, id, resolve = null, reject = null) {
    switch (type) {
      case CommentsType.SELF :
        return Comments.mine( id, resolve, reject );

      case CommentsType.NORMAL :
        return Comments.normal( id, resolve, reject );

      case CommentsType.OFFICIAL :
        return Comments.official( id, resolve, reject );

      case CommentsType.ALL :
        return Comments.all( id, resolve, reject );

      default :
        // console.warn( `Comments type illegal action: ${type}, instead use default` );
        return Comments.all( id, resolve, reject );
    }
  }
  /**
   * コメント一覧, 自分のコメント - {@link CommentsType}.SELF
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static mine(id, resolve = null, reject = null ) {
    return new Comments(commentsSymbol, id, CommentsType.SELF, resolve, reject);
  }
  /**
   * コメント一覧, 通常ユーザーのコメント - {@link CommentsType}.NORMAL
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static normal(id, resolve = null, reject = null) {
    return new Comments(commentsSymbol, id, CommentsType.NORMAL, resolve, reject);
  }
  /**
   * コメント一覧,公式ユーザーのコメント - {@link CommentsType}OFFICIAL
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static official(id, resolve = null, reject = null) {
    return new Comments(commentsSymbol, id, CommentsType.OFFICIAL, resolve, reject);
  }
  /**
   * コメント一覧, 全てのコメント
   * @param {number} id コメントを取得する記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @return {Comments} Comments instanceを返します
   */
  static all( id, resolve = null, reject = null) {
    return new Comments(commentsSymbol, id, CommentsType.ALL, resolve, reject);
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * コメント一覧
   * - 記事ID, token を使いコメント一覧を取得します - {@link User}.token, {@link Api}.comment
   * - query に offset, length があります
   * @param {Symbol} target Factory pattern のために使用
   * @param {number} id コメントを取得する記事ID
   * @param {string} [type=''] 取得コメント種類, ''|normal|official|self
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {number} [offset=0] query offset 値
   * @param {number} [length=10] query length 値 - {@lik Length}.list
   * */
  constructor(target, id, type = '', resolve = null, reject = null, offset = 0, length = Length.list) {
    if (commentsSymbol !== target) {
      throw new Error( 'not use new Comments(). instead Comments.all() or Comments.normal() or Comments.official() or Comments.mine()' );
    }
    const altType = Safety.string(type, '');
    // ---
    super(User.token, Api.comment(altType), resolve, reject, offset, length);
    /**
     * コメントを取得する記事ID
     * @type {number}
     * @protected
     */
    this._id = id;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 記事ID
   * @return {number|*} 記事IDを返します
   */
  get id() {
    return this._id;
  }
  /**
   * url を作成します - {@link Path}.article
   * @return {string} 作成した url を返します
   */
  get url() {
    return `${Path.article(this._url, this.id)}?offset=${this.offset}&length=${this.length}`;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  // reload 追加
  /**
   * 再読み込みを行います
   * - コメントが送信されたり削除された時に画面を更新するために行います
   * - 先頭(offset=0)から現在読み込まれた位置までを再読み込みします
   * - 読み込み開始時に「再読み込みフラッグ」(`this.reloadFlag`, `this._reload`)を true にします
   */
  reload() {
    /**
     * 再読み込みフラッグ
     * @override
     * @type {boolean}
     */
    this.reloadFlag = true;
    let url = `${Path.article( this._url, this.id )}?offset=0&length=${this.offset}`;
    this.ajax.start( url, this.method, this.boundSuccess, this.boundFail, this.resultClass, this.headers );
  }
}
