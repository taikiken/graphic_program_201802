/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/13 - 18:13
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// parent
import ViewSingle from '../../view/ViewSingle';

// app
import { Dom } from '../../app/Dom';

// data
// import {Safety} from '../../data/Safety';

// view
import View from '../../view/View';
// @since 2016-09-34
import Banner from '../../view/Banner';

// // dae
// import {SingleDae} from '../../dae/SingleDae';

// node
// import {BannerNode} from '../../node/single/BannerNode';

// ga
import { Ga } from '../../ga/Ga';

// sp
import {SPViewSingleHeader} from './single/SPViewSingleHeader';
import {SPViewSingleVisual} from './single/SPViewSingleVisual';

// sp/view/singles
import { SPViewSingles } from './singles/SPViewSingles';

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
 * SP 記事詳細
 */
export class SPViewSingle extends ViewSingle {
  /**
   * SP 記事詳細
   * @param {number} id 記事 id
   * @param {Element} element 日付とかインサートする element
   * @param {Element} visualElement メインビジュアル用 element
   * @param {Element} bannerElement バナー用 element
   * @param {Object} [option={}] callback をセットした Object
   */
  constructor(id, element, visualElement, bannerElement, option:Object = {}) {
    super(id, element, { related: null, footer: null }, option);
    /**
     * メインビジュアル用 element
     * @type {Element}
     * @private
     */
    this._visualElement = visualElement;
    /**
     * SPViewSingleVisual instance
     * @type {null|SPViewSingleVisual}
     * @protected
     */
    this._visual = null;
    /**
     * バナー用 element
     * @type {Element}
     * @protected
     */
    this._bannerElement = bannerElement;
    /**
     * SPViewSingles instance
     * @type {?SPViewSingles}
     * @protected
     * @since 2016-09-28
     */
    this._singles = null;
  }
  /**
   * 記事詳細の次の記事一覧を出力するために, `ViewSingles` {@link ViewSingles} をキックします
   * @param {SingleDae} single JSON.response を SingleDae instance に変換しました
   * @since 2016-09-28
   */
  singles(single) {
    if (this._singles === null) {
      // one time, _singles が null の時のみ SPViewSingles instance を作成します
      const element = Dom.singlesNext();
      const moreElement = Dom.singlesMore();
      if (element !== null && moreElement !== null) {
        const singles = new SPViewSingles(this.id, element, moreElement, single);
        this._singles = singles;
        singles.start();
      }
    } else {
      // instance がある時は update を実行します
      this._singles.update();
    }
  }
  /**
   * dom を render します
   * @param {SingleDae} single JSON response
   * @since 2016-09-26 引数型が `SingleDae` に変わりました
   */
  render(single) {
    // let single = new SingleDae( response );
    // beforeRender call
    this.executeSafely(View.BEFORE_RENDER, single);
    // output
    this.renderHeader(single);
    this.renderVisual(single);
    this.renderBanner(single);

    // ga from 2016-06-08
    // ViewSingle.ga( single );
    Ga.single(single, 'SPViewSingle.render');
    // from 2016-06-10
    ViewSingle.moreExternal();
  }
  /**
   * header 部レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  renderHeader(single) {
    // header
    if (this.header === null) {
      const viewHeader = new SPViewSingleHeader(this.element, single);
      viewHeader.on(View.DID_MOUNT, this.boundMount);
      /**
       * SPViewSingleHeader instance
       * @override
       * @type {SPViewSingleHeader}
       */
      this.header = viewHeader;
      viewHeader.start();
    } else {
      this.header.render(single);
    }
  }
  /**
   * visual 部レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  renderVisual(single) {
    // visual
    if (this._visual === null) {
      const visualNode = new SPViewSingleVisual(this._visualElement, single);
      this._visual = visualNode;
      visualNode.start();
    } else {
      this._visual.render(single);
    }
  }
  /**
   * banner レンダリング
   * @param {SingleDae} single 記事 SingleDae instance
   */
  renderBanner(single) {
    // @since 2016-09-24
    const element = this._bannerElement;
    const component = Banner.sp(single, element);
    if (component === null) {
      return;
    }
    ReactDOM.render(component, element);
  }
}
