/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 21:34
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ActionAuth} from '../ActionAuth';

import {User} from '../../app/User';
import {Api} from '../../net/Api';

/**
 * ユーザー設定画面で興味のある競技を取得する
 */
export class SettingsInterest extends ActionAuth {
  /**
   * ユーザー設定画面で興味のある競技を取得する
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.settings( 'interest' ), resolve, reject );
  }
}
