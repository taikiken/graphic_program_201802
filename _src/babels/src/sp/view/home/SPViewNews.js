/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 23:00
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {SPViewArchive} from '../SPViewArchive';
import {User} from '../../../app/User';

import {NewsAuth} from '../../../action/home/NewsAuth';
import {News} from '../../../action/home/News';

export class SPViewNews extends SPViewArchive {
  /**
   * home news, token 付き・無し を切替
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option );
    this._action = User.sign ?
      new NewsAuth( this.done.bind( this ), this.fail.bind( this ) ) :
      new News( this.done.bind( this ), this.fail.bind( this ) );
    // home flag on
    this.home = true;
  }
}
