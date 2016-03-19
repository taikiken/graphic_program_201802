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
'use strict';

import {Model} from './Model';

/**
 * View がない Api request + formData
 */
export class ModelBehavior extends Model {
  /**
   *  View がない Api request + formData
   * @param {FormData} formData POST form data
   * @param {Object} [option={}] optional event handler
   */
  constructor( formData:FormData = null, option:Object = {} ) {
    super( option );
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
    return this._action.data;
  }
  /**
   * FormData を設定します
   * @param {FormData} formData 設定する FormData
   */
  set data( formData:FormData ):void {
    this._action.data = formData;
  }
}
