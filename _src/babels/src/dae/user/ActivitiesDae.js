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
'use strict';

import {Safety} from '../../data/Safety';
import {ActivityDae} from './ActivityDae';


export class ActivitiesDae {
  constructor( response:Object = {} ) {
    response = Safety.object( response );
    let activities = response.activities;
    activities = Safety.array( activities );
    let list = [];
    activities.forEach( function( activity ) {

      list.push( new ActivityDae( activity ) );

    } );

    this._response = response;
    this._activities = list;
  }
  /**
   * @return {Object|*} JSON response を返します
   */
  get response():Object {
    return this._response;
  }
  /**
   * @return {Array<ActivityDae>} JSON response.activities を返します
   */
  get activities():Array<ActivityDae> {
    return this._activities;
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
