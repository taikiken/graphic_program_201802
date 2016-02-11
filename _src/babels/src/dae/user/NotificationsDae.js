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
'use strict';

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

    this._response = response;
    this._notifications = list;

  }
  /**
   * @return {Object|*} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  /**
   * @return {Array<NoticeDae>} JSON response.notifications を返します
   */
  get notifications():Array<NoticeDae> {
    return this._notifications;
  }
  /**
   * @return {Number} count を返します
   */
  get total():Number {
    return this.response.count;
  }
  /**
   * alias total
   * @return {Number} count を返します
   */
  get count():Number {
    return this.total;
  }
}