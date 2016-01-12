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
   *
   * @param {Type} type Type instance
   * @param {Permalink} permalink Permalink instance
   * @param {Queries} queries Queries instabce
   */
  constructor( type:Type, permalink:Permalink, queries:Queries ) {

    this._type = type;
    this._permalink = permalink;
    this._queries = queries;

  }

  /**
   *
   * @returns {Type} Type instance を返します
   */
  type():Type {

    return this._type;

  }

  /**
   *
   * @returns {Permalink} Permalink instance を返します
   */
  permalink():Permalink {

    return this._permalink;

  }

  /**
   *
   * @returns {Queries} Queries instance を返します
   */
  queries():Queries {

    return this._queries;

  }
}
