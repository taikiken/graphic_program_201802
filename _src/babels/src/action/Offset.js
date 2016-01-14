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

/**
 * Ajax 処理を行います
 * Interface として使用します
 * 各 Class で extends して下さい
 * **Next 読込** がある時に使用します
 */
export class Offset extends Action {
  /**
   * Ajax 処理, query
   * @constructor
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {Number} [offset=0] query offset 値
   * @param {Number} [length=10] query length 値
   */
  constructor( types:Types, resolve:Function = null, reject:Function = null, offset:Number = 0, length:Number = 10 ) {

    super( types, resolve, reject );

    this._offset = offset;
    this._length = length;
    this._total = -1;

  }

  /**
   * url を作成します
   * @method url
   * @returns {string} 作成した url を返します
   */
  url():string {
    return `${this._types.url}?offset=${this._offset}&length=${this._length}`;
  }

  /**
   * offset 値を加算します
   * @param {Number} [count] default 値は this._length になります。 Ajax 成功後 次のリクエスト前に Offset.next() し加算します。
   */
  update( count:Number = this._length ):void {

    this._offset += count;

  }

  /**
   * 次があるかを調べます
   * @method hasNext
   * @return {boolean} 次があるかの真偽値を返します
   */
  hasNext():boolean {

    return this._offset < this.total;

  }

  /**
   * 次の読込を開始します
   */
  next():void {

    // next data があるかないかを調べます
    if ( this.hasNext() ) {

      this.start();

    }

  }
  /**
   * Ajax success callback, update()を実行し offset 値をカウントアップし callback method があれば実行します
   * @param {Result} result Ajax成功結果
   */
  success( result:Result ):void {

    this.update();
    // success
    super.success( result );

  }

  /**
   * @method total
   * @returns {number|*} total件数を返します
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


}
