/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 20:50
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from '../../data/Safety';
import {ActivityDae} from './ActivityDae';

/**
 * アクティビティ一覧配列
 */
export class ActivitiesDae {
  /**
   * アクティビティ一覧配列
   * @param {Object} [response={}] JSON response
   */
  constructor( response:Object = {} ) {

    response = Safety.object( response );

    let activities = response.activities;
    activities = Safety.array( activities );

    let list = [];
    activities.forEach( function( activity ) {

      list.push( new ActivityDae( activity ) );

    } );
    /**
     * JSON response
     * @type {Object}
     * @protected
     */
    this._response = response;
    /**
     * response.activities を 1件づつ ActivityDae instance にし格納します
     * @type {Array<ActivityDae>}
     * @protected
     */
    this._activities = list;
  }
  /**
   * JSON response
   * @return {Object|*} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  /**
   * response.activities
   * @return {Array<ActivityDae>} JSON response.activities を返します
   */
  get activities():Array<ActivityDae> {
    return this._activities;
  }
  /**
   * response.count
   * @return {Number} count を返します
   */
  get total():Number {
    return this.response.count;
  }
  /**
   * alias total
   * response.count
   * @return {Number} count を返します
   */
  get count():Number {
    return this.total;
  }
}
