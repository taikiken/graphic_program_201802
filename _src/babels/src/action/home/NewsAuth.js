/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 19:55
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {OffsetAuth} from '../OffsetAuth';
import {Api} from '../../net/Api';
import {User} from '../../app/User';
import {Length} from '../../app/const/Length';

/**
 * **認証**（ログイン）<br>
 * home 通常記事一覧
 */
export class NewsAuth extends OffsetAuth {
  /**
   * <p>home 通常記事一覧を取得します<br>
   * length は取得件数です。</p>
   * ** default: 10 ** を必要なら変更します
   *
   * **認証**（ログイン）
   *
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor( resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.archive ) {
    super( User.token, Api.home(), resolve, reject, offset, length );
  }
}
