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


/**
 * Types.url へ追加可能なpathがあるかどうかを管理します
 *
 *
 * @example
 * new Permalink( [ 'category', '' ] );
 *
 * @example
 * searchのようにどんなワードでも良い場合は "*" を指定する
 * new Permalink( [ '*' ] );
 *
 *
 */
export class Permalink {
  /**
   * パスオプションを指定、ない時は空配列
   *
   * @param {Array} [paths] 追加 path を配列で設定
   * @param {Boolean} [need=false] 追加 path が必須かを設定。true: 必須, false: オプション
   */
  constructor( paths:Array<string> = [], need:Boolean = false ) {

    this._paths = paths;
    this._need = need;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * オプションパスが必須かのプロパティ
   * @return {Boolean} オプションパスが必須かどうかを返します true: 必須
   */
  get require():Boolean {

    return this._need;

  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * option path 数
   * @return {Number} paths数を返します
   */
  length():Number {

    return this._paths.length;

  }

  /**
   * @param {string} path 調べたいオプションパス
   * @return {Boolean} 指定パスが存在するかの真偽値を返します
   */
  has( path:string ):Boolean {

    let paths = this._paths;
    let result = paths.indexOf( path ) !== -1;

    if ( !result ) {

      result = paths.indexOf( '*' ) !== -1;

    }

    return result;

  }

}
