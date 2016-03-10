/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/10 - 14:21
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {SPViewArchive} from './../SPViewArchive';

import {Category} from '../../../action/archive/Category';
import {CategoryAuth} from '../../../action/archive/CategoryAuth';
import {User} from '../../../app/User';

export class SPViewCategory extends SPViewArchive {
  constructor( slug:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option );
    // Category Action を使う
    // slug を送り 表示(render)は SPViewArchive を使う
    this._action = User.sign ?
      new CategoryAuth( slug, '', this.done.bind( this ), this.fail.bind( this ) ) :
      new Category( slug, '', this.done.bind( this ), this.fail.bind( this ) );
  }
}
