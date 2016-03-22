/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/24 - 0:14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import {Safety} from '../../data/Safety';

/**
 * ユーザーの興味がある競技
 */
export class InterestDae {
  /**
   * ユーザーの興味がある競技
   * @param {Object} [interest={}] response.interest
   */
  constructor( interest:Object = {} ) {
    interest = Safety.object( interest );
    this._interest = interest;
  }
  /**
   * response.interest
   * @return {Array|*} response.interest を返します
   */
  get interest():Array {
    return this._interest;
  }
  /**
   * response.interest.category
   * @return {Array} response.interest.category を返します
   */
  get category():Array {
    // let category = this.interest.category;
    // API 戻り値がどうも変わった様子
    // interest: [{id:int, slug:text, label:text},{}]
    let category = this.interest;
    if ( !Array.isArray( category ) ) {
      category = [];
    }
    return category;
  }
}
