/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/13 - 16:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Result} from '../data/Result';
import {Action} from './Action';
import {Types} from '../net/Types';
import {Length} from '../app/const/Length';
import {Safety} from '../data/Safety';

/**
 * Ajax 処理を行います<br>
 * Template Pattern として使用します<br>
 * 各 Class で extends して下さい
 */
export class Offset extends Action {
  /**
   * Ajax 処理, queryあり<br>
   * **Next 読込** がある時に使用します
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */
  constructor( types:Types, resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = Length.archive, ResultClass = Result ) {

    super( types, resolve, reject );

    this._offset = offset;
    this._length = length;
    this._total = -1;
    this._resultClass = ResultClass;

    this._reload = false;

  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Number|*} total件数を返します
   */
  get total():Number {
    return this._total;
  }
  /**
   * total件数を設定します
   * @param {Number} total total件数
   */
  set total( total:Number ):void {
    this._total = total;
  }
  /**
   * @return {Number|*} lengths 取得件数を返します
   */
  get length():Number {
    return this._length;
  }
  /**
   * length件数を設定します
   * @param {Number} length length 取得件数
   */
  set length( length:Number ):void {
    this._length = length;
  }
  /**
   * @return {Number|*} offset 取得開始位置を返します
   */
  get offset():Number {
    return this._offset;
  }
  /**
   * length件数を設定します
   * @param {Number} offset offset 取得開始位置
   */
  set offset( offset:Number ):void {
    this._offset = offset;
  }
  /**
   * url を作成します
   * @return {string} 作成した url を返します
   */
  get url():string {
    return `${this._url}?offset=${this.offset}&length=${this.length}`;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * start を使わずに next を使用します
   * @override
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */
  start( method:string = this.method ):void {

    // this._ajax.start( this.url, method, this.success.bind( this ), this.fail.bind( this ) );
    console.warn( `instead use next, ${this.url}, ${method}` );

  }
  /**
   * offset 値を加算します
   * @param {Number} [count] default 値は this._length になります。 Ajax 成功後 次のリクエスト前に Offset.next() し加算します。
   */
  update( count:Number = this._length ):void {

    this.offset += count;

  }
  /**
   * 残り数
   * @return {number} total から 次の offset を」引いた数を返します
   */
  rest():Number {
    return this.total - this.offset;
  }
  /**
   * 次があるかを調べます
   * @return {boolean} 次があるかの真偽値を返します
   */
  hasNext():boolean {

    // _total === -1 の時は常に true
    // total が offset（次の読み込み開始位置）より小さい時に true
    return this._total < 0 ? true : this.offset < this.total;

  }
  /**
   * 次の読込を開始します<br>
   * start の代わりに使用します
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */
  next( method:string = this.method ):void {

    // next data があるかないかを調べます
    // next がある時は Ajax を実行します
    if ( this.hasNext() ) {

      method = Safety.string( method, this.method );
      this._ajax.start( this.url, method, this._boundSuccess, this._boundFail, this._resultClass );

    }

  }
  /**
   * Ajax success callback, update()を実行し offset 値をカウントアップし callback method があれば実行します
   * @param {Result} result Ajax成功結果
   */
  success( result:Result ):void {

    if ( !this._reload ) {
      this.update( this._length );
    } else {
      this._reload = false;
    }

    // 合計数をupdate
    this.total = result.total;
    // success
    super.success( result );

  }

}
