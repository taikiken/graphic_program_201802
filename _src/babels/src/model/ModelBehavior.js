/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 18:56
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Model} from './Model';

/**
 * <p>View がない Api request  + formData を送信します<p>
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
 * let model = new ModelBehavior( formData, option );
 * model.start();
 */
export class ModelBehavior extends Model {
  /**
   *  View がない Api request + formData
   * @param {FormData} formData POST form data
   * @param {Object} [option={}] optional event handler
   */
  constructor( formData:FormData = null, option:Object = {} ) {
    super( option );
    /**
     * 送信する serialize された form data
     * @type {FormData}
     * @protected
     */
    this._data = formData;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * FormData
   * @return {FormData|*} 設定された FormData を返します
   */
  get data():FormData {
    return this.action.data;
    // return this._data;
  }
  /**
   * FormData を設定します
   * @param {FormData} formData 設定する FormData
   */
  set data( formData:FormData ):void {
    this.action.data = formData;
    // this._data = formData;
  }
}
