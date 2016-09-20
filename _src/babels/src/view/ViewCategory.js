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
// import {ViewArchiveMasonry} from './ViewArchiveMasonry';
import { ViewArchiveMasonryInfinite } from './ViewArchiveMasonryInfinite';

// view/categories
import { ViewCategoryOption } from './categories/ViewCategoryOption';

// app
import {User} from '../app/User';

// data
import { Safety } from '../data/Safety';


/**
 * category 一覧表示
 *
 * `/api/v1/articles/category/{all|:category_slug}[/type][?[offset=n][&[length=m]]]`
 * <pre>
 * /api/v1/articles/category/all
 * - すべての記事の新着順
 *
 * /api/v1/articles/category/soccer/ranking
 * - サッカーのランキング
 *
 * /api/v1/articles/category/baseball/video
 * - 野球の動画
 * </pre>
 * @see https://docs.google.com/spreadsheets/d/1Vngb6I2khKtkFBezsvUy0Fc1ZofYkHDJMgD0aTIYkHw/edit#gid=2055838625
 */
// export class ViewCategory extends ViewArchiveMasonry {
// @since 2016-09-16 parent class changed
export class ViewCategory extends ViewArchiveMasonryInfinite {
  /**
   * category 一覧表示 要 **slug**
   * @param {string} slug category slug, default 'all'
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( slug:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option, true );
    // @since 2016-09-17
    // default を all にするために追加
    const argsSlug = Safety.string(slug, 'all');

    // Category Action を使う
    // slug を送り 表示(render)は ViewArchiveMasonry を使う
    /**
     * Action instance を設定します
     * @override
     * @type {CategoryAuth|Category}
     */
    this.action = User.sign ?
      new CategoryAuth( argsSlug, '', this.done.bind( this ), this.fail.bind( this ) ) :
      new Category( argsSlug, '', this.done.bind( this ), this.fail.bind( this ) );
    /**
     * category slug
     * @override
     * @type {string}
     * @default all
     */
    this.slug = argsSlug;

    // @since 2016-09-20
    // 記事一覧に pickup, headline を表示させる
    const categoryOption = new ViewCategoryOption(slug);
    categoryOption.start();
  }
}
