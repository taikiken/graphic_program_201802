/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/25 - 17:35
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {Safety} from '../data/Safety';

/**
 * JSON.status
 */
export class StatusDae {
  /**
   * JSON.status
   * @param {Object} [status={}] JSON.status
   */
  constructor( status:Object = {} ) {
    status = Safety.object( status );
    this._status = status;
  }
  /**
   * JSON.status
   * @return {Object|*} JSON.status を返します
   */
  get status():Object {
    return this._status;
  }
  /**
   * @return {Number} status.code を返します
   */
  get code():Number {
    return this.status.code;
  }
  /**
   * @return {string} status.user_message を返します
   */
  get userMessage():string {
    return this.status.user_message;
  }
  /**
   * @return {string} status.developper_message を返します
   */
  get developerMessage():string {
    return this.status.developper_message;
  }
}
