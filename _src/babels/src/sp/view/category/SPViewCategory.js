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

import {SPViewArchive} from './../SPViewArchive';

import {Category} from '../../../action/archive/Category';
import {CategoryAuth} from '../../../action/archive/CategoryAuth';
import {User} from '../../../app/User';

/**
 * SP category
 */
export class SPViewCategory extends SPViewArchive {
  /**
   * SP category 一覧
   * @param {string} slug category slug
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( slug:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option );
    // Category Action を使う
    // slug を送り 表示(render)は SPViewArchive を使う
    this._action = User.sign ?
      new CategoryAuth( slug, '', this.done.bind( this ), this.fail.bind( this ) ) :
      new Category( slug, '', this.done.bind( this ), this.fail.bind( this ) );

    // ga に使う
    this._slug = slug;
  }
}
