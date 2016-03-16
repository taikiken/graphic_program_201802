/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/16 - 16:31
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
 * ソーシャル経由のログイン
 */
export class Social extends Action {
  /**
   * <p>ソーシャル経由のログイン</p>
   * ソーシャルのID、アクセストークンで会員登録の有無を判断。
   * 会員登録されていれば通常のログインと同じユーザ情報を返し、登録されていなければアプリは空で、ウェブはSNSで取得できた情報（name, email, profile_picture, bioのみ）を返す。
   ※ 以前登録されていたソーシャルのアクセストークンが変わっていれば更新する
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( Api.sns(), resolve, reject );
  }
}
