/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/10 - 20:32
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


import ViewVideos from '../../../view/sidebar/ViewVideos';

// app
import {Length} from '../../../app/const/Length';
import {Message} from '../../../app/const/Message';

// view
import View from '../../../view/View';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';

import {SPArchiveNode} from '../../node/SPArchiveNode';
// import {SPMoreViewNode} from '../../node/SPMoreViewNode';

// sp/view
import SPComponentMoreButton from '../../component/articles/SPComponentMoreButton';

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
 * SP 動画一覧, PC と違いカテゴリと同じく 10件ずつ読み込みます
 * future check remove
 */
export default class SPViewVideos extends ViewVideos {
  /**
   * SP 動画一覧
   * @param {Element} element root element
   * @param {Element} moreElement more button element
   * @param {Object} [option={}] optional event handler
   * @param {string} [slug=all] category slug です
   */
  constructor(element, moreElement, option = {}, slug = 'all') {
    super(element, option, slug, Length.archive);

    /**
     * JSON 取得毎に追加します<br>
     * React は append 機能がないので表示データをすべて配列で保持します
     * @type {Array}
     * @protected
     */
    this._articles = [];
    /**
     * SPArchiveNode instance を保持します<br>
     * first render を区別するためにも使用します
     * @type {null|SPArchiveNode}
     * @protected
     */
    this._articleRendered = null;
    // more button instance を保持します
    /**
     * SPMoreViewNode instance を保持します
     * @type {null|SPMoreViewNode}
     * @protected
     */
    this._moreRendered = null;
    /**
     * more button element
     * @type {Element}
     * @protected
     */
    this._moreElement = moreElement;
    /**
     * home(index)か否かのフラッグ（真偽値）
     * @type {boolean}
     * @protected
     * @default false
     */
    this._home = false;
    /**
     * bind moreButton
     * @type {function}
     */
    this.moreButton = this.moreButton.bind(this);
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
    // articles.forEach( function( article, i ) {
    //
    //   let dae = new ArticleDae( article );
    //   // console.log( 'dae ', dae );
    //   dae.index = prevLast + i;
    //   articlesList.push( dae );
    //
    // } );

    articles.map((article, i) => {
      const dae = new ArticleDae(article);
      dae.index = prevLast + i;
      articlesList.push(dae);
      return article;
    });

    // 通知
    this.executeSafely(View.BEFORE_RENDER, articlesList);

    // this._articleRendered が null の時だけ ReactDOM.render する
    if (this._articleRendered === null) {
      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this._articleRendered = ReactDOM.render(
        <SPArchiveNode
          list={articlesList}
          offset={this._request.offset}
          length={this._request.length}
          action={this.action}
          scope={this}
          moreButton={this.moreButton}
          home={this._home}
          type={Message.VIDEO}
          adSp=""
        />,
        this.element
      );
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList(articlesList, 0, 5);
    }
  }// render
  /**
   * more button 表示・非表示
   * @param {boolean} show more button 表示・非表示 を決定する真偽値
   */
  moreButton(show) {
    // show = !!show;
    // // _moreRendered が null の時のみ, instance があれば state を update する
    // // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
    // if (this._moreRendered === null) {
    //   // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {
    //   // チェックをパスし実行する
    //   this._moreRendered = ReactDOM.render(
    //     // <SPMoreViewNode
    //     //   show={show}
    //     //   action={this.action}
    //     //   slug={this.slug}
    //     //   type="movie"
    //     //   home={this._home}
    //     // />,
    //     // @since 2016-09-16 button changed
    //     <SPComponentMoreButton
    //       show={show}
    //       action={this.action}
    //       element={this._moreElement}
    //       home={this._home}
    //       slug={this.slug}
    //       type="movie"
    //     />,
    //     this._moreElement
    //   );
    // } else {
    //   this._moreRendered.updateShow(show);
    // }
    const moreElement = this._moreElement;
    if (!moreElement) {
      return;
    }
    ReactDOM.render(
      <SPComponentMoreButton
        show={show}
        action={this.action}
        element={moreElement}
        home={this._home}
        slug={this.slug}
        type="movie"
        loading=""
      />,
      moreElement,
    );
  }
}
