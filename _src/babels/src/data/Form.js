/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/17 - 18:20
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Data} from './Data';

let _symbol = Symbol();

/**
 * Ajax request で送信する body 要素を作成します
 */
export class Form {
  /**
   * static class です、instance を作成できません
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target ) {

    if ( _symbol !== target ) {

      throw new Error( `Form is static Class. not use new Form().` );

    }

  }
  /**
   * 配列からFormDataを作成します
   * @param {Array<Data>} option [data...] key: value 値 配列
   * @return {FormData} 引数 option（配列）から作成したFormData instance を返します
   */
  static data( option:Array<Data> ):FormData {

    // https://developer.mozilla.org/ja/docs/Web/Guide/Using_FormData_Objects
    let form = new FormData();

    for ( var data of option ) {

      form.append( data.key, data.value );

    }

    return form;

  }
  /**
   * form element から FormData を作成します
   *
   * @example
   * let data = Form.element( document.querySelector("form") )
   *
   * @param {Element} formElement form element
   * @return {FormData} element から FormData を作成し返します
   */
  static element( formElement:Element ):FormData {

    return new FormData( formElement );

  }

}
