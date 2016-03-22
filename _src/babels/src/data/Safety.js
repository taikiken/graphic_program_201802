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


let _symbol = Symbol();

/**
 * <h3>データが安全かを調べます</h3>
 * 全て static
 */
export class Safety {
  /**
   * データが安全かを調べます
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

    type = Safety.string( type, 'string' );
    type = type.toLowerCase();

    if ( type === 'array' ) {

      return object.hasOwnProperty( keyName ) && Array.isArray( object[ keyName ] );

    } else {

      return object.hasOwnProperty( keyName ) && typeof object[ keyName ] === type;

    }

  }
  /**
   * 配列かを調べ必ず Array 型を返します
   * @param {*} [value=[]] 配列かを調べる対象
   * @return {Array} 必ず配列を返します。引数が配列で無い時は空配列を返します
   */
  static array( value:Array = [] ):Array {
    if ( !Array.isArray( value ) ) {
      // 参照が残らないように返します
      return [].slice(0);
    }

    return value;
  }
  /**
   * Objectかを調べ null は {} に変え返します
   * @param {*} [value={}] Objectかを調べる対象
   * @return {Object} 必ずObjectを返します。引数が null の時は空Objectを返します
   */
  static object( value:Object = {} ):Object {
    if ( value === null || typeof value === 'undefined' ) {
      // 参照が残らないように返します
      value = Object.create( {} );
    }

    return value;
  }
  /**
   * string 型かを調べ null の時は default value をセットします
   * @param {string} value 調査対象
   * @param {string} defaultValue null の時にセットする値
   * @return {string} 文字型を返します
   */
  static string( value:string, defaultValue:string ):string {

    if ( value === null || typeof value === 'undefined' ) {
      value = defaultValue;
    }

    return value;
  }
  /**
   * integer かを調べ null の時は default value をセットします
   * @param {Number} value 調査対象
   * @param {Number} defaultValue null の時にセットする値
   * @return {Number} Number 型を返します
   */
  static integer( value:Number, defaultValue:Number ):Number {

    if ( !Number.isInteger( value ) ) {
      value = defaultValue;
    }

    return value;
  }
  /**
   * Element かどうかを調べます
   * @param {Element} element 調査対象 Element
   * @returns {boolean} Element かどうかの真偽値を返します
   */
  static isElement( element:Element ):boolean {
    return element !== null && typeof element !== 'undefined' && 'appendChild' in element;
  }

  /**
   * FormData かどうかを調べます
   * @param {FormData} formData 調査対象 FormData
   * @returns {boolean} FormData かどうかの真偽値を返します
   */
  static isFormData( formData:FormData ):boolean {
    return formData !== null && typeof formData !== 'undefined' && 'append' in formData;
  }
  /**
   * ファイル名から拡張子を取得します
   * @param {string} fileName 取得したいファイル名称
   * @returns {string} ファイル名の拡張子を返します
   */
  static getExtension( fileName:string ):string {
    // http://stackoverflow.com/questions/190852/how-can-i-get-file-extensions-with-javascript
    var split = fileName.split( '.' );

    if ( split.length === 1 || ( split[0] === '' && split.length === 2 ) ) {
      console.warn( `not correct file name. ${fileName}` );
      return '';
    }

    return split.pop().toLowerCase();
  }
  /**
   * 拡張子から画像ファイルかを調べます
   * @param {string} fileName 調査対象ファイル名
   * @returns {boolean} 'jpg', 'png', 'jpeg', 'gif', 'svg' のいづれかに該当するかの真偽値を返します
   */
  static isImg( fileName:string ):boolean {
    return ['jpg', 'png', 'jpeg', 'gif', 'svg'].indexOf( Safety.getExtension( fileName ) ) !== -1;
  }
  /**
   * 引数が正規なものかをチェックします
   * @param {string} target 調査対象
   * @param {Array<string>} allowed 正しい対象値
   * @return {boolean} 引数が正規なものかをチェックし true / false を返します
   */
  static normalize( target:string, allowed:Array<string> ):boolean {
    var bool = false;
    for ( var value of allowed ) {
      if ( target === value ) {
        bool = true;
        break;
      }
    }
    return bool;
  }
  /**
   * path に `graph.facebook.com` が含まれているかを調べます
   * @param {string} path 調査対象パス
   * @return {boolean} ath に `graph.facebook.com` が含まれているかの真偽値を返します
   */
  static isGraph( path:string ):Boolean {
    return path.indexOf( 'graph.facebook.com' ) !== -1;
  }
}
