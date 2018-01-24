/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 22:03
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// parent
import ViewHeadline from '../../../view/home/ViewHeadline';

// view
import SPComponentHeadlines from '../../component/headline/SPComponentHeadlines';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';
import Dom from '../../../app/Dom';
import SPComponentHeadlineArticleLast from '../../component/headline/SPComponentHeadlineArticleLast';
import { AdDae } from '../../../dae/theme/AdDae';

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
 * SP home headline
 */
export default class SPViewHeadLine extends ViewHeadline {
  /**
   * SP home headline
   * @param {Element} element コンテンツ基点Element
   * @param {Object} [option={}] callback 関数をセット
   * @param {AdDae} [ad=null] headline - home `all` AdDae
   */
  constructor(element, option = {}, ad = null) {
    // since 2018-01-11
    // 第三引数 sp - true 追加
    super(element, option, true);
    /**
     * bind executeSafely
     * @type {function}
     */
    this.boundSafely = this.executeSafely.bind(this);
    this.ad = ad || new AdDae({});
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles) {
    // @since 2016-09-16
    // headline output changed
    const list = articles.map((article) => new ArticleDae(article));
    // console.log('SPViewHeadLine.render', articles, list);
    // -------------------------------
    // since 2017-12-18
    // `#js-headline-last-container` 取得
    const lastElement = Dom.headlineLast();
    // element 存在するときは `list` 配列最後を取り出し表示に使用する
    const last = lastElement ? list.pop() : null;
    if (last) {
      ReactDOM.render(
        <SPComponentHeadlineArticleLast
          dae={last}
          index={list.length + 1}
        />,
        lastElement,
      );
    }
    // -------------------------------
    ReactDOM.render(
      <SPComponentHeadlines
        list={list}
        callback={this.boundSafely}
        ad={this.ad}
      />,
      this.element,
    );
  }// render
  /**
   * 平昌 - home と同じ特殊レイアウト用の出力関数
   * @param {Array.<RelatedDae>} list 出力リスト - 変換済み
   * @since 2018-01-21
   */
  renderByRelated(list) {
    // -------------------------------
    // since 2017-12-18
    // `#js-headline-last-container` 取得
    const lastElement = Dom.headlineLast();
    // element 存在するときは `list` 配列最後を取り出し表示に使用する
    const last = lastElement ? list.pop() : null;
    if (last) {
      ReactDOM.render(
        <SPComponentHeadlineArticleLast
          dae={last}
          index={list.length + 1}
        />,
        lastElement,
      );
    }
    // -------------------------------
    ReactDOM.render(
      <SPComponentHeadlines
        list={list}
        callback={this.boundSafely}
        ad={this.ad}
      />,
      this.element,
    );
  }
}
