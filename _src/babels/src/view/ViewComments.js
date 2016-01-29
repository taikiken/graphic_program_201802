/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/01/28 - 20:51
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */

// app
import {Empty} from '../app/Empty';

// view
import {View} from './View';
import {ViewError} from './error/ViewError';
// action
import {Comments} from '../action/comment/Comments';
// data
import {Result} from '../data/Result';
// dae
import {CommentsListDae} from '../dae/CommentsListDae';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * comments sled を表示する
 */
export class ViewComments extends View {
  /**
   * コメントスレッド表示（記事詳細）
   * @param {Number} id 記事ID :article_id
   * @param {Element} element target HTMLElement
   * @param {Element} moreElement more button root parent
   * @param {string} commentsType all|official|self|normal コメントリスト種類
   * @param {Object} option optional event handler
   */
  constructor( id:Number, element:Element, moreElement:Element, commentsType:string, option:Object = {} ) {
    super( element, option );
    this._action = Comments.type( commentsType, id, this.done.bind( this ), this.fail.bind( this ) );
    this._moreElement = moreElement;
    /**
     * 取得記事(articles)をArticleDae instance 配列として保存する
     * @type {Array<ArticleDae>}
     * @private
     */
    this._comments = [];
  }
  // ---------------------------------------------------
  //  GETTER / SETTER
  // ---------------------------------------------------
  /**
   *
   * @return {Element|*} more button root element を返します
   */
  get moreElement():Element {
    return this._moreElement;
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

    let response = result.response;
    console.log( 'response ', typeof response === 'undefined', response );
    if ( typeof response === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( '[COMMENTS:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      // this.showError( error.message );

    } else {

      console.log( 'call render ', response );
      this.render( response );

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

    // ToDo: Error 時の表示が決まったら変更する
    let error = new ViewError( this.element, this.option, message );
    error.render();

  }
  /**
   * dom を render します
   * @param {Object} responce JSON responce
   */
  render( responce:Object ):void {

    let comments = new CommentsListDae( responce );

    // total check
    if ( comments.total === 0 ) {
      // デーが無いので処理を止める
      this.executeSafely( View.EMPTY_ERROR );
      return;
    }

    // 処理開始

  }// render
}
