/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/18 - 15:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {SearchAuth} from '../action/search/SearchAuth';
import {Search} from '../action/search/Search';
import {ViewArchiveMasonry} from './ViewArchiveMasonry';
// view
import {View} from './View';
// import {ViewError} from './error/ViewError';
// data
import {Result} from '../data/Result';
import {Safety} from '../data/Safety';

import {User} from '../app/User';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 検索ページ
 */
export class ViewSearch extends ViewArchiveMasonry {
  /**
   * 検索ページ 表示
   * @param {string} word 検索キーワード
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( word:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option, true );
    // keyword 検索
    this._action = User.sign ?
      new SearchAuth( word, this.done.bind( this ), this.fail.bind( this ) ) :
      new Search( word, this.done.bind( this ), this.fail.bind( this ) );
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
      let error = new Error( '[SEARCH:UNDEFINED]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( '[SEARCH:EMPTY]サーバーレスポンスに問題が発生しました。' );
      this.executeSafely( View.EMPTY_ERROR, error );
      this.showError( error.message );

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
    this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    message = Safety.string( message, '' );
    console.warn( 'search error ', message );

    let ErrorDom = React.createClass( {
      render: function() {

        return (
          <div className="error-container">
            <h2 className="mt80 f20 bold">検索結果が見つかりませんでした</h2>
            <p className="mt04">スペルを確認するか、他のキーワードを入力してみてください。</p>
            <div className="mod-btnA01 mt40">
              <a href="/">TOPに戻る</a>
            </div>
          </div>
        );

      }
    } );

    ReactDOM.render(
      <ErrorDom />,
      this.element
    );

  }
}
