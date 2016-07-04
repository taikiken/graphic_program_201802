/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 17:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Type} from './types/Type';
import {Permalink} from './types/Permalink';
import {Queries} from './types/Queries';

/**
 * API url, path option, query 情報を保持します
 */
export class Types {
  /**
   * API url, path option, query 情報
   * @param {Type} type Type instance, url, method を 保持します
   * @param {Permalink} permalink Permalink instance, Types.url へ追加可能なpathがあるかどうかを管理します
   * @param {Queries} queries Queries instance, Query{key: value} を配列で管理します
   * @param {Boolean} [auth=false] 認証が必要か否かの真偽値
   */
  constructor( type:Type, permalink:Permalink, queries:Queries, auth:Boolean = false ) {
    /**
     * url, method を 保持する Type instance
     * @type {Type}
     * @protected
     */
    this._type = type;
    /**
     * Permalink instance, Types.url へ追加可能なpathがあるかどうかを管理します
     * @type {Permalink}
     * @protected
     */
    this._permalink = permalink;
    /**
     * Queries instance, Query{key: value} を配列で管理します
     * @type {Queries}
     * @protected
     */
    this._queries = queries;
    /**
     * 認証が必要か否かの真偽値
     * @type {Boolean}
     * @private
     */
    this._auth = auth;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * Type instance
   * @return {Type} Type instance を返します
   */
  get type():Type {

    return this._type;

  }

  /**
   * Ajax request url
   * @return {string} url を返します
   */
  get url():string {

    return this._type.url;

  }

  /**
   * request method
   * POST|GET|PUT|DELETE
   * @return {string} method を返します
   */
  get method():string {

    return this._type.method;
  }

  /**
   * Permalink instance
   * @return {Permalink} Permalink instance を返します
   */
  get permalink():Permalink {

    return this._permalink;

  }

  /**
   * Queries instance
   * @return {Queries} Queries instance を返します
   */
  get queries():Queries {

    return this._queries;

  }

  /**
   * 認証が必要か否
   * @return {Boolean} 認証が必要か否かの真偽値を返します。 true: 必要
   */
  get auth() {

    return this._auth;

  }
}
