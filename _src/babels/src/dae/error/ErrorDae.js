/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 17:28
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../../data/Safety';
import {Result} from '../../data/Result';

import {StatusDae} from '../StatusDae';
import {ErrorsDae} from './ErrorsDae';

/**
 * error の戻り値が一定でないので wrapper class を作ります
 */
export class ErrorDae {
  /**
   * status code が 200 以外の時の error 情報を管理します
   * @param {Result} result Ajax 取得 JSON Result instance
   */
  constructor( result:Result ) {
    this._result = result;
    this._status = new StatusDae( result.status );

    let response = Safety.object( result.response );
    this._errors = new ErrorsDae( response.errors );

  }
  /**
   * @return {Result|*} Ajax 取得 JSON
   */
  get result():Result {
    return this._result;
  }
  /**
   * @return {StatusDae|*} JSON.status
   */
  get status():StatusDae {
    return this._status;
  }
  /**
   * @return {ErrorsDae|*} JSON.response.errors
   */
  get errors():ErrorsDae {
    return this._errors;
  }
}
