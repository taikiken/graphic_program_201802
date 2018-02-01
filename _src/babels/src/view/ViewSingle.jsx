/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/26 - 21:05
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */


// view
import View from './View';
import ViewRelated from './single/ViewRelated';
import ViewSingleHeader from './single/ViewSingleHeader';
import ViewSingleFooter from './single/ViewSingleFooter';

// view/singles
import ViewSingles from './singles/ViewSingles';

// action
import { Single } from '../action/single/Single';
import { SingleAuth } from '../action/single/SingleAuth';

// data
// import { Result } from '../data/Result';
import { Safety } from '../data/Safety';
import { SingleDae } from '../dae/SingleDae';

// dae
import { CategoriesDae } from '../dae/categories/CategoriesDae';
import { SlugDae } from '../dae/categories/SlugDae';

// app
import Dom from '../app/Dom';
import { User } from '../app/User';
import { Message } from '../app/const/Message';

// ga
import { GaData } from '../ga/GaData';
import { Ga } from '../ga/Ga';

// ---------------------------------
// singles (pushstate...)
import { SinglesHistory } from '../singles/SinglesHistory';

// singles/head
import { Page } from '../singles/head/Page';

// snap
import Snap from '../ui/Snap';
// @since 2016-11-16
import { TopButton } from '../ui/button/TopButton';
// @since 2016-12-26
import Hit from '../ui/Hit';
// @since 2017-12-18
import ComponentAnnounce from '../component/announce/ComponentAnnounce';

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
 * 記事詳細,
 * 記事ID で 記事詳細JSONを取得し表示します
 *
 * ```
 * const elements = {}
 *  related: document.getElementById('related'),
 *  footer: document.getElementById('footer')
 * }
 * const single = new ViewSingle(articleId, element, elements);
 * single.start();
 * ```
 */
