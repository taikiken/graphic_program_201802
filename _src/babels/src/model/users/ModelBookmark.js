/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 21:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from '../Model';
import {Result} from '../../data/Result';
import {Bookmark} from '../../action/bookmark/Bookmark';

/**
 * bookmark 登録・解除
 */
export class ModelBookmark extends Model {
  /**
   * bookmark 登録・解除 を行い event を発火します
   * @param {Number} articleId 記事 Id
   * @param {Object} [option={}] optional event handler
   */
  constructor( articleId:Number, option:Object = {} ) {
    super( option );
    this._action = new Bookmark( articleId, this.done.bind( this ), this.fail.bind( this ) );
    this._articleId = articleId;
  }
  /**
   * Ajax request を開始します
   * @param {boolean} add 追加: true / 削除: false
   */
  start( add:boolean ):void {

    if ( !!add ) {
      this.action.add();
    } else {
      this.action.remove();
    }

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let response = result.response;

    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( `[MODEL_BOOKMARK:UNDEFINED]サーバーレスポンスに問題が発生しました。` );
      this.executeSafely( Model.UNDEFINED_ERROR, error );

    } else {

      // 成功 callback
      this.executeSafely( Model.COMPLETE, result );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error ):void {

    this.executeSafely( Model.RESPONSE_ERROR, error );

  }
}
