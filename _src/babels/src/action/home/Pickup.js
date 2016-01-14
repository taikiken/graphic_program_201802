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
import {Result} from '../../data/Result';

/**
 * Home pickup(slider)
 */
export class Pickup extends Action {
  /**
   * Home pickup(slider) データを取得します
   * types: Api.home() を使用します
   * @constructor
   */
  constructor() {
    super( Api.home() );
  }

  /**
   * Ajax API url を作成します
   * Api.home().url/pickup?offset=0&length=5
   * @method url
   * @returns {string} pickup API url を返します
   */
  url():string {

    return `${this._types.url}/pickup?offset=0&length=5`;

  }


  /**
   * Ajax success callback
   * @param {Result} result Ajax成功結果
   */
  success( result:Result ):void {

    // success
    console.log( `result: ${result}` );

  }

  /**
   * Ajax error callback
   * @param {Error} error Ajax失敗結果
   */
  fail( error:Error ):void {

    // error
    console.log( `error: ${error}` );

  }
}
