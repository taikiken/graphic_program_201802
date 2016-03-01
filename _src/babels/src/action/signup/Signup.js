/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/22 - 14:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ActionBehavior} from '../ActionBehavior';
import {Api} from '../../net/Api';

/**
 * signup, 新規登録
 */
export class Signup extends ActionBehavior {
  /**
   * signup, 新規登録
   * @param {FormData} [formData=null] FormData リクエストで必要の場合に使用します email:string 必須です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( formData:FormData, resolve:Function = null, reject:Function = null ) {
    super( Api.join(), formData, resolve, reject );
  }
}