export default class ViewSingle extends View {
  // ---------------------------------------------------
  //  STATIC METHODS
  // ---------------------------------------------------
  /**
   * 記事詳細での提供元&カテゴリートラッキング
   *
   * ```
   * 対象スクリーン：/p/ [ 記事ID ]
   * イベントカテゴリ : provider
   * イベントアクション：view
   * イベントラベル：[response.user.name]
   *  APIの response.user.name ex. 運動通信編集部 を設定
   * ```
   *
   * ```
   * 対象スクリーン：/p/ [ 記事ID ]
   * イベントカテゴリ : category
   * イベントアクション：view
   * イベントラベル：[response.categories.label] ex. 海外サッカー
   * ```
   *
   * @see https://github.com/undotsushin/undotsushin/issues/744
   * @param {SingleDae} single API 取得 JSON.response を SingleDae instance に変換したもの
   * @since 2016-06-08 deprecated, instead use Ga.single
   * @deprecated 2016-10-05, instead use Ga.single {@link Ga.single}
   */
  static ga(single) {
    let category = 'provider';
    const action = 'view';
    const label = single.user.userName;
    const method = 'ViewSingle.ga';

    // ----------------------------------------------
    // GA 計測タグ
    // 記事詳細の提供元のアクセス数を測定する
    Ga.add(new GaData(method, category, action, label, 0, true));
    // ----------------------------------------------

    // category label 送信
    const categories:CategoriesDae = single.categories;

    category = 'category';
    categories.all.map((value:SlugDae) => {
      // ----------------------------------------------
      // GA 計測タグ
      // 記事カテゴリーのアクセス数を測定する
      Ga.add(new GaData(method, category, action, value.label, 0, true));
      // ----------------------------------------------
    } );
  }
  /**
   * a#readMore-external の存在チェックを行います
   * - 存在すれば click で
   * - ga タグを送信します
   * @since 2016-06-10
   */
  static moreExternal() {
    const external = Dom.moreExternal();
    if (external === null) {
      return;
    }
    // ga 準備
    external.addEventListener('click', ViewSingle.onExternal, false);
  }
  /**
   * a#readMore-external click event handler
   * - ga タグを送信します
   * @see https://github.com/undotsushin/undotsushin/issues/738#issuecomment-224794530
   * ```
   * ga('send', {
   * 'hitType': 'event',
   * 'eventCategory': 'external_link',
   * 'eventAction': 'click',
   * 'eventLabel': 'http://〜'
   * });
   * ```
   * @param {Event} event a#readMore-external click event object
   * @since 2016-06-10
   */
  static onExternal(event) {
    const category = 'external_link';
    const action = 'click';
    const label = Safety.string(event.target.href, '');
    const method = 'ViewSingle.onExternal';
    // ----------------------------------------------
    // GA 計測タグ
    // 記事詳細で続きを読むのリンク先トラッキング
    Ga.add(new GaData(method, category, action, label, 0, true));
    // ----------------------------------------------
  }
  /**
   * お知らせを表示します - {@link ComponentAnnounce}
   * @param {SingleDae} single Ajax JSON 記事 data
   * @param {boolean} [sp=false] mobile flag
   */
  static announce(single, sp = false) {
    const element = Dom.announce();
    if (!element) {
      return;
    }
    const information = sp ? single.information.sp : single.information.pc;
    ReactDOM.render(
      <ComponentAnnounce
        information={information}
      />,
      element,
    );
  }
  // ---------------------------------------------------
  //  CONSTRUCTOR
  // ---------------------------------------------------
  /**
   * 記事ID で 記事詳細JSONを取得し表示します
   *
   * @param {Number} id article id, 記事Id
   * @param {Element} element root element
   * @param {{related: Element, footer: Element}} elements related / footer element 関連記事, 各コメント
   * @param {Object} [option={}] optional event handler
   */
  constructor(id, element, elements, option = {}) {
    option = Safety.object(option);
    super(element, option);
    // action
    let ActionClass = User.sign ? SingleAuth : Single;
    /**
     * Action instance を設定します
     * @override
     * @type {SingleAuth|Single}
     */
    this.action = new ActionClass(id, this.done.bind(this), this.fail.bind(this));
    /**
     * footer, related 挿入位置 Element を設定した Object
     * @type {Object} {related: Element, footer: Element}
     */
    this.elements = elements;
    /**
     * mount event handler - bind 済み this.headerMount
     * @type {Function}
     */
    this.boundMount = this.headerMount.bind(this);
    /**
     * related instance
     * @type {null|Object}
     */
    this.viewRelated = null;
    /**
     * header instance
     * @type {null|Object}
     */
    this.header = null;
    /**
     * footer instance
     * @type {null|Object}
     */
    this.footer = null;
    /**
     * SPViewSingle | ViewSingle instance
     * @type {?SPViewSingle|?ViewSingle}
     */
    this.viewSingles = null;

    /**
     * 記事 ID
     * @type {number}
     * @since 2016-09-26
     */
    this.id = id;
    /**
     * Page instance
     * @type {?Page}
     */
    this.page = null;
    /**
     * SinglesHistory instance
     * @type {SinglesHistory}
     */
    this.manager = SinglesHistory.factory();
    /**
     * TopButton instance
     * @type {TopButton}
     */
    this.topButton = TopButton.factory();
    /**
     * bind onTop
     * @type {function}
     */
    this.onTop = this.onTop.bind(this);
    /**
     * bind onSnap
     * @type {function}
     */
    this.onSnap = this.onSnap.bind(this);
    /**
     * bind onBeat
     * @type {function}
     */
    this.onBeat = this.onBeat.bind(this);
    /**
     * bind hitIn
     * @type {function}
     */
    this.hitIn = this.hitIn.bind(this);
  }
  // // ---------------------------------------------------
  // //  GETTER / SETTER
  // // ---------------------------------------------------
  // /**
  //  * header instance
  //  * @return {?ViewSingleHeader} header instance を返します
  //  */
  // get header() {
  //   return this._header;
  // }
  // /**
  //  * header instance を設定します
  //  * @param {?ViewSingleHeader} header header instance
  //  */
  // set header(header) {
  //   this._header = header;
  // }
  // /**
  //  * bind 済み this.headerMount 取得します
  //  * @return {Function} bind 済み this.headerMount を返します
  //  */
  // get boundMount() {
  //   return this.boundMount;
  // }
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
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const response = result.response;
    if (typeof response === 'undefined') {
      // articles undefined
      // JSON に問題がある
      const error = new Error(Message.undef('[SINGLE:UNDEFINED]'));
      this.executeSafely(View.UNDEFINED_ERROR, error);
      // this.showError( error.message );
    } else {
      // @since 2016-09-27, SingleDae instance にし render へ渡すに変更
      const single = new SingleDae(response);
      // ---------------------------------
      // @since 2016-10-27 pushstate のために
      // const manager = SinglesHistory.factory();
      const manager = this.manager;
      const page = new Page(single);
      this.page = page;
      manager.setBase(page.url());
      manager.hit(page);
      // snap
      const element = Dom.get('js-current-post');
      if (element) {
        // no scroll animation で snap instance 作成
        const snap = new Snap(element, true, page);
        snap.on(Snap.SNAPPED, this.onSnap);
        snap.on(Snap.BEAT_UP, this.onBeat);
        snap.start();
        // @since 2016-12-26
        // top button / short cut でのスクロールトップ対応
        const hit = new Hit(element);
        hit.on(Hit.COLLISION, this.hitIn);
        hit.start();
      }
      // ---------------------------------
      // @since 2016-11-16
      // top button
      // const topButton = TopButton.factory();
      const topButton = this.topButton;
      topButton.off(TopButton.COMPLETE, this.onTop);
      topButton.on(TopButton.COMPLETE, this.onTop);
      // ---------------------------------
      this.render(single);
      this.singles(single);
    }
  }
  /**
   * Snap.SNAPPED event handler<br>
   * SinglesHistory.hit をコールします
   *
   * {@link Snap}
   * {@link SinglesHistory}
   */
  onSnap() {
    // console.log('onSnap', this.page.url());
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
  }
  /**
   * scroll up 時に element bottom が window.height 半分を通過したら呼び出されます
   */
  onBeat() {
    // console.log('onBeat', this.page.url());
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
  }
  /**
   * manager へ snap したことを通知します
   */
  hitIn() {
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
  }
  /**
   * TopButton.COMPLETE event handler<br>
   * [page top] button click しスクロールアニメーションが完了した時に発火します
   *
   * SinglesHistory へ本ページ（先頭記事）が hit したことを通知し URL を元に戻します
   *
   * 低速マシンではスクロール中のヒットだけでは処理が追いつかないようなので、強制的に書き換えることにしました
   * @since 2016-11-16
   */
  onTop() {
    // manager へ snap したことを通知します
    this.manager.hit(this.page);
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely(View.RESPONSE_ERROR, error);
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
    console.warn('ViewSingle.fail', this.id, error);
  }
  /**
   * 記事詳細の次の記事一覧を出力するために, `ViewSingles` {@link ViewSingles} をキックします
   * @param {SingleDae} single JSON.response を SingleDae instance に変換しました
   * @since 2016-09-28
   */
  singles(single) {
    if (this.viewSingles === null) {
      // one time, singles が null の時のみ ViewSingles instance を作成します
      const element = Dom.singlesNext();
      const moreElement = Dom.singlesMore();
      if (element !== null && moreElement !== null) {
        const viewSingles = new ViewSingles(this.id, element, moreElement, single);
        this.viewSingles = viewSingles;
        viewSingles.start();
      }
    } else {
      // instance がある時は update を実行します
      this.viewSingles.update();
    }
  }
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError( message:string = '' ):void {
  //
  //   message = Safety.string( message, '' );
  //
  //   // Error 時の表示
  //   /*
  //   let error = new ViewError( this.element, this.option, message );
  //   error.render();
  //   */
  //
  // }
  /**
   * dom を render します
   * @param {SingleDae} single JSON response
   * @since 2016-09-26 引数型が `SingleDae` に変わりました
   */
  render(single) {
    // console.log('ViewSingle.render single', single);
    // let single = new SingleDae( response );
    // console.log('ViewSingle beforeRender', this.id, single);
    // beforeRender call
    this.executeSafely(View.BEFORE_RENDER, single);
    // ------
    // since 2017-12-18
    ViewSingle.announce(single);
    // ------
    // let header, footer;
    // console.log( 'ViewSingle', single );
    // header
    if (this.header === null) {
      const header = new ViewSingleHeader(this.element, single);
      header.on(View.DID_MOUNT, this.boundMount);
      this.header = header;
      header.start();
    } else {
      this.header.render(single);
    }

    // footer
    if (Safety.isElement(this.elements.footer)) {
      // footer element が存在する時のみ
      if (this.footer === null) {
        const footer = new ViewSingleFooter(this.elements.footer, single);
        this.footer = footer;
        footer.start();
      } else {
        this.footer.render(single);
      }
    }

    // 関連記事 もしもあるなら
    if (single.hasRelated) {
      this.related(single.related);
    }
    // ga from 2016-06-08
    // ViewSingle.ga( single );
    // @since 2016-10-05
    Ga.single(single, 'ViewSingle.render');

    // from 2016-06-10
    ViewSingle.moreExternal();
  }// render
  /**
   * header View.DID_MOUNT event handler
   */
  headerMount() {
    // console.log('ViewSingle.headerMount');
    this.header.off(View.DID_MOUNT, this.boundMount);
    this.executeSafely(View.DID_MOUNT);
  }
  /**
   * 関連記事（記事詳細の）
   * ```
   * desktop/p.php
   * `_popIn_recommend` に JS で出力
   * ```
   * @param {Array} [related=[]] 配列内データ型はRelatedDom
   */
  related(related = []) {
    if (!Safety.isElement(this.elements.related)) {
      // element が不正の時は処理しない
      return;
    }
    // related = Safety.array(related);
    // 効率化のために
    // ViewRelated instance が null の時は instance を作成し start を実行する
    // instance が存在するときは render する
    if (this.viewRelated === null) {
      const viewRelated = new ViewRelated(this.elements.related, related);
      viewRelated.start();
      this.viewRelated = viewRelated;
    } else {
      this.viewRelated.render(related);
    }
  }// related
}
