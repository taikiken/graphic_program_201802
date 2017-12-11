/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/01 - 22:33
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

// app
// import {Empty} from '../app/const/Empty';
// import {User} from '../app/User';
// import {MediaType} from '../app/const/MediaType';
import {Message} from '../app/const/Message';

// view
import View from './View';
// import {ViewError} from './error/ViewError';

// data
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

// dae
import {ArticleDae} from '../dae/ArticleDae';

// // ui
// import {Rise} from '../ui/Rise';
//
// // node(ReactClass)
// import {ReactionNode} from '../node/comment/ReactionNode';
// import {CommentUserPlusCountNode} from '../node/comment/CommentUserPlusCountNode';
// import {CategoryLabelNode} from '../node/category/CategoryLabelNode';

// view/articles
import { ComponentArticlesMasonryInfinite } from '../component/articles/ComponentArticlesMasonryInfinite';
import ComponentMoreButton from '../component/articles/ComponentMoreButton';

// util
import { Scroll } from '../util/Scroll';

// Ga
import { Ga } from '../ga/Ga';
import { GaData } from '../ga/GaData';
import { Env } from '../app/Env';

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

// // imagesLoaded, isotope
// let imagesLoaded = self.imagesLoaded;
// let Isotope = self.Isotope;

/**
 * archive 一覧を isotope で
 */
