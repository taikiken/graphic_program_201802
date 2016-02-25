/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 15:40
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ActionBehavior} from '../ActionBehavior';

import {Result} from '../../data/Result';
import {Api} from '../../net/Api';

/**
 * login action
 */
export class Login extends ActionBehavior {
  /**
   * login を行います
   * @param {FormData} formData FormData email, password
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */
  constructor( formData:FormData = null, resolve:Function = null, reject:Function = null, ResultClass = Result ) {
    super( Api.login(), formData, resolve, reject, ResultClass );
  }
}
