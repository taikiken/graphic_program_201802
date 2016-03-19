/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 21:39
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
import {Safety} from '../../data/Safety';
import {User} from '../../app/User';
import {Length} from '../../app/const/Length';

/**
 * 記事一覧, カテゴリー別, 全て...
 * token 付き
 */
export class CategoryAuth extends OffsetAuth {
  /**
   * **要認証** 記事一覧を取得します + token
   * @param {string} [slug=all] category slug です
   * @param {string} [type=''] request type, '' | 'ranking' | 'video' です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   * */
  constructor( slug:string = 'all', type:string = '', resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.archive ) {
    slug = Safety.string( slug, 'all' );
    type = Safety.string( type, '' );

    super( User.token, Api.category(), resolve, reject, offset, length );
    this._slug = slug;

    if ( Safety.normalize( type, [ '', 'ranking', 'video' ] ) ) {

      this._type = type;

    } else {

      this._type = '';

    }
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * category slug
   * @return {string|*} category slug を返します
   */
  get slug():string {

    return this._slug;

  }
  /**
   * category request 種類('', ranking, video)
   * @return {string|*} request type('', ranking, video) を返します
   */
  get type():string {

    return this._type;

  }
  /**
   * Ajax API url を作成します
   * Api.category().url/all|slug[/ranking]?offset=0&length=5
   * @return {string} API url を返します
   */
  get url():string {

    if ( this.type === '' ) {

      // type が empty, 新着順
      return `${this._url}/${this.slug}?offset=${this.offset}&length=${this.length}`;

    } else {

      // type が ranking | video
      return `${this._url}/${this.slug}/${this.type}?offset=${this.offset}&length=${this.length}`;

    }

  }
}
