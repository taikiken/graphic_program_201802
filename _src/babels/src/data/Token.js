/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/27 - 18:29
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from './Safety';

let _symbol = Symbol();

/**
 * <h3>Fetch Request Headers [token] を作成します</h3>
 * 全て static
 */
export class Token {
  /**
   * <p>Authorization token を作成します</p>
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Api is static Class. not use new Api().` );

    }

  }
  /**
   * Ajax request の時に Fetch.Header にセットする Authorization を作成します
   * @param {string} token auth token
   * @param {Object} [option={}] headers object, ない時は新規に作ります
   * @return {*} headers へセットする Object を返します
   */
  static token( token:string, option:Object = {} ):Object {

    // token が正しい形式でない時は null を返します
    if ( token === null || typeof token === 'undefined' || token === '' ) {
      return null;
    }

    option = Safety.object( option );
    option.Authorization = `OAuth realm=undotsushin.com, oautn_token=${token}`;
    // option.Accept = 'application/json';
    // option[ 'Access-Control-Allow-Origin"' ] = '*';
/*
    option = new Headers();
    option.append( 'Authorization', `OAuth realm=undotsushin.com, oautn_token=${token}` );
    option.append( 'Access-Control-Allow-Origin', '*' );
*/
    return option;

  }
}
