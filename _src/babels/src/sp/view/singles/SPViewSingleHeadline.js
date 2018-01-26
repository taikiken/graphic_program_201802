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

// sp/view
import SPViewArchiveInfinite from '../SPViewArchiveInfinite';

// action
import {Category} from '../../../action/archive/Category';
import {CategoryAuth} from '../../../action/archive/CategoryAuth';

// app
import {User} from '../../../app/User';

// @since 2016-09-20
import SPViewSingleHeadlineOption from './SPViewSingleHeadlineOption';

/**
 * <p>SP 記事一覧・カテゴリータブデータをリクエストし取得します</p>
 * SPViewCategoryRoot > CategoryRootDom から call されます
 * **update: 2016-0912**
 *
 * - タブが廃止
 * - 新着記事のみ
 * - PICKUP, HEADLINE 追加
 *
 * 次のように変更します
 *
 * - exe から直接実行
 * - headline, pickup 取得機能実装
 *
 * @see https://github.com/undotsushin/undotsushin/issues/970#issuecomment-238405645
 * @see https://github.com/undotsushin/undotsushin/issues/1010
 * @see https://github.com/undotsushin/undotsushin/issues/1095
 */
export default class SPViewSingleHeadline extends SPViewArchiveInfinite {
// export class SPViewCategory extends SPViewArchive {
// @since 2016-09-16 parent class changed
  /**
   * SP category 一覧
   * @param {string} slug category slug
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor(slug, element, moreElement, option = {}) {
    super(element, moreElement, null, option);
    /**
     * Action instance を設定します
     * - @since 2017-12-18 初回表示件数は仮で12件とする(表示みて調整) ref: UNDO_SPBL-282 【Web】一面のリニューアル / Web - Mobile対応
     * @override
     * @type {CategoryAuth|Category}
     */
    this.action = User.sign ?
      new CategoryAuth(slug, '', this.done.bind(this), this.fail.bind(this), 0, 12) :
      new Category(slug, '', this.done.bind(this), this.fail.bind(this), 0, 12);
    /**
     * category slug, ga に使う
     * @override
     * @type {CategoryAuth|Category}
     */
    this.slug = slug;
    // @since 2016-09-20
    // 記事一覧に pickup, headline を表示させる
    const categoryOption = new SPViewSingleHeadlineOption(slug);
    categoryOption.start();
  }
}
