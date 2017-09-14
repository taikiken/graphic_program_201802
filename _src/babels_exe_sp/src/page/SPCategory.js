/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/15 - 21:49
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

import {SPHeader} from './SPHeader';
// let _symbol = Symbol();

// UT
const UT = self.UT;
const Dom = UT.app.Dom;

/**
 * <p>category 一覧</p>
 * 全て static です
 */
export class SPCategory {
  // /**
  //  * static class です, instance を作成しません
  //  * @param {Symbol} target Singleton を実現するための private symbol
  //  */
  // constructor( target ) {
  //   if ( _symbol !== target ) {
  //
  //     throw new Error( 'SPCategory is static Class. not use new SPCategory().' );
  //
  //   }
  // }
  /**
   * rendering 開始
   * @param {string} slug category slug
   * @param {string} [type=''] ranking | video \ '' の 3つ
   */
  static start(slug, type = '') {
    // header
    SPHeader.start();

    const element = Dom.category();
    // @since 2016-09-20
    const button = Dom.boardMore();

    if (element !== null && button !== null) {
      // list
      // let archive = new UT.sp.view.category.SPViewCategoryRoot( slug, element );
      // @since 2016-09-20
      const archive = new UT.sp.view.category.SPViewCategoryWithSlug(slug, element, button);
      archive.start();
    }
  }
  /**
   * 地域別記事 - category 一覧
   * @param {string} slug `area` 固定
   * @param {string} area 地域名称
   * @param {boolean} pref 都道府県フラッグ true: 都道府県
   * @since 2017-09-04
   */
  static area(slug, area, pref) {
    // console.log('SPCategory.area', slug, area, pref);
    // header
    SPHeader.start();

    const element = Dom.category();
    // @since 2016-09-20
    const button = Dom.boardMore();
    if (element !== null && button !== null) {
      // @since 2017-09-04
      const archive = new UT.sp.view.category.SPViewArea(slug, element, button, area, pref);
      archive.start();
    }
  }
}
