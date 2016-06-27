/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/03 - 16:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {ActionAuth} from '../ActionAuth';
import {Api} from '../../net/Api';
import {User} from '../../app/User';

/**
 * <p>ユーザー情報・マイページの表示に利用</p>
 * 自分の情報
 */
export class UsersSelf extends ActionAuth {
  /**
   * <p>自分の情報 を取得する</p>
   * **認証**（ログイン）要
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.users( 'self' ), resolve, reject );
  }
}
