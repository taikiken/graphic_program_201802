/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 15:38
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
 * 記事一覧, カテゴリー別, 全て...
 */
export class Category extends Offset {
  /**
   * 記事一覧を取得します
   * @param {string} [slug=all] category slug です
   * @param {string} [type=] ’’request type, ''|ranking|video です
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   */
  constructor( slug:string = 'all', type:string = '', resolve:Function = null, reject:Function = null ) {
    super( Api.category(), resolve, reject );
    this._slug = slug;
    this._type = Category.normalization( type );
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @returns {string|*} category slug を返します
   */
  get slug():string {

    return this._slug;

  }
  /**
   * @returns {string|*} request type('', ranking, video) を返します
   */
  get type():string {

    return this._type;

  }
  /**
   * Ajax API url を作成します
   * Api.category().url/all|slug[/ranking]?offset=0&length=5
   * @method url
   * @returns {string} API url を返します
   */
  get url():string {

    if ( this.type === '' ) {

      // type が empty, 新着順
      return `${this._url}/${this.slug}??offset=${this.offset}&length=${this.length}`;

    } else {

      // type が ranking | video
      return `${this._url}/${this.slug}/${this.type}??offset=${this.offset}&length=${this.length}`;

    }

  }

  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * @param {string} type 調べる request type
   * @returns {*} type を正規化(''|ranking|video)し返します
   */
  static normalization( type:string ):string {

    if ( type !== '' && type !== 'ranking' && type !== 'video' ) {

      type = '';

    }

    return type;

  }
}
