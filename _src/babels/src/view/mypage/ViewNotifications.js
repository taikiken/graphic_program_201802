/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/29 - 13:38
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {View} from '../View';

export class ViewNotifications extends View {
  /**
   * my page お知らせ 一覧を表示 + infinite scroll
   * @param {Element} element root element, Ajax result を配置する
   * @param {Element} moreElement more button root element, 'View More' を配置する
   * @param {Object} [option={}] optional event handler
   */
  constructor( element:Element, moreElement:Element, option:Object = {} ) {
    super( element, moreElement, null, option, true );
    //this._action = new Activities( this.done.bind( this ), this.fail.bind( this ) );
    //this._moreElement = moreElement;
    //
    ///**
    // * 取得記事(articles)をArticleDae instance 配列として保存する
    // * @type {Array<ArticleDae>}
    // * @private
    // */
    //this._articles = [];
    //// ArticleDom instance を保持します
    //// first render を区別するためにも使用します
    //this._articleRendered = null;
    //// more button instance を保持します
    //this._moreRendered = null;
    //// response.request object を保持する
    //this._request = null;
  }
}
