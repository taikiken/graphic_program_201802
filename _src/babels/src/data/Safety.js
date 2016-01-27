/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 16:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

let _symbol = Symbol();

/**
 * <h3>データが安全かを調べます</h3>
 * 全て static
 */
export class Safety {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Safety is static Class. not use new Safety().` );

    }

  }

  /**
   * object に keyName が存在することと type があっているかを調べます
   * @param {Object} object 調査対象 Object
   * @param {string} keyName 調査対象キー名称
   * @param {string} [type=string] 調査対象型
   * @return {boolean} 調べた結果を真偽値で返します
   */
  static check( object:Object, keyName:string, type:string = 'string' ):boolean {

    type = type.toLowerCase();

    if ( type === 'array' ) {

      return object.hasOwnProperty( keyName ) && Array.isArray( object[ keyName ] );

    } else {

      return object.hasOwnProperty( keyName ) && typeof object[ keyName ] === type;

    }

  }
}
