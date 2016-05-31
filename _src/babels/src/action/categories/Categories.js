/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 14:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Action} from '../Action';
import {Api} from '../../net/Api';
// import {Path} from '../../app/const/Path';

/**
 * カテゴリー一覧 - 記事のカテゴリー自体の取得<br>
 * category 一覧を取得します<br>
 *
 * ```
 * GET
 * /api/v1/category
 * ```
 */
export class Categories extends Action {
  /**
   * category 一覧を取得します<br>
   * menu 作成など category 全ての category 一覧が必要な時に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( resolve:Function = null, reject:Function = null ) {
    super( Api.categories(), resolve, reject );
  }
}
