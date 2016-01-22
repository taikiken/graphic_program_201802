/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 16:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Query} from './Query';

/**
 * Query{key: value} を配列で管理します
 */
export class Queries {
  /**
   * Query 情報を保持します
   * @param {Array<Query>} [queries=[]] Query{key: value} 配列
   */
  constructor( queries:Array<Query> = [] ) {

    this._queries = queries;

  }

  /**
   * queries個数であるかないかの判断は可能
   * @method length
   * @return {Number} queries個数を返します
   */
  length():Number {

    return this._queries.length;

  }

  /**
   * @method all
   * @return {Array.<Query>} 全てのqueriesを返します
   */
  all():Array<Query> {

    return this._queries;

  }

  /**
   * key から query を探します
   * @method search
   * @param {string} key query key name, ?start=0 の start
   * @return {*} {{key: string, type: string, require: boolean, value: *}}|null を返します
   */
  search( key ):Query {

    var queries = this._queries;
    var result;

    for ( var query of queries ) {

      result = query.search( key );
      if ( result !== null ) {
        break;
      }

    }

    return result;

  }
}
