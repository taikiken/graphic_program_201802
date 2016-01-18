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
'use strict';

import {Type} from './types/Type';
import {Permalink} from './types/Permalink';
import {Queries} from './types/Quries';

/**
 * API url, path option, query 情報を保持します
 */
export class Types {
  /**
   * @constructor
   * @param {Type} type Type instance
   * @param {Permalink} permalink Permalink instance
   * @param {Queries} queries Queries instance
   * @param {boolean} [auth=false] 認証が必要か否かの真偽値
   */
  constructor( type:Type, permalink:Permalink, queries:Queries, auth:boolean = false ) {

    this._type = type;
    this._permalink = permalink;
    this._queries = queries;
    this._auth = auth;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @method type
   * @returns {Type} Type instance を返します
   */
  get type():Type {

    return this._type;

  }

  /**
   * @method url
   * @return {string} url を返します
   */
  get url():string {

    return this._type.url;

  }

  /**
   * @method method
   * @return {string} method を返します
   */
  get method():string {

    return this._type.method;
  }

  /**
   * @method permalink
   * @returns {Permalink} Permalink instance を返します
   */
  get permalink():Permalink {

    return this._permalink;

  }

  /**
   * @method queries
   * @returns {Queries} Queries instance を返します
   */
  get queries():Queries {

    return this._queries;

  }

  /**
   * @method auth
   * @returns {boolean} 認証が必要か否かの真偽値を返します。 true: 必要
   */
  get auth() {

    return this._auth;

  }
}
