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
'use strict';

import {ActionAuthBehavior} from '../ActionAuthBehavior';
import {Api} from '../../net/Api';
import {Path} from '../../app/const/Path';
import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {CommentsType} from '../../app/const/CommentsType';

/**
 * コメント GOOD / BAD を行います
 */
export class CommentStar extends ActionAuthBehavior {
  /**
   * コメント GOOD / BAD を行います
   * @param {Number} commentId コメント Id
   * @param {string} type good or bad
   * @param {string} mode add or delete
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( commentId:Number, type:string, mode:string, resolve:Function = null, reject:Function = null ) {
    // 正規化
    // type は good | bad
    // mode は add | delete
    if ( !CommentStar.normalize( type, [ CommentsType.GOOD, CommentsType.BAD ] ) ) {
      throw new Error( `type is not correct. ${type}` );
    }
    if ( !CommentStar.normalize( mode, [ CommentsType.ADD, CommentsType.DELETE ] ) ) {
      throw new Error( `mode is not correct. ${mode}` );
    }

    super( User.token, Api.comment( `${type}:${mode}` ), null, resolve, reject );
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
  /**
   * 引数が正規なものかをチェックします
   * @param {string} target 調査対象
   * @param {Array<string>} allowed 正しい対象値
   * @return {boolean}
   */
  static normalize( target:string, allowed:Array<string> ):boolean {
    var bool = false;
    for ( var value of allowed ) {
      if ( target === value ) {
        bool = true;
        break;
      }
    }
    return bool;
  }
}
