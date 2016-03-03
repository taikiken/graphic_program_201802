/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 17:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../../data/Safety';
import {Data} from '../../data/Data';

/**
 * response.errors 管理
 */
export class ErrorsDae {
  /**
   * response.errors 管理
   * @param {*} errors API によって Array / Object と異なります（困る・・・）
   */
  constructor( errors ) {
    this._errors = errors;
    this._bank = {};
    this._list = [];

    if ( errors !== null && typeof errors !== 'undefined' ) {

      if ( Array.isArray( errors ) ) {
        // 配列の時の処理
        this.initList( errors );
      } else {
        // hash の時の処理
        this.initHash( errors );
      }

    }

  }
  /**
   * errors が配列の時の処理
   * @param {Array} errors response.errors
   */
  initList( errors:Array ):void {
    let bank = this._bank;
    let list = this._list;

    for ( var error of errors ) {
      for ( var key in error ) {
        if ( error.hasOwnProperty( key ) ) {
          bank[ key ] = new Data( key, error[ key ] );
          list.push( key );
        }
      }
    }
  }
  /**
   * errors が配列以外(hash === object)の時の処理
   * @param {Object} errors errors が object の時の処理 JSON errors
   */
  initHash( errors:Object ):void {
    let bank = this._bank;
    let list = this._list;
    errors = Safety.object( errors );

    for ( var key in errors ) {
      if ( errors.hasOwnProperty( key ) ) {
        bank[ key ] = new Data( key, errors[ key ] );
        list.push( key );
      }
    }
  }
  /**
   * @return {*} response.errors
   */
  get errors() {
    return this._errors;
  }
  /**
   * エラーのキーだけの配列
   * @return {Array} エラーのキーだけの配列 を返します
   */
  get list():Array {
    return this._list;
  }
  /**
   * key: エラーのキー, value: Data のObject
   * @return {Object} エラーのキーをキー値としたObject
   */
  get bank():Object {
    return this._bank;
  }
  /**
   * @param {string} errorKey error object の key（多分 input: name 値）
   * @return {string} キー値のエラーメッセージを返します
   */
  message( errorKey:string ):string {
    let error = this.bank[ errorKey ];
    if ( typeof error !== 'undefined' ) {
      // error defined
      return error.value;
    } else {
      return '';
    }
  }
  /**
   * エラー件数
   * @return {Number} エラー件数を返します
   */
  total():Number {
    return this.list.length;
  }
  /**
   * errors が設定されているかを調べます
   * @return {boolean} true errors あり
   */
  hasErrors():boolean {
    return this.total > 0;
  }
}
