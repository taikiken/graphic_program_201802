/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/03 - 15:27
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

// import {Safety} from '../../data/Safety';
import {StatusDae} from '../../dae/StatusDae';
import {Result} from '../../data/Result';

/**
 * 他人からの通知数を取得する
 */
export class NoticeCountDae {
  /**
   * 他人からの通知数を取得する
   * @param {Object} [result={}] JSON result
   */
  constructor( result:Result ) {
    this._result = result;
    this._response = result.response;
    this._status = new StatusDae( result.status );
  }
  /**
   * @return {Object|*} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  /**
   * @return {StatusDae|*} JSON status を返します
   */
  get status():StatusDae {
    return this._status;
  }
  /**
   * @return {Number} response.count を返します
   */
  get count():Number {
    return this.response.count;
  }
  /**
   * alias count
   * @return {Number} response.count を返します
   */
  get total():Number {
    return this.count;
  }
}
