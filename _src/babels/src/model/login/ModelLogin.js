/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 15:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from '../Model';
import {ModelBehavior} from '../ModelBehavior';
// import {Result} from '../../data/Result';
import {Login} from '../../action/login/Login';

/**
 * Login action を実行します
 */
export default class ModelLogin extends ModelBehavior {
  /**
   * input data を使用し Login action を実行します
   * @param {?FormData} [formData=null] login FormData
   * @param {Object} [option={}] optional event handler
   */
  constructor(formData = null, option = {}) {
    super(formData, option);
    /**
     * Action instance を設定します
     * @override
     * @type {Login}
     */
    this.action = new Login(formData, this.done.bind(this), this.fail.bind(this));
  }
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.start();
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error('[LOGIN:UNDEFINED]サーバーレスポンスに問題が発生しました。');
      this.executeSafely(Model.UNDEFINED_ERROR, error);
    } else {
      // 成功 callback
      this.executeSafely(Model.COMPLETE, result);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(Model.RESPONSE_ERROR, error);
  }
}
