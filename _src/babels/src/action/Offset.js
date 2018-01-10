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
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

import {Result} from '../data/Result';
import {Action} from './Action';
// import {Types} from '../net/Types';
import {Length} from '../app/const/Length';
import {Safety} from '../data/Safety';

/**
 * Ajax 処理を行います
 * - offset, length がクエリに必要な場合に使用します
 * - Template Pattern として使用し各 Class で extends して下さい
 * - token（認証）が必要な場合は {@link OffsetAuth} を使用します
 */
export class Offset extends Action {
  /**
   * Ajax 処理, queryあり<br>
   * **Next 読込** がある時に使用します
   * @param {Type} types Types instance, Ajax request に使用します
   * @param {Function} [resolve=null] Ajax 成功時の callback
   * @param {Function} [reject=null] Ajax 失敗時の callback
   * @param {number} [offset=0] query offset 値
   * @param {number} [length=16] query length 値
   * @param {*|Result} [ResultClass=Result] 成功結果をセットする data class
   */
  constructor(types, resolve = null, reject = null, offset = 0, length = Length.archive, ResultClass = Result) {
    super(types, resolve, reject);
    /**
     * query offset 値 - リクエスト開始値
     * @type {number}
     * @protected
     */
    this._offset = offset;
    /**
     * query length 値 - リクエスト取得件数
     * @type {number}
     * @protected
     */
    this._length = length;
    /**
     * リクエスト全総件数
     * - 負の値(デフォルト値: -1)の時は未設定です
     * @type {number}
     * @protected
     * @default -1
     */
    this._total = -1;
    /**
     * Ajax 成功時に処理する Class を保持します
     * @type {*|Result}
     * @protected
     */
    this._resultClass = ResultClass;
    /**
     * 再読み込み中かどうかを表す真偽値
     * - true: 再読み込み中
     * @type {boolean}
     * @protected
     */
    this._reloadFlag = false;
    //
    // /**
    //  * JSON.request, 記事詳細, next が request を持っていないので保持する
    //  * @type {{offset: number, length: number}}
    //  * @since 2016-09-28
    //  */
    // this.request = {
    //   offset,
    //   length
    // };
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * 総件数
   * @return {number} 総件数(total)件数を返します
   */
  get total() {
    return this._total;
  }
  /**
   * 総件数(total)件数を設定します
   * @param {number} total total件数
   */
  set total(total) {
    this._total = total;
  }
  /**
   * 取得件数
   * @return {number} lengths 取得件数を返します
   */
  get length() {
    return this._length;
  }
  /**
   * length件数を設定します
   * @param {number} length length 取得件数
   */
  set length(length) {
    this._length = length;
  }
  /**
   * 取得開始位置
   * @return {number} offset 取得開始位置を返します
   */
  get offset() {
    return this._offset;
  }
  /**
   * 取得開始位置を設定します
   * @param {number} offset offset 取得開始位置
   */
  set offset(offset) {
    this._offset = offset;
  }
  /**
   * url を作成します
   * - offset, length クエリが追加になるので override します
   * @override
   * @return {string} 作成した url を返します
   */
  get url() {
    return `${this.path}?offset=${this.offset}&length=${this.length}`;
  }
  /**
   * 再読み込み中かどうかを表す真偽値
   * @return {boolean} 再読み込み中かどうかを表す真偽値を返します
   */
  get reloadFlag() {
    return this._reloadFlag;
  }
  /**
   * 再読み込み中フラッグを設定します
   * @param {boolean} reload 再読み込み中フラッグ
   */
  set reloadFlag(reload) {
    this._reloadFlag = reload;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * リクエストに offset が必要な API の取得開始は start を使わず **next** を使用します
   * @deprecated instead use next
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */
  start(method = this.method) {
    // リクエストに offset が必要な API の取得開始は意図的に start を使わず next を使用します
    console.warn(`Offset.start - instead use next, ${this.url}, ${method}`);
  }
  /**
   * 次の読込を開始します
   * - start の代わりに使用します
   * @param {string} [method=this.method] request method GET|POST|DELETE|PUT...
   */
  next(method = this.method) {
    // next data があるかないかを調べます
    // next がある時は Ajax を実行します
    if ( this.hasNext() ) {
      method = Safety.string( method, this.method );
      this.ajax.start( this.url, method, this.boundSuccess, this.boundFail, this.resultClass );
      //
      // // @since 2016-09-28
      // this.request = {
      //   offset: this.offset,
      //   length: this.length
      // };
    }
  }
  /**
   * offset 値を加算します
   * @param {number} [count] default 値は `this._length` になります。 Ajax 成功後 次のリクエスト前に Offset.next() し加算します。
   */
  update(count = this.length) {
    this.offset += count;
  }
  /**
   * 残り数, total から 次の offset を」引いた数
   * @return {number} total から 次の offset を」引いた数を返します
   */
  rest() {
    return this.total - this.offset;
  }
  /**
   * 次があるかを調べます
   * @return {boolean} 次があるかの真偽値を返します
   */
  hasNext() {
    // console.log('hasNext', this.total, this.offset, this.url);
    // _total === -1 の時は常に true
    // total が offset（次の読み込み開始位置）より小さい時に true
    return this.total < 0 ? true : this.offset < this.total;
  }
  /**
   * Ajax success callback, update()を実行し offset 値をカウントアップし callback method があれば実行します
   * @param {Result} result Ajax成功結果
   */
  success(result) {
    // reload フラッグがオフの時は次のリクエストのための offset 値を更新します
    if ( !this.reloadFlag ) {
      this.update( this.length );
    } else {
      this.reloadFlag = false;
    }

    // 合計数をupdate
    this.total = result.total;
    // success
    super.success( result );
  }
}
