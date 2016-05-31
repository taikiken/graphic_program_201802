/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 14:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Category} from './Category';
import {Safety} from '../../data/Safety';

/**
 * PC: sidebar<br>
 * 動画一覧
 *
 * ```
 * GET
 * /api/v1/articles/category/{all|:category_slug}[/|/ranking|/video]
 * ```
 *
 */
export class Videos extends Category {
  /**
   * おすすめ動画一覧を取得します
   * @param {string} [slug=all] category slug です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( slug:string = 'all', resolve:Function = null, reject:Function = null ) {

    slug = Safety.string( slug, 'all' );
    super( slug, 'video', resolve, reject );

  }

}
