/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/09 - 22:46
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// view
import {View} from '../../view/View';

// app
import {Message} from '../../app/const/Message';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// sp.node
import {SPArchiveNode} from '../node/SPArchiveNode';
import {SPMoreViewNode} from '../node/SPMoreViewNode';

// Ga
import {Ga} from '../../ga/Ga';
import {GaData} from '../../ga/GaData';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * <p><strong>SP</strong>: archive 一覧標示</p>
 */
export class SPViewArchive extends View {
  /**
   * <p>archive 一覧標示</p>
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Function} [ActionClass=null] Request 対象の Action Class
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, ActionClass:Function = null, option:Object = {} ) {
    option = Safety.object( option );

    super( element, option );

    if ( typeof ActionClass === 'function' ) {
      /**
       * Action instance を設定します
       * @override
       * @type {*}
       */
      this.action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );
    }
    /**
     * more button root element
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
     * ArticleDom instance を保持します
     * first render を区別するためにも使用します
     * @type {null|ReactClass}
     * @protected
     */
    this._articleRendered = null;
    /**
     * more button instance (SPMoreViewDom) を保持します
     * @type {null|ReactClass}
     * @protected
     */
    this._moreRendered = null;
    /**
     * response.request object を保持する
     * @type {null|Object}
     * @protected
     */
    this._request = null;
    // View へ移動
    // @since 2016-09-15
    // /**
    //  * index(home)コンテンツか否かのフラッグ
    //  * @type {boolean}
    //  * @protected
    //  * @default false
    //  */
    // this._home = false;
    /**
     * category slug, ga に使う
     * @type {string}
     * @protected
     * @default all
     */
    this._slug = 'all';
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * more button root element
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
  }
  // View へ移動
  // @since 2016-09-15
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
   * category slug を取得します
   * @default all
   * @return {string} category slug を返します
   */
  get slug():string {
    return this._slug;
  }
  /**
   * category slug を設定します
   * @param {string} slug category slug
   */
  set slug( slug:string ):void {
    this._slug = slug;
  }
  /**
   * 取得記事(articles)をArticleDae instance を格納した配列を取得します
   * @return {Array.<ArticleDae>|Array.<Object>|*} 取得記事(articles)をArticleDae instance を格納した配列を返します
   */
  get articles():Array<Object> {
    return this._articles;
  }
  /**
   * 取得記事(articles)をArticleDae instance を格納した配列を設定します
   * @param {Array<Object>} responseArticles 取得記事(articles)をArticleDae instance を格納した配列
   */
  set articles( responseArticles:Array<Object> ):void {
    this._articles = responseArticles;
  }
  /**
   * SPArchiveNode instance を取得します
   * @return {null|ReactClass|Object} SPArchiveNode instance を返します
   */
  get articleRendered():Object {
    return this._articleRendered;
  }
  /**
   * SPArchiveNode instance を設定します
   * @param {Object} article SPArchiveNode instance
   */
  set articleRendered( article:Object ):void {
    this._articleRendered = article;
  }
  /**
   * response.request object を取得します
   * @return {null|Object} response.request object を返します
   */
  get request():Object {
    return this._request;
  }
  /**
   * response.request object を設定します
   * @param {Object} request response.request object
   */
  set request( request:Object ):void {
    this._request = request;
  }
  /**
   * more button instance (SPMoreViewDom) を取得します
   * @return {Object|null|ReactClass} more button instance (SPMoreViewDom) を返します
   */
  get moreRendered():Object {
    return this._moreRendered;
  }
  /**
   * more button instance (SPMoreViewDom) を設定します
   * @param {Object} moreRendered more button instance (SPMoreViewDom)
   */
  set moreRendered( moreRendered:Object ):void {
    this._moreRendered = moreRendered;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {
    // console.log( '-------------------------- SPViewArchive start------' );
    this.action.next();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let articles = result.articles;
    // console.log( '**************** SPViewArchive done ', result );
    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( Message.undef('[SP:ARCHIVE:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[SP:ARCHIVE:EMPTY:EMPTY]') );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );
      // @since 2016-09-28, error で button を非表示へ
      this.moreButton(false);

    } else {

      this.request = result.request;
      this.render( articles );

    }

  }
  /**
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
    // @since 2016-09-28, error で button を非表示へ
    this.moreButton(false);

  }
  // /**
  //  * ViewError でエラーコンテナを作成します
  //  * @param {string} message エラーメッセージ
  //  */
  // showError( message:string = '' ):void {
  //
  //   // message = Safety.string( message, '' );
  //   // console.log( '**************** SPViewArchive showError ', message );
  //   // ToDo: Error 時の表示が決まったら変更する
  //   /*
  //   let error = new ViewError( this.element, this.option, message );
  //   error.render();
  //   */
  //
  // }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    // console.log( '**************** SPViewArchive render ', articles );
    // 既存データ用のglobal配列
    let articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    let prevLast = this._articles.length;

    // ------------------------------------------------
    let moreButton = ( show:Boolean ):void => {
      show = !!show;
      // _moreRendered が null の時のみ state を update する
      if ( this._moreRendered === null ) {
        // チェックをパスし実行する
        this.moreRendered = ReactDOM.render(
          <SPMoreViewNode
            show={show}
            action={this.action}
            home={this.home}
            slug={this.slug}
          />,
          this.moreElement
        );

      } else {

        this.moreRendered.updateShow( show );

      }
    };

    // ------------------------------------------------
    // 既存配列に新規JSON取得データから作成した ArticleDae instance を追加する
    articles.forEach( function( article, i ) {

      let dae = new ArticleDae( article );
      // console.log( 'dae ', dae );
      dae.index = prevLast + i;
      articlesList.push( dae );

    } );

    // 通知
    this.executeSafely( View.BEFORE_RENDER, articlesList );

    // this._articleRendered が null の時だけ ReactDOM.render する
    if ( this.articleRendered === null ) {

      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this.articleRendered = ReactDOM.render(
        <SPArchiveNode
          list={articlesList}
          offset={this.request.offset}
          length={this.request.length}
          action={this.action}
          scope={this}
          moreButton={moreButton}
          home={this.home}
          type={Message.NEWS}
          adSp=""
        />,
        this.element
      );

      if ( this.home ) {
        // ----------------------------------------------
        // GA 計測タグ
        // 記事一覧表示 / view more 部分 ※ 初期読み込み成功後に eventLabel:1として送信
        Ga.add( new GaData('SPViewArchive.render', 'home_articles', 'view - new', String(1), 0, true) );
        // ----------------------------------------------
      } else {
        // ----------------------------------------------
        // GA 計測タグ
        // PC/スマホカテゴリー一覧の新着記事
        Ga.add( new GaData('SPViewArchive.render', `${this.slug}_articles`, 'view - new', String(1), 0, true) );
        // ----------------------------------------------
      }

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this.articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }

  }// render
  // /**
  //  * more button の表示・非表示を行います
  //  * @param {boolean} show true の時にボタンを表示させ機能させます
  //  */
  // moreButton(show) {}
}
