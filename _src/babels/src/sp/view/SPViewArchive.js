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
'use strict';

// app
import {Empty} from '../../app/const/Empty';
import {User} from '../../app/User';
import {MediaType} from '../../app/const/MediaType';

// view
import {View} from '../../view/View';
import {ViewError} from '../../view/error/ViewError';

// data
import {Result} from '../../data/Result';
import {Safety} from '../../data/Safety';

// dae
import {ArticleDae} from '../../dae/ArticleDae';

// node(ReactClass)
// import {ReactionNode} from '../../node/comment/ReactionNode';

import {SPArchiveNode} from '../node/SPArchiveNode';
import {SPMoreViewNode} from '../node/SPMoreViewNode';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * archive 一覧標示
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
      this._action = new ActionClass( this.done.bind( this ), this.fail.bind( this ) );
    }
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._articles = [];
    // ArticleDom instance を保持します
    // first render を区別するためにも使用します
    this._articleRendered = null;
    // more button instance を保持します
    this._moreRendered = null;
    // response.request object を保持する
    this._request = null;

    this._home = false;
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
  }
  /**
   * home flag
   * @return {boolean|*} home flag boolean を返します
   */
  get home():boolean {
    return this._home;
  }
  /**
   * home flag
   * @param {boolean} home flag
   */
  set home( home:boolean ):void {
    this._home = home;
  }
  // ---------------------------------------------------
  //  Method
  // ---------------------------------------------------
  /**
   * Ajax request を開始します
   */
  start():void {

    this.action.next();

  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let articles = result.articles;
    // console.log( 'ViewArchiveMasonry done ', result );
    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[ARCHIVE:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[ARCHIVE:EMPTY]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.EMPTY_ERROR, error );
      // this.showError( error.message );

    } else {

      this._request = result.request;
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

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    message = Safety.string( message, '' );

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Array} articles JSON responce.articles
   */
  render( articles:Array ):void {

    // 既存データ用のglobal配列
    let articlesList = this._articles;

    // 前回までの配列length
    // sequence な index のために必要
    let prevLast = this._articles.length;

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
          moreButton={this.moreButton.bind( this )}
          home={this._home}
        />,
        this.element
      );

    } else {

      // instance が存在するので
      // state update でコンテナを追加する
      this._articleRendered.updateList( articlesList, this._request.offset, this._request.length );

    }

  }// render
  /**
   * more button 表示・非表示
   * @param {boolean} show more button 表示・非表示 を決定する真偽値
   */
  moreButton( show:boolean ):void {
    show = !!show;

    // _moreRendered が null の時のみ, instance があれば state を update する
    // if ( Safety.isElement( moreElement ) && _this._moreRendered === null ) {
    if ( this._moreRendered === null ) {
      // if ( moreElement !== null && typeof moreElement !== 'undefined' && 'appendChild' in moreElement ) {

      // チェックをパスし実行する
      this._moreRendered = ReactDOM.render(
        <SPMoreViewNode
          show={show}
          action={this.action}
        />,
        this.moreElement
      );

    } else {

      this._moreRendered.updateShow( show );

    }
  }
}

