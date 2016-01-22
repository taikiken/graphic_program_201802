/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

/**
 * 表示を行います
 */
export class View {
  /**
   * action/Headline を使い Ajax request 後 element へ dom を作成します
   * @param {Element} element root element
   * @param {Object} [option={}] optional event handler
   */
  constructor( element, option:Object = {} ) {

    this._element = element;
    this._option = option;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} render root element を返します
   */
  get element():Element {
    return this._element;
  }

  /**
   *
   * @return {Object|*} callback handler がセットされたObjectを返します
   */
  get option():Object {
    return this._option;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * option Object に kyeName が存在し型が function かを調べ関数を実行する
   * @param {string} keyName 存在チェックを行う関数キー名
   */
  executeSafely( keyName ):void {

    let option = this.option;
    if ( option.hasOwnProperty( keyName ) && typeof option[ keyName] === 'function' ) {

      option[ keyName ]();

    }

  }
}
