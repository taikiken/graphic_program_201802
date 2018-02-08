/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/06/07 - 19:19
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// parent
import SPViewSingleHeadline from '../singles/SPViewSingleHeadline';

// app
import {Message} from '../../../app/const/Message';

// // data
// import {Result} from '../../../data/Result';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';
import {CategoriesSlugDae} from '../../../dae/categories/CategoriesSlugDae';

// view
import View from '../../../view/View';
// model
import {Model} from '../../../model/Model';

// Ga
import {Ga} from '../../../ga/Ga';
import {GaData} from '../../../ga/GaData';

// sp:model
import {ModelCategoriesSlug} from '../../../model/categoires/ModelCategoriesSlug';

// sp:node
// import {SPArchiveNode} from '../../node/SPArchiveNode';
// import {SPMoreViewNode} from '../../node/SPMoreViewNode';

// sp/view
// import { SPComponentMoreButton } from '../articles/SPComponentMoreButton';
import SPComponentSingleNews from '../../component/singles-option/SPComponentSingleNews';

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
 * SP category 一覧を表示します<br>
 * 広告をAPIでコントロール可能にします
 *
 * @since 2016-06-06
 */
export default class SPViewSinglesWithSlug extends SPViewSingleHeadline {
  /**
   * SP category 一覧
   * @param {string} slug category slug
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor(slug, element, moreElement, option = {}) {
    super(slug, element, moreElement, option);

    const slugFail = this.slugFail.bind( this );
    const callback = {};
    callback[Model.COMPLETE] = this.slugDone.bind(this);
    callback[Model.UNDEFINED_ERROR] = slugFail;
    callback[Model.RESPONSE_ERROR] = slugFail;
    /**
     * 記事カテゴリー情報取得
     * @type {ModelCategoriesSlug}
     * @private
     */
    this._actionSlug = new ModelCategoriesSlug(slug, callback);
    /**
     * CategoryAuth, Category 取得結果を保持します
     * @type {null|Array<Object>}
     * @private
     */
    this._resultArticles = null;
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

    /**
     * SPMoreViewNode instance
     * @override
     * @type {?ReactClass}
     */
    this.moreRendered = null;

