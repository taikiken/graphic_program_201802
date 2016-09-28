/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/09 - 20:11
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from '../../data/Safety';
import {NoticeDae} from './NoticeDae';

/**
 * お知らせ JSON response
 */
export class NotificationsDae {
  /**
   * お知らせ JSON response
   * @param {Object} [response={}] JSON response
   */
  constructor( response:Object = {} ) {

    response = Safety.object( response );

    let notifications = response.notifications;
    notifications = Safety.array( notifications );
    let list = [];
    notifications.forEach( function( notice ) {

      list.push( new NoticeDae( notice ) );

    } );
    /**
     * JSON response
     * @type {Object}
     * @protected
     */
    this._response = response;
    /**
     * response.notifications を 1件づつ NoticeDae instance とし格納します
     * @type {Array<NoticeDae>}
     * @protected
     */
    this._notifications = list;

  }
  /**
   * JSON response
   * @return {Object|*} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  /**
   * response.notifications
   * @return {Array<NoticeDae>} JSON response.notifications を返します
   */
  get notifications():Array<NoticeDae> {
    return this._notifications;
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