export default class ViewArchiveMasonryInfinite extends View {
  /**
   * <p>archive 一覧標示後 isotope で位置調整します<br>
   * + infinite scroll を実装します
   * </p>
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   * @param {boolean} [useMasonry=true] isotope を行うかの真偽値
   */
  constructor(element, moreElement, ActionClass = null, option = {}, useMasonry = true) {

    option = Safety.object(option);

    super(element, option);

    if ( typeof ActionClass === 'function' ) {
      /**
       * Action instance を設定します
       * @override
       * @type {*}
       */
      this.action = new ActionClass(this.done.bind(this), this.fail.bind(this));

    }
    /**
     * more button root element, 'View More'
     * @type {Element}
     * @protected
     */
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @protected
     */
    this._articles = [];
    /**
     * isotope を行う真偽値
     * @type {boolean}
     * @protected
     */
    this._useMasonry = useMasonry;
    /**
     * <p>ArticleDom instance を保持します</p>
     * <p>first render を区別するためにも使用します</p>
     * @type {null|Object}
     * @protected
     */
    this._articleRendered = null;
    /**
     * more button instance を設定します
     * @param {null|Object} more button instance
     */
    this._moreRendered = null;
    /**
     * response.request object を保持する
     * @type {null|Object}
     * @protected
     */
    this._request = null;
    // View へ移動
    // @since 2016-09-16
    // /**
    //  * 表示されているページが home(index) かを識別する flag
    //  * @type {boolean}
    //  * @protected
    //  * @default false
    //  */
    // this._home = false;
    /**
     * category slug
     * @type {string}
     * @protected
     * @default all
     */
    this._slug = 'all';
    /**
     * Ga トラッキングタグを送信済みかを表す真偽値
     * @type {boolean}
     * @protected
     * @default false
     */
    this._gaSend = false;

    /**
     * bind 済み moreButton
     * @type {function}
     * @since 2016-09-28
     */
    this.boundMore = this.moreButton.bind(this);
    /**
     * 初回無限スクロールにしないパターン, クリック後に開始します
     * <pre>
     * 対応は PC版ホームに限り
     * 初回ロード時はVIEW MORE表示
     * VIEW MOREクリックで今の無限スクロールの形（VIEW MORE押す必要なくなる）
     * </pre>
     *
     * @see https://github.com/undotsushin/undotsushin/issues/1141
     * @type {boolean}
     * @since 2016-10-04
     */
    this.afterClick = false;
    /**
     * Scroll instance を保持し<br>
     * [VIEW MORE] button が表示されたら Scroll.SCROLL event を強制発火させます<br>
     * [page top] button の位置を制御するために
     *
     * 読み込み完了時にコンテナ高さが変わりボタンが消えることがあります<br>
     * 高さは変わっても Scroll event が発生しないためです
     * @type {Scroll}
     */
    this.scroll = Scroll.factory();
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * more button root element
   * @return {Element|*} more button root element を返します
   */
  get moreElement() {
    return this._moreElement;
  }
  // View へ移動

  // /**
  //  * home flag
  //  * @return {boolean|*} home flag boolean を返します
  //  */
  // get home():Boolean {
  //   return this._home;
  // }
  // /**
  //  * home flag
  //  * @param {Boolean} home flag
  //  */
  // set home( home:Boolean ):void {
  //   this._home = home;
  // }
  /**
   * category slug
   * @default all
   * @return {string} category slug を返します
   */
  get slug() {
    return this._slug;
  }
  /**
   * category slug を設定します
   * @param {string} categorySlug 設定する category slug
   */
  set slug(categorySlug) {
    this._slug = categorySlug;
  }
  /**
   * API 取得 JSON.response を ArticleDae instance にし保持する配列
   * @return {Array.<ArticleDae>} API 取得 JSON.response を ArticleDae instance にし保持する配列を返します
   */
  get articlesList() {
    return this._articles;
  }
  /**
   * Ga トラッキングタグを送信済みかを表す真偽値
   * @return {boolean} Ga トラッキングタグを送信済みかを表す真偽値を返します
   */
  get gaSend() {
    return this._gaSend;
  }
  /**
   * Ga トラッキングタグを送信済みかを表す真偽値を設定します
   * @param {boolean} flag Ga トラッキングタグを送信済みかを表す真偽値
   */
  set gaSend(flag) {
    this._gaSend = flag;
  }
  // -- @since 2016-06-27
  /**
   * isotope を行う真偽値を取得します
   * @return {boolean} isotope を行う真偽値を返します
   */
  get useMasonry():Boolean {
    return this._useMasonry;
  }
  /**
   * ArticleDom instance を取得します
   * @return {?Object} ArticleDom instance を返します
   */
  get articleRendered() {
    return this._articleRendered;
  }
  /**
   * ArticleDom instance を設定します
   * @param {?Object} rendered ArticleDom instance
   */
  set articleRendered(rendered):void {
    this._articleRendered = rendered;
  }
  /**
   * more button instance
   * @return {?Object} more button instance を返します
   */
  get moreRendered() {
    return this._moreRendered;
  }
  /**
   * more button instance を設定します
   * @param {?Object} more button instance
   */
  set moreRendered(more) {
    this._moreRendered = more;
  }
  /**
   * response.request object を取得します
   * @return {?Object} response.request object を返します
   */
  get request() {
    return this._request;
  }
  /**
   * response.request object を設定します
   * @param {?Object} requestObject response.request object
   */
  set request(requestObject) {
    this._request = requestObject;
  }
  /**
   * 取得記事(articles)をArticleDae instance 配列として 取得します
   * @return {Array.<ArticleDae>} 取得記事(articles)をArticleDae instance 配列として返します
   */
  get articles() {
    return this._articles;
  }
  /**
   * 取得記事(articles)をArticleDae instance 配列を設定します
   * @param {Array.<ArticleDae>} articles 取得記事(articles)をArticleDae instance 配列
   */
  set articles(articles) {
    this._articles = articles;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   * @param {string} [path=''] option argument
   */
  start(path = '') {
    if (Env.NODE_ENV === 'develop') {
      console.warn('[ViewSingleTitle].start', path);
    }
    this.action.next();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done(result) {
    const articles = result.articles;
    // console.log( 'ViewArchiveMasonry done ', result );
    if ( typeof articles === 'undefined' ) {
      // [ERROR] articles undefined
      // JSON に問題がある
      let error = new Error( Message.undef('[ARCHIVE:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);
    } else if ( articles.length === 0 ) {
      // [ERROR] articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[ARCHIVE:EMPTY]') );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);
    } else {
      // success
      this.request = result.request;
      this.render(articles);
    }
  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail(error) {
    this.executeSafely( View.RESPONSE_ERROR, error );
    // @since 2016-09-28, error で button を非表示へ
    // this.moreButton(false);
    // button exist 判定追加
    // @since 2017-06-01
    if (this.moreButton) {
      this.moreButton(false);
    }
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
    // console.warn('error', error);
  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError(message = '') {
    // message = Safety.string( message, '' );
    //
    // // Error 時の表示が決まったら変更する
    // let error = new ViewError( this.element, this.option, message );
    // error.render();
    console.warn('ViewArchiveMasonryInfinite.showError', message);
  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render(articles) {
    // ------------------------------------------------
    // @since 2016-09-15
    // 既存データ用のglobal配列
    const articlesList = this.articles;

    // 前回までの配列length
    // sequence な index のために必要
    const prevLast = this.articles.length;

    // 記事挿入 root element
    const element = this.element;
    // ------------------------------------------------

    // 通知
    this.executeSafely( View.BEFORE_RENDER, articlesList );

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach((article, i) => {
      const dae = new ArticleDae(article);
      // console.log( 'dae ', dae );
      dae.index = prevLast + i;
      articlesList.push( dae );
    } );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if (this.articleRendered === null ) {
      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this.articleRendered = ReactDOM.render(
        <ComponentArticlesMasonryInfinite
          list={articlesList}
          home={this.home}
          offset={this.request.offset}
          length={this.request.length}
          action={this.action}
          callback={this.executeSafely.bind(this)}
          boundMore={this.moreButton.bind(this)}
          masonry={this.useMasonry}
        />,
        element
      );

      if (this.home) {
        // ----------------------------------------------
        // GA 計測タグ
        // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
        Ga.add(new GaData('ViewArchiveMasonryInfinite.render', 'home_articles', 'view - new', String(1), 0, true));
        // ----------------------------------------------
      } else {
        // ----------------------------------------------
        // GA 計測タグ
        // PC/スマホカテゴリー一覧の新着記事
        Ga.add(new GaData('ViewArchiveMasonryInfinite.render', `${this.slug}_articles`, 'view - new', String(1), 0, true));
        // ----------------------------------------------
      }
    } else {
      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList(articlesList, this.request.offset, this.request.length);
    }
  }// render
  /**
   * more button の表示・非表示を行います
   * @since 2016-09-16
   * @param {boolean} [show=false] true の時にボタンを表示させ機能させます
   */
  moreButton(show = false) {
    // 'View More' button root element
    const moreElement = this.moreElement;
    // @since 2017-12-05 element  check 追加
    if (!moreElement) {
      return;
    }
    // // moreElement 存在チェックを行う
    // // Element 型を保証する
    // // moreRendered が null の時のみ instance を作成し
    // // instance があれば state を update する
    // // @since 2017-06-01 - show: true の時のみ button 有効化
    // if (show) {
    //   if (this.moreRendered === null) {
    //     this.moreRendered = ReactDOM.render(
    //       <ComponentMoreButton
    //         show={show}
    //         action={this.action}
    //         element={moreElement}
    //         home={this.home}
    //         slug={this.slug}
    //         afterClick={this.afterClick}
    //       />,
    //       moreElement
    //     );
    //   } else {
    //     this.moreRendered.updateShow(show);
    //   }
    //   this.scroll.fire();
    // } else {
    //   // if (this.moreRendered === null){
    //   // lint error になるので space 入れる - こんな雑な修正信用できる？
    //   if (this.moreRendered === null) {
    //     //     this.moreRendered = ReactDOM.render(
    //     //         <ComponentMoreButton
    //     //     show={show}
    //     //     action={this.action}
    //     //     element={moreElement}
    //     //     home={this.home}
    //     //     slug={this.slug}
    //     //     afterClick={this.afterClick}
    //     // />,
    //     //     moreElement
    //     // );
    //     // lint error になる indent 修正する
    //     this.moreRendered = ReactDOM.render(
    //       <ComponentMoreButton
    //         show={show}
    //         action={this.action}
    //         element={moreElement}
    //         home={this.home}
    //         slug={this.slug}
    //         afterClick={this.afterClick}
    //       />,
    //       moreElement
    //     );
    //   } else {
    //     this.moreRendered.updateShow(show);
    //   }
    // }
    // more button 表示ロジック最適化 - 2017-12-01
    if (this.moreRendered === null) {
      this.moreRendered = ReactDOM.render(
        <ComponentMoreButton
          show={show}
          action={this.action}
          element={moreElement}
          home={this.home}
          slug={this.slug}
          afterClick={this.afterClick}
        />,
        moreElement
      );
    }
    this.moreRendered.updateShow(show);
  }
}// class
