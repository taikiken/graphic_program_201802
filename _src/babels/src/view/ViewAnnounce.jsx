/**
 * Copyright (c) 2011-2017 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2017/12/18 - 22:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import View from './View';
import { Message } from '../app/const/Message';
import { CategoriesSlugDae } from '../dae/categories/CategoriesSlugDae';
import ComponentAnnounce from '../component/announce/ComponentAnnounce';
import CategoriesSlug from '../action/categories/CategoriesSlug';

// React
/* eslint-disable no-unused-vars */
/**
 * [library] - React
 */
const React = self.React;
/* eslint-enable no-unused-vars */
/**
 * [library] - ReactDOM
 */
const ReactDOM = self.ReactDOM;

/**
 * ユーザーへの「お知らせ」を表示します
 */
export default class ViewAnnounce extends View {
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * ユーザーへの「お知らせ」準備します
   * @param {Element} element 基点 Element
   * @param {string} slug category slug
   * @param {boolean} [sp=false] sp flag
   * @param {*} [option={}] callback option
   */
  constructor(element, slug = 'all', sp = false, option = {}) {
    super(element, option);
    // ---
    /**
     * category slug
     * @type {string}
     */
    this.slug = slug;
    /**
     * sp flag
     * @type {boolean}
     */
    this.sp = sp;
    /**
     * Ajax action instance
     * @type {CategoriesSlug}
     */
    this.action = new CategoriesSlug(slug, this.done.bind(this), this.fail.bind(this));
    /**
     * retry counter
     * @type {number}
     */
    this.count = 0;
  }
  // ---------------------------------------------------
  //  METHOD
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.start();
  }
  /**
   * Ajax success callback
   * @param {Result} result Ajax JSON data
   */
  done(result) {
    const response = result.response;
    if (!response) {
      const error = new Error( Message.undef('[ARCHIVE:UNDEFINED]') );
      this.executeSafely(View.UNDEFINED_ERROR, error);
    } else {
      this.render(response);
    }
  }
  /**
   * Ajax error callback
   * @param {Error} error Ajax Error
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    console.warn('ViewAnnounce.fail', this.slug, error);
    // category/slug でエラー `404` の時に `slug: all` で再アクセスする
    if (this.count < 5 && this.slug !== 'all') {
      this.retry('all');
    }
  }
  /**
   * slug を変更し再アクセスします
   * @param {string} slug category slug - 変更する slug
   */
  retry(slug) {
    this.count += 1;
    const action = this.action;
    action.updatePath(slug);
    action.start();
  }
  /**
   * お知らせを出力します
   * @param {*} response `result.responce` Ajax JSON.responce - {@link CategoriesSlugDae}
   */
  render(response) {
    const dae = new CategoriesSlugDae(response);
    const information = this.sp ? dae.information.sp : dae.information.pc;
    // console.log('ViewAnnounce.render', this.sp, response, dae, information);
    // 通知
    this.executeSafely(View.BEFORE_RENDER, dae);
    // output
    ReactDOM.render(
      <ComponentAnnounce
        information={information}
      />,
      this.element,
    );
  }
}
