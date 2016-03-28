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
   * @return {Boolean} 調べた結果を真偽値で返します
   */
  static check( object:Object, keyName:string, type:string = 'string' ):Boolean {

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
   * @returns {Boolean} Element かどうかの真偽値を返します
   */
  static isElement( element:Element ):Boolean {
    return element !== null && typeof element !== 'undefined' && 'appendChild' in element;
  }

  /**
   * FormData かどうかを調べます
   * @param {FormData} formData 調査対象 FormData
   * @returns {Boolean} FormData かどうかの真偽値を返します
   */
  static isFormData( formData:FormData ):Boolean {
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
  // ----------------------------------------------------------
  // 画像パスが正規かチェックする
  /**
   * 使用可能なbase64 file かを調べます
   * @param {string} fileName 調査対象ファイル名
   * @return {boolean} jpeg / png の時に true を返します
   */
  static isBase64( fileName:string ):Boolean {
    return fileName.indexOf( 'data:image/jpeg;base64' ) !== -1 ||
      fileName.indexOf( 'data:image/png;base64' ) !== -1 ||
      fileName.indexOf( 'data:image/jpg;base64' ) !== -1 ||
      fileName.indexOf( 'data:image/gif;base64' ) !== -1;
  }
  /**
   * 拡張子から画像ファイルかを調べます
   * @param {string} fileName 調査対象ファイル名
   * @returns {Boolean} 'jpg', 'png', 'jpeg', 'gif' のいづれかに該当するかの真偽値を返します
   */
  static isImg( fileName:string ):Boolean {
    // base64
    if ( Safety.isBase64( fileName ) ) {
      return true;
    }
    // 拡張子チェック
    // return ['jpg', 'png', 'jpeg', 'gif', 'svg'].indexOf( Safety.getExtension( fileName ) ) !== -1;
    return ['jpg', 'png', 'jpeg', 'gif'].indexOf( Safety.getExtension( fileName ) ) !== -1;
  }
  /**
   * path に `graph.facebook.com` が含まれているかを調べます
   * @param {string} path 調査対象パス
   * @return {Boolean} ath に `graph.facebook.com` が含まれているかの真偽値を返します
   */
  static isGraph( path:string ):Boolean {
    return path.indexOf( 'graph.facebook.com' ) !== -1;
  }

  /**
   * 引数 path が画像パスかを調べます
   * @param {string} path 調査対象画像パス
   * @param {string} defaultPath 代替画像パス
   * @return {string} pathを調べ正しいと推測されるパスを返します
   */
  static image( path:string, defaultPath:string ):string {
    // string check
    path = Safety.string( path, '' );

    if ( path === '' ) {
      return defaultPath;
    }

    if ( !Safety.isImg( path ) ) {
      // 拡張子チェック・アウト
      if ( !Safety.isGraph( path ) ) {
        return defaultPath;
      } else {
        return path;
      }
    }

    return path;
  }
  /**
   * NOT_EMPTY, 登録済みデータある時の className
   * @return {string} user-logged-in を返します
   */
  static get NOT_EMPTY():string {
    return 'user-logged-in';
  }
  /**
   * path と empty を比較し異なっていれば notSame を返します
   * @param {string} path 調査対象 1
   * @param {string} empty 調査対象 2
   * @param {string} [notSame=Safety.NOT_EMPTY] 異なってる時に返す文字
   * @return {string} '' か notSame を返します
   */
  static same( path:string, empty:string, notSame:string = Safety.NOT_EMPTY ):string {
    return path === empty ? '' : notSame;
  }
  // ----------------------------------------------------------
  /**
   * 引数が正規なものかをチェックします
   * @param {string} target 調査対象
   * @param {Array<string>} allowed 正しい対象値
   * @return {Boolean} 引数が正規なものかをチェックし true / false を返します
   */
  static normalize( target:string, allowed:Array<string> ):Boolean {
    var bool = false;
    for ( var value of allowed ) {
      if ( target === value ) {
        bool = true;
        break;
      }
    }
    return bool;
  }
}
