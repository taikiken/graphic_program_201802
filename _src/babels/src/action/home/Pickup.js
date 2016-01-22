/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:49
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
 * Home pickup(slider)
 */
export class Pickup extends Action {
  /**
   * Home pickup(slider) データを取得します<br>
   * ** types: Api.home() ** を使用します
   *
   * @example
   * function done( result ) {
   *    console.log( 'success', result.response );
   *    console.log( 'success', result.status );
   *    console.log( 'success', result.request );
   *  }
   *
   * function fail( error ) {
   *    console.log( 'error', error );
   *  }
   *
   * var headline = new Headline( done, fail );
   * headline.start();
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( Api.home(), resolve, reject );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * Ajax API url を作成します<br>
   * <code>Api.home().url/pickup?offset=0&length=5</code>
   * @method url
   * @return {string} pickup API url を返します
   */
  get url():string {

    return `${this._url}/pickup?offset=0&length=5`;

  }

}
