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
  constructor( resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.list ) {
    super( User.token, Api.notice( '' ), resolve, reject, offset, length );
  }
  // reload 追加
  /**
   * 再読み込み
   * お知らせを擬似リアルタイムに更新するのに使用します
   * アプリケーションは「お知らせ数取得間隔（60s）」で発火する通知イベントを listen し reload させます
   */
  reload():void {
    // this._reload = true;
    /**
     * 再読み込みフラッグ
     * @type {boolean}
     */
    this.reloadFlag = true;
    let url = `${this._url}?offset=0&length=${this.offset}`;
    this.ajax.start( url, this.method, this.boundSuccess, this.boundFail, this.resultClass, this.headers );
  }
}
