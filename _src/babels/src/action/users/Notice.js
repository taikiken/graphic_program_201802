/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 19:56
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
 * お知らせ(header / 一覧) を表示します
 */
export class Notice extends OffsetAuth {
  /**
   * お知らせ一覧を取得
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor( resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.archive ) {
    super( User.token, Api.notice( '' ), resolve, reject, offset, length );
  }
  // reload 追加
  /**
   * 再読み込み
   */
  reload():void {
    this._reload = true;
    let url = `${this._url}?offset=0&length=${this.offset}`;
    this._ajax.start( url, this.method, this._boundSuccess, this._boundFail, this._resultClass, this._headers );
  }
}
