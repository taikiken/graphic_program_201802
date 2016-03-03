/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/03 - 22:16
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

/**
 * 退会処理
 */
export class SignOut extends ActionAuth {
  /**
   * 退会
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.leave(), resolve, reject );
  }
}
