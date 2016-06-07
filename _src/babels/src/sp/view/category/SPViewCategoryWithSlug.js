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
import {SPViewCategory} from './SPViewCategory';

// app
import {Message} from '../../../app/const/Message';

// data
import {Result} from '../../../data/Result';

// dae
import {ArticleDae} from '../../../dae/ArticleDae';
import {CategoriesSlugDae} from '../../../dae/caegories/CategoriesSlugDae';

// view
import {View} from '../../../view/View';
// model
import {Model} from '../../../model/Model';

// sp:model
import {ModelCategoriesSlug} from '../../../model/categoires/ModelCategoriesSlug';

// sp:node
import {SPArchiveNode} from '../../node/SPArchiveNode';
import {SPMoreViewNode} from '../../node/SPMoreViewNode';

// react
let ReactDOM = self.ReactDOM;
/**
 * SP category 一覧を表示します<br>
 * 広告をAPIでコントロール可能にします
 *
 * @from 2016-06-06
 */
export class SPViewCategoryWithSlug extends SPViewCategory {
  /**
   * SP category 一覧
   * @param {string} slug category slug
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( slug:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( slug, element, moreElement, option );

    const slugFail = this.slugFail.bind( this );
    const callback = {};
    callback[ Model.COMPLETE ] = this.slugDone.bind( this );
    callback[ Model.UNDEFINED_ERROR ] = slugFail;
    callback[ Model.RESPONSE_ERROR ] = slugFail;
    /**
     * 記事カテゴリー情報取得
     * @type {ModelCategoriesSlug}
     * @private
     */
    this._actionSlug = new ModelCategoriesSlug( slug, callback );
    /**
     * CategoryAuth, Category 取得結果を保持します
     * @type {null|Array<Object>}
     * @private
     */
    this._resultArticles = null;
    /**
     * ModelCategoriesSlug 取得結果を保持します
     * @type {null|Object}
     * @private
     */
    this._categoryInfo = null;
    /**
     * ModelCategoriesSlug, Category の取得を待つためのフラッグとして使用します
     * @type {number}
     */
    this.waiting = 0;
  }
  /**
   * CATEGORY_INFO, ModelCategoriesSlug success event
   * @return {string} spViewCategoryWidthSlugCategoryInfo event type
   */
  static get CATEGORY_INFO():string {
    return 'spViewCategoryWidthSlugCategoryInfo';
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {
    this.action.next();
    this._actionSlug.start();
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let articles = result.articles;
    // console.log( '**************** SPViewCategoryWithSlug done ', result );
    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( Message.undef('[SP:ARCHIVE:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );
      if ( this.waiting < 2 ) {
        this.wait();
      }

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[SP:ARCHIVE:EMPTY:EMPTY]') );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );
      if ( this.waiting < 2 ) {
        this.wait();
      }

    } else {

      this._request = result.request;

      if ( this.waiting >= 2 ) {
        // 2 回目以降は
        this.render( articles );
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
  fail( error:Error ):void {

    this.executeSafely( View.RESPONSE_ERROR, error );
    // ここでエラーを表示させるのは bad idea なのでコールバックへエラーが起きたことを伝えるのみにします
    // this.showError( error.message );
    if ( this.waiting < 2 ) {
      this.wait();
    }
  }

  /**
   * ModelCategoriesSlug success callback
   * @param {Result} result ModelCategoriesSlug 取得結果
   */
  slugDone( result:Result ):void {
    let response = result.response;
    // console.log( 'slugDone ', response );
    if ( typeof response === 'undefined' || response === null ) {
      this.wait();
    }

    let categoryInfo = new CategoriesSlugDae( response );
    this._categoryInfo = categoryInfo;
    this.executeSafely( SPViewCategoryWithSlug.CATEGORY_INFO, categoryInfo );
    this.wait();
  }

  /**
   * ModelCategoriesSlug fail callback
   */
  slugFail():void {
    // console.log( 'slugFail ' );
    if ( this.waiting < 2 ) {
      this.wait();
    }
  }

  /**
   * ModelCategoriesSlug, Category 両方の取得を待ちます
   */
  wait():void {
    // console.log( 'wait', this.waiting );
    if ( ++this.waiting < 2 ) {
      return;
    }

    let resultArticles = this._resultArticles;
    if ( !!resultArticles ) {
      this.render( resultArticles );
    }
  }

  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {
    // ストリーム広告 ID
    let categoryInfo = this._categoryInfo;
    let adSp = categoryInfo.ad.sp;
    if ( !adSp ) {
      adSp = '';
    }
    // console.log( '**** categoryInfo ', categoryInfo );
    // 既存データ用のglobal配列
    let articlesList = this.articles;
    // 前回までの配列length
    // sequence な index のために必要
    let prevLast = this.articles.length;

    // ------------------------------------------------
    let moreButton = ( show:Boolean ):void => {
      show = !!show;
      // _moreRendered が null の時のみ state を update する
      if ( this._moreRendered === null ) {
        // チェックをパスし実行する
        this._moreRendered = ReactDOM.render(
          // <SPMoreViewDom
          //   show={show}
          //   action={this.action}
          //   home={this.home}
          //   slug={this.slug}
          // />,
          <SPMoreViewNode
            show={show}
            action={this.action}
            home={this.home}
            slug={this.slug}
          />,
          this.moreElement
        );

      } else {

        this._moreRendered.updateShow( show );

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
    if ( this._articleRendered === null ) {

      // dom 生成後 instance property '_articleRendered' へ ArticleDom instance を保存する
      this._articleRendered = ReactDOM.render(
        <SPArchiveNode
          list={articlesList}
          offset={this._request.offset}
          length={this._request.length}
          action={this.action}
          scope={this}
          moreButton={moreButton}
          home={this._home}
          type={Message.NEWS}
          adSp={adSp}
        />,
        this.element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }
  }

}
