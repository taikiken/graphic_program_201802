/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/17 - 15:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from '../Model';
import {Result} from '../../data/Result';
import {CommentStar} from '../../action/comment/CommentStar';
import {ActionType} from '../../app/const/ActionType';
import {Safety} from '../../data/Safety';

/**
 * コメント GOOD / BAD を行い結果 event を返します
 */
export class ModelCommentStar extends Model {
  /**
   * コメント GOOD / BAD を行い結果 event を返します
   * @param {Number} commentId コメント Id
   * @param {string} type GOOD / BAD どちらか
   * @param {Object} [option={}] optional event handler
   */
  constructor( commentId:Number, type:string, option:Object = {} ) {

    if ( !Safety.normalize( type, [ ActionType.GOOD, ActionType.BAD ] ) ) {
      throw new Error( `type is not correct. ${type}` );
    }

    super( option );

    this.action = type === ActionType.GOOD ?
      CommentStar.good( commentId, this.done.bind( this ), this.fail.bind( this ) ) :
      CommentStar.bad( commentId, this.done.bind( this ), this.fail.bind( this ) );

    /**
     * GOOD / BAD (ActionType.GOOD, ActionType.BAD) どちらか
     * @type {string}
     * @protected
     */
    this._actionType = type;
  }
  /**
   * Ajax request を開始します
   * @param {string} type action type ActionType.DELETE | ActionType.ADD
   */
  start( type:string ):void {

    // console.log( '=============== ModelCommentStar ', this._actionType, type );

    switch ( type ) {

      case ActionType.DELETE:
        this.action.remove();
        break;

      case ActionType.ADD:
        this.action.add();
        break;

      default:
        // console.warn( `ModelCommentStar illegal type. ${type}` );
        break;

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
      let error = new Error( `[MODEL_STAR:UNDEFINED]${this._actionType}.サーバーレスポンスに問題が発生しました。` );
      this.executeSafely( Model.UNDEFINED_ERROR, error, this._actionType );

    } else {

      // 成功 callback
      this.executeSafely( Model.COMPLETE, result, this._actionType );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error ):void {

    this.executeSafely( Model.RESPONSE_ERROR, error, this._actionType );

  }
}
