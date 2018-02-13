/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/03 - 17:02
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */



import {EventDispatcher} from '../event/EventDispatcher';
import {Safety} from '../data/Safety';

/**
 * <p>View がない Api request<p>
 * <p>action Class を実行し option に設定された callback を実行します</p>
 *
 * @example
 * let option = {
 *  Model.UNDEFINED_ERROR: () => {},
 *  Model.EMPTY_ERROR: () => {},
 *  Model.RESPONSE_ERROR: () => {},
 *  Model.COMPLETE: () => {}
 * };
 *
 * let model = new Model( option );
 * model.start();
 */
export class Model extends EventDispatcher {
  /**
   * View がない Api request, 親クラス
   * @param {?Object} [option={}] optional event handler
   */
  constructor(option = {}) {
    const safetyOption = Safety.object(option);
    super();
    /**
     * callback をセットした Object
     *
     * @example
     * const option = {
     *  Model.UNDEFINED_ERROR: () => {},
     *  Model.EMPTY_ERROR: () => {},
     *  Model.RESPONSE_ERROR: () => {},
     *  Model.COMPLETE: () => {}
     * };
     *
     * @type {Object}
     * @protected
     */
    this._option = safetyOption;
    /**
     * action Class が設定されます
     * @type {*}
     * @protected
     * @default null
     */
    this._action = null;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * callback handler がセットされたObject
   * @return {Object} callback handler がセットされたObjectを返します
   */
  get option() {
    return this._option;
  }

  /**
   * callback handler をセットします
   * @param {Object} option callback handler がセットされた Object
   */
  set option(option) {
    this._option = option;
  }
  /**
   * Action instance
   * @return {*} Action instance を返します
   */
  get action() {
    return this._action;
  }
  /**
   * Action instance を設定します
   * @param {*} action Action instance
   */
  set action( action ):void {
    this._action = action;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * option Object に kyeName が存在し型が function かを調べ関数を実行する
   * @param {string} keyName 存在チェックを行う関数キー名
   * @param {*} [args=] 実行関数への引数
   */
  executeSafely(keyName, ...args) {
    const option = this.option;
    // console.log( 'executeSafely ', keyName, option.hasOwnProperty( keyName ), option, args );
    if (option.hasOwnProperty(keyName) && typeof option[keyName] === 'function') {
      // callback 側で通常の引数として取り出せるように apply します
      option[keyName].apply(this, args);
    }
    this.dispatch( { type: keyName, args: args } );
  }
  // ---------------------------------------------------
  //  CONST
  // ---------------------------------------------------
  /**
   * event UNDEFINED_ERROR<br>
   * Ajax は成功, 存在すべき key が無い or 値が null
   * @return {string} modelUndefinedError を返します
   */
  static get UNDEFINED_ERROR() {
    return 'modelUndefinedError';
  }
  /**
   * event EMPTY_ERROR<br>
   * Ajax は成功, 存在すべき値は配列で存在するが length 0
   * @return {string} modelEmptyError を返します
   */
  static get EMPTY_ERROR() {
    return 'modelEmptyError';
  }
  /**
   * event RESPONSE_ERROR<br>
   * Ajax 失敗
   * @return {string} modelResponseError を返します
   */
  static get RESPONSE_ERROR() {
    return 'modelResponseError';
  }
  /**
   * event COMPLETE<br>
   * Ajax 成功
   * action 終了後 success 時に使用します
   * @return {string} modelComplete を返します
   */
  static get COMPLETE() {
    return 'modelComplete';
  }
}
