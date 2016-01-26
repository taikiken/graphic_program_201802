/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/22 - 18:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * article.user.type
 */
export class TypeDae {
  /**
   * article.user.type
   * @param {Object} [type={}] article.user.type
   */
  constructor( type:Object = {} ) {

    this._type = type;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Object|*} article.user.type
   */
  get type():Object {
    return this._type;
  }
  /**
   * ユーザータイプID
   *
   * @example
   * 6 : 一般ユーザー
   * 5 : 公式ユーザー
   * 4 : 編集部ユーザ
   * 3 : メディアユーザー(ex. ニッカンスポーツ)
   *
   * @return {Number} article.user.type.id ユーザータイプID
   */
  get id():Number {
    return this.type.id;
  }
  /**
   * ユーザーラベル
   *
   * @example
   * 公式
   *
   * @return {string|*} article.user.type.label
   */
  get label():string {
    return this.type.label;
  }
}
