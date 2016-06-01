/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 13:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {OffsetAuth} from '../OffsetAuth';
import {Api} from '../../net/Api';
// import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {Length} from '../../app/const/Length';

/**
 * <p>ユーザーページのブックマーク一覧</p>
 */
export class Bookmarks extends OffsetAuth {
  /**
   * ユーザーページのブックマーク一覧
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor( resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.list ) {
    super( User.token, Api.users( 'self:bookmark' ), resolve, reject, offset, length );
  }
}
