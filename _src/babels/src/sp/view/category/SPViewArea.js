/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/09/05 - 16:44
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// sp/view
import { SPViewCategoryWithSlug } from './SPViewCategoryWithSlug';

// sp/component
// import { SPComponentCategoryOption } from '../../component/categories/SPComponentCategoryOption';

// view
import ViewArea from '../../../view/ViewArea';

/**
 * SP: 地域記事一覧
 * @see https://github.com/undotsushin/undotsushin/issues/2318
 * @since 2017-09-04
 */
export default class SPViewArea extends SPViewCategoryWithSlug {
  /**
   * 地域一覧
   * @param {string} slug category slug - `area`
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {string} area 地域名称
   * @param {boolean} pref 都道府県フラッグ
   * @param {Object} [option={}] optional event handler
   */
  constructor(slug, element, moreElement, area = '', pref = false, option = {}) {
    // const slug = 'area';
    super(slug, element, moreElement, option);
    // ---
    const done = this.done.bind(this);
    const fail = this.fail.bind(this);
    /**
     * Action instance を設定します
     * !type {Pref|PrefAuth|Area|AreaAuth}
     */
    this.action = pref ?
      ViewArea.actionPref(area, done, fail) :
      ViewArea.actionArea(area, done, fail);
    // /**
    //  * category slug, ga に使う
    //  * @override
    //  * @type {CategoryAuth|Category}
    //  */
    // this.slug = slug;
    /**
     * 地域名称
     * @type {string}
     */
    this.area = area;
    /**
     * 都道府県フラッグ
     * @type {boolean}
     */
    this.pref = pref;
    // // @since 2016-09-20
    // // 記事一覧に pickup, headline を表示させる
    // const categoryOption = new SPComponentCategoryOption(slug);
    // categoryOption.start();
  }
  // start() {
  //   console.log('-------------------------- SPViewArea start------', this.action);
  //   this.action.next();
  // }
}
