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
'use strict';

import {SPViewArchive} from './SPViewArchive';
import {User} from '../../app/User';

// action
import {SearchAuth} from '../../action/search/SearchAuth';
import {Search} from '../../action/search/Search';

// data
import {Safety} from '../../data/Safety';

// React
let React = self.React;
let ReactDOM = self.ReactDOM;

export class SPViewSearch extends SPViewArchive {
  /**
   * home news, token 付き・無し を切替
   * @param {string} word 検索キーワード
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( word:string, element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option );
    // keyword 検索
    this._action = User.sign ?
      new SearchAuth( word, this.done.bind( this ), this.fail.bind( this ) ) :
      new Search( word, this.done.bind( this ), this.fail.bind( this ) );
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
          <div className="error-container result-notfound">
            <h2 className="result-notfound-heading">検索結果が見つかりませんでした</h2>
            <p className="result-notfound-lead">スペルを確認するか、他のキーワードを入力してみてください。</p>
            <div className="mod-btnA01">
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
