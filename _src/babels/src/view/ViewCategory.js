/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/04 - 12:39
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// action
import {Category} from '../action/archive/Category';
import {CategoryAuth} from '../action/archive/CategoryAuth';
// view
import {ViewArchiveMasonry} from './ViewArchiveMasonry';
// app
import {User} from '../app/User';


/**
 * category 一覧表示
 */
export class ViewCategory extends ViewArchiveMasonry {
  /**
   * category 一覧表示 要 **slug**
   * @param {string} slug category slug, default 'all'
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( slug:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option, true );
    // Category Action を使う
    // slug を送り 表示(render)は ViewArchiveMasonry を使う
    /**
     * Action instance を設定します
     * @override
     * @type {CategoryAuth|Category}
     */
    this.action = User.sign ?
      new CategoryAuth( slug, '', this.done.bind( this ), this.fail.bind( this ) ) :
      new Category( slug, '', this.done.bind( this ), this.fail.bind( this ) );
    /**
     * category slug
     * @override
     * @type {string}
     * @default all
     */
    this.slug = slug;
  }
}
