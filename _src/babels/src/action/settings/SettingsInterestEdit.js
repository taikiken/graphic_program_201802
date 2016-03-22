/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/01 - 21:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {ActionAuthBehavior} from '../ActionAuthBehavior';

import {User} from '../../app/User';
import {Api} from '../../net/Api';

/**
 * ユーザー設定画面で興味のある競技を編集する
 */
export class SettingsInterestEdit extends ActionAuthBehavior {
  /**
   * ユーザー設定画面で興味のある競技を編集する
   * @param {FormData} [formData=null] FormData リクエストで必要の場合に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( formData:FormData, resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.settings( 'interest:edit' ), formData, resolve, reject );
  }
}
