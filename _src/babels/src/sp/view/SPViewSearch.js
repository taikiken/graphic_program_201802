/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/16 - 13:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
/* eslint no-unused-vars: [0, {"args": "after-used"}] */

import SPViewArchive from './SPViewArchive';
import { SPViewArchiveInfinite } from './SPViewArchiveInfinite';

// app
import {User} from '../../app/User';
import {Ad} from '../../app/const/Ad';

// view
import View from '../../view/View';

// action
import {SearchAuth} from '../../action/search/SearchAuth';
import {Search} from '../../action/search/Search';

// data
// import {Result} from '../../data/Result';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;
/**
 * SP 検索結果, keyword 検索
 */
// export class SPViewSearch extends SPViewArchive {
// @since 2016-09-16 parent class changed
export class SPViewSearch extends SPViewArchiveInfinite {
  /**
   * SP 検索結果
   * @param {string} word 検索キーワード
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( word:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option );
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
   * Ajax response error
   * @param {Error} error Error instance
   */
  fail( error:Error ):void {

    // console.warn( '**************** search fail ', error );
    this.executeSafely( View.RESPONSE_ERROR, error );
    // 検索結果ない時は 404 -> fail になる -> showError: not found
    this.showError( error.message );

  }
  /**
   * ViewError でエラーコンテナを作成します
   * @param {string} message エラーメッセージ
   */
  showError( message:string = '' ):void {

    // message = Safety.string( message, '' );
    // console.warn( '**************** search error ', message );

    let ErrorDom = React.createClass( {
      render: function() {

        return (
          <div className="result-notfound">
            <div id="sponsor-link-404" className="sponsor-link sponsor-link-404" ref="ad_root" />
            
            <div className="error-container result-notfound">
              <h2 className="result-notfound-heading">検索結果が見つかりませんでした</h2>
              <p className="result-notfound-lead">スペルを確認するか、他のキーワードを入力してみてください。</p>
              <div className="mod-btnA01">
                <a href="/">TOPに戻る</a>
              </div>
            </div>
          </div>
        );

      },
      componentDidMount: function() {
        ReactDOM.findDOMNode( this.refs.ad_root ).appendChild( Ad.make( Ad.SP_NEWS, 'sponsor-link-404' ) );
      }
    } );

    ReactDOM.render(
      <ErrorDom />,
      this.element
    );

  }
}
