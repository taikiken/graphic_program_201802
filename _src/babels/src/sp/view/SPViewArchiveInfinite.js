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
import { View } from '../../view/View';

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
import { SPViewArchive } from './SPViewArchive';
import { SPComponentMoreButton } from '../component/articles/SPComponentMoreButton';

// sp/node
// import {SPArchiveNode} from '../node/SPArchiveNode';

import { SPComponentArticles } from '../component/articles/SPComponentArticles';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP 記事一覧 + 無限スクロール
 * @since 2016-09-16
 */
export class SPViewArchiveInfinite extends SPViewArchive {
  /**
   * SP 記事一覧 + 無限スクロール 設定を行います
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */
  constructor(element:Element, moreElement:Element, ActionClass:Function = null, option:Object = {}) {
    super(element, moreElement, ActionClass, option);

    /**
     * bind 済み moreButton 関数
     * @type {Function}
     */
    this.boundMore = this.moreButton.bind(this);
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles:Array):void {
    // 既存データ用のglobal配列
    const articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    const prevLast = this._articles.length;

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach((article, i) => {
      const dae = new ArticleDae(article);
      dae.index = prevLast + i;
      articlesList.push(dae);
    } );

    // 通知
    this.executeSafely(View.BEFORE_RENDER, articlesList);

    // this._articleRendered が null の時だけ ReactDOM.render する
    if (this.articleRendered === null) {
      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      /**
       * SPComponentArticles instance
       * @type {SPComponentArticles}
       */
      this.articleRendered = ReactDOM.render(
        // <SPArchiveNode
        //   list={articlesList}
        //   offset={this.request.offset}
        //   length={this.request.length}
        //   action={this.action}
        //   scope={this}
        //   moreButton={this.moreButton.bind(this)}
        //   home={this.home}
        //   type={Message.NEWS}
        //   adSp=""
        // />,
        // @since 2016-09-21 changed
        <SPComponentArticles
          list={articlesList}
          offset={this.request.offset}
          length={this.request.length}
          action={this.action}
          callback={this.executeSafely.bind(this)}
          boundMore={this.moreButton.bind(this)}
          home={this.home}
          adSp=""
        />,
        this.element
      );

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
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    }
  }
  /**
   * more button の表示・非表示を行います
   * @param {boolean} show true の時にボタンを表示させ機能させます
   */
  moreButton(show:boolean):void {
    // console.log('SPViewArchiveInfinite.moreButton', show);
    // 'View More' button root element
    const moreElement = this.moreElement;
    // moreElement 存在チェックを行う
    // Element 型を保証する
    // moreRendered が null の時のみ instance を作成し
    // instance があれば state を update する
    if (this.moreRendered === null) {
      /**
       * スクロールしJSON取得トリガーになる[VIEW MORE]button
       * @type {SPComponentMoreButton}
       */
      this.moreRendered = ReactDOM.render(
        <SPComponentMoreButton
          show={show}
          action={this.action}
          element={moreElement}
          home={this.home}
          slug={this.slug}
        />,
        moreElement
      );
    } else {
      this.moreRendered.updateShow(show);
    }
  }
}
