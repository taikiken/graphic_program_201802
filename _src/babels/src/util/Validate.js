/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/04 - 17:26
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


let _symbol = null;

/**
 * 入力チェック
 */
export class Validate {
  /**
   * <h4>入力チェック</h4>
   * <p>static class です, instance を作成しません</P>
   * @param {Symbol} target Singleton を実現するための private symbol
   */
  constructor( target:Symbol ) {

    if ( _symbol !== target ) {

      throw new Error( `Validate is static Class. not use new Validate().` );

    }

  }
  /**
   * email 形式かを調べます
   * @param {string} email メールアドレス
   * @return {boolean} メールアドレス型チェック 真偽値 true: 正しい を返します
   */
  static email( email:string ):boolean {
    return !!email.match(/^[\w!#$%&'*+\/=?\^_@{}\\|~\-]+([\w!#$%&'*+\/=?\^_{}\\|~\.\-]+)*@([\w][\w\-]*\.)+[\w][\w\-]*$/);
  }

  /**
   * アルファベット, 数字かを調べます
   * @param {string} string 調査対象文字列
   * @return {boolean} 合致するか否かの真偽値を返します
   */
  static alphaNum( string:string ):boolean {
    return !!string.match(/^[a-z0-9]+$/i);
  }
}
