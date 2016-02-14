/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/02/14
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */
'use strict';

import {View} from '../View';
import {User} from '../../app/User';

import {ReplyNode} from '../../node/comment/ReplyNode';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * 記事へのコメント
 */
export class ViewCommentForm extends View {
  /**
   * 記事へのコメントフォーム
   * @param {Element} element root element
   * @param {Number} articleId 記事Id
   * @param {string} icon ユーザー画像パス
   */
  constructor( element:Element, articleId:Number, icon:string ) {
    super( element );
    this._articleId = String(articleId);
    this._icon = icon;
  }
  /**
   * render start
   */
  start():void {
    this.render( this._articleId );
  }
  /**
   * フォーム生成を開始します
   * @param {string} id 記事Id
   */
  render( id:string ):void {
    ReactDOM.render(
      <ReplyNode
        uniqueId={'comment-to-' + id}
        icon={this._icon}
        articleId={id}
        sign={User.sign}
        independent={true}
      />,
      this.element
    );
  }
}
