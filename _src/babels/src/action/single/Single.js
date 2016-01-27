/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:54
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
import {Path} from '../../app/Path';

/**
 * 記事詳細を取得します
 */
export class Single extends Action {
  /**
   * 記事詳細を記事IDから取得します
   * @param {Number|String} id 記事ID
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( id:Number, resolve:Function = null, reject:Function = null ) {

    super( Api.single(), resolve, reject );
    // parseInt すると先頭0が消えるのでまずい気がする
    // this._id = parseInt( id, 10 );
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
    // return `${this._url}/${this.id}`;
    return Path.article( this._url, this.id );
  }

}
