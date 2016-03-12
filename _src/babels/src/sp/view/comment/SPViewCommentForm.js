/**
 * Copyright (c) 2011-2016 inazumatv.com, inc.
 * @author (at)taikiken / http://inazumatv.com
 * @date 2016/03/12 - 23:48
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 *
 */
'use strict';

import {ViewCommentForm} from '../../../view/comment/ViewCommentForm';

import {User} from '../../../app/User';
import {CommentsType} from '../../../app/const/CommentsType';

// sp
import {SPCommentFormNode} from '../../node/comment/SPCommentFormNode';

// React
// let React = self.React;
let ReactDOM = self.ReactDOM;

/**
 * SP 記事へのコメント
 */
export class SPViewCommentForm extends ViewCommentForm {
  /**
   * SP 記事へのコメントフォーム
   * @param {Element} element root element
   * @param {Number} articleId 記事Id
   * @param {string} [icon=''] ユーザー画像パス
   */
  constructor( element:Element, articleId:Number, icon:string = '' ) {
    console.log( 'SPViewCommentForm' );
    super( element, articleId, icon );
  }
  /**
   * フォーム生成を開始します
   * @param {string} id 記事Id
   */
  render( id:string ):void {
    console.log( 'SPViewCommentForm render' );
    ReactDOM.render(
      <SPCommentFormNode
        uniqueId={'comment-to-' + id}
        toggle="open"
        icon={this._icon}
        articleId={id}
        sign={User.sign}
        independent={true}
        parent={false}
        commentType={CommentsType.INDEPENDENT}
      />,
      this.element
    );
  }
}
