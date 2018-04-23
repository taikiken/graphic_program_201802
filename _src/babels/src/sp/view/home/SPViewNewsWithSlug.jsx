/**
 * Copyright (c) 2011-2018 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2018/04/16 - 15:12
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
import { NewsAuth } from '../../../action/home/NewsAuth';
import SPViewArchiveInfinite from '../SPViewArchiveInfinite';
import { User } from '../../../app/User';
import { News } from '../../../action/home/News';
import SPViewCategoryWithSlug from '../category/SPViewCategoryWithSlug';
import { CategoriesSlugDae } from '../../../dae/categories/CategoriesSlugDae';
import { ModelCategoriesSlug } from '../../../model/categoires/ModelCategoriesSlug';
import { Model } from '../../../model/Model';
import { Message } from '../../../app/const/Message';
import View from '../../../view/View';
import { ArticleDae } from '../../../dae/ArticleDae';
import { Ga } from '../../../ga/Ga';
import { GaData } from '../../../ga/GaData';
import SPComponentArticles from '../../component/articles/SPComponentArticles';

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
 * top も一覧に広告を表示させる仕様変更に対応します
 * - {@link SPViewNews} に変わりロジックを実装します
 * @since 2018-0416 - sp - index: ad 5 times each
 */
export default class SPViewNewsWithSlug extends SPViewArchiveInfinite {
  /**
   * home news, token 付き・無し を切替
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, moreElement, option = {}) {
    // console.log('SPViewNews', element, moreElement);
    super(element, moreElement, null, option);
    /**
     * Action instance
     * - @since 2017-12-18 初回表示件数は仮で12件とする(表示みて調整) ref: UNDO_SPBL-282 【Web】一面のリニューアル / Web - Mobile対応
     * @override
     * @type {NewsAuth|News}
     */
    this.action = User.sign ?
      new NewsAuth(this.done.bind(this), this.fail.bind(this), 0, 12) :
      new News(this.done.bind(this), this.fail.bind(this), 0, 12);
    /**
     * home flag, home の時のみ true
     * 「おすすめ」ラベル表示に使用
     * @type {Boolean}
     */
    this.home = true;
    // ----------------------------------------------------
    /**
     * ModelCategoriesSlug 取得結果を保持します
     * @type {?CategoriesSlugDae}
     */
    this.categoryInfo = null;
    /**
     * ModelCategoriesSlug, Category の取得を待つためのフラッグとして使用します
     * @type {number}
     */
    this.waiting = 0;
    // ---------------------
    const slug = 'top';
    const slugFail = this.slugFail.bind(this);
    const callback = {};
    callback[Model.COMPLETE] = this.slugDone.bind(this);
    callback[Model.UNDEFINED_ERROR] = slugFail;
    callback[Model.RESPONSE_ERROR] = slugFail;
    /**
     * 記事カテゴリー情報取得
     * @type {ModelCategoriesSlug}
     * @private
     */
    this.actionSlug = new ModelCategoriesSlug(slug, callback);
    /**
     * CategoryAuth, Category 取得結果を保持します
     * @type {null|Array<Object>}
     * @private
     */
    this.resultArticles = null;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.next();
    this.actionSlug.start();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const articles = result.articles;
    // console.log( '**************** SPViewArchive done ', result );
    if (typeof articles === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[SP:SPViewNewsWithSlug:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);
    } else if (articles.length === 0) {
      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      const error = new Error(Message.empty('[SP:SPViewNewsWithSlug:EMPTY:EMPTY]'));
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);
    } else {
      this.request = result.request;
      // this.render(articles);
      if (this.waiting >= 2) {
        // 2 回目以降は
        this.render(articles);
      } else {
        this.resultArticles = articles;
        this.wait();
      }
    }
  }
  /**
   * ModelCategoriesSlug success callback
   * @param {Result} result ModelCategoriesSlug 取得結果
   */
  slugDone(result) {
    const response = result.response;
    // console.log( 'slugDone ', response );
    if (typeof response === 'undefined' || response === null) {
      this.wait();
    }

    const categoryInfo = new CategoriesSlugDae(response);
    this.categoryInfo = categoryInfo;
    this.executeSafely(SPViewCategoryWithSlug.CATEGORY_INFO, categoryInfo);
    this.wait();
  }
  /**
   * ModelCategoriesSlug fail callback
   */
  slugFail() {
    // console.log( 'slugFail ' );
    if (this.waiting < 2) {
      this.wait();
    }
  }
  /**
   * ModelCategoriesSlug, Category 両方の取得を待ちます
   */
  wait() {
    if (++this.waiting < 2) {
      return;
    }
    const resultArticles = this.resultArticles;
    if (!!resultArticles) {
      this.render(resultArticles);
    }
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles) {
    // 既存データ用のglobal配列
    const articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    const prevLast = this._articles.length;

    articles.map((article, i) => {
      const dae = new ArticleDae(article);
      dae.index = prevLast + i;
      articlesList.push(dae);
      return article;
    });

    // 通知
    this.executeSafely(View.BEFORE_RENDER, articlesList);

    const categoryInfo = this.categoryInfo;
    const adSp = categoryInfo && categoryInfo.ad && categoryInfo.ad.sp ? categoryInfo.ad.sp : new CategoriesSlugDae({});

    if (!this.firstRendered) {
      this.firstRendered = true;
      if (this.home) {
        // ----------------------------------------------
        // GA 計測タグ
        // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
        Ga.add(new GaData('SPViewArchiveInfinite.render', 'home_articles', 'view - new', String(1), 0, true));
        // ----------------------------------------------
      } else {
        // ----------------------------------------------
        // GA 計測タグ
        // PC/スマホカテゴリー一覧の新着記事
        Ga.add(new GaData('SPViewArchiveInfinite.render', `${this.slug}_articles`, 'view - new', String(1), 0, true));
        // ----------------------------------------------
      }
    }
    // output
    ReactDOM.render(
      // @since 2016-09-21 changed
      <SPComponentArticles
        list={articlesList}
        offset={this.request.offset}
        length={this.request.length}
        action={this.action}
        callback={this.boundSafely}
        boundMore={this.boundMore}
        home={this.home}
        adSp={adSp}
      />,
      this.element,
    );
  }
}
