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
 * Home headline（注目ニュース）
 * - token つき 認証（ログイン）
 */
export class HeadlineAuth extends ActionAuth {
  /**
   * Home headline（注目ニュース） データを取得します - **認証**（ログイン） token 付き
   * - types: Api.home() ** を使用します
   *
   * [memo]
   * - 2018-01-11 sp / pc 取得件数変更になる
   * - UNDO_SPBL-333 【WEB:SP:headline】取得件数を変える - https://aws-plus.backlog.jp/view/UNDO_SPBL-333
   * ```
   * PC : 5件固定 ( 右下に広告が配置されるため / 記事が奇数でないとレイアウト崩れる?という都合があったはず)
   * SP : 6件固定ではなくCMSから設定している分表示 ( APIのレスポンス分 )
   * -- ex. https://sportsbull.jp/api/v1/articles/self/headline ( length 指定なし )
   * ```
   * @param {function} [resolve=null] Ajax 成功時の callback
   * @param {function} [reject=null] Ajax 失敗時の callback
   * @param {boolean} [sp=false] sp flag - 取得件数が異なる為に使用します
   */
  constructor(resolve = null, reject = null, sp = false) {
    super(User.token, Api.home(), resolve, reject);
    /**
     * sp flag - 取得件数が異なる為に使用します
     * @type {boolean}
     */
    this.sp = sp;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * Ajax API url を作成します<br>
   * ```
   * Api.home().url/headline?offset=0&length=6
   * ```
   * @return {string} headline API url を返します
   */
  get url() {
    // return `${this._url}/headline?offset=0&length=${Length.headline}`;
    return this.sp ?
      `${this.path}/headline` :
      `${this.path}/headline?offset=0&length=${Length.headline}`;
  }
}
