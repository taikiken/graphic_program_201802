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
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

// parent
import {ViewArchiveMasonry} from './ViewArchiveMasonry';
import { ViewArchiveMasonryInfinite } from './ViewArchiveMasonryInfinite';

// action
import {SearchAuth} from '../action/search/SearchAuth';
import {Search} from '../action/search/Search';

// view
import View from './View';

// data
import {Result} from '../data/Result';
// import {Safety} from '../data/Safety';

// app
import {User} from '../app/User';
import {Message} from '../app/const/Message';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 検索ページ, keyword 検索
 *
 * @since 2016-09-16
 */
// export class ViewSearch extends ViewArchiveMasonry {
export class ViewSearch extends ViewArchiveMasonryInfinite {
  /**
   * 検索ページ 表示
   * @param {string} word 検索キーワード
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( word:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option, true );

    /**
     * Action instance を設定します, keyword 検索
     * @override
     * @type {SearchAuth|Search}
     */
    this.action = User.sign ?
      new SearchAuth( word, this.done.bind( this ), this.fail.bind( this ) ) :
      new Search( word, this.done.bind( this ), this.fail.bind( this ) );
  }
  /**
   * Ajax response success
   * @param {Result} result Ajax データ取得が成功しパース済み JSON data を保存した Result instance
   */
  done( result:Result ):void {

    let articles = result.articles;

    if ( typeof articles === 'undefined' ) {

      // articles undefined
      // JSON に問題がある
      let error = new Error( Message.undef('[SEARCH:UNDEFINED]') );
      this.executeSafely( View.UNDEFINED_ERROR, error );
      this.showError( error.message );

    } else if ( articles.length === 0 ) {

      // articles empty
      // request, JSON 取得に問題は無かったが data が取得できなかった
      let error = new Error( Message.empty('[SEARCH:EMPTY]') );
      this.executeSafely( View.EMPTY_ERROR, error );
      this.showError( error.message );

    } else {
      /**
       * response.request object
       * @override
       * @type {Object}
       */
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
    // 検索結果ない時は 404 -> fail になる -> showError: not found
    this.showError( error.message );

  }
  /**
   * 検索結果が見つかりませんでした コンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    /**
     * 検索結果が見つかりませんでした コンテナ
     * @private
     * @type {ReactClass}
     */
    let ErrorDom = React.createClass( {
      render: function() {

        return (
          <div className="error-container">
            <h2 className="search-heading mt60">検索結果が見つかりませんでした</h2>
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
