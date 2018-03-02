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


import {Safety} from '../../data/Safety';

/**
 * article.user.type
 */
export class TypeDae {
  /**
   * article.user.type
   * @param {Object} [type={}] article.user.type
   */
  constructor( type:Object = {} ) {

    type = Safety.object( type );
    /**
     * article.user.type
     * @type {Object}
     * @protected
     */
    this._type = type;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * article.user.type
   * @return {Object|*} article.user.type
   */
  get type():Object {
    return this._type;
  }
  /**
   * ユーザータイプID
   *
   * <pre>
   * 6 : 一般ユーザー
   * 5 : 公式ユーザー
   * 4 : 編集部ユーザ
   * 3 : メディアユーザー(ex. ニッカンスポーツ)
   * </pre>
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