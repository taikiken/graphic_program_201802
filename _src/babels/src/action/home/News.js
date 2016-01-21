/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Offset} from '../Offset';
import {Api} from '../../net/Api';

/**
 * home 通常記事一覧
 */
export class News extends Offset {
  /**
   * home 通常記事一覧を取得します<br>
   * length は取得件数です。<b>default: 10</b>を必要なら変更します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor( resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = 10 ) {
    super( Api.home(), resolve, reject, offset, length );
  }
}
