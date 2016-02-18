/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 14:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ActionAuth} from '../ActionAuth';
import {Api} from '../../net/Api';
import {User} from '../../app/User';
import {Path} from '../../app/const/Path';

/**
 * 記事詳細を取得します
 * **ログインユーザー**
 */
export class SingleAuth extends ActionAuth {
  /**
   * 記事詳細を記事IDから取得します
   * **ログインユーザー**
   * @param {Number} id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( id:Number, resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.single(), resolve, reject );
    this._id = id;
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
    return Path.article( this._url, this.id );
  }
}
