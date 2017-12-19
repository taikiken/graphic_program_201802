/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/09/18 - 0:59
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import View from '../../view/View';

// app
// import { Message } from '../../app/const/Message';

// // data
// import { Result } from '../../data/Result';
// import { Safety } from '../../data/Safety';

// dae
import { ArticleDae } from '../../dae/ArticleDae';

// Ga
import { Ga } from '../../ga/Ga';
import { GaData } from '../../ga/GaData';

// sp/view
import SPViewArchive from './SPViewArchive';
import SPComponentMoreButton from '../component/articles/SPComponentMoreButton';

// sp/node
// import {SPArchiveNode} from '../node/SPArchiveNode';

import SPComponentArticles from '../component/articles/SPComponentArticles';

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
 * SP 記事一覧 + 無限スクロール
 * @since 2016-09-16
 */
export default class SPViewArchiveInfinite extends SPViewArchive {
  /**
   * SP 記事一覧 + 無限スクロール 設定を行います
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */
  constructor(element, moreElement, ActionClass = null, option = {}) {
    super(element, moreElement, ActionClass, option);
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
    /**
     * 初回無限スクロールにしないパターン, クリック後に開始します
     *
     * ref: UNDO_SPBL-282 【Web】一面のリニューアル / Web - Mobile対応
     * > 記事一覧の自動無限スクロールやめてPC版同様「VIEW MORE」ボタン配置 (他カテゴリー一覧も同様 )
     * @see https://aws-plus.backlog.jp/view/UNDO_SPBL-281
     * @type {boolean}
     * @default true
     * @since 2017-12-18
     */
    this.afterClick = true;
    /**
     * 最初の出力終了 flag
     * - false: ga send
     * @type {boolean}
     */
    this.firstRendered = false;
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

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    // articles.forEach((article, i) => {
    //   const dae = new ArticleDae(article);
    //   dae.index = prevLast + i;
    //   articlesList.push(dae);
    // } );

    articles.map((article, i) => {
      const dae = new ArticleDae(article);
      dae.index = prevLast + i;
      articlesList.push(dae);
      return article;
    });

    // 通知
    this.executeSafely(View.BEFORE_RENDER, articlesList);

    // // this._articleRendered が null の時だけ ReactDOM.render する
    // if (this.articleRendered === null) {
    //   // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
    //   /**
    //    * SPComponentArticles instance
    //    * @type {SPComponentArticles}
    //    */
    //   this.articleRendered = ReactDOM.render(
    //     // <SPArchiveNode
    //     //   list={articlesList}
    //     //   offset={this.request.offset}
    //     //   length={this.request.length}
    //     //   action={this.action}
    //     //   scope={this}
    //     //   moreButton={this.moreButton.bind(this)}
    //     //   home={this.home}
    //     //   type={Message.NEWS}
    //     //   adSp=""
    //     // />,
    //     // @since 2016-09-21 changed
    //     <SPComponentArticles
    //       list={articlesList}
    //       offset={this.request.offset}
    //       length={this.request.length}
    //       action={this.action}
    //       callback={this.boundSafely}
    //       boundMore={this.boundMore}
    //       home={this.home}
    //       adSp=""
    //     />,
    //     this.element,
    //   );
    //
    //   if (this.home) {
    //     // ----------------------------------------------
    //     // GA 計測タグ
    //     // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
    //     Ga.add(new GaData('SPViewArchiveInfinite.render', 'home_articles', 'view - new', String(1), 0, true));
    //     // ----------------------------------------------
    //   } else {
    //     // ----------------------------------------------
    //     // GA 計測タグ
    //     // PC/スマホカテゴリー一覧の新着記事
    //     Ga.add(new GaData('SPViewArchiveInfinite.render', `${this.slug}_articles`, 'view - new', String(1), 0, true));
    //     // ----------------------------------------------
    //   }
    // } else {
    //   // instance が存在するので
    //   // state update でコンテナを追加する
    //   this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    // }

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
        adSp=""
      />,
      this.element,
    );
  }
  /**
   * more button の表示・非表示を行います
   * @param {boolean} show true の時にボタンを表示させ機能させます
   */
  moreButton(show) {
    // console.log('SPViewArchiveInfinite.moreButton', show);
    // 'View More' button root element
    const moreElement = this.moreElement;
    if (!moreElement) {
      return;
    }
    // moreElement 存在チェックを行う
    // Element 型を保証する
    // moreRendered が null の時のみ instance を作成し
    // instance があれば state を update する
    // if (this.moreRendered === null) {
    //   /**
    //    * スクロールしJSON取得トリガーになる[VIEW MORE]button
    //    * @type {SPComponentMoreButton}
    //    */
    //   this.moreRendered = ReactDOM.render(
    //     <SPComponentMoreButton
    //       show={show}
    //       action={this.action}
    //       element={moreElement}
    //       home={this.home}
    //       slug={this.slug}
    //     />,
    //     moreElement,
    //   );
    // } else {
    //   this.moreRendered.updateShow(show);
    // }
    ReactDOM.render(
      <SPComponentMoreButton
        show={show}
        action={this.action}
        element={moreElement}
        home={this.home}
        slug={this.slug}
        loading=""
        afterClick={this.afterClick}
      />,
      moreElement,
    );
  }
}
