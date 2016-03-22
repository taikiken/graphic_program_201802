/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 19:51
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
import {Length} from '../../app/const/Length';

/**
 * **認証**（ログイン）<br>
 * Home headline（注目ニュース）
 */
export class HeadlineAuth extends ActionAuth {
  /**
   * <p>Home headline（注目ニュース） データを取得します<br>
   * ** types: Api.home() ** を使用します</p>
   *
   * **認証**（ログイン）
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( User.token, Api.home(), resolve, reject );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * Ajax API url を作成します<br>
   * <code>Api.home().url/headline?offset=0&length=6</code>
   * @return {string} headline API url を返します
   */
  get url():string {

    return `${this._url}/headline?offset=0&length=${Length.headline}`;

  }
}