    /**
     * SPArchiveNode instance
     * @override
     * @type {?ReactClass}
     */
    this.articleRendered = null;
    /**
     * bind 済み moreButton 関数
     * @type {Function}
     */
    this.boundMore = this.moreButton.bind(this);
    /**
     * bind executeSafely
     * @type {function}
     */
    this.boundSafely = this.executeSafely.bind(this);
  }
  /**
   * CATEGORY_INFO, ModelCategoriesSlug success event
   * @event CATEGORY_INFO
   * @return {string} SPViewSingleHeadlineWidthSlugCategoryInfo event type
   */
  static get CATEGORY_INFO():string {
    return 'SPViewSingleHeadlineWidthSlugCategoryInfo';
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start() {
    this.action.next();
    this._actionSlug.start();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const articles = result.articles;
    // console.log( '**************** SPViewSinglesWithSlug done ', result );
    if (typeof articles === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[SP:ARCHIVE:UNDEFINED]'));
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );
      if (this.waiting < 2) {
        this.wait();
      }
    } else if (articles.length === 0) {
      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      const error = new Error(Message.empty('[SP:ARCHIVE:EMPTY:EMPTY]'));
      this.executeSafely(View.EMPTY_ERROR, error);
      // this.showError( error.message );
      if (this.waiting < 2) {
        this.wait();
      }
    } else {
      /**
       * JSON response, Result.request
       * @override
       * @type {Object}
       */
      this.request = result.request;

      if (this.waiting >= 2) {
        // 2 回目以降は
        this.render(articles);
      } else {
        this._resultArticles = articles;
        this.wait();
      }
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
    if (this.waiting < 2) {
      this.wait();
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

    const categoryInfo = new CategoriesSlugDae( response );
    this.categoryInfo = categoryInfo;
    this.executeSafely(SPViewSinglesWithSlug.CATEGORY_INFO, categoryInfo);
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
    const resultArticles = this._resultArticles;
    if (!!resultArticles) {
      this.render(resultArticles);
    }
  }

  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles) {
    // ストリーム広告 ID
    // @since 2016-09-20, categoryInfo null の時があるので変更
    const categoryInfo = this.categoryInfo;
    // let adSp = '';
    // if (!!categoryInfo && !!categoryInfo.ad && !!categoryInfo.ad.sp) {
    //   adSp = categoryInfo.ad.sp;
    // }
    // const categoryInfo = this.categoryInfo;
    // const adSp = categoryInfo && categoryInfo.ad && categoryInfo.ad.sp ? categoryInfo.ad.sp : new CategoriesSlugDae({});
    // let adSp = categoryInfo.ad.sp;
    // if ( !adSp ) {
    //   adSp = '';
    // }
    console.log( '**** categoryInfo ', categoryInfo );
    // 既存データ用のglobal配列
    const articlesList = this.articles;
    // 前回までの配列length
    // sequence な index のために必要
    const prevLast = this.articles.length;

    // // ------------------------------------------------
    // let moreButton = ( show:Boolean ):void => {
    //   show = !!show;
    //   // _moreRendered が null の時のみ state を update する
    //   if ( this.moreRendered === null ) {
    //     // チェックをパスし実行する
    //     this.moreRendered = ReactDOM.render(
    //       // <SPMoreViewNode
    //       //   show={show}
    //       //   action={this.action}
    //       //   home={this.home}
    //       //   slug={this.slug}
    //       // />,
    //       // @since 2016-09-16, more button changed
    //       <SPComponentMoreButton
    //         show={show}
    //         action={this.action}
    //         element={this.moreElement}
    //         home={this.home}
    //         slug={this.slug}
    //       />,
    //       this.moreElement
    //     );
    //   } else {
    //     this.moreRendered.updateShow(show);
    //   }
    // };

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    // articles.forEach( function( article, i ) {
    //
    //   let dae = new ArticleDae( article );
    //   // console.log( 'dae ', dae );
    //   dae.index = prevLast + i;
    //   articlesList.push( dae );
    //
    // } );

    articles.map((article, i) => {
      const dae = new ArticleDae( article );
      dae.index = prevLast + i;
      articlesList.push(dae);
      return article;
    });

    // 通知
    this.executeSafely(View.BEFORE_RENDER, articlesList);

    // this._articleRendered が null の時だけ ReactDOM.render する
    if (this.articleRendered === null) {
      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する

      const adgeneid = this.element.getAttribute('data-adgene-id').split(',');
      this.articleRendered = ReactDOM.render(
        // <SPArchiveNode
        //   list={articlesList}
        //   offset={this.request.offset}
        //   length={this.request.length}
        //   action={this.action}
        //   scope={this}
        //   moreButton={moreButton}
        //   home={this.home}
        //   type={Message.NEWS}
        //   adSp={adSp}
        // />,
        // @since 2016-09-21 changed
        <SPComponentSingleNews
          list={articlesList}
          offset={this.request.offset}
          length={this.request.length}
          action={this.action}
          callback={this.boundSafely}
          boundMore={this.boundMore}
          home={this.home}
          adSp={adgeneid}
          category={categoryInfo.label}
        />,
        this.element
      );

      if (this.home) {
        // ----------------------------------------------
        // GA 計測タグ
        // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
        Ga.add(new GaData('SPViewSinglesWithSlug.render', 'home_articles', 'view - new', String(1), 0, true));
        // ----------------------------------------------
      } else {
        // ----------------------------------------------
        // GA 計測タグ
        // PC/スマホカテゴリー一覧の新着記事
        Ga.add(new GaData('SPViewSinglesWithSlug.render', `${this.slug}_articles`, 'view - new', String(1), 0, true));
        // ----------------------------------------------
      }
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    }
  }
}
