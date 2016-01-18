/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/10 - 14:37
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

/**
 * Types.url へ追加可能なpathがあるかどうかを管理します
 */
export class Permalink {
  /**
   * パスオプションを指定、ない時は空配列
   *
   *      // example
   *      new Permalink( [ 'category', '' ] );
   *
   *      // searchのようにどんなワードでも良い場合は "*" を指定する
   *      new Permalink( [ '*' ] );
   *
   * @constructor
   * @param {Array} [paths] 追加 path を配列で設定
   * @param {boolean} [need=false] 追加 path が必須かを設定。true: 必須, false: オプション
   */
  constructor( paths:Array<string> = [], need:boolean = false ) {

    this._paths = paths;
    this._need = need;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * オプションパスが必須かのプロパティ
   * @method require
   * @returns {boolean} オプションパスが必須かどうかを返します true: 必須
   */
  get require():boolean {

    return this._need;

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * option path 数
   * @method length
   * @returns {Number} paths数を返します
   */
  length():Number {

    return this._paths.length;

  }

  /**
   * @method has
   * @param {string} path 調べたいオプションパス
   * @returns {boolean} 指定パスが存在するかの真偽値を返します
   */
  has( path:string ):boolean {

    let paths = this._paths;
    let result = paths.indexOf( path ) !== -1;

    if ( !result ) {

      result = paths.indexOf( '*' ) !== -1;

    }

    return result;

  }

}
